(() => {
  const state = {
    filter: 'all',
    query: ''
  };

  const selectors = {
    blogList: document.querySelector('[data-blog-list]'),
    stats: document.querySelector('[data-stats]'),
    emptyState: document.querySelector('[data-empty-state]'),
    searchInput: document.querySelector('#searchInput'),
    filterButtons: [...document.querySelectorAll('[data-filter]')],
    clearButton: document.querySelector('[data-clear]'),
    liveRegion: document.querySelector('main [aria-live]')
  };

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return 'Recently updated';
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
  };

  const escapeHtml = (value = '') =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const renderList = (items = []) => items.map((item) => `<li>${item}</li>`).join('');

  const renderPractice = (items = []) => items.map((item) => `<li>${item}</li>`).join('');

  const renderResources = (items = []) =>
    items
      .map((resource) => `<a href="${resource.url}" target="_blank" rel="noopener">${resource.label}</a>`)
      .join(' • ');

  const buildCard = (blog) => `
    <article class="blog-card" data-tags="${blog.tags.join(', ')}">
      <div class="card-header">
        <span class="badge">${blog.category}</span>
        <h2>${blog.name}</h2>
        <p>${blog.summary}</p>
        <div class="meta">
          <span>${blog.level}</span>
          <span>Study time: ${blog.effort}</span>
          <span>Updated ${formatDate(blog.lastUpdated)}</span>
        </div>
      </div>
      <div class="list-block">
        <p class="section-title">Core fundamentals</p>
        <ul>${renderList(blog.basics)}</ul>
      </div>
      <div class="list-block">
        <p class="section-title">Advanced tactics</p>
        <ul>${renderList(blog.advanced)}</ul>
      </div>
      <div class="list-block">
        <p class="section-title">Example: ${blog.example.title}</p>
        <p>${blog.example.description}</p>
        <pre class="code-snippet"><code>${escapeHtml(blog.example.code)}</code></pre>
      </div>
      <div class="list-block">
        <p class="section-title">Popular practice questions</p>
        <ol class="practice-list">${renderPractice(blog.practiceQuestions)}</ol>
      </div>
      <div class="meta">
        <span><strong>Resources:</strong> ${renderResources(blog.resources)}</span>
      </div>
      <div class="tags">
        ${blog.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </article>
  `;

  const applyFilters = () => {
    const query = state.query.toLowerCase();
    return techBlogs.filter((blog) => {
      const matchesFilter = state.filter === 'all' || blog.category === state.filter;
      if (!matchesFilter) return false;
      if (!query) return true;
      const haystack = [
        blog.name,
        blog.summary,
        blog.basics.join(' '),
        blog.advanced.join(' '),
        blog.tags.join(' ')
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  };

  const updateStats = (count) => {
    selectors.stats.textContent = `Showing ${count} of ${techBlogs.length} stacks · Updated ${lastUpdatedAt}`;
  };

  const render = () => {
    selectors.liveRegion?.setAttribute('aria-busy', 'true');
    const filtered = applyFilters();
    selectors.blogList.innerHTML = filtered.map(buildCard).join('');
    selectors.emptyState.hidden = filtered.length > 0;
    updateStats(filtered.length);
    selectors.liveRegion?.setAttribute('aria-busy', 'false');
  };

  const setFilter = (value) => {
    state.filter = value;
    selectors.filterButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.filter === value);
    });
    render();
  };

  const bindEvents = () => {
    selectors.searchInput.addEventListener('input', (event) => {
      state.query = event.target.value.trim().toLowerCase();
      render();
    });

    selectors.filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        setFilter(button.dataset.filter);
      });
    });

    selectors.clearButton.addEventListener('click', () => {
      state.query = '';
      state.filter = 'all';
      selectors.searchInput.value = '';
      setFilter('all');
    });
  };

  const init = () => {
    if (!Array.isArray(techBlogs)) {
      selectors.blogList.innerHTML = '<p>Unable to load stacks. Check data.js</p>';
      return;
    }
    bindEvents();
    render();
  };

  init();
})();
