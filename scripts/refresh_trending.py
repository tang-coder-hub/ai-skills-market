#!/usr/bin/env python3
"""
refresh_trending.py
Pull real GitHub trending via OSS Insight API (GitHub official partner) for
daily / weekly / monthly, and generate hot (weekly re-sorted by total stars).
Writes data/{daily,weekly,monthly,hot}.json.

On fetch failure for a given period, the existing file is left untouched
(graceful degradation). Designed to run from GitHub Actions on a cron schedule.
"""

import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
HOT_COUNT = 25

# OSS Insight: open-source alternative to GitHub Trending (GitHub official partner).
# period param: past_24_hours / past_week / past_month
OSS_PERIOD = {
    "daily": "past_24_hours",
    "weekly": "past_week",
    "monthly": "past_month",
}

CATEGORY_KEYWORDS = {
    "ai": "productivity",
    "agent": "productivity",
    "llm": "productivity",
    "chatbot": "productivity",
    "security": "security",
    "pentest": "security",
    "hack": "security",
    "design": "design",
    "ui": "design",
    "figma": "design",
    "marketing": "marketing",
    "seo": "marketing",
    "data": "data",
    "database": "data",
    "ml": "data",
    "engineering": "engineering",
    "devops": "engineering",
    "backend": "engineering",
    "frontend": "engineering",
}


def guess_category(repo):
    text = " ".join([
        repo.get("description", "") or "",
        repo.get("language", "") or "",
    ]).lower()
    for kw, cat in CATEGORY_KEYWORDS.items():
        if kw in text:
            return cat
    return "productivity"


def fetch_oss(since):
    """Primary source: OSS Insight real trending."""
    period = OSS_PERIOD[since]
    url = f"https://api.ossinsight.io/v1/trends/repos/?period={period}&language=All"
    try:
        req = urllib.request.Request(url, headers={
            "Accept": "application/json",
            "User-Agent": "ai-skills-market-bot",
        })
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        rows = data.get("data", {}).get("rows", [])
        if not rows:
            print(f"  [warn] OSS Insight empty for since={since}", file=sys.stderr)
            return None
        out = []
        for r in rows:
            owner, _, name = r.get("repo_name", "/").partition("/")
            out.append({
                "name": name,
                "owner": owner,
                "description": r.get("description") or "",
                "language": r.get("primary_language") or "",
                "total_stars": int(r.get("stars") or 0),
                "period_stars": int(r.get("stars") or 0),
                "url": f"https://github.com/{r.get('repo_name', '')}",
                "category": guess_category(r),
            })
        print(f"  [ok] OSS Insight returned {len(out)} repos for since={since}")
        return out
    except (urllib.error.URLError, urllib.error.HTTPError, ValueError, TimeoutError) as e:
        print(f"  [warn] OSS Insight failed for since={since}: {e}", file=sys.stderr)
        return None


def fetch_search_fallback(since):
    """Fallback: GitHub Search API, recently pushed + high stars."""
    days = {"daily": 2, "weekly": 9, "monthly": 35}.get(since, 2)
    since_date = (datetime.now(timezone.utc) - timedelta(days=days)).strftime("%Y-%m-%d")
    url = (
        "https://api.github.com/search/repositories"
        f"?q=pushed:%3E{since_date}+stars:%3E200&sort=stars&order=desc&per_page=50"
    )
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "ai-skills-market-bot",
            "Accept": "application/vnd.github+json",
        })
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        items = data.get("items", [])
        if not items:
            return None
        out = []
        for it in items:
            out.append({
                "name": it.get("name", ""),
                "owner": it.get("owner", {}).get("login", ""),
                "description": it.get("description") or "",
                "language": it.get("language") or "",
                "total_stars": it.get("stargazers_count", 0),
                "period_stars": it.get("stargazers_count", 0),
                "url": it.get("html_url", ""),
                "category": guess_category(it),
            })
        print(f"  [info] used GitHub Search fallback for since={since}")
        return out
    except Exception as e:
        print(f"  [warn] Search fallback failed for since={since}: {e}", file=sys.stderr)
        return None


def fetch_period(since):
    """OSS Insight first, then GitHub Search fallback."""
    return fetch_oss(since) or fetch_search_fallback(since)


def write_json(period, repos):
    payload = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "since": period,
        "count": len(repos),
        "repos": repos,
    }
    path = os.path.join(DATA_DIR, f"{period}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"  [ok] wrote {period}.json ({len(repos)} repos)")


def main():
    os.makedirs(DATA_DIR, exist_ok=True)
    print(f"Refresh started at {datetime.now(timezone.utc).isoformat()}")

    weekly_repos = None
    for period in ["daily", "weekly", "monthly"]:
        repos = fetch_period(period)
        if repos is None:
            print(f"  [skip] {period}: keep existing file (all sources failed)")
            if period == "weekly":
                weekly_repos = None
            continue
        for i, r in enumerate(repos):
            r["rank"] = i + 1
            r["price"] = "free"
        write_json(period, repos)
        if period == "weekly":
            weekly_repos = repos

    # hot = weekly re-sorted by total_stars (top HOT_COUNT)
    if weekly_repos:
        hot = sorted(weekly_repos, key=lambda r: r["total_stars"], reverse=True)[:HOT_COUNT]
        for i, r in enumerate(hot):
            r["rank"] = i + 1
        write_json("hot", hot)
        print(f"  [ok] generated hot.json from weekly ({len(hot)} repos)")
    else:
        print("  [skip] hot: weekly unavailable, keep existing file")

    print("Refresh finished.")


if __name__ == "__main__":
    main()
