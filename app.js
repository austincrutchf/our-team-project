/* =========================================================
   FirstDay — app.js (Phase 1)
   Onboarding, dashboard, and the Key Terms module.
   Progress is saved in the browser (localStorage).
   ========================================================= */
(() => {
  'use strict';

  /* ---------------- Content ---------------- */
  const TRACKS = {
    it:         { name: 'IT',              blurb: 'Help desk, systems, and automation' },
    finance:    { name: 'Finance',         blurb: 'Valuation, markets, and analysis' },
    marketing:  { name: 'Marketing',       blurb: 'Campaigns, analytics, and growth' },
    accounting: { name: 'Accounting',      blurb: 'Ledgers, reconciliations, and close' },
    consulting: { name: 'Consulting',      blurb: 'Client problems, structured fast' },
    hr:         { name: 'Human Resources', blurb: 'Hiring, onboarding, and people ops' }
  };

  const TERMS = {
    it: [
      { t: 'API', d: 'Application Programming Interface — a defined set of rules that lets one program request data or actions from another.' },
      { t: 'Cron job', d: 'A task scheduled to run automatically at set times or intervals, like every Monday at 9am.' },
      { t: 'Active Directory', d: "Microsoft's directory service for managing user accounts, computers, and access permissions on a company network." },
      { t: 'Help desk ticket', d: 'A logged support request that is assigned, tracked, and closed once the issue is resolved.' },
      { t: 'VPN', d: 'Virtual Private Network — an encrypted connection that lets remote employees securely reach the company network.' },
      { t: 'SLA', d: 'Service Level Agreement — a commitment that defines expected response and resolution times for a service.' },
      { t: 'Patch management', d: 'The process of testing and applying software updates that fix bugs and security vulnerabilities.' },
      { t: 'DNS', d: 'Domain Name System — the system that translates website names into the IP addresses computers use.' }
    ],
    finance: [
      { t: 'EBITDA', d: 'Earnings before interest, taxes, depreciation, and amortization — a common measure of operating profitability.' },
      { t: 'DCF', d: 'Discounted cash flow — a valuation method that estimates value by discounting projected future cash flows to today.' },
      { t: 'WACC', d: 'Weighted average cost of capital — the blended rate a company pays for its debt and equity financing.' },
      { t: 'Liquidity', d: 'How quickly an asset can be turned into cash without significantly affecting its price.' },
      { t: 'P/E ratio', d: "A company's share price divided by its earnings per share." },
      { t: 'Basis point', d: 'One hundredth of a percentage point (0.01%), used to describe changes in rates and yields.' },
      { t: 'Working capital', d: 'Current assets minus current liabilities — a measure of short-term financial health.' },
      { t: 'Due diligence', d: "An investigation of a business's financials, legal standing, and risks before a deal is completed." }
    ],
    marketing: [
      { t: 'KPI', d: 'Key performance indicator — a measurable value that shows whether a goal is being met.' },
      { t: 'CTR', d: 'Click-through rate — the share of people who click a link or ad out of everyone who saw it.' },
      { t: 'Conversion rate', d: 'The percentage of visitors who complete a desired action, such as a purchase or sign-up.' },
      { t: 'CAC', d: 'Customer acquisition cost — the total sales and marketing spend needed to win one new customer.' },
      { t: 'SEO', d: 'Search engine optimization — improving content so it ranks higher in unpaid search results.' },
      { t: 'A/B test', d: 'An experiment that shows two versions of something to different groups to see which performs better.' },
      { t: 'Buyer persona', d: 'A research-based profile of an ideal customer used to guide messaging and targeting.' },
      { t: 'ROAS', d: 'Return on ad spend — revenue generated for every dollar spent on advertising.' }
    ],
    accounting: [
      { t: 'Accrual accounting', d: 'Recording revenue when it is earned and expenses when they are incurred, regardless of when cash moves.' },
      { t: 'Accounts receivable', d: 'Money customers owe the company for goods or services already delivered.' },
      { t: 'Accounts payable', d: 'Money the company owes its suppliers for goods or services it has received.' },
      { t: 'General ledger', d: "The master record of all a company's financial transactions, organized by account." },
      { t: 'Reconciliation', d: 'Comparing two sets of records, such as a bank statement and the ledger, to make sure they match.' },
      { t: 'Depreciation', d: 'Spreading the cost of a physical asset over the years it is expected to be useful.' },
      { t: 'Journal entry', d: 'A record of a transaction using debits and credits that must balance.' },
      { t: 'Month-end close', d: 'The process of finalizing, reviewing, and locking the books at the end of each month.' }
    ],
    consulting: [
      { t: 'Deliverable', d: 'A specific output promised to the client, such as a report, model, or presentation.' },
      { t: 'Scope creep', d: 'When a project gradually grows beyond what was originally agreed, without added time or budget.' },
      { t: 'MECE', d: 'Mutually exclusive, collectively exhaustive — breaking a problem into parts that do not overlap and cover everything.' },
      { t: 'Stakeholder', d: 'Anyone who is affected by or has influence over a project and its outcome.' },
      { t: 'Hypothesis-driven approach', d: 'Starting with a likely answer and using analysis to prove or disprove it, instead of analyzing everything first.' },
      { t: 'Utilization rate', d: "The share of a consultant's working hours that are billed to clients." },
      { t: 'Engagement', d: 'A single client project, from kickoff to final delivery.' },
      { t: 'Executive summary', d: 'A short opening section that gives busy leaders the key findings and recommendations up front.' }
    ],
    hr: [
      { t: 'Onboarding', d: 'The process of integrating a new hire, from paperwork and setup to training and introductions.' },
      { t: 'ATS', d: 'Applicant tracking system — software used to post jobs, collect applications, and move candidates through hiring.' },
      { t: 'Total compensation', d: 'The full value of what an employee receives, including salary, bonuses, and benefits.' },
      { t: 'Performance review', d: "A formal evaluation of an employee's work, usually done on a regular schedule." },
      { t: 'Retention', d: 'An organization’s ability to keep its employees over time.' },
      { t: 'Open enrollment', d: 'The yearly window when employees can sign up for or change their benefits.' },
      { t: 'Exempt employee', d: 'An employee who, under U.S. labor law, is not entitled to overtime pay, typically salaried professionals.' },
      { t: 'Headcount', d: 'The number of people employed, often used when planning budgets and hiring.' }
    ]
  };

  const COMING_NEXT = [
    { title: 'Boss tasks', text: 'Get real assignments from your simulated boss, submit your work, and get graded.' },
    { title: 'Resume & cover letter review', text: 'Submit your materials and get specific, line-by-line feedback.' },
    { title: 'Mock interviews', text: 'Answer interview questions for your track and get scored on your answers.' },
    { title: 'Chat with your boss', text: 'Ask questions and get feedback from your manager between tasks.' }
  ];

  /* ---------------- Saved state ---------------- */
  const STORE_KEY = 'firstday:v1';
  const loadState = () => {
    try { const raw = localStorage.getItem(STORE_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  };
  const saveState = () => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  };
  let state = loadState(); // { name, track, mastered: { [track]: [term] }, quizBest: { [track]: pct } }
  if (state && !TRACKS[state.track]) state = null;

  /* ---------------- Helpers ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  const trackTerms = () => TERMS[state.track];
  const masteredList = () => {
    state.mastered = state.mastered || {};
    state.mastered[state.track] = state.mastered[state.track] || [];
    return state.mastered[state.track];
  };
  const isMastered = term => masteredList().includes(term);
  const setMastered = (term, on) => {
    const list = masteredList();
    const i = list.indexOf(term);
    if (on && i === -1) list.push(term);
    if (!on && i > -1) list.splice(i, 1);
    saveState();
  };
  const masteredCount = () => trackTerms().filter(x => isMastered(x.t)).length;
  const bestQuiz = () => (state.quizBest && state.quizBest[state.track] != null) ? state.quizBest[state.track] : null;

  /* ---------------- Elements ---------------- */
  const landing = $('#landing');
  const app = $('#app');
  const main = $('#app-main');
  const modal = $('#onboard');
  const modalBody = $('#onboard-body');
  const nav = $('.nav');

  /* ---------------- Onboarding ---------------- */
  let draft = { name: '', track: null, step: 1, mode: 'new', note: '' };

  function openOnboarding(mode = 'new', note = '') {
    draft = {
      name: state ? state.name : '',
      track: state ? state.track : null,
      step: mode === 'track' ? 2 : 1,
      mode, note
    };
    renderOnboarding();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeOnboarding() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function renderOnboarding() {
    if (draft.step === 1) {
      modalBody.innerHTML = `
        <p class="eyebrow">Step 1 of 2</p>
        <h2 id="onboard-title">Let's set up your first day.</h2>
        ${draft.note ? `<p class="page-sub">${esc(draft.note)}</p>` : ''}
        <label class="field-label" for="ob-name">What should your boss call you?</label>
        <input class="input" id="ob-name" type="text" maxlength="40" autocomplete="given-name" placeholder="First name" value="${esc(draft.name)}">
        <p class="form-error" id="ob-error" role="alert"></p>
        <div class="modal-foot">
          <span class="hint">Your progress is saved on this device.</span>
          <button class="btn btn-primary" data-action="ob-next">Continue</button>
        </div>`;
      const input = $('#ob-name');
      input.focus();
      input.addEventListener('keydown', e => { if (e.key === 'Enter') obNext(); });
    } else {
      const switching = draft.mode === 'track';
      modalBody.innerHTML = `
        <p class="eyebrow">${switching ? 'Change track' : 'Step 2 of 2'}</p>
        <h2 id="onboard-title">Pick your track.</h2>
        <p class="page-sub">Your key terms, tasks, and interviews are built around this. You can change it anytime.</p>
        <div class="track-grid">
          ${Object.entries(TRACKS).map(([id, t]) => `
            <button type="button" class="track-opt ${draft.track === id ? 'is-selected' : ''}" data-track="${id}" aria-pressed="${draft.track === id}">
              <strong>${t.name}</strong><span>${t.blurb}</span>
            </button>`).join('')}
        </div>
        <div class="modal-foot">
          ${switching ? '<span></span>' : '<button class="text-btn" data-action="ob-back">Back</button>'}
          <button class="btn btn-primary" data-action="ob-finish" ${draft.track ? '' : 'disabled'}>
            ${switching ? 'Switch track' : 'Start my first day'}
          </button>
        </div>`;
    }
  }

  function obNext() {
    const value = $('#ob-name').value.trim();
    if (!value) { $('#ob-error').textContent = 'Add your name to continue.'; return; }
    draft.name = value;
    draft.step = 2;
    renderOnboarding();
  }

  function obFinish() {
    if (!draft.track) return;
    if (!state) state = { name: draft.name, track: draft.track, mastered: {}, quizBest: {} };
    else { state.name = draft.name || state.name; state.track = draft.track; }
    saveState();
    closeOnboarding();
    openApp('dashboard');
  }

  /* ---------------- App navigation ---------------- */
  function openApp(view) {
    landing.hidden = true;
    app.hidden = false;
    $('#app-name').textContent = state.name;
    $('#app-track').textContent = TRACKS[state.track].name;
    go(view);
    window.scrollTo(0, 0);
  }

  function go(view) {
    $$('.side-item[data-view]').forEach(b => b.classList.toggle('is-active', b.dataset.view === view));
    if (view === 'terms') renderTerms();
    else renderDashboard();
    window.scrollTo(0, 0);
  }

  function showLanding() {
    app.hidden = true;
    landing.hidden = false;
    updateNavStart();
    window.scrollTo(0, 0);
  }

  function updateNavStart() {
    $('#nav-start').textContent = state ? 'Open FirstDay' : 'Get started';
  }

  /* ---------------- Dashboard ---------------- */
  function renderDashboard() {
    const track = TRACKS[state.track];
    const total = trackTerms().length;
    const done = masteredCount();
    const pct = Math.round((done / total) * 100);
    const best = bestQuiz();

    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">${esc(track.name)} track</p>
        <h1>Welcome, ${esc(state.name)}.</h1>
        <p class="page-sub">Here's where you stand before day one.</p>
      </div>

      <div class="stat-cards">
        <div class="card">
          <p class="card-label">Key terms mastered</p>
          <div class="card-value">${done}/${total}</div>
          <div class="bar" aria-hidden="true"><span style="width:${pct}%"></span></div>
        </div>
        <div class="card">
          <p class="card-label">Best quiz score</p>
          <div class="card-value">${best == null ? '&mdash;' : best + '%'}</div>
          <p class="hint">${best == null ? 'Take the key terms quiz to set one.' : 'Retake it anytime to improve.'}</p>
        </div>
        <div class="card">
          <p class="card-label">Your track</p>
          <div class="card-value card-value-sm">${esc(track.name)}</div>
          <button class="text-btn" data-action="change-track">Change track</button>
        </div>
      </div>

      <h2 class="block-title">Your modules</h2>
      <div class="module-grid">
        <div class="card module">
          <span class="status status-open">Available</span>
          <h3>Key terms</h3>
          <p>Flashcards, a searchable glossary, and a quiz for the ${esc(track.name)} track.</p>
          <button class="btn btn-primary btn-small" data-view="terms">Open key terms</button>
        </div>
        ${COMING_NEXT.map(m => `
          <div class="card module is-soon">
            <span class="status status-soon">Coming next</span>
            <h3>${esc(m.title)}</h3>
            <p>${esc(m.text)}</p>
          </div>`).join('')}
      </div>

      <p class="reset-row"><button class="text-btn text-btn-muted" data-action="reset">Reset all progress on this device</button></p>`;
  }

  /* ---------------- Key terms ---------------- */
  let termsTab = 'study';
  let deck = null;                 // { track, cards }
  let fc = { i: 0, flipped: false };
  let quiz = null;                 // { track, qs, i, score, picked, done }

  function renderTerms() {
    const track = TRACKS[state.track];
    const tabs = [['study', 'Study'], ['list', 'All terms'], ['quiz', 'Quiz']];
    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">${esc(track.name)} track</p>
        <h1>Key terms</h1>
        <p class="page-sub">The vocabulary your team will assume you already know.</p>
      </div>
      <div class="tabs" role="tablist">
        ${tabs.map(([id, label]) => `
          <button class="tab ${termsTab === id ? 'is-active' : ''}" data-tab="${id}" role="tab" aria-selected="${termsTab === id}">${label}</button>`).join('')}
      </div>
      <div id="terms-body"></div>`;
    renderTermsBody();
  }

  function renderTermsBody() {
    const body = $('#terms-body');
    if (termsTab === 'list') renderList(body);
    else if (termsTab === 'quiz') renderQuiz(body);
    else renderStudy(body);
  }

  /* Study (flashcards) */
  function newDeck() {
    deck = { track: state.track, cards: shuffle(trackTerms()) };
    fc = { i: 0, flipped: false };
  }

  function renderStudy(body) {
    if (!deck || deck.track !== state.track) newDeck();
    const total = deck.cards.length;

    if (fc.i >= total) {
      body.innerHTML = `
        <div class="card result">
          <p class="card-label">Deck complete</p>
          <div class="card-value">${masteredCount()}/${total}</div>
          <p class="page-sub">terms mastered on the ${esc(TRACKS[state.track].name)} track.</p>
          <div class="btn-row center">
            <button class="btn btn-primary" data-action="fc-restart">Study again</button>
            <button class="btn btn-ghost" data-tab="quiz">Take the quiz</button>
          </div>
        </div>`;
      return;
    }

    const card = deck.cards[fc.i];
    body.innerHTML = `
      <button type="button" class="flashcard ${fc.flipped ? 'is-flipped' : ''}" data-action="fc-flip" aria-live="polite">
        <span class="fc-side">${fc.flipped ? 'Definition' : 'Term'}</span>
        ${fc.flipped ? `<span class="fc-def">${esc(card.d)}</span>` : `<span class="fc-term">${esc(card.t)}</span>`}
        <span class="hint">${fc.flipped ? 'Click to see the term' : 'Click to reveal the definition'}</span>
      </button>
      <div class="fc-controls">
        <span class="fc-count">Card ${fc.i + 1} of ${total}${isMastered(card.t) ? ' &middot; Mastered' : ''}</span>
        <div class="btn-row">
          <button class="btn btn-ghost btn-small" data-action="fc-learning">Still learning</button>
          <button class="btn btn-primary btn-small" data-action="fc-got">Got it</button>
        </div>
      </div>`;
  }

  function nextCard(masteredIt) {
    const card = deck.cards[fc.i];
    setMastered(card.t, masteredIt);
    fc.i += 1;
    fc.flipped = false;
    renderTermsBody();
  }

  /* All terms (glossary) */
  function renderList(body) {
    const sorted = trackTerms().slice().sort((a, b) => a.t.localeCompare(b.t));
    body.innerHTML = `
      <input class="input" id="term-search" type="search" placeholder="Search terms or definitions" aria-label="Search terms">
      <div id="term-list">
        ${sorted.map(x => `
          <div class="term-row">
            <div><h4>${esc(x.t)}</h4><p>${esc(x.d)}</p></div>
            <button class="chip-btn ${isMastered(x.t) ? 'is-on' : ''}" data-action="toggle-master" data-term="${esc(x.t)}" aria-pressed="${isMastered(x.t)}">
              ${isMastered(x.t) ? 'Mastered' : 'Mark mastered'}
            </button>
          </div>`).join('')}
      </div>
      <p class="page-sub" id="term-empty" hidden>No terms match that search.</p>`;

    $('#term-search').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      let shown = 0;
      $$('#term-list .term-row').forEach(row => {
        const text = ($('h4', row).textContent + ' ' + $('p', row).textContent).toLowerCase();
        const hit = text.includes(q);
        row.hidden = !hit;
        if (hit) shown += 1;
      });
      $('#term-empty').hidden = shown > 0;
    });
  }

  function toggleMastered(btn) {
    const term = btn.dataset.term;
    const on = !isMastered(term);
    setMastered(term, on);
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', on);
    btn.textContent = on ? 'Mastered' : 'Mark mastered';
  }

  /* Quiz */
  function newQuiz() {
    const pool = trackTerms();
    quiz = {
      track: state.track,
      qs: shuffle(pool).map(card => ({
        answer: card.t,
        def: card.d,
        opts: shuffle([card.t, ...shuffle(pool.filter(x => x.t !== card.t)).slice(0, 3).map(x => x.t)])
      })),
      i: 0, score: 0, picked: null, done: false
    };
  }

  function renderQuiz(body) {
    if (!quiz || quiz.track !== state.track) newQuiz();
    const n = quiz.qs.length;

    if (quiz.done) {
      const pct = Math.round((quiz.score / n) * 100);
      const best = bestQuiz();
      body.innerHTML = `
        <div class="card result">
          <p class="card-label">Your score</p>
          <div class="card-value">${pct}%</div>
          <p class="page-sub">${quiz.score} of ${n} correct${best != null ? ` &middot; Best: ${best}%` : ''}</p>
          <div class="btn-row center">
            <button class="btn btn-primary" data-action="quiz-restart">Retake quiz</button>
            <button class="btn btn-ghost" data-tab="study">Back to studying</button>
          </div>
        </div>`;
      return;
    }

    const q = quiz.qs[quiz.i];
    const answered = quiz.picked !== null;
    body.innerHTML = `
      <div class="card">
        <p class="card-label">Question ${quiz.i + 1} of ${n} &middot; Score ${quiz.score}</p>
        <p class="quiz-q">${esc(q.def)}</p>
        <div class="quiz-opts">
          ${q.opts.map(opt => {
            let cls = '';
            if (answered && opt === q.answer) cls = 'is-right';
            else if (answered && opt === quiz.picked) cls = 'is-wrong';
            return `<button class="quiz-opt ${cls}" data-action="quiz-pick" data-opt="${esc(opt)}" ${answered ? 'disabled' : ''}>${esc(opt)}</button>`;
          }).join('')}
        </div>
        <div class="quiz-foot">
          <span class="fc-count" aria-live="polite">
            ${!answered ? 'Which term matches this definition?' : quiz.picked === q.answer ? 'Correct.' : `Not quite — it's ${esc(q.answer)}.`}
          </span>
          ${answered ? `<button class="btn btn-primary btn-small" data-action="quiz-next">${quiz.i + 1 === n ? 'See results' : 'Next question'}</button>` : ''}
        </div>
      </div>`;
  }

  function quizPick(opt) {
    if (quiz.picked !== null) return;
    quiz.picked = opt;
    if (opt === quiz.qs[quiz.i].answer) quiz.score += 1;
    renderTermsBody();
  }

  function quizNext() {
    quiz.i += 1;
    quiz.picked = null;
    if (quiz.i >= quiz.qs.length) {
      quiz.done = true;
      const pct = Math.round((quiz.score / quiz.qs.length) * 100);
      state.quizBest = state.quizBest || {};
      const prev = state.quizBest[state.track];
      if (prev == null || pct > prev) state.quizBest[state.track] = pct;
      saveState();
    }
    renderTermsBody();
  }

  /* ---------------- Landing extras ---------------- */
  function demoSubmit(btn) {
    $('#demo-status').textContent = 'Graded';
    $('#demo-grade').classList.add('show');
    btn.disabled = true;
    btn.textContent = 'Submitted';
  }

  function toggleNav(force) {
    const open = typeof force === 'boolean' ? force : !nav.classList.contains('nav-open');
    nav.classList.toggle('nav-open', open);
    $('.nav-toggle').setAttribute('aria-expanded', open);
  }

  /* ---------------- Events ---------------- */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action], [data-view], [data-tab], [data-track]');
    if (!el) {
      // Close the mobile menu after following a normal nav link
      if (e.target.closest('.nav-links a')) toggleNav(false);
      return;
    }
    if (el.tagName === 'A') e.preventDefault();

    if (el.dataset.track) { draft.track = el.dataset.track; renderOnboarding(); return; }
    if (el.dataset.view) { go(el.dataset.view); return; }
    if (el.dataset.tab) {
      termsTab = el.dataset.tab;
      if (termsTab === 'quiz' && quiz && quiz.done) newQuiz();
      if (termsTab === 'study' && fc.i >= (deck ? deck.cards.length : 0)) newDeck();
      renderTerms();
      return;
    }

    switch (el.dataset.action) {
      case 'start':
        toggleNav(false);
        state ? openApp('dashboard') : openOnboarding('new');
        break;
      case 'login':
        toggleNav(false);
        state ? openApp('dashboard')
              : openOnboarding('new', "There's no saved progress on this device yet — set up your profile to get started.");
        break;
      case 'signout': showLanding(); break;
      case 'change-track': openOnboarding('track'); break;
      case 'reset':
        if (confirm('Reset all FirstDay progress on this device? This can’t be undone.')) {
          try { localStorage.removeItem(STORE_KEY); } catch (err) { /* ignore */ }
          state = null; deck = null; quiz = null; termsTab = 'study';
          showLanding();
        }
        break;
      case 'close-onboard': closeOnboarding(); break;
      case 'ob-next': obNext(); break;
      case 'ob-back': draft.step = 1; renderOnboarding(); break;
      case 'ob-finish': obFinish(); break;
      case 'fc-flip': fc.flipped = !fc.flipped; renderTermsBody(); break;
      case 'fc-got': nextCard(true); break;
      case 'fc-learning': nextCard(false); break;
      case 'fc-restart': newDeck(); renderTermsBody(); break;
      case 'toggle-master': toggleMastered(el); break;
      case 'quiz-pick': quizPick(el.dataset.opt); break;
      case 'quiz-next': quizNext(); break;
      case 'quiz-restart': newQuiz(); renderTermsBody(); break;
      case 'demo-submit': demoSubmit(el); break;
      case 'nav-toggle': toggleNav(); break;
    }
  });

  // Close the modal by clicking the backdrop or pressing Escape
  modal.addEventListener('click', e => { if (e.target === modal) closeOnboarding(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeOnboarding(); });

  updateNavStart();
})();