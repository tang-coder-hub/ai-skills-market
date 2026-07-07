#!/usr/bin/env python3
"""
GitHub Trending Scraper
Fetches daily/weekly/monthly trending repos, filters AI/ML/Agent related,
generates JSON data files for the frontend.
"""
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Installing dependencies...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests", "beautifulsoup4", "-q"])
    import requests
    from bs4 import BeautifulSoup

# AI/ML related keywords for filtering
AI_KEYWORDS = [
    "ai", "llm", "agent", "ml", "machine-learning", "deep-learning",
    "gpt", "claude", "codex", "cursor", "copilot", "prompt",
    "skill", "mcp", "model", "neural", "transformer", "rag",
    "embedding", "vector", "langchain", "langgraph", "crewai",
    "autogen", "screenshot-to-code", "v0", "shadcn", "caveman",
    "grill-me", "aider", "trending", "awesome-cursorrules",
    "whisper", "ollama", "voice", "vision", "ocr", "nlp",
    "coding", "code", "dev", "developer", "programming",
    "penetration-test", "security-scanner", "video-production",
    "content-studio", "data-whisperer", "prompt-optimizer",
    "workflow", "automation", "bot", "chatbot", "assistant",
    "generative", "diffusion", "stable-diffusion", "midjourney",
    "open-source", "self-hosted", "privacy", "local",
]

def is_ai_related(repo_name, description, language):
    """Check if a repo is AI/ML/Agent related."""
    text = f"{repo_name} {description} {language}".lower()
    for kw in AI_KEYWORDS:
        if kw in text:
            return True
    return False

def categorize(repo_name, description):
    """Categorize a repo based on its content."""
    text = f"{repo_name} {description}".lower()

    if any(w in text for w in ["security", "penetration", "vulnerability", "scanner"]):
        return "security"
    if any(w in text for w in ["design", "ui", "screenshot", "v0", "shadcn", "figma"]):
        return "design"
    if any(w in text for w in ["video", "content", "media", "studio", "production"]):
        return "marketing"
    if any(w in text for w in ["data", "analytics", "whisper", "database", "sql", "vector"]):
        return "data"
    if any(w in text for w in ["productivity", "tool", "cli", "terminal", "skill", "cursor"]):
        return "productivity"
    return "engineering"

def fetch_trending(since="daily"):
    """Fetch trending repos from GitHub."""
    url = f"https://github.com/trending?since={since}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml",
    }

    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    repos = []

    articles = soup.find_all("article", class_="Box-row")
    for article in articles:
        h2 = article.find("h2", class_="h3")
        if not h2:
            continue
        link = h2.find("a")
        if not link:
            continue

        # Extract owner/name from href
        href = link.get("href", "").strip()
        parts = href.lstrip("/").split("/")
        if len(parts) < 2:
            continue
        owner, name = parts[0], parts[1]

        # Description
        desc_p = article.find("p", class_="col-9")
        description = desc_p.get_text(strip=True) if desc_p else ""

        # Language
        lang_span = article.find("span", itemprop="programmingLanguage")
        language = lang_span.get_text(strip=True) if lang_span else ""

        # Stars (total)
        stars_elem = article.find("a", href=re.compile(rf"/{owner}/{name}/stargazers"))
        total_stars = 0
        if stars_elem:
            stars_text = stars_elem.get_text(strip=True).replace(",", "")
            try:
                total_stars = int(stars_text)
            except ValueError:
                pass

        # Stars today/this period
        period_stars = 0
        for span in article.find_all("span", class_="d-inline-block"):
            text = span.get_text(strip=True)
            match = re.search(r"([\d,]+)\s+stars?\s+(today|this week|this month)", text)
            if match:
                period_stars = int(match.group(1).replace(",", ""))
                break

        if not is_ai_related(name, description, language):
            continue

        repos.append({
            "name": name,
            "owner": owner,
            "description": description[:200],
            "language": language,
            "total_stars": total_stars,
            "period_stars": period_stars,
            "url": f"https://github.com/{owner}/{name}",
            "category": categorize(name, description),
            "pushed_at": None,
            "license": None,
            "topics": [],
            "open_issues": 0,
            "forks": 0,
            "homepage": None,
        })

    return repos


def enrich_with_github_api(repos, delay=0.8):
    """Enrich repo data by querying GitHub REST API for each unique repo."""
    seen = set()
    enriched = {}

    print("  Enriching with GitHub API...")
    for repo in repos:
        key = f"{repo['owner']}/{repo['name']}"
        if key in seen:
            continue
        seen.add(key)

        url = f"https://api.github.com/repos/{repo['owner']}/{repo['name']}"
        headers = {
            "Accept": "application/vnd.github+json",
            "User-Agent": "Marvis-AI-Skills-Market",
        }
        try:
            resp = requests.get(url, headers=headers, timeout=15)
            resp.raise_for_status()
            data = resp.json()
            enriched[key] = {
                "pushed_at": data.get("pushed_at"),
                "license": data.get("license", {}).get("spdx_id") if data.get("license") else None,
                "topics": data.get("topics", []),
                "open_issues": data.get("open_issues_count", 0),
                "forks": data.get("forks_count", 0),
                "homepage": data.get("homepage"),
            }
            print(f"    {key} ✓")
        except Exception as e:
            print(f"    {key} ✗ {e}")
            enriched[key] = {}
        time.sleep(delay)

    return enriched


def main():
    data_dir = Path(__file__).parent.parent / "data"
    data_dir.mkdir(exist_ok=True)

    configs = {
        "daily": 15,
        "weekly": 30,
        "monthly": 10,
    }

    # Collect all repos first for dedup enrichment
    all_repos = []
    for since, limit in configs.items():
        print(f"Fetching {since} trending...")
        try:
            repos = fetch_trending(since)
            all_repos.extend(repos[:limit])
        except Exception as e:
            print(f"  ✗ Failed fetching {since}: {e}")

    # Enrich unique repos with GitHub API data
    enriched = enrich_with_github_api(all_repos)

    # Build and write per-category JSON
    offset = 0
    for since, limit in configs.items():
        print(f"Writing {since}.json...")
        try:
            batch = all_repos[offset:offset + limit]
            ranked = []
            for i, repo in enumerate(batch):
                repo["rank"] = i + 1
                key = f"{repo['owner']}/{repo['name']}"
                if key in enriched:
                    repo.update({k: v for k, v in enriched[key].items() if v})
                ranked.append(repo)

            output = {
                "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                "since": since,
                "count": len(ranked),
                "repos": ranked,
            }

            out_path = data_dir / f"{since}.json"
            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(output, f, ensure_ascii=False, indent=2)
            print(f"  → {out_path} ({len(ranked)} repos)")
            offset += limit
        except Exception as e:
            print(f"  ✗ Failed writing {since}: {e}")
            offset += limit

    print("Done.")

if __name__ == "__main__":
    main()
