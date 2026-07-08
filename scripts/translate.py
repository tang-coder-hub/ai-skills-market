#!/usr/bin/env python3
"""
translate.py
Translate English repo descriptions to Chinese via Tencent Cloud TMT
(Text Machine Translation). Uses signature v3 auth. A local cache file
(data/.translate_cache.json) reuses previous translations to save quota.

Credentials are read from environment variables (set in GitHub Actions
secrets), never hardcoded or exposed to the frontend.
"""

import os
import json
import time
import hashlib
import hmac
import urllib.request
import urllib.error

# Tencent Cloud TMT endpoint (ap-guangzhou)
HOST = "tmt.tencentcloudapi.com"
SERVICE = "tmt"
REGION = "ap-guangzhou"
ACTION = "TextTranslate"
VERSION = "2018-03-21"

CACHE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data", ".translate_cache.json"
)


def _load_cache():
    if os.path.exists(CACHE_PATH):
        try:
            with open(CACHE_PATH, encoding="utf-8") as f:
                return json.load(f)
        except (ValueError, OSError):
            return {}
    return {}


def _save_cache(cache):
    os.makedirs(os.path.dirname(CACHE_PATH), exist_ok=True)
    with open(CACHE_PATH, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)


def _sign(key, msg):
    return hmac.new(key, msg.encode("utf-8"), hashlib.sha256).digest()


def _authorization(secret_id, secret_key, timestamp, payload):
    # TC3-HMAC-SHA256 signature
    date = time.strftime("%Y-%m-%d", time.gmtime(timestamp))
    cred = f"credential={secret_id}/{date}/{SERVICE}/tc3_request"
    http_request_method = "POST"
    canonical_uri = "/"
    canonical_querystring = ""
    ct = "application/json; charset=utf-8"
    payload_hash = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    canonical_headers = f"content-type:{ct}\nhost:{HOST}\n"
    signed_headers = "content-type;host"
    canonical_request = (
        f"{http_request_method}\n{canonical_uri}\n{canonical_querystring}\n"
        f"{canonical_headers}\n{signed_headers}\n{payload_hash}"
    )
    algorithm = "TC3-HMAC-SHA256"
    req_ts = str(timestamp)
    credential_scope = f"{date}/{SERVICE}/tc3_request"
    string_to_sign = (
        f"{algorithm}\n{req_ts}\n{credential_scope}\n"
        f"{hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()}"
    )
    secret_date = _sign(("TC3" + secret_key).encode("utf-8"), date)
    secret_service = _sign(secret_date, SERVICE)
    secret_signing = _sign(secret_signing := secret_service, "tc3_request")
    signature = hmac.new(secret_signing, string_to_sign.encode("utf-8"),
                         hashlib.sha256).hexdigest()
    return (
        f"{algorithm} Credential={secret_id}/{credential_scope}, "
        f"SignedHeaders={signed_headers}, Signature={signature}"
    )


def _translate_one(text, secret_id, secret_key):
    if not text or not text.strip():
        return ""
    timestamp = int(time.time())
    payload = json.dumps({
        "SourceText": text,
        "Source": "en",
        "Target": "zh",
        "ProjectId": 0,
    })
    auth = _authorization(secret_id, secret_key, timestamp, payload)
    headers = {
        "Authorization": auth,
        "Content-Type": "application/json; charset=utf-8",
        "Host": HOST,
        "X-TC-Action": ACTION,
        "X-TC-Version": VERSION,
        "X-TC-Region": REGION,
        "X-TC-Timestamp": str(timestamp),
    }
    req = urllib.request.Request(
        f"https://{HOST}/", data=payload.encode("utf-8"),
        headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data.get("Response", {}).get("TargetText", "")
    except (urllib.error.URLError, urllib.error.HTTPError, ValueError, TimeoutError) as e:
        print(f"  [warn] translate failed: {e}", flush=True)
        return ""


def translate_descriptions(repos, secret_id=None, secret_key=None):
    """Add description_zh to each repo. Returns list with description_zh set.

    If credentials are missing, falls back to copying description (no translation)
    so the pipeline never breaks.
    """
    secret_id = secret_id or os.environ.get("TENCENT_SECRET_ID")
    secret_key = secret_key or os.environ.get("TENCENT_SECRET_KEY")

    cache = _load_cache()
    changed = False

    if not secret_id or not secret_key:
        print("  [info] no TENCENT credentials, skipping translation (copy description)")
        for r in repos:
            r["description_zh"] = r.get("description", "")
        return repos

    for r in repos:
        src = r.get("description", "") or ""
        if not src.strip():
            r["description_zh"] = ""
            continue
        # cache key: normalized source text
        key = src.strip()
        if key in cache:
            r["description_zh"] = cache[key]
            continue
        zh = _translate_one(key, secret_id, secret_key)
        if zh:
            # small delay to respect rate limits
            time.sleep(0.2)
            cache[key] = zh
            r["description_zh"] = zh
            changed = True
        else:
            # on failure, fallback to original
            r["description_zh"] = src

    if changed:
        _save_cache(cache)
    return repos


if __name__ == "__main__":
    # simple self-test
    import sys
    sample = [{"description": "Open-source AI hackers to find and fix vulnerabilities."}]
    sid = sys.argv[1] if len(sys.argv) > 1 else None
    skey = sys.argv[2] if len(sys.argv) > 2 else None
    out = translate_descriptions(sample, sid, skey)
    print(json.dumps(out, ensure_ascii=False, indent=2))
