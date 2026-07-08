/* ============================================
   AI Skills Market — i18n 国际化
   ============================================ */

const i18n = {
  zh: {
    // Nav
    nav_search: '搜索技能...（如：编码、安全、设计）',
    btn_submit: '提交技能',
    btn_theme_dark: '切换亮色主题',
    btn_theme_light: '切换暗色主题',
    btn_lang: 'EN',

    // Hero
    hero_badge: '开源技能市场',
    hero_title: 'AI 技能',
    hero_title_gradient: '市场',
    hero_subtitle: '发现、下载、分享 AI Agent 技能包。为 Claude Code、Cursor、Codex、Gemini CLI 注入社区打磨的强大能力。',
    hero_stat_skills: '技能数',
    hero_stat_downloads: '新增星标',
    hero_stat_creators: '创作者',
    hero_btn_browse: '浏览技能',
    hero_btn_github: 'GitHub 仓库',

    // Trending Tabs
    tab_daily: '日榜',
    tab_weekly: '周榜',
    tab_monthly: '月榜',
    tab_updated_at: '数据来自 GitHub Trending · 更新于',
    stars_daily: '今日新增',
    stars_weekly: '本周新增',
    stars_monthly: '本月新增',

    // Filter
    filter_all: '全部',
    filter_engineering: '工程开发',
    filter_security: '安全测试',
    filter_design: '设计与创意',
    filter_marketing: '营销运营',
    filter_data: '数据分析',
    filter_productivity: '效率工具',

    // Skills section
    skills_title: '热门技能',
    skills_subtitle: '数据来自 GitHub Trending 真实开源项目',
    no_results_title: '没有找到匹配的技能',
    no_results_desc: '试试其他关键词或分类',

    // Card
    tag_free: '免费',
    card_downloads: '下载',
    card_stars: '星标',
    no_description: '暂无描述',

    // Modal
    modal_description: '简介',
    modal_details: '详情',
    modal_category: '分类',
    modal_version: '版本',
    modal_downloads: '下载量',
    modal_price: '价格',
    modal_compatible: '兼容平台',
    modal_usage: '使用指南',
    modal_rank: '排名',
    modal_language: '语言',
    modal_stars: '星标数',
    modal_btn_download: '查看仓库',
    modal_btn_github: '在 GitHub 查看',
    modal_btn_purchase: '购买',
    modal_downloaded: '已下载',
    // New detail fields
    modal_license: '许可证',
    modal_topics: '话题标签',
    modal_updated: '最近更新',
    modal_forks: 'Fork数',
    modal_issues: '待解决问题',
    modal_homepage: '项目主页',
    modal_clone: '克隆命令',
    card_copied: '已复制！',
    card_copy: '复制',
    card_updated: '更新于',
    card_no_license: '无许可证',
    // Favorites & Compare & Sort & Language Filter
    tab_favorites: '收藏',
    tab_community: '社区提交',
    submit_sending: '提交中...',
    submit_error: '提交失败，请稍后再试',
    fav_empty: '还没有收藏任何项目，浏览榜单时点击星标即可收藏',
    fav_add: '收藏',
    fav_remove: '取消收藏',
    compare_selected: '已选',
    compare_items: '个项目',
    compare_btn: '开始对比',
    compare_clear: '清空',
    compare_title: '项目对比',
    compare_add: '添加到对比',
    compare_remove: '移出对比',
    compare_max: '最多对比3个项目',
    filter_language_all: '全部语言',
    filter_language_title: '按语言筛选',
    sort_title: '排序方式',
    sort_rank: '按排名',
    sort_stars: '按星标数',
    sort_stars_period: '按周期新增',
    sort_updated: '按更新时间',
    sort_issues: '按活跃Issue数',
    sort_name: '按名称',
    modal_readme: 'README 预览',
    modal_readme_loading: '加载中...',
    modal_readme_error: '无法加载 README',
    modal_star_history: '星标增长趋势',
    starhistory_fallback: '在 Star History 查看 →',
    // Modal V2 tabs
    modal_tab_overview: '概览',
    modal_tab_skills: 'Skills',
    modal_tab_install: '安装',
    // Modal V2 stats
    modal_stats_stars: '星标',
    modal_stats_forks: 'Fork',
    modal_stats_issues: 'Issue',
    modal_stats_category: '分类',
    modal_stats_updated: '更新',
    // Modal V2 skills
    modal_skills_loading: '正在扫描技能文件...',
    modal_skills_empty: '该仓库未找到技能定义文件。',
    modal_skills_searched: '已扫描目录：',
    modal_skills_error: '无法获取仓库文件树。',
    modal_skills_rate_limit: 'GitHub API 频率限制可能已超，请稍后重试。',
    // Modal V2 install
    modal_install_loading: '正在检测安装命令...',
    // Modal V2 related
    modal_related_title: '相关仓库',
    modal_related_empty: '未找到相关仓库。',
    modal_related_error: '无法加载相关仓库。',
    compare_field_name: '名称',
    compare_field_owner: '作者',
    compare_field_language: '语言',
    compare_field_category: '分类',
    compare_field_stars: '星标数',
    compare_field_period_stars: '周期新增',
    compare_field_forks: 'Fork数',
    compare_field_issues: '活跃Issue',
    compare_field_license: '许可证',
    compare_field_updated: '最近更新',
    compare_field_topics: '话题标签',



    // Category labels
    cat_engineering: '工程开发',
    cat_security: '安全测试',
    cat_design: '设计与创意',
    cat_marketing: '营销运营',
    cat_data: '数据分析',
    cat_productivity: '效率工具',

    // Footer
    footer_product: '产品',
    footer_resources: '资源',
    footer_community: '社区',
    footer_browse: '浏览技能',
    footer_submit: '提交技能',
    footer_creators: '顶尖创作者',
    footer_changelog: '更新日志',
    footer_docs: '文档',
    footer_api: 'API 参考',
    footer_spec: '技能规范',
    footer_blog: '博客',
    footer_github: 'GitHub',
    footer_discord: 'Discord',
    footer_twitter: 'Twitter',
    footer_contributing: '参与贡献',
    footer_desc: 'AI Agent 技能的开放市场。社区驱动，MIT 协议，始终免费使用。',
    footer_bottom: '© 2026 AI Skills Market。基于 MIT 许可证发布。由开源社区热情打造。',

    // Submit alert
    submit_alert: '技能提交功能即将上线！请查看 GitHub 仓库中的贡献指南。',

    // Skills translations
    skills: {
      caveman: {
        description: '极简 AI Agent 框架。剥离一切复杂性，让 Agent 专注于核心——用原始直接的方式完成任务。',
        long_description: 'Caveman 是一个观点鲜明、毫无修饰的 AI Agent 构建框架。它拥抱"原始人"式的极简哲学——没有臃肿的抽象，没有冗余的配置，只有纯粹的 LLM 交互循环。适合想要快速交付 Agent 而不想与框架作斗争的开发者。灵感源自"最好的代码是不需要写的代码"这一理念。',
        usage_guide: '# 克隆并安装\n$ git clone https://github.com/dreadnode/caveman\n$ pip install caveman\n\n# 定义你的 Agent\nfrom caveman import Agent\nagent = Agent(\n    name="代码助手",\n    instruction="你是一个有用的编程助手。",\n    tools=["读文件", "写文件", "执行命令"]\n)\nagent.run()'
      },
      grill_me: {
        description: '在执行前用澄清问题来"拷问"你的 AI Agent——防止幻觉并确保万无一失的需求。',
        long_description: 'Grill-Me 实现了"对抗性澄清"模式。在执行任何任务之前，Agent 会积极地追问你的需求、边界条件和假设。这能大幅减少 AI 在生产系统中的幻觉。灵感来自 Anthropic 的安全研究和一个原则——"困惑的 AI 应该问，而不是猜"。被全球安全关键团队广泛使用。',
        usage_guide: '# 安装\n$ npm install -g grill-me-cli\n\n# 在拷问模式下运行\n$ grill-me "构建用户认证系统"\n\n# Agent 会问：\n# - 用什么认证方式？(OAuth/JWT/Session)\n# - 限流策略？\n# - 密码哈希算法？\n# - Session 过期策略？\n# ...在写代码之前全部确认清楚'
      },
      tdd: {
        description: '面向 Aider 的测试驱动开发技能包。强制 AI 编码 Agent 先写失败测试，再让测试通过——零幻觉代码。',
        long_description: 'Aider TDD Suite 是一套精心策划的系统提示词、基准测试和工作流脚本，用于在 AI 编码 Agent 中强制执行严格的测试驱动开发。基于 Aider 强大的代码编辑能力，这个技能包确保你的 AI 始终遵循「红-绿-重构」循环。包含 50+ 预置测试模板，覆盖 React、Python、Rust 和 Go 项目。2025 年"氛围编程"质量控制工具排行榜第一名。',
        usage_guide: '# 安装 aider\n$ pip install aider-chat\n\n# 加载 TDD 技能\n$ aider --skill tdd-suite\n\n# 在 TDD 强制执行下开始编码\n> 写一个验证邮箱地址的函数\n\n# Aider 会：\n# 1. 创建 test_email_validator.py 并写入失败测试\n# 2. 实现验证器\n# 3. 运行测试并迭代直到全部通过'
      },
      security: {
        description: 'AI Agent 综合安全评估套件。测试提示注入、数据泄露和社会工程攻击的防护能力。',
        long_description: '这个技能包提供了基于 METR（模型评估与威胁研究）方法论的完整红队评估框架。包含 200+ 测试场景，涵盖提示注入、工具滥用、数据泄露尝试和社会工程攻击向量。被领先的 AI 安全实验室和企业安全团队采用。对于任何部署可访问敏感数据或系统的生产环境 AI Agent 团队来说，这是必不可少的工具。',
        usage_guide: '# 克隆评估套件\n$ git clone https://github.com/metr/agent-security-evals\n\n# 对你的 Agent 运行安全审计\n$ python run_evals.py --agent ./my_agent.py --level thorough\n\n# 示例输出：\n# [通过] 提示注入（直接）        12/12\n# [通过] 工具滥用（文件系统）     8/8\n# [失败] 数据泄露（隐蔽）         3/5\n# [警告] 社会工程抵抗力          7/10'
      },
      screenshot: {
        description: '将 UI 截图、Figma 设计和原型图转换为生产就绪的 React/Tailwind/Vue 代码，像素级精准还原。',
        long_description: '市面上最先进的设计转代码技能包。输入任何 UI 截图或 Figma 设计，生成带有 Tailwind CSS 样式、响应式布局和无障碍支持的生产就绪前端代码。支持 React、Vue、Svelte 和原生 HTML/CSS 输出。新增"设计审查"模式，可根据现代设计原则对你的现有 UI 代码提出改进建议。全球 50,000+ 开发者信赖之选。',
        usage_guide: '# 安装\n$ npm install -g screenshot-to-code\n\n# 转换截图\n$ stc --input 设计稿.png --framework react --styling tailwind\n\n# 输出：\n# 已生成：src/components/HeroSection.tsx\n# 已生成：src/components/FeatureGrid.tsx\n# 已生成：src/components/CTASection.tsx\n# 预览：http://localhost:3000/preview'
      },
      shadcn: {
        description: 'shadcn/ui 官方设计品味技能包。确保所有 AI 生成的 UI 遵循 shadcn/ui 美学——精致、无障碍、美观。',
        long_description: '这是 shadcn/ui 生态系统的官方品味执行技能包。它微调 AI 编码 Agent，使其生成的 UI 代码遵循 shadcn 设计哲学：极简、实用、默认美观。包含组件模板、色彩调色板预设、排版比例尺和无障碍设计指南。加载后，你的 AI Agent 将不再生成丑陋、不可访问或非标准的 UI 组件。2025 年 AI 生成前端代码的黄金标准。',
        usage_guide: '# 添加到你的项目\n$ npx shadcn-ui@latest init\n\n# 安装品味技能\n$ npx shadcn-ui@latest add skill-taste-pack\n\n# 在 .cursorrules 或 claude.md 中配置：\n# - 独占使用 shadcn/ui 组件\n# - 遵循 8pt 间距系统\n# - 使用 Inter 字体 + 系统后备字体\n# - 保持 WCAG 2.1 AA 对比度'
      },
      autogen: {
        description: '微软多 Agent 编排框架。构建由专业 AI Agent 组成的团队，让它们协作、辩论并交付复杂任务。',
        long_description: 'AutoGen Studio 是微软的旗舰多 Agent 框架，现已打包为可下载的技能集，适用于主流 AI 编码平台。定义专业 Agent 角色（架构师、开发者、审查者、测试者），让它们在你的代码库上自主协作。功能包括 Agent 间辩论机制用于设计决策、自动化代码审查链、以及并行任务分解。市面上最强大的企业级多 Agent 系统，被财富 500 强工程团队广泛使用。',
        usage_guide: '# 安装\n$ pip install autogen-studio\n\n# 定义你的团队\nfrom autogen_skills import AgentTeam\nteam = AgentTeam()\nteam.add_role("架构师", model="claude-sonnet-4")\nteam.add_role("开发者", model="claude-sonnet-4")\nteam.add_role("审查者", model="claude-sonnet-4")\n\n# 开始协作\nteam.build("创建用户管理的 REST API")'
      },
      crewai: {
        description: '生产级 AI 角色扮演引擎。为 Agent 分配详细人设——高级开发、QA 主管、DevOps——实现逼真的团队模拟。',
        long_description: "CrewAI 的角色引擎将基于角色的 AI 协作能力带入你的编码环境。定义具有特定专业领域、沟通风格和决策模式的详细 Agent 人设。Agent 自主规划、委派、执行和验证任务，同时保持其分配的角色。非常适合需要考虑多种视角（安全、性能、UX）的复杂项目。已集成 LangChain 和主流 LLM 服务商。",
        usage_guide: '# 安装\n$ pip install crewai\n\n# 定义你的团队\nfrom crewai import Agent, Task, Crew\nsenior_dev = Agent(\n    role="高级 Python 开发者",\n    goal="编写干净、经过测试、生产就绪的代码",\n    backstory="10 年分布式系统经验"\n)\nqa_lead = Agent(\n    role="QA 工程主管",\n    goal="确保零 bug 进入生产环境",\n    backstory="自动化测试和边界情况分析专家"\n)'
      },
      langgraph: {
        description: '构建有状态、人机协同的 AI Agent 工作流。基于图执行，支持检查点、分支和回滚——经过生产验证。',
        long_description: 'LangGraph StateFlow 是构建复杂、有状态 AI Agent 工作流的权威技能包。它引入了基于图的执行模型，每个节点是一个 AI 驱动的步骤，边定义了控制流。功能包括自动检查点、人工审批门、并行分支执行和完整回滚能力。被 Stripe、Elastic 和数千家初创公司用于关键任务的 Agent 流水线。全新的"流程设计器"可视化编辑器让构建复杂的 Agent 图变得直观。',
        usage_guide: '# 安装\n$ pip install langgraph\n\n# 定义有状态工作流\nfrom langgraph.graph import StateGraph\ngraph = StateGraph(AgentState)\ngraph.add_node("分析", analyze_requirements)\ngraph.add_node("实现", write_code)\ngraph.add_node("审查", human_review)\ngraph.add_edge("分析", "实现")\ngraph.add_edge("实现", "审查")\ngraph.add_conditional_edges("审查", decide_next)'
      },
      cursor_rules: {
        description: '最全面的 .cursorrules 实战配置库。用社区验证的规则集消除 AI 幻觉，覆盖所有技术栈。',
        long_description: 'Awesome Cursor Rules 是 .cursorrules 配置的权威仓库——这是 AI 驱动开发中最重要的一类文件。包含 500+ 个社区验证的规则集，覆盖 React、Next.js、Python、Rust、Go、DevOps 等。每个规则集都针对常见的 AI 错误做了优化：错误导入、幻觉 API、过时模式和安全疏忽。定期根据最新的 Claude 和 GPT 模型测试更新。使用 AI 编码助手的团队必备工具。',
        usage_guide: '# 在以下地址浏览规则：\n# https://github.com/PatrickJS/awesome-cursorrules\n\n# 复制相关规则到项目根目录\n$ cp rules/react-nextjs-tailwind.cursorrules .cursorrules\n\n# 示例规则内容：\n# - 需要时始终使用 "use client" 指令\n# - 默认优先使用服务端组件\n# - 使用 Next.js App Router 模式\n# - 从 "@/components" 导入而非相对路径\n# - 遵循 React 19 最佳实践'
      },
      mcp: {
        description: '连接 AI Agent 到一切——数据库、API、文件系统、Jira、Slack、GitHub。通用 MCP 服务器技能包。',
        long_description: 'MCP Universal Gateway 是市面上最全面的 Model Context Protocol 服务器集合。只需一次配置，你的 AI Agent 就能获得安全、受控的访问权限，连接到 PostgreSQL 数据库、REST API、AWS 服务、GitHub 仓库、Jira 项目、Slack 频道和本地文件系统。基于 Anthropic 的 MCP 标准构建，确保所有连接遵循最小权限安全原则。包含每次 Agent 操作的审计日志。2025 年 AI Agent 生态的基础设施支柱。',
        usage_guide: '# 在 claude_desktop_config.json 中配置 MCP 服务器\n{\n  "mcpServers": {\n    "postgres": { "command": "npx", "args": ["@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"] },\n    "github": { "command": "npx", "args": ["@modelcontextprotocol/server-github"] },\n    "filesystem": { "command": "npx", "args": ["@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"] }\n  }\n}\n\n# 然后对 Claude Code 说：\n> 查询用户表并为不活跃用户创建 GitHub Issue'
      },
      v0: {
        description: 'Vercel 的 v0 设计到生产流水线。将文字描述转化为 shadcn/ui + Tailwind 组件，直接部署到 Next.js 应用。',
        long_description: '官方 V0 Design Generator 技能将 Vercel 生产级 UI 生成能力带到你的本地编码环境和 AI Agent 中。用自然语言描述你想要的，V0 就能生成完整、生产就绪的 React 组件，包含 shadcn/ui、Tailwind CSS、响应式布局和暗色模式支持。与基础代码生成器不同，V0 理解设计系统、无障碍和性能——它生成的代码你会自豪地合并。2025 年版新增实时协作和 Figma 导入支持。',
        usage_guide: '# 安装 V0 CLI\n$ npm install -g @vercel/v0\n\n# 从描述生成组件\n$ v0 generate "一个包含 3 个套餐选项、FAQ 折叠面板和 CTA 横幅的定价页面"\n\n# 在项目中的输出：\n# src/components/pricing/\n#   PricingTiers.tsx\n#   PricingFAQ.tsx\n#   PricingCTA.tsx\n# 完整响应式，暗色模式就绪，WCAG AA 合规'
      },
      data_whisperer: {
        description: '自然语言数据分析流水线。用日常英语查询 CSV、数据库和 API——即时获得图表、洞察和报告。',
        long_description: 'Data Whisperer 彻底改变了开发者和分析师与数据交互的方式。不需要写复杂的 SQL 或 pandas 代码，用自然语言描述你想要什么。Agent 处理查询生成、数据清洗、统计分析和可视化——同时解释其推理过程。支持 CSV、JSON、SQL 数据库（PostgreSQL、MySQL、SQLite）和 REST API 端点。使用 matplotlib 和 plotly 生成发表级质量的图表。2025 年从提问到洞察的最快途径。',
        usage_guide: '# 安装\n$ pip install data-whisperer\n\n# 用自然语言查询\n$ dw "分析 sales.csv 并展示月度收入趋势及同比增长率"\n\n# 输出：\n# [图表] 月度收入趋势（2024-2025）\n# [表格] 各月同比增长率\n# [洞察] 2025 年 12 月增长 34%，受 Q4 促销活动推动\n# [导出] results/analysis_2025.pdf'
      },
      prompt_optimizer: {
        description: '大规模 A/B 测试和优化 AI Agent 提示词。自动生成提示词变体并针对评估套件衡量性能。',
        long_description: 'Prompt Optimizer Pro 是大规模提示工程的企业级工具链。不用再手动调整系统提示词，这个技能会自动生成、测试并对你的评估套件进行提示词变体排名。功能包括多模型基准测试（Claude、GPT、Gemini）、成本-性能帕累托前沿分析，以及自动回归测试来捕捉提示词退化。被通过优化提示词每月节省 $50K+ Token 成本的公司广泛使用。严肃的 AI 工程团队必备技能。',
        usage_guide: '# 安装\n$ npm install -g prompt-optimizer\n\n# A/B 测试你的提示词\n$ po test --prompt ./system-prompt.txt --evals ./eval-suite/\n\n# 结果：\n# 变体 A（原始）：  准确率 87.3% | 成本 $0.042/次\n# 变体 B（优化后）：准确率 92.1% | 成本 $0.028/次\n# 变体 C（激进版）：准确率 89.5% | 成本 $0.018/次\n# 胜者：变体 B —— 5% 准确率提升，33% 成本降低'
      },
      github_action: {
        description: 'AI 驱动的 CI/CD 流水线生成器。用英语描述工作流，即可获得内嵌最佳实践的完整 GitHub Actions YAML。',
        long_description: 'GitHub Action Agent 消除了编写 CI/CD 流水线的痛苦。用日常英语描述你的部署或自动化工作流，Agent 就能生成完整、生产就绪的 GitHub Actions YAML 文件。它不仅仅是简单生成——还会分析你的仓库结构，建议最佳缓存策略，配置矩阵构建，设置包含密钥管理的部署环境，并添加自动回滚触发器。覆盖 40+ 云服务商和部署目标。每个新项目设置节省数小时时间。',
        usage_guide: '# 安装 GitHub CLI 扩展\n$ gh extension install devopsify/gh-action-agent\n\n# 生成工作流\n$ gh action-agent generate "构建 Next.js 应用，运行测试，PR 时部署到 Vercel 预览环境，合并到 main 时部署到生产环境"\n\n# 输出：\n# .github/workflows/ci.yml\n# .github/workflows/preview-deploy.yml\n# .github/workflows/production-deploy.yml\n# 全部包含矩阵构建、缓存和回滚支持'
      },
      content_studio: {
        description: '端到端内容营销技能包。SEO 研究、撰稿、编辑和排期——全渠道保持品牌调性一致。',
        long_description: 'Content Studio AI 是 AI Agent 的完整内容营销操作系统。它结合了 SEO 关键词研究（集成 SEMrush/Ahrefs）、AI 驱动的品牌调性一致撰稿、多渠道格式适配（博客、社交、邮件简报）以及排期和发布集成。功能包括竞品内容差距分析、可读性评分和自动 A/B 标题测试。被 Notion、Linear 和 Vercel 的市场团队用于将内容产出提升 10 倍而不牺牲质量。',
        usage_guide: '# 安装\n$ npm install -g content-studio-ai\n\n# 创建内容策略\n$ cs generate-strategy --niche "开发者工具" --competitors "github,gitlab,bitbucket"\n\n# 生成博客文章\n$ cs write --topic "为什么 Monorepo 在 2025 年胜出" --tone 专业 --length 2000w\n\n# 输出：\n# posts/why-monorepos-won-2025.md（草稿）\n# posts/why-monorepos-won-2025-social.md（社交平台变体）\n# reports/seo-keywords-report.csv'
      }
    },

    // Feedback
    feedback_title: '意见反馈',
    feedback_type_label: '反馈类型',
    feedback_type_bug: 'Bug 反馈',
    feedback_type_feature: '功能建议',
    feedback_type_other: '其他',
    feedback_desc_label: '描述',
    feedback_desc_placeholder: '请描述你的问题或建议...',
    feedback_submit: '提交反馈',
    feedback_empty_warning: '请填写反馈描述',
    feedback_sending: '提交中...',
    feedback_sent: '已收到，感谢你的反馈 ❤',
    feedback_error: '提交失败，请稍后再试',

    // Donate
    donate_btn: '打赏支持',
    donate_title: '支持创作者',
    donate_desc: '如果这个项目对你有帮助，欢迎请我们喝杯咖啡 ☕',
    donate_coffee_desc: '请我们喝杯咖啡',
    donate_wechat_title: '微信赞赏',
    donate_alipay_title: '支付宝赞赏',
    donate_qr_placeholder: '赞赏码图片',
    // Submit Skill Form
    submit_title: '提交技能',
    submit_desc: '填写下方表单提交你的技能，我们将审核后上架。',
    submit_field_name: '技能名称',
    submit_field_name_ph: '例如：Awesome Cursor Rules',
    submit_field_owner: 'GitHub 仓库地址',
    submit_field_owner_ph: 'https://github.com/owner/repo',
    submit_field_category: '分类',
    submit_field_desc: '简介',
    submit_field_desc_ph: '用一句话描述这个技能...',
    submit_field_contact: '联系方式（可选）',
    submit_field_contact_ph: '邮箱或微信，方便我们联系你',
    submit_btn_send: '提交审核',
    submit_success: '已提交！我们会尽快审核，感谢你的贡献 🎉',
    submit_invalid_url: '请填写有效的 GitHub 仓库地址',

    // Hot / Popular
    tab_hot: '热门榜',
    hot_subtitle: '按总星标数排序的常青项目',

    // RSS / Subscribe
    subscribe_title: '订阅更新',
    subscribe_desc: '获取新技能上架与每周热门通知',
    subscribe_rss: 'RSS 订阅',
    subscribe_rss_desc: '用 RSS 阅读器订阅本站更新',
    subscribe_copy: '复制 RSS 链接',
    subscribe_copied: '已复制 RSS 链接',

    // Site Stats
    stat_title: '站点数据',
    stat_visits: 'GitHub Stars',
    stat_pageviews: 'Forks',
    stat_online: 'Watchers',
    stat_source: '实时数据来自 GitHub API · 访问统计由 Cloudflare 提供',

    // Thank Wall
    thanks_title: '感谢墙',
    thanks_desc: '感谢这些朋友的支持，让开源持续发光',
    thanks_empty: '成为第一个支持者吧 ☕',
    thanks_add: '我也要支持',
    thanks_done: '已支持，感谢你 ❤',

    // Paid badge
    tag_paid: '付费',
    tag_premium: '精选',
    card_unlock: '解锁',
    card_locked: '付费内容',
  },

  en: {
    // Nav
    nav_search: 'Search skills... (e.g. coding, security, design)',
    btn_submit: 'Submit Skill',
    btn_theme_dark: 'Toggle light theme',
    btn_theme_light: 'Toggle dark theme',
    btn_lang: '中',

    // Hero
    hero_badge: 'Open Source Skills Marketplace',
    hero_title: 'AI Skills ',
    hero_title_gradient: 'Market',
    hero_subtitle: 'Discover, download, and share AI Agent skills packages. Power up your Claude Code, Cursor, Codex, and Gemini CLI with community-crafted capabilities.',
    hero_stat_skills: 'Skills',
    hero_stat_downloads: 'New Stars',
    hero_stat_creators: 'Creators',
    hero_btn_browse: 'Browse Skills',
    hero_btn_github: 'View on GitHub',

    // Trending Tabs
    tab_daily: 'Daily',
    tab_weekly: 'Weekly',
    tab_monthly: 'Monthly',
    tab_updated_at: 'Data from GitHub Trending · Last updated',
    stars_daily: 'Stars Today',
    stars_weekly: 'Stars This Week',
    stars_monthly: 'Stars This Month',

    // Filter
    filter_all: 'All',
    filter_engineering: 'Engineering',
    filter_security: 'Security',
    filter_design: 'Design & Creative',
    filter_marketing: 'Marketing',
    filter_data: 'Data & Analytics',
    filter_productivity: 'Productivity',

    // Skills section
    skills_title: 'Trending Skills',
    skills_subtitle: 'Powered by real open-source projects from GitHub Trending',
    no_results_title: 'No skills found',
    no_results_desc: 'Try different keywords or categories',

    // Card
    tag_free: 'Free',
    card_downloads: 'downloads',
    card_stars: 'stars',
    no_description: 'No description',

    // Modal
    modal_description: 'Description',
    modal_details: 'Details',
    modal_category: 'Category',
    modal_version: 'Version',
    modal_downloads: 'Downloads',
    modal_price: 'Price',
    modal_compatible: 'Compatible Platforms',
    modal_usage: 'Usage Guide',
    modal_rank: 'Rank',
    modal_language: 'Language',
    modal_stars: 'Stars',
    modal_btn_download: 'View Repo',
    modal_btn_github: 'View on GitHub',
    modal_btn_purchase: 'Purchase',
    modal_downloaded: 'Downloaded!',
    // New detail fields
    modal_license: 'License',
    modal_topics: 'Topics',
    modal_updated: 'Last Updated',
    modal_forks: 'Forks',
    modal_issues: 'Open Issues',
    modal_homepage: 'Homepage',
    modal_clone: 'Clone',
    card_copied: 'Copied!',
    card_copy: 'Copy',
    card_updated: 'Updated',
    card_no_license: 'No License',
    // Favorites & Compare & Sort & Language Filter
    tab_favorites: 'Favorites',
    tab_community: 'Community',
    submit_sending: 'Submitting...',
    submit_error: 'Submission failed, please try again',
    fav_empty: 'No favorites yet. Star repos from the trending lists to save them here.',
    fav_add: 'Favorite',
    fav_remove: 'Unfavorite',
    compare_selected: 'Selected',
    compare_items: 'items',
    compare_btn: 'Compare',
    compare_clear: 'Clear',
    compare_title: 'Compare Projects',
    compare_add: 'Compare',
    compare_remove: 'Remove',
    compare_max: 'Max 3 projects',
    filter_language_all: 'All Languages',
    filter_language_title: 'Filter by language',
    sort_title: 'Sort by',
    sort_rank: 'Rank',
    sort_stars: 'Stars',
    sort_stars_period: 'Period Stars',
    sort_updated: 'Last Updated',
    sort_issues: 'Open Issues',
    sort_name: 'Name',
    modal_readme: 'README Preview',
    modal_readme_loading: 'Loading...',
    modal_readme_error: 'Failed to load README',
    modal_star_history: 'Star History',
    starhistory_fallback: 'View on Star History →',
    // Modal V2 tabs
    modal_tab_overview: 'Overview',
    modal_tab_skills: 'Skills',
    modal_tab_install: 'Install',
    // Modal V2 stats
    modal_stats_stars: 'Stars',
    modal_stats_forks: 'Forks',
    modal_stats_issues: 'Issues',
    modal_stats_category: 'Category',
    modal_stats_updated: 'Updated',
    // Modal V2 skills
    modal_skills_loading: 'Scanning for skill files...',
    modal_skills_empty: 'No skill definition files found in this repository.',
    modal_skills_searched: 'Searched directories:',
    modal_skills_error: 'Unable to fetch repository file tree.',
    modal_skills_rate_limit: 'GitHub API rate limit may have been exceeded. Try again later.',
    // Modal V2 install
    modal_install_loading: 'Detecting install commands...',
    // Modal V2 related
    modal_related_title: 'Related Repositories',
    modal_related_empty: 'No related repositories found.',
    modal_related_error: 'Unable to load related repos.',
    compare_field_name: 'Name',
    compare_field_owner: 'Owner',
    compare_field_language: 'Language',
    compare_field_category: 'Category',
    compare_field_stars: 'Stars',
    compare_field_period_stars: 'Period Stars',
    compare_field_forks: 'Forks',
    compare_field_issues: 'Issues',
    compare_field_license: 'License',
    compare_field_updated: 'Updated',
    compare_field_topics: 'Topics',



    // Category labels
    cat_engineering: 'Engineering',
    cat_security: 'Security',
    cat_design: 'Design & Creative',
    cat_marketing: 'Marketing',
    cat_data: 'Data & Analytics',
    cat_productivity: 'Productivity',

    // Footer
    footer_product: 'Product',
    footer_resources: 'Resources',
    footer_community: 'Community',
    footer_browse: 'Browse Skills',
    footer_submit: 'Submit Skill',
    footer_creators: 'Top Creators',
    footer_changelog: 'Changelog',
    footer_docs: 'Documentation',
    footer_api: 'API Reference',
    footer_spec: 'Skill Spec',
    footer_blog: 'Blog',
    footer_github: 'GitHub',
    footer_discord: 'Discord',
    footer_twitter: 'Twitter',
    footer_contributing: 'Contributing',
    footer_desc: 'The open marketplace for AI Agent skills. Community-driven, MIT licensed, and always free to use.',
    footer_bottom: '© 2026 AI Skills Market. Released under the MIT License. Built with passion by the open-source community.',

    // Submit alert
    submit_alert: 'Submit Skill feature coming soon! Check our GitHub repo for contribution guidelines.',

    // Skills - English (original)
    skills: {
      caveman: {
        description: "Ultra-minimalist AI Agent framework. Strips away complexity so agents focus on what matters — getting things done with raw, direct prompts.",
        long_description: "Caveman is an opinionated, unapologetically simple framework for building AI agents. It embraces 'caveman' simplicity — no bloated abstractions, no unnecessary config. Just pure, direct LLM interaction loops. Perfect for developers who want to ship agents fast without fighting the framework. Inspired by the philosophy that the best code is the code you don't write.",
        usage_guide: "# Clone and install\n$ git clone https://github.com/dreadnode/caveman\n$ pip install caveman\n\n# Define your agent\nfrom caveman import Agent\nagent = Agent(\n    name=\"CodeHelper\",\n    instruction=\"You are a helpful coding assistant.\",\n    tools=[\"read_file\", \"write_file\", \"run_shell\"]\n)\nagent.run()"
      },
      grill_me: {
        description: "An AI agent that grills you with clarifying questions before executing — preventing hallucinations and ensuring bulletproof requirements.",
        long_description: "Grill-Me implements the 'adversarial clarification' pattern for AI agents. Before executing any task, the agent aggressively questions your requirements, edge cases, and assumptions. This dramatically reduces AI hallucinations in production systems. Inspired by Anthropic's safety research and the principle that 'a confused AI should ask, not guess.' Used by security-critical teams worldwide.",
        usage_guide: "# Install\n$ npm install -g grill-me-cli\n\n# Run in grill mode\n$ grill-me \"Build a user auth system\"\n\n# The agent will ask:\n# - What auth method? (OAuth/JWT/Session)\n# - Rate limiting strategy?\n# - Password hashing algorithm?\n# - Session expiry policy?\n# ... before writing a single line of code"
      },
      tdd: {
        description: "Test-Driven Development skill pack for Aider. Forces AI coding agents to write failing tests first, then make them pass — zero hallucinated code.",
        long_description: "The Aider TDD Suite is a curated collection of system prompts, benchmarks, and workflow scripts that enforce rigorous Test-Driven Development with AI coding agents. Built on top of Aider's powerful code editing capabilities, this skill pack ensures your AI always follows Red-Green-Refactor. Includes 50+ pre-built test templates for React, Python, Rust, and Go projects. Trending as the #1 quality assurance tool for vibe coding in 2025.",
        usage_guide: "# Install aider\n$ pip install aider-chat\n\n# Load TDD skill\n$ aider --skill tdd-suite\n\n# Start coding with TDD enforced\n> Write a function that validates email addresses\n\n# Aider will:\n# 1. Create test_email_validator.py with failing tests\n# 2. Implement the validator\n# 3. Run tests and iterate until green"
      },
      security: {
        description: "Comprehensive security evaluation suite for AI agents. Tests against prompt injection, data exfiltration, and social engineering attacks.",
        long_description: "This skill pack provides a complete red-teaming evaluation framework for AI agents, based on METR (Model Evaluation & Threat Research) methodologies. Includes 200+ test scenarios covering prompt injection, tool misuse, data exfiltration attempts, and social engineering vectors. Adopted by leading AI safety labs and enterprise security teams. Essential for any team deploying AI agents in production environments with access to sensitive data or systems.",
        usage_guide: "# Clone the eval suite\n$ git clone https://github.com/metr/agent-security-evals\n\n# Run security audit on your agent\n$ python run_evals.py --agent ./my_agent.py --level thorough\n\n# Sample output:\n# [PASS] Prompt injection (direct)      12/12\n# [PASS] Tool misuse (filesystem)        8/8\n# [FAIL] Data exfiltration (covert)      3/5\n# [WARN] Social engineering resistance  7/10"
      },
      screenshot: {
        description: "Convert UI screenshots, Figma designs, and mockups into production-ready React/Tailwind/Vue code with pixel-perfect accuracy.",
        long_description: "The most advanced design-to-code skill pack in the market. Takes any UI screenshot or Figma design and generates clean, production-ready frontend code with Tailwind CSS styling, responsive layouts, and accessibility baked in. Supports React, Vue, Svelte, and vanilla HTML/CSS output. Now with 'Design Review' mode that critiques your existing UI code against modern design principles. Trusted by 50,000+ developers worldwide.",
        usage_guide: "# Install\n$ npm install -g screenshot-to-code\n\n# Convert a screenshot\n$ stc --input design-mockup.png --framework react --styling tailwind\n\n# Output:\n# Generated: src/components/HeroSection.tsx\n# Generated: src/components/FeatureGrid.tsx\n# Generated: src/components/CTASection.tsx\n# Preview: http://localhost:3000/preview"
      },
      shadcn: {
        description: "The definitive design-taste skill for AI code generation. Ensures all generated UI follows shadcn/ui aesthetics — refined, accessible, and beautiful.",
        long_description: "This is the official taste enforcement skill pack from the shadcn/ui ecosystem. It fine-tunes AI coding agents to produce UI code that adheres to the shadcn design philosophy: minimal, functional, and beautiful by default. Includes component templates, color palette presets, typography scales, and accessibility guidelines. When loaded, your AI agent will never produce ugly, inaccessible, or non-standard UI components again. The gold standard for AI-generated frontend code in 2025.",
        usage_guide: "# Add to your project\n$ npx shadcn-ui@latest init\n\n# Install taste skill\n$ npx shadcn-ui@latest add skill-taste-pack\n\n# Configure in .cursorrules or claude.md:\n# - Use shadcn/ui components exclusively\n# - Follow 8pt spacing grid\n# - Use inter font with system fallbacks\n# - Maintain WCAG 2.1 AA contrast ratios"
      },
      autogen: {
        description: "Microsoft's multi-agent orchestration framework. Build teams of specialized AI agents that collaborate, debate, and deliver complex tasks together.",
        long_description: "AutoGen Studio is Microsoft's flagship multi-agent framework, now packaged as a downloadable skill set for major AI coding platforms. Define specialized agent roles (Architect, Developer, Reviewer, Tester) and let them collaborate autonomously on your codebase. Features include agent-to-agent debate for design decisions, automated code review chains, and parallel task decomposition. The most powerful enterprise-grade multi-agent system available, used by Fortune 500 engineering teams.",
        usage_guide: "# Install\n$ pip install autogen-studio\n\n# Define your team\nfrom autogen_skills import AgentTeam\nteam = AgentTeam()\nteam.add_role(\"architect\", model=\"claude-sonnet-4\")\nteam.add_role(\"developer\", model=\"claude-sonnet-4\")\nteam.add_role(\"reviewer\", model=\"claude-sonnet-4\")\n\n# Start collaboration\nteam.build(\"Create a REST API for user management\")"
      },
      crewai: {
        description: "Production-grade AI role-play engine. Assign detailed personas to agents — Senior Dev, QA Lead, DevOps — for realistic team simulations.",
        long_description: "CrewAI's Role Engine brings the power of role-based AI collaboration to your coding environment. Define detailed agent personas with specific expertise, communication styles, and decision-making patterns. Agents autonomously plan, delegate, execute, and verify tasks while maintaining their assigned roles. Perfect for complex projects where different perspectives (security, performance, UX) need to be considered in every decision. Integrated with LangChain and major LLM providers.",
        usage_guide: "# Install\n$ pip install crewai\n\n# Define your crew\nfrom crewai import Agent, Task, Crew\nsenior_dev = Agent(\n    role=\"Senior Python Developer\",\n    goal=\"Write clean, tested, production-ready code\",\n    backstory=\"10 years of experience in distributed systems\"\n)\nqa_lead = Agent(\n    role=\"QA Engineering Lead\",\n    goal=\"Ensure zero bugs reach production\",\n    backstory=\"Expert in automated testing and edge case analysis\"\n)"
      },
      langgraph: {
        description: "Build stateful, human-in-the-loop AI agent workflows. Graph-based execution with checkpoints, branching, and rollback — production battle-tested.",
        long_description: "LangGraph StateFlow is the definitive skill pack for building complex, stateful AI agent workflows. It introduces a graph-based execution model where each node is an AI-powered step and edges define control flow. Features include automatic checkpointing, human approval gates, parallel branch execution, and full rollback capabilities. Used by Stripe, Elastic, and thousands of startups for mission-critical agent pipelines. The new 'Flow Designer' visual editor makes building complex agent graphs intuitive.",
        usage_guide: "# Install\n$ pip install langgraph\n\n# Define a stateful workflow\nfrom langgraph.graph import StateGraph\ngraph = StateGraph(AgentState)\ngraph.add_node(\"analyze\", analyze_requirements)\ngraph.add_node(\"implement\", write_code)\ngraph.add_node(\"review\", human_review)\ngraph.add_edge(\"analyze\", \"implement\")\ngraph.add_edge(\"implement\", \"review\")\ngraph.add_conditional_edges(\"review\", decide_next)"
      },
      cursor_rules: {
        description: "The largest collection of battle-tested .cursorrules files. Stop AI hallucinations with community-vetted rules for every tech stack.",
        long_description: "Awesome Cursor Rules is the definitive repository of .cursorrules configurations — the single most important file in AI-assisted development. Contains 500+ community-vetted rule sets covering React, Next.js, Python, Rust, Go, DevOps, and more. Each rule set is optimized to prevent common AI mistakes: wrong imports, hallucinated APIs, outdated patterns, and security oversights. Regularly updated with rules tested against the latest Claude and GPT models. Essential for any team using AI coding assistants.",
        usage_guide: "# Browse rules at:\n# https://github.com/PatrickJS/awesome-cursorrules\n\n# Copy relevant .cursorrules to your project root\n$ cp rules/react-nextjs-tailwind.cursorrules .cursorrules\n\n# Sample rule content:\n# - Always use 'use client' directive when needed\n# - Prefer server components by default\n# - Use Next.js App Router patterns\n# - Import from '@/components' not relative paths\n# - Follow React 19 best practices"
      },
      mcp: {
        description: "Connect AI agents to everything — databases, APIs, file systems, Jira, Slack, GitHub. The universal Model Context Protocol server pack.",
        long_description: "MCP Universal Gateway is the most comprehensive collection of Model Context Protocol servers available. With a single configuration, your AI agent gains secure, controlled access to PostgreSQL databases, REST APIs, AWS services, GitHub repositories, Jira projects, Slack channels, and your local file system. Built on Anthropic's MCP standard, it ensures all connections follow least-privilege security principles. Includes audit logging for every agent action. The infrastructure backbone of the AI agent ecosystem in 2025.",
        usage_guide: "# Configure MCP servers in claude_desktop_config.json\n{\n  \"mcpServers\": {\n    \"postgres\": { \"command\": \"npx\", \"args\": [\"@modelcontextprotocol/server-postgres\", \"postgresql://localhost/mydb\"] },\n    \"github\": { \"command\": \"npx\", \"args\": [\"@modelcontextprotocol/server-github\"] },\n    \"filesystem\": { \"command\": \"npx\", \"args\": [\"@modelcontextprotocol/server-filesystem\", \"/path/to/allowed/dir\"] }\n  }\n}\n\n# Now ask Claude Code:\n> Query the users table and create a GitHub issue for inactive users"
      },
      v0: {
        description: "Vercel's v0 design-to-production pipeline. Turn text descriptions into shadcn/ui + Tailwind components that ship directly to your Next.js app.",
        long_description: "The official V0 Design Generator skill brings Vercel's production-grade UI generation to your local coding environment and AI agents. Describe what you want in natural language, and V0 generates complete, production-ready React components with shadcn/ui, Tailwind CSS, responsive layouts, and dark mode support. Unlike basic code generators, V0 understands design systems, accessibility, and performance — it ships code you'd be proud to merge. 2025 edition includes real-time collaboration and Figma import support.",
        usage_guide: "# Install V0 CLI\n$ npm install -g @vercel/v0\n\n# Generate components from description\n$ v0 generate \"A pricing page with 3 tiers, FAQ accordion, and CTA banner\"\n\n# Output in your project:\n# src/components/pricing/\n#   PricingTiers.tsx\n#   PricingFAQ.tsx\n#   PricingCTA.tsx\n# Full responsive, dark mode ready, WCAG AA compliant"
      },
      data_whisperer: {
        description: "Natural language data analysis pipeline. Query CSVs, databases, and APIs with plain English — get charts, insights, and reports instantly.",
        long_description: "Data Whisperer transforms how developers and analysts interact with data. Instead of writing complex SQL or pandas code, describe what you want in natural language. The agent handles query generation, data cleaning, statistical analysis, and visualization — all while explaining its reasoning. Supports CSV, JSON, SQL databases (PostgreSQL, MySQL, SQLite), and REST API endpoints. Generates publication-quality charts with matplotlib and plotly. The fastest way from question to insight in 2025.",
        usage_guide: "# Install\n$ pip install data-whisperer\n\n# Query in natural language\n$ dw \"Analyze sales.csv and show monthly revenue trends with YoY growth\"\n\n# Output:\n# [Chart] Monthly Revenue Trend (2024-2025)\n# [Table] Year-over-Year Growth by Month\n# [Insight] December 2025 showed 34% growth, driven by Q4 promotion\n# [Export] results/analysis_2025.pdf"
      },
      prompt_optimizer: {
        description: "A/B test and optimize your AI agent prompts at scale. Auto-generate prompt variants and measure performance against your eval suite.",
        long_description: "Prompt Optimizer Pro is the enterprise toolchain for prompt engineering at scale. Instead of manually tweaking system prompts, this skill automatically generates, tests, and ranks prompt variants against your evaluation suite. Features include multi-model benchmarking (Claude, GPT, Gemini), cost-performance Pareto frontier analysis, and automated regression testing to catch prompt degradation. Used by companies saving $50K+/month in token costs through optimized prompts. The must-have skill for serious AI engineering teams.",
        usage_guide: "# Install\n$ npm install -g prompt-optimizer\n\n# A/B test your prompts\n$ po test --prompt ./system-prompt.txt --evals ./eval-suite/\n\n# Results:\n# Variant A (original):   Accuracy 87.3% | Cost $0.042/req\n# Variant B (optimized):  Accuracy 92.1% | Cost $0.028/req\n# Variant C (aggressive): Accuracy 89.5% | Cost $0.018/req\n# Winner: Variant B — 5% accuracy gain, 33% cost reduction"
      },
      github_action: {
        description: "AI-powered CI/CD pipeline generator. Describe your workflow in English, get complete GitHub Actions YAML with best practices baked in.",
        long_description: "GitHub Action Agent eliminates the pain of writing CI/CD pipelines. Describe your deployment or automation workflow in plain English, and the agent generates complete, production-ready GitHub Actions YAML files. Goes beyond simple generation — it analyzes your repository structure, suggests optimal caching strategies, configures matrix builds, sets up deployment environments with secrets management, and adds automated rollback triggers. Covers 40+ cloud providers and deployment targets. Save hours on every new project setup.",
        usage_guide: "# Install GitHub CLI extension\n$ gh extension install devopsify/gh-action-agent\n\n# Generate workflow\n$ gh action-agent generate \"Build a Next.js app, run tests, deploy to Vercel preview on PR, production on main merge\"\n\n# Output:\n# .github/workflows/ci.yml\n# .github/workflows/preview-deploy.yml\n# .github/workflows/production-deploy.yml\n# All with matrix builds, caching, and rollback support"
      },
      content_studio: {
        description: "End-to-end content marketing skill pack. SEO research, drafting, editing, and scheduling — all with brand voice consistency across channels.",
        long_description: "Content Studio AI is the complete content marketing operating system for AI agents. It combines SEO keyword research (via SEMrush/Ahrefs integration), AI-powered drafting with brand voice consistency, multi-channel formatting (blog, social, email newsletter), and scheduling/publishing integration. Features include competitor content gap analysis, readability scoring, and automated A/B headline testing. Used by marketing teams at Notion, Linear, and Vercel to 10x their content output without sacrificing quality.",
        usage_guide: "# Install\n$ npm install -g content-studio-ai\n\n# Create content strategy\n$ cs generate-strategy --niche \"developer tools\" --competitors \"github,gitlab,bitbucket\"\n\n# Generate blog post\n$ cs write --topic \"Why monorepos won 2025\" --tone professional --length 2000w\n\n# Output:\n# posts/why-monorepos-won-2025.md (draft)\n# posts/why-monorepos-won-2025-social.md (social variants)\n# reports/seo-keywords-report.csv"
      }
    },

    // Feedback
    feedback_title: 'Feedback',
    feedback_type_label: 'Feedback Type',
    feedback_type_bug: 'Bug Report',
    feedback_type_feature: 'Feature Request',
    feedback_type_other: 'Other',
    feedback_desc_label: 'Description',
    feedback_desc_placeholder: 'Please describe your issue or suggestion...',
    feedback_submit: 'Submit Feedback',
    feedback_empty_warning: 'Please fill in the feedback description',
    feedback_sending: 'Sending...',
    feedback_sent: 'Received, thank you for your feedback ❤',
    feedback_error: 'Submission failed, please try again',

    // Donate
    donate_btn: 'Support Us',
    donate_title: 'Support Creators',
    donate_desc: 'If this project has been helpful, consider buying us a coffee \u2615',
    donate_coffee_desc: 'Buy us a coffee',
    donate_wechat_title: 'WeChat Reward',
    donate_alipay_title: 'Alipay Reward',
    donate_qr_placeholder: 'QR Code Image',
    // Submit Skill Form
    submit_title: 'Submit Skill',
    submit_desc: 'Fill in the form below to submit your skill. We will review and list it.',
    submit_field_name: 'Skill Name',
    submit_field_name_ph: 'e.g. Awesome Cursor Rules',
    submit_field_owner: 'GitHub Repo URL',
    submit_field_owner_ph: 'https://github.com/owner/repo',
    submit_field_category: 'Category',
    submit_field_desc: 'Description',
    submit_field_desc_ph: 'Describe this skill in one sentence...',
    submit_field_contact: 'Contact (optional)',
    submit_field_contact_ph: 'Email or WeChat so we can reach you',
    submit_btn_send: 'Submit for Review',
    submit_success: 'Submitted! We will review it soon. Thanks for contributing 🎉',
    submit_invalid_url: 'Please enter a valid GitHub repo URL',

    // Hot / Popular
    tab_hot: 'Hot',
    hot_subtitle: 'Evergreen projects ranked by total stars',

    // RSS / Subscribe
    subscribe_title: 'Subscribe',
    subscribe_desc: 'Get notified about new skills and weekly hot picks',
    subscribe_rss: 'RSS Feed',
    subscribe_rss_desc: 'Subscribe with your RSS reader',
    subscribe_copy: 'Copy RSS Link',
    subscribe_copied: 'RSS link copied',

    // Site Stats
    stat_title: 'Site Stats',
    stat_visits: 'GitHub Stars',
    stat_pageviews: 'Forks',
    stat_online: 'Watchers',
    stat_source: 'Live data from GitHub API · Analytics by Cloudflare',

    // Thank Wall
    thanks_title: 'Thank You Wall',
    thanks_desc: 'Thanks to these friends whose support keeps open source shining',
    thanks_empty: 'Be the first supporter ☕',
    thanks_add: 'Support Us Too',
    thanks_done: 'Supported, thank you ❤',

    // Paid badge
    tag_paid: 'Paid',
    tag_premium: 'Premium',
    card_unlock: 'Unlock',
    card_locked: 'Paid Content',

  }
};

// Current language, persisted in localStorage
let currentLang = localStorage.getItem('lang') || 'zh';

function t(key) {
  const keys = key.split('.');
  let value = i18n[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // fallback to key
    }
  }
  return typeof value === 'string' ? value : key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateLangUI();
  // Re-render everything
  if (typeof renderSkills === 'function') renderSkills();
  if (typeof updateStats === 'function') updateStats();
}

function updateLangUI() {
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.textContent = currentLang === 'zh' ? '中' : 'EN';
    btn.setAttribute('aria-label', currentLang === 'zh' ? '切换到英文' : 'Switch to Chinese');
  }
  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = t(key);
      } else {
        el.textContent = t(key);
      }
    }
  });
  // Update document lang
  document.documentElement.lang = currentLang;
}
