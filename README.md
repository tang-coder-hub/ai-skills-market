# AI Skills Market ⚡

> Discover, download, and share AI Agent skills packages. The open marketplace for AI agent capabilities.

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Deploy](https://github.com/tang-coder-hub/ai-skills-market/actions/workflows/deploy.yml/badge.svg)](https://github.com/tang-coder-hub/ai-skills-market/actions/workflows/deploy.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-7c5cfc.svg)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

---

**AI Skills Market** 是一个开源的 AI Agent 技能市场，让开发者浏览、搜索、下载和提交 AI Agent 技能包。所有技能数据来源于 GitHub Trending 中的真实热门项目，覆盖工程开发、安全测试、设计创意、营销运营、数据分析、效率工具等多个领域。

**AI Skills Market** is an open-source marketplace for AI Agent skills. Developers can browse, search, download, and submit AI Agent skill packages. All skill data is sourced from real trending projects on GitHub, covering engineering, security, design, marketing, data analysis, productivity, and more.

---

## 🏪 Official Site & Merchant Notice | 官方站点与商家声明

- **唯一官方站点**：`https://tang-coder-hub.github.io/ai-skills-market/`
- **唯一官方仓库**：`https://github.com/tang-coder-hub/ai-skills-market`
- 本项目由 **tang-coder-hub** 独立运营，**商家仅此一家**，站内所有收款码（微信 / 支付宝 / PayPal）均归原作者所有。
- 任何人可免费访问、浏览、下载站内技能，但**不得**将本项目代码或页面改头换面后冒充官方、替换收款码进行商业收款。
- 欢迎通过站内「意见反馈」提交建议，但技能上架与商家身份由原作者独家管理。

---

## ✨ Features | 功能特性

- **16+ Curated Skills** — Real, trending AI agent skills from GitHub with verified usage guides
- **Category Filtering** — Browse by Engineering, Security, Design, Marketing, Data, and Productivity
- **Full-Text Search** — Instantly search by skill name, description, or author
- **Dark & Light Mode** — Toggle themes with localStorage persistence (dark by default)
- **Glassmorphism UI** — Modern frosted-glass card design with purple accent gradient
- **Responsive Layout** — Mobile-first design, works perfectly on all screen sizes
- **PWA Support** — Install as a standalone app, offline-ready with service worker caching
- **Detail Modal** — Click any card to view full description, version, platforms, and usage guide
- **Download Tracking** — Built-in download counter with real-time stats update
- **Zero Dependencies** — Pure HTML/CSS/JS, no frameworks, no CDN, no build step
- **GitHub Actions CI/CD** — Auto-deploy to GitHub Pages on push to main

---

## 🛠 Tech Stack | 技术栈

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla HTML5, CSS3 (Custom Properties), JavaScript ES6+ |
| **Styling** | CSS Variables, Glassmorphism, CSS Grid, Flexbox |
| **PWA** | Service Worker (Cache-First), Web App Manifest |
| **Hosting** | GitHub Pages (free static hosting) |
| **CI/CD** | GitHub Actions (auto-deploy on push) |
| **Dependencies** | **Zero** — no npm, no CDN, no frameworks |

---

## 🚀 Quick Start | 快速开始

### Option 1: Open Directly

```bash
# Clone the repo
git clone https://github.com/tang-coder-hub/ai-skills-market.git
cd ai-skills-market

# Open index.html in any browser — that's it!
open index.html   # macOS
start index.html  # Windows
xdg-open index.html  # Linux
```

### Option 2: Local Server (for PWA testing)

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# Then open http://localhost:8080
```

### Option 3: Deploy to GitHub Pages

1. Fork this repository
2. Go to **Settings > Pages**
3. Set source to **GitHub Actions**
4. Push to `main` — deployment happens automatically

---

## 📁 Project Structure | 项目结构

```
ai-skills-market/
├── index.html              # Main PWA single-page application
├── style.css               # Complete stylesheet (dark/light themes)
├── app.js                  # All application logic and skills data
├── manifest.json           # PWA manifest (theme color #7c5cfc)
├── sw.js                   # Service Worker (cache-first strategy)
├── README.md               # Project documentation (you are here)
├── LICENSE                 # MIT License
├── .gitignore              # Standard gitignore
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions auto-deploy workflow
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Accent Color** | `#7c5cfc` (Purple) |
| **Accent Gradient** | `#7c5cfc → #a78bfa → #6366f1` |
| **Dark BG** | `#0a0a0f` (Primary), `#12121a` (Secondary) |
| **Light BG** | `#f5f5fa` (Primary), `#fafafe` (Secondary) |
| **Card Style** | Glassmorphism (`backdrop-filter: blur(20px)`) |
| **Font Stack** | System fonts (`-apple-system, Segoe UI, Noto Sans SC...`) |
| **Border Radius** | `8px` (sm), `12px` (md), `16px` (lg), `24px` (xl) |

---

## 📦 Included Skills | 内置技能

The marketplace includes 16+ skills sourced from real GitHub Trending projects:

| # | Skill | Category | Downloads | Price |
|---|-------|----------|-----------|-------|
| 1 | Caveman — Ultra-minimalist agent framework | Engineering | 12.4K | Free |
| 2 | Grill-Me — Adversarial requirement clarification | Security | 8.9K | Free |
| 3 | Aider TDD Suite — Test-driven development for AI | Engineering | 18.7K | Free |
| 4 | Anthropic Security Evals — Agent security red-teaming | Security | 6.5K | Free |
| 5 | Screenshot to Code Pro — Design → Production code | Design | 32K | Free |
| 6 | shadcn/ui Taste Pack — Design taste enforcement | Design | 28K | Free |
| 7 | AutoGen Studio Skills — Multi-agent orchestration | Engineering | 15.6K | Free |
| 8 | CrewAI Role Engine — Role-based AI collaboration | Engineering | 11K | Free |
| 9 | LangGraph StateFlow — Stateful agent workflows | Data | 9.4K | Free |
| 10 | Awesome Cursor Rules — Community-vetted .cursorrules | Productivity | 22K | Free |
| 11 | MCP Universal Gateway — Connect agents to everything | Productivity | 19.5K | Free |
| 12 | V0 Design Generator — Vercel design-to-production | Design | 25K | $9 |
| 13 | Data Whisperer — Natural language data analysis | Data | 7.7K | Free |
| 14 | Prompt Optimizer Pro — A/B test prompts at scale | Marketing | 5.2K | $19 |
| 15 | GitHub Action Agent — AI-powered CI/CD generator | Productivity | 14K | Free |
| 16 | Content Studio AI — End-to-end content marketing | Marketing | 6.1K | $29 |

---

## 🤝 Contributing Skills | 如何贡献技能

We welcome skill submissions from the community! To add your skill:

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/ai-skills-market.git
cd ai-skills-market
```

### 2. Add Your Skill to `app.js`

Open `app.js` and add a new object to the `skillsData` array:

```javascript
{
  id: 17,  // increment from last
  name: "Your Skill Name",
  author: "your-github-username",
  author_avatar: "YS",  // 2-letter abbreviation
  description: "One-sentence elevator pitch (max 150 chars)",
  long_description: "Full description explaining what it does, why it's useful, and who it's for. Include real use cases.",
  category: "engineering",  // engineering | security | design | marketing | data | productivity
  platforms: ["Claude Code", "Cursor"],  // supported platforms
  downloads: 0,  // start at 0
  stars: 0,
  price: "free",  // "free" or "$X"
  version: "1.0.0",
  usage_guide: "# Install\n$ npm install your-skill\n\n# Use\n$ your-skill --help"
}
```

### 3. Submit a PR

1. Commit your changes: `git commit -m "Add skill: Your Skill Name"`
2. Push to your fork: `git push origin main`
3. Open a Pull Request against the main repository

### Skill Guidelines

- Skills must be **real, functional projects** (preferably open-source)
- Descriptions must be **accurate and verifiable**
- No duplicate skills — check the existing list first
- **Respect licenses** — only submit skills you have rights to

---

## 💰 Monetization Model | 变现模式

AI Skills Market 采用三层变现模式：

### 1. Free Skills → Traffic & Community (免费技能引流)
- 90%+ 技能免费提供，降低使用门槛
- 通过 SEO 和社区传播获取大量开发者流量
- 建立品牌认知和用户信任

### 2. Premium Skills → Revenue Share (精选付费技能分成)
- 高质量、企业级技能可设置付费价格（$9-$99）
- 平台与创作者按 70/30 分成（创作者 70%）
- 平台负责分发、支付、托管

### 3. Custom Development → Service Revenue (定制开发服务)
- 企业用户可提交定制技能开发需求
- 平台匹配认证开发者完成交付
- 按项目金额收取 15% 服务费

---

## 🌐 Deploy to GitHub Pages

This project is configured for one-click deployment to GitHub Pages via GitHub Actions:

1. **Fork** this repository
2. Go to **Settings → Pages**
3. Under "Build and deployment", select **GitHub Actions**
4. Push to `main` branch → automatic deployment
5. Your site will be live at `https://YOUR_USERNAME.github.io/ai-skills-market/`

The workflow file is at `.github/workflows/deploy.yml` and requires no modification.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Skills data inspired by real projects on [GitHub Trending](https://github.com/trending)
- Design inspired by modern developer tools (Vercel, shadcn/ui, Linear)
- Built for the AI Agent community — by developers, for developers

---

<p align="center">
  <sub>Made with ❤️ by tang-coder-hub | <a href="https://github.com/tang-coder-hub/ai-skills-market">Star us on GitHub</a></sub>
</p>
