/* ============================================
   AI Skills Market — Application Logic v2.0
   Dynamic GitHub Trending with 3D Tabs
   ============================================ */

// ---------- Embedded Data (lazy-loaded fallback for file:// protocol) ----------
let EMBEDDED_DATA = null;
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = url;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
async function loadEmbeddedFallback(period) {
  if (!EMBEDDED_DATA) {
    try {
      await loadScript('data/embedded.js');
      EMBEDDED_DATA = window.__EMBEDDED_DATA;
    } catch (e) {
      EMBEDDED_DATA = { daily: { repos: [] }, weekly: { repos: [] }, monthly: { repos: [] } };
    }
  }
  return (EMBEDDED_DATA[period] && EMBEDDED_DATA[period].repos) || [];
}
// ---------- State ----------
let currentTab = 'weekly'; // daily | weekly | monthly
let trendingData = null;   // { daily: [...], weekly: [...], monthly: [...] }
let currentCategory = 'all';
let currentSort = 'rank';
let favorites = [];
let compareList = [];  // {owner, name} objects

let currentSearch = '';
let readmeCache = new Map();
let theme = localStorage.getItem('theme') || 'dark';

// ---------- DOM References ----------
const skillsGrid = document.getElementById('skillsGrid');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const noResults = document.getElementById('noResults');
const filterChips = document.querySelectorAll('.filter-chip');
const trendingTabs = document.querySelectorAll('.trending-tab');
const updatedTime = document.getElementById('updatedTime');
const submitBtn = document.getElementById('submitBtn');

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', async () => {
  applyTheme();
  updateLangUI();
  await fetchAllData();
  renderSkills();
  updateStats();
  bindEvents();
  registerSW();
});

// ---------- Fetch Data ----------
async function fetchAllData() {
  const periods = ['daily', 'weekly', 'monthly'];
  trendingData = {};
  for (const p of periods) {
    try {
      const res = await fetch(`data/${p}.json`);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      trendingData[p] = json.repos || [];
    } catch (e) {
      // file:// protocol fallback -> lazy-loaded embedded data
      trendingData[p] = await loadEmbeddedFallback(p);
    }
  }
}

// ---------- Events ----------
function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

function bindEvents() {
  searchInput.addEventListener('input', debounce((e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    renderSkills();
  }, 200));

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.category;
      renderSkills();
    });
  });

  trendingTabs.forEach(tab => {
    tab.addEventListener('click', async () => {
      trendingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.period;
      // 刷新数据
      if (currentTab !== 'favorites') await fetchAllData();
      renderSkills();
      updateStats();
    });
  });

  themeToggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    localStorage.setItem('theme', theme);
  });

  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    setLang(newLang);
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  submitBtn.addEventListener('click', () => { alert(t('submit_alert')); });

  // Language filter
  const langFilter = document.getElementById('langFilter');
  if (langFilter) langFilter.addEventListener('change', () => renderSkills());

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', function() { currentSort = this.value; renderSkills(); });

  // Compare
  const compareBtn = document.getElementById('compareBtn');
  const compareClear = document.getElementById('compareClear');
  const compareClose = document.getElementById('compareClose');
  const compareOverlay = document.getElementById('compareOverlay');
  if (compareBtn) compareBtn.addEventListener('click', renderCompare);
  if (compareClear) compareClear.addEventListener('click', () => {
    compareList = [];
    updateCompareBar();
    document.querySelectorAll('.compare-check').forEach(cb => cb.checked = false);
  });
  if (compareClose) compareClose.addEventListener('click', () => compareOverlay.classList.remove('active'));
  if (compareOverlay) compareOverlay.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
  });

  populateLanguageFilter();
}


// ---------- Relative Time ----------
function timeAgo(dateStr) {
  if (!dateStr) return '';
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  const diffMon = Math.floor(diffDay / 30);
  const diffYr = Math.floor(diffDay / 365);
  if (diffYr >= 1) return diffYr + 'y ago';
  if (diffMon >= 1) return diffMon + 'mo ago';
  if (diffDay >= 1) return diffDay + 'd ago';
  if (diffHr >= 1) return diffHr + 'h ago';
  if (diffMin >= 1) return diffMin + 'm ago';
  return 'just now';
}

// ---------- Theme ----------
function applyTheme() { document.documentElement.setAttribute('data-theme', theme); }


// ---------- Clipboard ----------
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '\u2713 ' + t('card_copied');
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {});
}

// ---------- Filtering ----------
function getFilteredRepos() {
  const repos = trendingData[currentTab] || [];
  return repos.filter(r => {
    const desc = (r.description || '').toLowerCase();
    const name = (r.name || '').toLowerCase();
    const searchText = `${name} ${desc}`;
    const matchSearch = !currentSearch || searchText.includes(currentSearch);
    const matchCategory = currentCategory === 'all' || r.category === currentCategory;
    return matchSearch && matchCategory;
  });
}

// ---------- Stats ----------
function updateStats() {
  const repos = trendingData[currentTab] || [];
  const unique = new Set(repos.map(r => r.owner));
  document.getElementById('statSkills').textContent = repos.length || 0;
  const totalPeriodStars = repos.reduce((sum, r) => sum + (r.period_stars || 0), 0);
  document.getElementById('statDownloads').textContent = formatNumber(totalPeriodStars);
  document.getElementById('statCreators').textContent = unique.size || 0;
  if (updatedTime && repos.length > 0) {
    updatedTime.textContent = t('tab_updated_at') + ' ' + t('tab_' + currentTab);
  }
}

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
  return n.toString();
}

// ---------- Language Color Map ----------
const langColors = {
  'Python': '#3572A5', 'JavaScript': '#f1e05a', 'TypeScript': '#3178c6',
  'Rust': '#dea584', 'Go': '#00ADD8', 'Swift': '#F05138', 'HTML': '#e34c26',
  'C++': '#f34b7d', 'C': '#555555', 'Ruby': '#701516', 'Java': '#b07219',
  'Kotlin': '#A97BFF', 'Shell': '#89e051', 'CSS': '#563d7c', 'SCSS': '#c6538c',
  'Vue': '#41b883', 'Svelte': '#ff3e00',
};

// ---------- Render ----------
function renderSkills() {
  const filtered = getFilteredRepos();
  skillsGrid.innerHTML = '';
  if (filtered.length === 0) { noResults.style.display = 'block'; return; }
  noResults.style.display = 'none';
  const frag = document.createDocumentFragment();
  filtered.forEach((repo, index) => frag.appendChild(createRepoCard(repo, index)));
  skillsGrid.appendChild(frag);
}

function getRankBadge(rank) {
  if (rank === 1) return '<span class="rank-badge gold">1</span>';
  if (rank === 2) return '<span class="rank-badge silver">2</span>';
  if (rank === 3) return '<span class="rank-badge bronze">3</span>';
  return `<span class="rank-badge">${rank}</span>`;
}

function createRepoCard(repo, index) {
  const card = document.createElement('div');
  card.className = 'skill-card' + (repo.category ? ' cat-' + repo.category : '');
  card.style.animationDelay = `${index * 0.04}s`;
  const avatarInitial = (repo.owner || '?')[0].toUpperCase();
  const langColor = langColors[repo.language] || '#888';
  const periodLabel = t('stars_' + currentTab);
  const periodStars = repo.period_stars || 0;
  const totalStars = repo.total_stars || 0;
  const desc = (currentLang === 'zh' && repo.description_zh ? repo.description_zh : repo.description || t('no_description')).slice(0, 180);
  const catLabel = t('cat_' + repo.category) || repo.category;

  const license = repo.license || '';
  const topics = (repo.topics || []).slice(0, 4);
  const updatedAgo = timeAgo(repo.pushed_at);
  const openIssues = repo.open_issues || 0;
  const forks = repo.forks || 0;

  card.innerHTML = `
    <div class="card-header">
      <div class="card-avatar" style="background:var(--accent-gradient);font-size:0.7rem;">${escapeHtml(avatarInitial)}</div>
      <div class="card-info">
        <div class="card-name">
          <span class="repo-owner">${escapeHtml(repo.owner)}</span>
          <span class="repo-sep">/</span>
          <span class="repo-name">${escapeHtml(repo.name)}</span>
        </div>
        <div class="card-meta-row">
          <span class="card-author">${escapeHtml(catLabel)}</span>
          ${license ? `<span class="license-badge">${escapeHtml(license)}</span>` : ''}
          ${updatedAgo ? `<span class="updated-badge" title="${escapeHtml(repo.pushed_at || '')}">${escapeHtml(updatedAgo)}</span>` : ''}
        </div>
      </div>
    </div>
    <div class="card-desc">${escapeHtml(desc)}</div>
    ${topics.length ? `<div class="card-topics">${topics.map(t => `<span class="topic-pill">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
    <div class="card-tags">
      ${repo.language ? `<span class="tag tag-lang" style="border-color:${langColor};color:${langColor};"><span class="lang-dot" style="background:${langColor}"></span>${escapeHtml(repo.language)}</span>` : ''}
      <span class="tag trend-tag">${escapeHtml(periodLabel)}</span>
    </div>
    <div class="card-footer">
      <div class="card-stats">
        <span class="card-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ${formatNumber(totalStars)}
        </span>
        <span class="card-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2"/><path d="M12 8v4l2 2"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>
          ${openIssues}
        </span>
        <span class="card-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5"/></svg>
          ${formatNumber(forks)}
        </span>
        <span class="card-stat period-stars" title="${periodStars} ${periodLabel}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          +${formatNumber(periodStars)}
        </span>
      </div>
      <div class="card-rank-wrap">${getRankBadge(repo.rank || index + 1)}</div>
    </div>
  `;
  card.addEventListener('click', () => openModal(repo));
  return card;
}

// ---------- GitHub API Cache ----------
const apiCache = new Map();
function cachedFetch(url, ttl = 300000) {
  const now = Date.now();
  const entry = apiCache.get(url);
  if (entry && (now - entry.time) < ttl) return Promise.resolve(entry.data);
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    return resp.json();
  }).then(data => {
    apiCache.set(url, { time: now, data });
    return data;
  });
}

// ---------- Modal V2 ----------
function openModal(repo) {
  const langColor = langColors[repo.language] || '#888';
  const periodLabel = t('stars_' + currentTab);
  const avatarInitial = (repo.owner || '?')[0].toUpperCase();
  const license = repo.license || '';
  const topics = repo.topics || [];
  const updatedAgo = timeAgo(repo.pushed_at);
  const openIssues = repo.open_issues || 0;
  const forks = repo.forks || 0;
  const cloneCmd = `git clone https://github.com/${repo.owner}/${repo.name}.git`;
  const homepage = repo.homepage || '';
  const desc = (currentLang === 'zh' && repo.description_zh ? repo.description_zh : repo.description) || t('no_description');

  modalContent.innerHTML = `
    <div class="modal-header">
      <div class="modal-avatar" style="font-size:0.75rem;">${escapeHtml(avatarInitial)}</div>
      <div>
        <h2 class="modal-title">
          <span class="repo-owner">${escapeHtml(repo.owner)}</span>
          <span class="repo-sep">/</span>
          <span class="repo-name">${escapeHtml(repo.name)}</span>
        </h2>
        <p class="modal-author">
          ${repo.language ? '<span style="color:' + langColor + '">' + escapeHtml(repo.language) + '</span> | ' : ''}
          ${t('modal_rank')} #${repo.rank || '-'} | ${t('tab_' + currentTab)}
          ${license ? ' | <span class="license-badge">' + escapeHtml(license) + '</span>' : ''}
          ${updatedAgo ? ' | <span class="updated-text">' + t('card_updated') + ' ' + escapeHtml(updatedAgo) + '</span>' : ''}
        </p>
      </div>
    </div>

    <!-- Tab Bar -->
    <div class="modal-tab-bar">
      <button class="modal-tab-btn active" data-tab="overview">${t('modal_tab_overview')}</button>
      <button class="modal-tab-btn" data-tab="skills">${t('modal_tab_skills')}</button>
      <button class="modal-tab-btn" data-tab="install">${t('modal_tab_install')}</button>
      <button class="modal-tab-btn" data-tab="readme">${t('modal_readme')}</button>
      <button class="modal-tab-btn" data-tab="starhistory">${t('modal_star_history')}</button>
    </div>

    <!-- Overview Panel -->
    <div class="modal-tab-panel active" data-panel="overview">
      <div class="stats-dashboard">
        <div class="stats-card">
          <svg class="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <div class="stats-value">${formatNumber(repo.total_stars)}</div>
          <div class="stats-label">${t('modal_stats_stars')}</div>
        </div>
        <div class="stats-card">
          <svg class="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          <div class="stats-value" style="color:#34d399;">+${formatNumber(repo.period_stars)}</div>
          <div class="stats-label">${periodLabel}</div>
        </div>
        <div class="stats-card">
          <svg class="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5"/></svg>
          <div class="stats-value">${formatNumber(forks)}</div>
          <div class="stats-label">${t('modal_stats_forks')}</div>
        </div>
        <div class="stats-card">
          <svg class="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2"/><path d="M12 8v4l2 2"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>
          <div class="stats-value">${openIssues}</div>
          <div class="stats-label">${t('modal_stats_issues')}</div>
        </div>
        <div class="stats-card">
          <svg class="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          <div class="stats-value">${escapeHtml(t('cat_' + repo.category) || repo.category || '-')}</div>
          <div class="stats-label">${t('modal_stats_category')}</div>
        </div>
        <div class="stats-card">
          <svg class="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div class="stats-value">${escapeHtml(updatedAgo || '-')}</div>
          <div class="stats-label">${t('modal_stats_updated')}</div>
        </div>
      </div>

      <div class="modal-section">
        <h3>${t('modal_description')}</h3>
        <p>${escapeHtml(desc)}</p>
      </div>
      ${topics.length ? `<div class="modal-section">
        <h3>${t('modal_topics')}</h3>
        <div class="modal-topic-cloud">${topics.map(t => `<span class="topic-pill">${escapeHtml(t)}</span>`).join('')}</div>
      </div>` : ''}
      <div class="modal-section">
        <h3>${t('modal_details')}</h3>
        <div class="modal-meta">
          <div class="meta-item"><div class="meta-label">${t('modal_language')}</div><div class="meta-value">${escapeHtml(repo.language || '-')}</div></div>
          ${homepage ? `<div class="meta-item"><div class="meta-label">${t('modal_homepage')}</div><div class="meta-value"><a href="${escapeHtml(homepage)}" target="_blank" rel="noopener" style="color:var(--accent-color)">${escapeHtml(homepage)}</a></div></div>` : ''}
        </div>
      </div>
      <div class="modal-section">
        <h3>${t('modal_clone')}</h3>
        <div class="clone-box">
          <code class="clone-cmd">${escapeHtml(cloneCmd)}</code>
          <button class="btn btn-copy" onclick="copyToClipboard('${escapeHtml(cloneCmd)}', this)">${t('card_copy')}</button>
        </div>
      </div>
      <div class="modal-actions">
        <a href="${escapeHtml(repo.url)}" target="_blank" rel="noopener" class="btn btn-primary btn-lg btn-block" style="text-decoration:none;justify-content:center;">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          ${t('modal_btn_github')}
        </a>
      </div>
    </div>

    <!-- Skills Panel -->
    <div class="modal-tab-panel" data-panel="skills">
      <div class="skills-loading">${t('modal_skills_loading')}</div>
    </div>

    <!-- Install Panel -->
    <div class="modal-tab-panel" data-panel="install">
      <div class="skills-loading">${t('modal_install_loading')}</div>
    </div>

    <!-- README Panel -->
    <div class="modal-tab-panel" data-panel="readme">
      <div class="readme-container" id="readmeContent">
        <div class="readme-loading">${t('modal_readme_loading')}</div>
      </div>
    </div>

    <!-- Star History Panel -->
    <div class="modal-tab-panel" data-panel="starhistory">
      <div class="star-chart-container" id="starChartContainer" style="min-height:300px;"></div>
    </div>

    <!-- Related Repos -->
    <div class="related-section">
      <div class="related-title">${t('modal_related_title')}</div>
      <div class="related-grid" id="relatedGrid">
        <div style="grid-column:1/-1;text-align:center;color:var(--text-tertiary);padding:20px;">${t('modal_readme_loading')}</div>
      </div>
    </div>
  `;

  // Bind tab clicks
  modalContent.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      switchModalTab(this.dataset.tab, repo);
    });
  });

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Load lazy panels
  fetchRepoSkills(repo);
  fetchInstallCommands(repo);
  fetchRelatedRepos(repo);
}

function switchModalTab(tabName, repo) {
  modalContent.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
  modalContent.querySelectorAll('.modal-tab-panel').forEach(p => p.classList.remove('active'));
  const btn = modalContent.querySelector(`.modal-tab-btn[data-tab="${tabName}"]`);
  const panel = modalContent.querySelector(`.modal-tab-panel[data-panel="${tabName}"]`);
  if (btn) btn.classList.add('active');
  if (panel) panel.classList.add('active');

  if (tabName === 'readme') {
    const readmeDiv = document.getElementById('readmeContent');
    if (readmeDiv && readmeDiv.querySelector('.readme-loading')) {
      fetchReadme(repo.owner, repo.name);
    }
  }
  if (tabName === 'starhistory') {
    const chartDiv = document.getElementById('starChartContainer');
    if (chartDiv && !chartDiv.innerHTML.includes('api.star-history.com') && !chartDiv.innerHTML.includes('star-history.com')) {
      showStarHistory(repo.owner, repo.name);
    }
  }
}

// ---------- Skills Tab: GitHub API file tree scan ----------
const SKILL_DIRS = ['.cursor/rules', 'skills', 'rules', '.claude/rules'];
const SKILL_EXTENSIONS = ['.md', '.mdc', '.txt', '.yaml', '.yml', '.json', '.toml'];

async function fetchRepoSkills(repo) {
  const panel = modalContent.querySelector('[data-panel="skills"]');
  if (!panel) return;
  try {
    const treeUrl = `https://api.github.com/repos/${repo.owner}/${repo.name}/git/trees/HEAD?recursive=1`;
    const data = await cachedFetch(treeUrl, 600000);
    const tree = data.tree || [];

    let skillFiles = [];
    for (const dir of SKILL_DIRS) {
      const prefix = dir + '/';
      const matches = tree.filter(item =>
        item.type === 'blob' && item.path.startsWith(prefix) &&
        SKILL_EXTENSIONS.some(ext => item.path.toLowerCase().endsWith(ext))
      );
      for (const m of matches) {
        const fileName = m.path.split('/').pop();
        if (!skillFiles.some(s => s.path === m.path)) {
          skillFiles.push({
            name: fileName,
            path: m.path,
            dir: dir,
            url: `https://github.com/${repo.owner}/${repo.name}/blob/HEAD/${m.path}`
          });
        }
      }
    }

    if (skillFiles.length === 0) {
      // Try top-level files matching skill patterns
      const topLevel = tree.filter(item =>
        item.type === 'blob' && !item.path.includes('/') &&
        SKILL_EXTENSIONS.some(ext => item.path.toLowerCase().endsWith(ext)) &&
        /skill|rule|prompt|agent/i.test(item.path)
      );
      if (topLevel.length > 0) {
        skillFiles = topLevel.map(m => ({
          name: m.path,
          path: m.path,
          dir: '(root)',
          url: `https://github.com/${repo.owner}/${repo.name}/blob/HEAD/${m.path}`
        }));
      }
    }

    if (skillFiles.length === 0) {
      panel.innerHTML = '<div class="skills-empty">'
        + '<p>' + t('modal_skills_empty') + '</p>'
        + '<p style="font-size:0.78rem;margin-top:8px;">' + t('modal_skills_searched') + ' ' + SKILL_DIRS.join(', ') + '</p>'
        + '</div>';
      return;
    }

    let html = '<div class="skills-list">';
    for (const sf of skillFiles) {
      html += `
        <a href="${escapeHtml(sf.url)}" target="_blank" rel="noopener" class="skill-item" style="text-decoration:none;color:inherit;">
          <div class="skill-item-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div class="skill-item-info">
            <div class="skill-item-name">${escapeHtml(sf.name)}</div>
            <div class="skill-item-dir">${escapeHtml(sf.dir)}</div>
          </div>
        </a>`;
    }
    html += '</div>';
    panel.innerHTML = html;
  } catch (e) {
    panel.innerHTML = '<div class="skills-empty">'
      + '<p>' + t('modal_skills_error') + '</p>'
      + '<p style="font-size:0.78rem;margin-top:8px;">' + t('modal_skills_rate_limit') + '</p>'
      + '</div>';
  }
}

// ---------- Install Tab: Extract commands from README ----------
async function fetchInstallCommands(repo) {
  const panel = modalContent.querySelector('[data-panel="install"]');
  if (!panel) return;
  try {
    const readmeUrl = `https://api.github.com/repos/${repo.owner}/${repo.name}/readme`;
    const data = await cachedFetch(readmeUrl, 600000);
    let content = atob(data.content);
    const bytes = new Uint8Array(content.length);
    for (let i = 0; i < content.length; i++) bytes[i] = content.charCodeAt(i);
    content = new TextDecoder('utf-8').decode(bytes);

    const commands = [];
    const lines = content.split('\n');
    const codeBlockRegex = /^```/;
    const cmdPatterns = [
      { regex: /^(npm\s+(install|i)\b.*)/i, label: 'npm', icon: 'N' },
      { regex: /^(yarn\s+(add|install)\b.*)/i, label: 'yarn', icon: 'Y' },
      { regex: /^(pnpm\s+(add|install)\b.*)/i, label: 'pnpm', icon: 'P' },
      { regex: /^(pip\s+(install|i)\b.*)/i, label: 'pip', icon: 'Pi' },
      { regex: /^(pip3\s+(install|i)\b.*)/i, label: 'pip3', icon: 'P3' },
      { regex: /^(poetry\s+add\b.*)/i, label: 'Poetry', icon: 'Po' },
      { regex: /^(conda\s+install\b.*)/i, label: 'Conda', icon: 'C' },
      { regex: /^(gem\s+install\b.*)/i, label: 'RubyGems', icon: 'R' },
      { regex: /^(go\s+get\b.*)/i, label: 'Go', icon: 'Go' },
      { regex: /^(cargo\s+install\b.*)/i, label: 'Cargo', icon: 'Cr' },
      { regex: /^(brew\s+install\b.*)/i, label: 'Homebrew', icon: 'H' },
      { regex: /^(composer\s+require\b.*)/i, label: 'Composer', icon: 'Co' },
      { regex: /^(docker\s+(pull|run)\b.*)/i, label: 'Docker', icon: 'D' },
      { regex: /^(git\s+clone\b.*)/i, label: 'git clone', icon: 'G' },
      { regex: /^(npx\b.*)/i, label: 'npx', icon: 'Nx' },
      { regex: /^(uv\s+(pip\s+)?install\b.*)/i, label: 'uv', icon: 'Uv' },
    ];
    const seen = new Set();

    // Scan code blocks
    let inCodeBlock = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (codeBlockRegex.test(line)) { inCodeBlock = !inCodeBlock; continue; }
      if (!inCodeBlock) continue;
      if (!line || line.startsWith('#') || line.startsWith('//') || line.startsWith('>')) continue;

      for (const pat of cmdPatterns) {
        const m = line.match(pat.regex);
        if (m) {
          const cmd = m[1].replace(/\s+/g, ' ').trim();
          if (!seen.has(cmd) && cmd.length < 300) {
            seen.add(cmd);
            commands.push({ label: pat.label, icon: pat.icon, cmd: cmd });
          }
          break;
        }
      }
    }

    // Fallback: scan all lines
    if (commands.length === 0) {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        for (const pat of cmdPatterns) {
          const m = line.match(pat.regex);
          if (m) {
            const cmd = m[1].replace(/\s+/g, ' ').trim();
            if (!seen.has(cmd) && cmd.length < 300) {
              seen.add(cmd);
              commands.push({ label: pat.label, icon: pat.icon, cmd: cmd });
            }
            break;
          }
        }
      }
    }

    if (commands.length === 0) {
      const gitClone = `git clone https://github.com/${repo.owner}/${repo.name}.git`;
      commands.push({ label: 'git clone', icon: 'G', cmd: gitClone });
    }

    let html = '<div class="install-commands">';
    for (const c of commands) {
      html += `
        <div class="install-card">
          <div class="install-card-icon">${escapeHtml(c.icon)}</div>
          <div class="install-card-body">
            <div class="install-card-label">${escapeHtml(c.label)}</div>
            <code class="install-card-cmd">${escapeHtml(c.cmd)}</code>
          </div>
          <button class="btn btn-copy" onclick="copyToClipboard('${escapeHtml(c.cmd.replace(/'/g, "\\'"))}', this)">${t('card_copy')}</button>
        </div>`;
    }
    html += '</div>';
    panel.innerHTML = html;
  } catch (e) {
    const gitClone = `git clone https://github.com/${repo.owner}/${repo.name}.git`;
    panel.innerHTML = `
      <div class="install-commands">
        <div class="install-card">
          <div class="install-card-icon">G</div>
          <div class="install-card-body">
            <div class="install-card-label">git clone</div>
            <code class="install-card-cmd">${escapeHtml(gitClone)}</code>
          </div>
          <button class="btn btn-copy" onclick="copyToClipboard('${escapeHtml(gitClone)}', this)">${t('card_copy')}</button>
        </div>
      </div>`;
  }
}

// ---------- Related Repos ----------
async function fetchRelatedRepos(repo) {
  const grid = document.getElementById('relatedGrid');
  if (!grid) return;
  try {
    const allRepos = [];
    for (const p of ['daily', 'weekly', 'monthly']) {
      if (trendingData[p]) allRepos.push(...trendingData[p]);
    }
    const deduped = [];
    const seen = new Set();
    for (const r of allRepos) {
      const key = `${r.owner}/${r.name}`;
      if (!seen.has(key)) { seen.add(key); deduped.push(r); }
    }

    // Score: same category = 2, same language = 1, not current repo
    const currentKey = `${repo.owner}/${repo.name}`;
    const scored = deduped
      .filter(r => `${r.owner}/${r.name}` !== currentKey)
      .map(r => {
        let score = 0;
        if (r.category === repo.category) score += 2;
        if (r.language === repo.language && repo.language) score += 1;
        return { ...r, _score: score };
      })
      .sort((a, b) => b._score - a._score || (b.total_stars || 0) - (a.total_stars || 0))
      .slice(0, 3);

    if (scored.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-tertiary);padding:20px;">' + t('modal_related_empty') + '</div>';
      return;
    }

    let html = '';
    for (const r of scored) {
      const initials = (r.owner || '?')[0].toUpperCase();
      const desc = (r.description || '').slice(0, 80);
      html += `
        <div class="related-card" onclick="openModal(window._findRepo('${r.owner}','${r.name}'))" title="${escapeHtml(r.owner + '/' + r.name)}">
          <div class="related-card-header">
            <div class="related-card-avatar">${escapeHtml(initials)}</div>
            <div class="related-card-name">${escapeHtml(r.owner + '/' + r.name)}</div>
          </div>
          <div class="related-card-desc">${escapeHtml(desc || t('no_description'))}</div>
          <div class="related-card-meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${formatNumber(r.total_stars || 0)}
            </span>
            <span>${escapeHtml(r.language || '')}</span>
          </div>
        </div>`;
    }
    grid.innerHTML = html;

    // Store lookup helper
    window._repoLookup = window._repoLookup || {};
    for (const r of scored) {
      window._repoLookup[`${r.owner}/${r.name}`] = r;
    }
  } catch (e) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-tertiary);padding:20px;">' + t('modal_related_error') + '</div>';
  }
}

// Helper to find a repo from cache for re-opening modal
window._findRepo = function(owner, name) {
  const key = `${owner}/${name}`;
  if (window._repoLookup && window._repoLookup[key]) return window._repoLookup[key];
  for (const p of ['daily', 'weekly', 'monthly']) {
    const found = (trendingData[p] || []).find(r => r.owner === owner && r.name === name);
    if (found) return found;
  }
  return { owner, name, total_stars: 0, period_stars: 0, forks: 0, open_issues: 0 };
};

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ---------- Helpers ----------
function escapeHtml(str) {
  if (typeof str !== 'string') return str || '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- PWA ----------
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {}).catch(() => {});
  }
}


// ==================== 6个新功能 ====================

function loadFavorites() {
  try {
    favorites = JSON.parse(localStorage.getItem('skillsMarketFavorites') || '[]');
  } catch(e) {
    favorites = [];
  }
}
function saveFavorites() {
  localStorage.setItem('skillsMarketFavorites', JSON.stringify(favorites));
}
function isFavorite(owner, name) {
  return favorites.some(f => f.owner === owner && f.name === name);
}
function toggleFavorite(owner, name) {
  const idx = favorites.findIndex(f => f.owner === owner && f.name === name);
  if (idx >= 0) {
    favorites.splice(idx, 1);
  } else {
    favorites.push({ owner, name });
  }
  saveFavorites();
  if (currentTab === 'favorites') {
    renderSkills();
  } else {
    const card = document.querySelector(`.skill-card[data-repo="${owner}/${name}"]`);
    if (card) {
      const icon = card.querySelector('.fav-icon');
      if (icon) {
        icon.textContent = isFavorite(owner, name) ? '⭐' : '☆';
        icon.title = isFavorite(owner, name) ? t('fav_remove') : t('fav_add');
      }
    }
  }
}

// 2. 对比功能
function toggleCompare(owner, name) {
  const idx = compareList.findIndex(f => f.owner === owner && f.name === name);
  if (idx >= 0) {
    compareList.splice(idx, 1);
  } else {
    if (compareList.length >= 3) {
      alert(t('compare_max'));
      return;
    }
    compareList.push({ owner, name });
  }
  updateCompareBar();
  document.querySelectorAll('.skill-card').forEach(card => {
    const repo = card.dataset.repo;
    if (repo) {
      const cb = card.querySelector('.compare-check');
      if (cb) {
        cb.checked = compareList.some(c => `${c.owner}/${c.name}` === repo);
      }
    }
  });
}

function updateCompareBar() {
  const bar = document.getElementById('compareBar');
  const count = document.getElementById('compareCount');
  if (compareList.length > 0) {
    bar.style.display = 'flex';
    count.textContent = compareList.length;
  } else {
    bar.style.display = 'none';
  }
}

function renderCompare() {
  const datasource = currentTab === 'favorites' ? getFavoritesRepos() : trendingData[currentTab] || [];
  const repos = compareList.map(c =>
    datasource.find(r => r.owner === c.owner && r.name === c.name)
  ).filter(Boolean);

  if (repos.length === 0) return;

  const fields = [
    { key: 'name', label: 'compare_field_name' },
    { key: 'owner', label: 'compare_field_owner' },
    { key: 'language', label: 'compare_field_language' },
    { key: 'category', label: 'compare_field_category' },
    { key: 'stars', label: 'compare_field_stars' },
    { key: 'starsPeriod', label: 'compare_field_period_stars' },
    { key: 'forks', label: 'compare_field_forks' },
    { key: 'issues', label: 'compare_field_issues' },
    { key: 'license', label: 'compare_field_license' },
    { key: 'updated', label: 'compare_field_updated' },
  ];

  let html = '<h2 class="modal-title">' + t('compare_title') + '</h2>';
  html += '<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th></th>';
  repos.forEach(r => {
    html += `<th><div class="compare-repo-name">${r.owner}/${r.name}</div></th>`;
  });
  html += '</tr></thead><tbody>';

  fields.forEach(f => {
    html += '<tr><td class="compare-field-label">' + t(f.label) + '</td>';
    repos.forEach(r => {
      let val = '';
      switch(f.key) {
        case 'name': val = r.name; break;
        case 'owner': val = r.owner; break;
        case 'language': val = r.language || '—'; break;
        case 'category': val = r.category || '—'; break;
        case 'stars': val = (r.total_stars || 0).toLocaleString(); break;
        case 'starsPeriod': val = (r.period_stars || 0).toLocaleString(); break;
        case 'forks': val = (r.forks || 0).toLocaleString(); break;
        case 'issues': val = (r.open_issues || 0).toLocaleString(); break;
        case 'license': val = r.license || '—'; break;
        case 'updated': val = r.pushed_at ? timeAgo(r.pushed_at) : '—'; break;
      }
      html += `<td>${val}</td>`;
    });
    html += '</tr>';
  });

  // Topics row
  html += '<tr><td class="compare-field-label">' + t('compare_field_topics') + '</td>';
  repos.forEach(r => {
    const topics = (r.topics || []).slice(0, 5).join(', ') || '—';
    html += `<td><span style="font-size:0.8rem;">${topics}</span></td>`;
  });
  html += '</tr>';

  html += '</tbody></table></div>';
  document.getElementById('compareContent').innerHTML = html;
  document.getElementById('compareOverlay').classList.add('active');
}

// 3. 排序功能

function sortRepos(repos) {
  const sorted = [...repos];
  switch(currentSort) {
    case 'stars':
      sorted.sort((a, b) => (b.total_stars || 0) - (a.total_stars || 0));
      break;
    case 'stars_period':
      sorted.sort((a, b) => (b.period_stars || 0) - (a.period_stars || 0));
      break;
    case 'updated':
      sorted.sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0));
      break;
    case 'issues':
      sorted.sort((a, b) => (b.open_issues || 0) - (a.open_issues || 0));
      break;
    case 'name':
      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      break;
    default: // rank - keep original order
      break;
  }
  return sorted;
}

// 4. 语言筛选
function populateLanguageFilter() {
  if (!trendingData) return;
  const datasource = currentTab === 'favorites' ? getFavoritesRepos() : trendingData[currentTab] || [];
  const allRepos = currentTab === 'favorites' ? 
    favorites.map(f => {
      for (const p of ['daily', 'weekly', 'monthly']) {
        const found = (trendingData[p] || []).find(r => r.owner === f.owner && r.name === f.name);
        if (found) return found;
      }
      return { owner: f.owner, name: f.name, language: null };
    }) : datasource;
  const langs = [...new Set(allRepos.map(r => r.language).filter(Boolean))].sort();
  const sel = document.getElementById('langFilter');
  const currentVal = sel ? sel.value : 'all';
  if (!sel) return;
  sel.innerHTML = '<option value="all">' + t('filter_language_all') + '</option>';
  langs.forEach(l => {
    sel.innerHTML += `<option value="${l}">${l}</option>`;
  });
  sel.value = currentVal || 'all';
}

function getFavoritesRepos() {
  const allRepos = [];
  for (const p of ['daily', 'weekly', 'monthly']) {
    (trendingData[p] || []).forEach(r => {
      if (favorites.some(f => f.owner === r.owner && f.name === r.name)) {
        if (!allRepos.some(a => a.owner === r.owner && a.name === r.name)) {
          allRepos.push(r);
        }
      }
    });
  }
  return allRepos;
}

// 5. README预览
async function fetchReadme(owner, name) {
  const container = document.getElementById('readmeContent');
  if (!container) return;
  const key = `${owner}/${name}`;
  if (readmeCache.has(key)) { container.innerHTML = readmeCache.get(key); return; }
  container.innerHTML = '<div class="readme-loading">' + t('modal_readme_loading') + '</div>';
  try {
    const resp = await fetch(`https://api.github.com/repos/${owner}/${name}/readme`);
    if (!resp.ok) throw new Error('Not found');
    const data = await resp.json();
    let content = atob(data.content);
    const bytes = new Uint8Array(content.length);
    for (let i = 0; i < content.length; i++) bytes[i] = content.charCodeAt(i);
    content = new TextDecoder('utf-8').decode(bytes);
    if (content.length > 50000) content = content.substring(0, 50000) + '\n\n... (truncated)';
    const html = window.marked ? window.marked.parse(content) : content;
    // Fix relative image paths in README (e.g. ./docs/logo.png → absolute raw URL)
    const rawBase = data.download_url ? data.download_url.replace(/\/[^/]+$/, '/') : '';
    let fixedHtml = html;
    if (rawBase) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = fixedHtml;
      tempDiv.querySelectorAll('img[src]').forEach(img => {
        const src = img.getAttribute('src');
        if (src && !/^(https?:|data:|\/\/)/i.test(src)) {
          img.setAttribute('src', rawBase + src.replace(/^\.\/+/, ''));
        }
      });
      fixedHtml = tempDiv.innerHTML;
    }
    readmeCache.set(key, fixedHtml);
    container.innerHTML = fixedHtml;
    // Add error fallback for all README images (e.g. api.star-history.com blocked)
    container.querySelectorAll('img').forEach(img => {
      if (img.complete && img.naturalWidth === 0) {
        img.style.display = 'none';
      } else {
        img.addEventListener('error', function() { this.style.display = 'none'; });
      }
    });
  } catch(e) {
    container.innerHTML = '<div class="readme-error">' + t('modal_readme_error') + '</div>';
  }
}

// 6. 星标历史
function showStarHistory(owner, name) {
  const chartContainer = document.getElementById('starChartContainer');
  if (!chartContainer) return;
  const imgUrl = `https://api.star-history.com/svg?repos=${owner}/${name}&type=Date`;
  const fullUrl = `https://star-history.com/#${owner}/${name}&Date`;
  chartContainer.innerHTML = `
    <a href="${fullUrl}" target="_blank" rel="noopener" style="display:block;">
      <img src="${imgUrl}" alt="Star History for ${owner}/${name}"
           style="width:100%;max-width:100%;border-radius:8px;border:1px solid var(--border-color);">
    </a>`;
  const img = chartContainer.querySelector('img');
  if (img) {
    if (img.complete && img.naturalWidth === 0) {
      img.style.display = 'none';
      const parent = img.parentElement;
      parent.innerHTML = `<a href="${fullUrl}" target="_blank" rel="noopener" style="display:block;text-align:center;padding:60px 20px;color:var(--text-secondary);"><p style="font-size:16px;margin-bottom:8px;">${t('modal_readme_error')}</p><span style="color:var(--accent-color);text-decoration:underline;">${t('starhistory_fallback')}</span></a>`;
    } else {
      img.addEventListener('error', function() {
        this.style.display = 'none';
        this.parentElement.innerHTML = `<a href="${fullUrl}" target="_blank" rel="noopener" style="display:block;text-align:center;padding:60px 20px;color:var(--text-secondary);"><p style="font-size:16px;margin-bottom:8px;">${t('modal_readme_error')}</p><span style="color:var(--accent-color);text-decoration:underline;">${t('starhistory_fallback')}</span></a>`;
      });
    }
  }
}

// 7. 模态框标签切换
function switchModalSection(section, owner, name) {
  document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.section-tab[data-section="${section}"]`);
  if (tab) tab.classList.add('active');
  const readmeDiv = document.getElementById('readmeContent');
  const chartDiv = document.getElementById('starChartContainer');
  if (section === 'readme') {
    if (readmeDiv) readmeDiv.style.display = 'block';
    if (chartDiv) chartDiv.style.display = 'none';
    if (readmeDiv && !readmeDiv.innerHTML.includes('<h') && !readmeDiv.innerHTML.includes('<p') && !readmeDiv.innerHTML.includes('<pre')) {
      fetchReadme(owner, name);
    }
  } else {
    if (readmeDiv) readmeDiv.style.display = 'none';
    if (chartDiv) chartDiv.style.display = 'block';
    if (chartDiv && !chartDiv.innerHTML.includes('iframe')) {
      showStarHistory(owner, name);
    }
  }
}

// 8. 初始化收藏夹
loadFavorites();

// 9. 修改renderSkills以支持排序和语言筛选
const originalRenderSkills = renderSkills;
renderSkills = function() {
  let repos = currentTab === 'favorites' ? getFavoritesRepos() : trendingData[currentTab] || [];

  if (!repos.length) {
    skillsGrid.innerHTML = '';
    noResults.style.display = 'block';
    if (currentTab === 'favorites') {
      const p = noResults.querySelector('p:first-child');
      if (p) p.textContent = t('fav_empty');
    }
    return;
  }

  if (currentCategory !== 'all') {
    repos = repos.filter(r => r.category === currentCategory);
  }

  const langFilter = document.getElementById('langFilter');
  if (langFilter && langFilter.value !== 'all') {
    repos = repos.filter(r => r.language === langFilter.value);
  }

  repos = sortRepos(repos);

  skillsGrid.innerHTML = '';
  repos.forEach((repo, index) => skillsGrid.appendChild(createRepoCard(repo, index)));
  noResults.style.display = repos.length ? 'none' : 'block';
  updateStats();
  populateLanguageFilter();
};

// 10. 修改createRepoCard添加收藏和对比按钮
const originalCreateRepoCard = createRepoCard;
createRepoCard = function(repo, index) {
  const card = originalCreateRepoCard(repo, index);
  card.dataset.repo = `${repo.owner}/${repo.name}`;

  // 收藏按钮 — 卡片右上角
  const favBtn = document.createElement('button');
  favBtn.className = 'fav-btn fav-btn-topright';
  favBtn.title = isFavorite(repo.owner, repo.name) ? t('fav_remove') : t('fav_add');
  favBtn.innerHTML = `<span class="fav-icon">${isFavorite(repo.owner, repo.name) ? '⭐' : '☆'}</span>`;
  favBtn.onclick = function(e) { e.stopPropagation(); toggleFavorite(repo.owner, repo.name); };
  card.appendChild(favBtn);

  // 排名徽章 — 移到卡片顶部左侧
  const rankWrap = card.querySelector('.card-rank-wrap');
  const cardHeader = card.querySelector('.card-header');
  if (rankWrap && cardHeader) {
    cardHeader.insertBefore(rankWrap, cardHeader.firstChild);
    rankWrap.classList.add('rank-top-left');
  }

  // 对比勾选 — 放在卡片底部
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'card-actions-right';
  actionsDiv.innerHTML = `
    <label class="compare-toggle" title="${t('compare_add')}" onclick="event.stopPropagation()">
      <input type="checkbox" class="compare-check" ${compareList.some(c => c.owner===repo.owner && c.name===repo.name) ? 'checked' : ''} onchange="toggleCompare('${repo.owner}','${repo.name}')">
      <span class="compare-toggle-label" data-i18n="compare_add">${t('compare_add')}</span>
    </label>
  `;
  const footer = card.querySelector('.card-footer');
  if (footer) {
    footer.appendChild(actionsDiv);
  }
  return card;
};


// ==================== 捐赠 & 反馈功能 ====================

// ---------- Donate Modal ----------
(function initDonateModal() {
  const donateBtn = document.getElementById('donateBtn');
  const donateOverlay = document.getElementById('donateOverlay');
  const donateClose = document.getElementById('donateClose');

  if (!donateBtn || !donateOverlay || !donateClose) return;

  function openDonate() {
    donateOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDonate() {
    donateOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  donateBtn.addEventListener('click', openDonate);
  donateClose.addEventListener('click', closeDonate);
  donateOverlay.addEventListener('click', function(e) {
    if (e.target === donateOverlay) closeDonate();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && donateOverlay.classList.contains('active')) closeDonate();
  });
})();

// ---------- Feedback Modal ----------
(function initFeedbackModal() {
  const feedbackFab = document.getElementById('feedbackFab');
  const feedbackOverlay = document.getElementById('feedbackOverlay');
  const feedbackClose = document.getElementById('feedbackClose');
  const feedbackSubmit = document.getElementById('feedbackSubmit');

  if (!feedbackFab || !feedbackOverlay || !feedbackClose || !feedbackSubmit) return;

  function openFeedback() {
    feedbackOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFeedback() {
    feedbackOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  feedbackFab.addEventListener('click', openFeedback);
  feedbackClose.addEventListener('click', closeFeedback);
  feedbackOverlay.addEventListener('click', function(e) {
    if (e.target === feedbackOverlay) closeFeedback();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && feedbackOverlay.classList.contains('active')) closeFeedback();
  });

  // Submit → generate GitHub Issue URL
  feedbackSubmit.addEventListener('click', function() {
    const type = document.querySelector('input[name="feedbackType"]:checked');
    const typeVal = type ? type.value : 'bug';
    const typeLabel = t('feedback_type_' + typeVal) || typeVal;
    const desc = document.getElementById('feedbackDesc').value.trim();

    if (!desc) {
      alert(t('feedback_empty_warning'));
      return;
    }

    const typeLabelMap = { bug: 'Bug 反馈', feature: '功能建议', other: '其他' };
    const title = encodeURIComponent('[' + typeLabelMap[typeVal] + '] ' + desc.slice(0, 60));
    const body = encodeURIComponent(
      '**反馈类型**: ' + typeLabel + '\n\n' +
      '**描述**:\n' + desc + '\n\n' +
      '---\n*来自 AI Skills Market 反馈表单*'
    );
    const issueUrl = 'https://github.com/tang-coder-hub/ai-skills-market/issues/new?title=' + title + '&body=' + body;

    window.open(issueUrl, '_blank', 'noopener');
    closeFeedback();
    document.getElementById('feedbackDesc').value = '';
  });
})();


