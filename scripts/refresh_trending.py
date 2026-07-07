#!/usr/bin/env python3
"""
refresh_trending.py
Pull GitHub Trending for daily / weekly / monthly and generate hot (weekly
re-sorted by total stars). Writes data/{daily,weekly,monthly,hot}.json.

On fetch failure for a given period, the existing file is left untouched
(graceful degradation). Designed to run from GitHub Actions on a cron schedule.
"""

import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
HOT_COUNT = 25

# Multiple public GitHub Trending mirrors for resilience.
TRENDING_SOURCES = [
    "https://github-trending-api.de.a9sapp.eu/repositories?language=&since={since}",
    "https://api.gitterapp.com/repositories?language=&since={since}",
    "https://github-trending-api.now.sh/repositories?language=&since={since}",
]

PERIOD_MAP = {
    "daily": "daily",
    "weekly": "weekly",
    "monthly": "monthly",
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


def fetch_period_api_fallback(since):
    """Fallback: GitHub Search API, recent repos sorted by stars.
    Not true 'trending', but guarantees data when mirrors are down."""
    days = {"daily": 1, "weekly": 7, "monthly": 30}.get(since, 1)
    from datetime import timedelta
    since_date = (datetime.now(timezone.utc) - timedelta(days=days)).strftime("%Y-%m-%d")
    url = (
        "https://api.github.com/search/repositories"
        f"?q=created:%3E{since_date}&sort=stars&order=desc&per_page=50"
    )
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "ai-skills-market-bot",
            "Accept": "application/vnd.github+json",
        })
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        items = data.get("items", [])
        if not items:
            return None
        mapped = []
        for it in items:
            mapped.append({
                "name": it.get("name", ""),
                "author": it.get("owner", {}).get("login", ""),
                "description": it.get("description") or "",
                "language": it.get("language") or "",
                "stars": it.get("stargazers_count", 0),
                "currentPeriodStars": 0,
                "url": it.get("html_url", ""),
            })
        print(f"  [info] used GitHub API fallback for since={since}")
        return mapped
    except Exception as e:
        print(f"  [warn] API fallback failed for since={since}: {e}", file=sys.stderr)
        return None


def fetch_period(since):
    """Try each mirror source, then GitHub API fallback."""
    last_err = None
    for tmpl in TRENDING_SOURCES:
        url = tmpl.format(since=since)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ai-skills-market-bot"})
            with urllib.request.urlopen(req, timeout=20) as resp:
                raw = resp.read().decode("utf-8")
            data = json.loads(raw)
            if isinstance(data, list) and data:
                return data
        except (urllib.error.URLError, urllib.error.HTTPError, ValueError, TimeoutError) as e:
            last_err = e
            continue
    if last_err:
        print(f"  [warn] all mirrors failed for since={since}: {last_err}", file=sys.stderr)
    # last resort: GitHub Search API
    return fetch_period_api_fallback(since)


def normalize(repos, since):
    out = []
    for i, r in enumerate(repos):
        desc = r.get("description") or ""
        out.append({
            "name": r.get("name", ""),
            "owner": r.get("author") or r.get("owner", ""),
            "description": desc,
            "language": r.get("language") or "",
            "total_stars": int(r.get("stars", 0) or r.get("total_stars", 0) or 0),
            "period_stars": int(r.get("currentPeriodStars", 0) or r.get("period_stars", 0) or 0),
            "url": r.get("url") or f"https://github.com/{r.get('author', '')}/{r.get('name', '')}",
            "category": guess_category(r),
            "rank": i + 1,
            "price": "free",
        })
    return out


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
    for period, since in PERIOD_MAP.items():
        raw = fetch_period(since)
        if raw is None:
            print(f"  [skip] {period}: keep existing file (fetch failed)")
            if period == "weekly":
                weekly_repos = None
            continue
        repos = normalize(raw, since)
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
