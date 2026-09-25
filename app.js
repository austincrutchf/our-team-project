/* =========================================================
   FirstDay — app.js
   Accounts (Firebase Auth), cloud-synced progress (Firestore),
   onboarding, dashboard, key terms, and account settings.

   If firebase-config.js hasn't been filled in yet, the app
   still works in "this device only" mode using localStorage.
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

  /* ---------------- Helpers ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const uiErr = msg => Object.assign(new Error(msg), { ui: true });

  /* ---------------- Firebase setup ---------------- */
  const cfg = window.FIRSTDAY_FIREBASE_CONFIG || {};
  const CLOUD = Boolean(window.firebase && cfg.apiKey && !/PASTE/i.test(cfg.apiKey));
  let auth = null, db = null, FV = null;

  if (CLOUD) {
    firebase.initializeApp(cfg);
    auth = firebase.auth();
    db = firebase.firestore();
    FV = firebase.firestore.FieldValue;
    // Offline support: progress is cached and syncs when the connection returns.
    db.enablePersistence({ synchronizeTabs: true }).catch(() => { /* private mode or unsupported — fine */ });
    auth.useDeviceLanguage();
  }

  /* ---------------- Local fallback storage ---------------- */
  const LOCAL_KEY = 'firstday:v1';
  const loadLocal = () => { try { const r = localStorage.getItem(LOCAL_KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } };
  const saveLocal = d => { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(d)); } catch (e) { /* ignore */ } };
  const clearLocal = () => { try { localStorage.removeItem(LOCAL_KEY); } catch (e) { /* ignore */ } };

  const normalize = d => ({
    name: d && typeof d.name === 'string' && d.name.trim() ? d.name.trim().slice(0, 40) : 'Intern',
    track: d && TRACKS[d.track] ? d.track : null,
    mastered: d && d.mastered && typeof d.mastered === 'object' ? d.mastered : {},
    quizBest: d && d.quizBest && typeof d.quizBest === 'object' ? d.quizBest : {}
  });

  /* ---------------- App state ---------------- */
  let state = null;          // { name, track, mastered, quizBest }
  let user = null;           // Firebase user
  let unsubDoc = null;       // Firestore listener
  let pendingName = null;    // name typed at sign-up
  let deleting = false;
  let currentView = 'dashboard';

  if (!CLOUD) {
    const local = loadLocal();
    if (local && TRACKS[local.track]) state = normalize(local);
  }

  const userRef = () => db.collection('users').doc(user.uid);
  const trackTerms = () => TERMS[state.track];
  const masteredList = () => {
    state.mastered[state.track] = state.mastered[state.track] || [];
    return state.mastered[state.track];
  };
  const isMastered = term => masteredList().includes(term);
  const setMastered = (term, on) => {
    const list = masteredList();
    const i = list.indexOf(term);
    if (on && i === -1) list.push(term);
    if (!on && i > -1) list.splice(i, 1);
    persist();
  };
  const masteredCount = () => trackTerms().filter(x => isMastered(x.t)).length;
  const bestQuiz = () => state.quizBest[state.track] != null ? state.quizBest[state.track] : null;

  /* ---------------- Saving + sync status ---------------- */
  let saveTimer = null;
  let inflight = 0;

  function persist() {
    if (!state) return;
    if (!CLOUD) { saveLocal(state); setSync('local'); return; }
    if (!user) return;
    clearTimeout(saveTimer);
    setSync('saving');
    saveTimer = setTimeout(flush, 450);
  }

  function flush() {
    clearTimeout(saveTimer);
    saveTimer = null;
    if (!CLOUD || !user || !state || deleting) return Promise.resolve();
    inflight += 1;
    if (!navigator.onLine) setSync('offline');
    return userRef().update({
      name: state.name,
      track: state.track,
      mastered: state.mastered,
      quizBest: state.quizBest,
      updatedAt: FV.serverTimestamp()
    }).then(() => {
      inflight -= 1;
      if (!inflight && !saveTimer) setSync('saved');
    }).catch(err => {
      inflight -= 1;
      console.error(err);
      setSync('error');
      toast(friendly(err));
    });
  }

  function setSync(s) {
    const el = $('#sync-status');
    if (!el) return;
    if (s === 'saving' && !navigator.onLine) s = 'offline';
    const labels = {
      saving: 'Saving…',
      saved: 'All changes saved',
      offline: 'Offline — will sync',
      error: "Couldn't save",
      local: 'Saved on this device'
    };
    el.textContent = labels[s] || '';
    el.dataset.s = s;
  }

  window.addEventListener('online', () => setSync(inflight || saveTimer ? 'saving' : (CLOUD ? 'saved' : 'local')));
  window.addEventListener('offline', () => { if (CLOUD) setSync('offline'); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && saveTimer) flush(); });

  /* ---------------- Friendly errors ---------------- */
  const ERRORS = {
    'auth/email-already-in-use': 'An account with this email already exists. Try logging in instead.',
    'auth/invalid-email': "That email address doesn't look right.",
    'auth/missing-email': 'Enter your email address.',
    'auth/weak-password': 'Use at least 8 characters for your password.',
    'auth/missing-password': 'Enter your password.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/invalid-login-credentials': 'Email or password is incorrect.',
    'auth/wrong-password': 'Email or password is incorrect.',
    'auth/user-not-found': 'Email or password is incorrect.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/too-many-requests': 'Too many attempts. Wait a few minutes, or reset your password.',
    'auth/network-request-failed': "Can't reach the server. Check your connection and try again.",
    'auth/popup-blocked': 'Your browser blocked the sign-in window. Allow pop-ups for this site and try again.',
    'auth/account-exists-with-different-credential': 'This email already has an account with a password. Log in with your email and password instead.',
    'auth/unauthorized-domain': "This website's address isn't approved in Firebase yet. Add it under Authentication → Settings → Authorized domains.",
    'auth/operation-not-allowed': "This sign-in method isn't turned on yet. Enable it in Firebase under Authentication → Sign-in method.",
    'auth/requires-recent-login': 'For security, please confirm your sign-in again.',
    'auth/user-mismatch': 'That Google account is different from the one you are signed in with.',
    'permission-denied': "Your account couldn't be saved. Check that the Firestore rules from firestore.rules are published.",
    'unavailable': "You're offline. Your changes will sync when you reconnect."
  };
  const friendly = err => (err && err.ui) ? err.message : (err && ERRORS[err.code]) || 'Something went wrong. Please try again.';

  /* ---------------- Elements ---------------- */
  const landing = $('#landing');
  const app = $('#app');
  const main = $('#app-main');
  const modal = $('#modal');
  const modalBody = $('#modal-body');
  const nav = $('.nav');

  /* ---------------- Toast ---------------- */
  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 4200);
  }

  /* ---------------- Auth state (cloud) ---------------- */
  if (CLOUD) {
    document.body.classList.add('auth-pending');
    setTimeout(() => document.body.classList.remove('auth-pending'), 3000);

    auth.getRedirectResult().catch(err => { openModal('login'); showFormError(friendly(err)); });

    auth.onAuthStateChanged(u => {
      document.body.classList.remove('auth-pending');
      if (unsubDoc) { unsubDoc(); unsubDoc = null; }
      user = u;

      if (!u) {
        state = null; deck = null; quiz = null; termsTab = 'study';
        deleting = false;
        if (!app.hidden) showLanding();
        updateNavStart();
        return;
      }

      let creating = false;
      unsubDoc = userRef().onSnapshot(snap => {
        if (deleting) return;

        if (!snap.exists) {
          // Only create a profile once the server confirms none exists
          if (snap.metadata.fromCache || creating) return;
          creating = true;
          userRef().set(newUserDoc(u)).catch(err => { toast(friendly(err)); });
          return;
        }

        const incoming = normalize(snap.data());
        if (!state) { state = incoming; setSync('saved'); enterApp(); return; }
        if (snap.metadata.hasPendingWrites || saveTimer) return;
        applyRemote(incoming);
      }, err => {
        console.error(err);
        toast(friendly(err));
      });
    });
  }

  function newUserDoc(u) {
    const local = loadLocal();
    const name = (pendingName || (u.displayName || '').split(' ')[0] || (local && local.name) || (u.email || '').split('@')[0] || 'Intern').trim().slice(0, 40);
    const doc = {
      name,
      email: u.email || null,
      track: local && TRACKS[local.track] ? local.track : null,
      mastered: (local && local.mastered) || {},
      quizBest: (local && local.quizBest) || {},
      createdAt: FV.serverTimestamp(),
      updatedAt: FV.serverTimestamp()
    };
    if (local) {
      clearLocal();
      setTimeout(() => toast('Your saved progress was moved into your account.'), 600);
    }
    pendingName = null;
    return doc;
  }

  // Another device changed the data — update without interrupting what the user is doing
  function applyRemote(incoming) {
    if (JSON.stringify(incoming) === JSON.stringify(state)) return;
    const trackChanged = incoming.track !== state.track;
    state = incoming;
    if (app.hidden || !state.track) return;
    refreshHeader();
    if (currentView === 'terms' && !trackChanged) return;
    if (currentView === 'account' && document.activeElement && document.activeElement.tagName === 'INPUT') return;
    go(currentView);
  }

  function enterApp() {
    closeModal(true);
    if (!state.track) { openModal('track-first'); return; }
    openApp(currentView || 'dashboard');
  }

  /* ---------------- Modal ---------------- */
  let modalMode = null;
  let modalLocked = false;
  let draftTrack = null;
  const memo = { email: '' };

  const GOOGLE_ICON = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

  function openModal(mode) {
    modalMode = mode;
    modalLocked = mode === 'track-first';
    if (mode === 'track' || mode === 'track-first') draftTrack = state ? state.track : null;
    renderModal();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const first = $('input, .track-opt, .btn-google', modalBody);
    if (first) first.focus();
  }

  function closeModal(force) {
    if (modalLocked && !force) return;
    modal.hidden = true;
    modalMode = null;
    modalLocked = false;
    document.body.style.overflow = '';
  }

  function passwordField(id, autocomplete, withStrength) {
    return `
      <div class="pw-wrap">
        <input class="input" id="${id}" name="password" type="password" autocomplete="${autocomplete}" required ${withStrength ? 'aria-describedby="pw-help"' : ''}>
        <button type="button" class="pw-toggle" data-action="pw-toggle" aria-label="Show password">Show</button>
      </div>
      ${withStrength ? '<div class="strength" aria-hidden="true"><span id="pw-bar"></span></div><p class="hint" id="pw-help">At least 8 characters. Longer with a mix of letters, numbers, and symbols is stronger.</p>' : ''}`;
  }

  function renderModal() {
    $('.modal-close', modal).hidden = modalLocked;
    const mode = modalMode;

    // ---- Device-only mode (Firebase not configured yet)
    if (!CLOUD && (mode === 'signup' || mode === 'login')) {
      modalBody.innerHTML = `
        <p class="eyebrow">Get started</p>
        <h2 id="modal-title">Let's set up your first day.</h2>
        <div class="notice notice-warn">Cloud accounts aren't connected yet, so progress will only be saved in this browser.</div>
        <form class="auth-form" data-form="local" novalidate>
          <label class="field-label" for="f-name">First name</label>
          <input class="input" id="f-name" name="name" maxlength="40" autocomplete="given-name" required>
          <p class="form-error" role="alert"></p>
          <button class="btn btn-primary btn-block" type="submit">Continue</button>
        </form>`;
      return;
    }

    if (mode === 'signup') {
      modalBody.innerHTML = `
        <p class="eyebrow">Create your account</p>
        <h2 id="modal-title">Start your first day.</h2>
        <p class="page-sub">Your progress syncs to every device you sign in on.</p>
        <button type="button" class="btn-google" data-action="google">${GOOGLE_ICON}<span>Continue with Google</span></button>
        <div class="divider">or sign up with email</div>
        <form class="auth-form" data-form="signup" novalidate>
          <label class="field-label" for="f-name">First name</label>
          <input class="input" id="f-name" name="name" maxlength="40" autocomplete="given-name" required>
          <label class="field-label" for="f-email">Email</label>
          <input class="input" id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required value="${esc(memo.email)}">
          <label class="field-label" for="f-pw">Password</label>
          ${passwordField('f-pw', 'new-password', true)}
          <p class="form-error" role="alert"></p>
          <button class="btn btn-primary btn-block" type="submit"><span>Create account</span></button>
        </form>
        <p class="switch">Already have an account? <button class="text-btn" data-action="mode" data-mode="login">Log in</button></p>`;
      return;
    }

    if (mode === 'login') {
      modalBody.innerHTML = `
        <p class="eyebrow">Welcome back</p>
        <h2 id="modal-title">Log in to FirstDay.</h2>
        <button type="button" class="btn-google" data-action="google">${GOOGLE_ICON}<span>Continue with Google</span></button>
        <div class="divider">or log in with email</div>
        <form class="auth-form" data-form="login" novalidate>
          <label class="field-label" for="f-email">Email</label>
          <input class="input" id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required value="${esc(memo.email)}">
          <div class="label-row">
            <label class="field-label" for="f-pw">Password</label>
            <button type="button" class="text-btn" data-action="mode" data-mode="reset">Forgot password?</button>
          </div>
          ${passwordField('f-pw', 'current-password', false)}
          <p class="form-error" role="alert"></p>
          <button class="btn btn-primary btn-block" type="submit"><span>Log in</span></button>
        </form>
        <p class="switch">New to FirstDay? <button class="text-btn" data-action="mode" data-mode="signup">Create an account</button></p>`;
      return;
    }

    if (mode === 'reset') {
      modalBody.innerHTML = `
        <p class="eyebrow">Reset password</p>
        <h2 id="modal-title">Forgot your password?</h2>
        <p class="page-sub">Enter your email and we'll send you a link to set a new one.</p>
        <form class="auth-form" data-form="reset" novalidate>
          <label class="field-label" for="f-email">Email</label>
          <input class="input" id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required value="${esc(memo.email)}">
          <p class="form-error" role="alert"></p>
          <div id="reset-done"></div>
          <button class="btn btn-primary btn-block" type="submit"><span>Send reset link</span></button>
        </form>
        <p class="switch"><button class="text-btn" data-action="mode" data-mode="login">Back to log in</button></p>`;
      return;
    }

    if (mode === 'track' || mode === 'track-first') {
      const first = mode === 'track-first';
      modalBody.innerHTML = `
        <p class="eyebrow">${first ? 'One last step' : 'Change track'}</p>
        <h2 id="modal-title">${first ? `Welcome, ${esc(state.name)}. Pick your track.` : 'Pick your track.'}</h2>
        <p class="page-sub">Your key terms, tasks, and interviews are built around this. Progress on each track is saved separately.</p>
        <div class="track-grid">
          ${Object.entries(TRACKS).map(([id, t]) => `
            <button type="button" class="track-opt ${draftTrack === id ? 'is-selected' : ''}" data-track="${id}" aria-pressed="${draftTrack === id}">
              <strong>${t.name}</strong><span>${t.blurb}</span>
            </button>`).join('')}
        </div>
        <div class="modal-foot">
          ${first && CLOUD ? '<button class="text-btn text-btn-muted" data-action="signout">Sign out</button>' : '<span></span>'}
          <button class="btn btn-primary" data-action="track-finish" ${draftTrack ? '' : 'disabled'}>${first ? 'Start my first day' : 'Switch track'}</button>
        </div>`;
      return;
    }

    if (mode === 'delete') {
      const u = auth.currentUser;
      const hasPw = u.providerData.some(p => p.providerId === 'password');
      modalBody.innerHTML = `
        <p class="eyebrow">Delete account</p>
        <h2 id="modal-title">Delete your account for good?</h2>
        <p class="page-sub">This permanently deletes your account and all of your progress on every track. It can't be undone.</p>
        <form class="auth-form" data-form="delete" novalidate>
          ${hasPw ? `<label class="field-label" for="f-pw">Enter your password to confirm</label>${passwordField('f-pw', 'current-password', false)}`
                  : '<p class="notice">You\'ll be asked to confirm with Google.</p>'}
          <p class="form-error" role="alert"></p>
          <div class="modal-foot">
            <button type="button" class="text-btn" data-action="close-modal">Cancel</button>
            <button class="btn btn-danger" type="submit"><span>Delete my account</span></button>
          </div>
        </form>`;
    }
  }

  function showFormError(msg) {
    const scope = !modal.hidden ? modal : main;
    const el = $('.form-error', scope);
    if (el) el.textContent = msg; else toast(msg);
  }
  function clearFormError() {
    $$('.form-error').forEach(el => { el.textContent = ''; });
  }
  function setBusy(btn, on) {
    if (!btn) return;
    btn.disabled = on;
    btn.classList.toggle('is-busy', on);
    btn.setAttribute('aria-busy', on);
  }

  function passwordStrength(pw) {
    if (!pw) return 0;
    if (pw.length < 8) return 1;
    let score = 0;
    if (pw.length >= 12) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score >= 3 ? 3 : 2;
  }

  /* ---------------- Auth actions ---------------- */
  async function googleSignIn(btn) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    clearFormError();
    setBusy(btn, true);
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/operation-not-supported-in-this-environment') {
        await auth.signInWithRedirect(provider);
        return;
      }
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') return;
      showFormError(friendly(err));
    } finally {
      setBusy(btn, false);
    }
  }

  async function deleteAccount(password) {
    const u = auth.currentUser;
    const hasPw = u.providerData.some(p => p.providerId === 'password');
    if (hasPw) {
      if (!password) throw uiErr('Enter your password to confirm.');
      await u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, password));
    } else {
      await u.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    deleting = true;
    clearTimeout(saveTimer); saveTimer = null;
    if (unsubDoc) { unsubDoc(); unsubDoc = null; }
    const backup = { ...state, email: u.email || null, createdAt: FV.serverTimestamp(), updatedAt: FV.serverTimestamp() };
    try {
      await userRef().delete();
      await u.delete();
    } catch (err) {
      deleting = false;
      await userRef().set(backup).catch(() => {});
      throw err;
    }
    closeModal(true);
    toast('Your account was deleted.');
  }

  async function signOut() {
    if (!CLOUD) { showLanding(); return; }
    if (saveTimer) await flush();
    await auth.signOut();
    toast('Signed out.');
  }

  /* ---------------- Forms ---------------- */
  document.addEventListener('submit', async e => {
    const form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();
    clearFormError();
    const f = Object.fromEntries(new FormData(form));
    const btn = $('[type="submit"]', form);
    const name = (f.name || '').trim();
    const email = (f.email || '').trim();
    const pw = f.password || '';

    setBusy(btn, true);
    try {
      switch (form.dataset.form) {
        case 'signup': {
          if (!name) throw uiErr('Add your first name.');
          if (!EMAIL_RE.test(email)) throw uiErr('Enter a valid email address.');
          if (pw.length < 8) throw uiErr('Use at least 8 characters for your password.');
          pendingName = name.slice(0, 40);
          let cred;
          try { cred = await auth.createUserWithEmailAndPassword(email, pw); }
          catch (err) { pendingName = null; throw err; }
          cred.user.updateProfile({ displayName: pendingName || name }).catch(() => {});
          cred.user.sendEmailVerification().catch(() => {});
          return; // the auth listener takes it from here
        }
        case 'login': {
          if (!EMAIL_RE.test(email)) throw uiErr('Enter a valid email address.');
          if (!pw) throw uiErr('Enter your password.');
          await auth.signInWithEmailAndPassword(email, pw);
          return;
        }
        case 'reset': {
          if (!EMAIL_RE.test(email)) throw uiErr('Enter a valid email address.');
          try { await auth.sendPasswordResetEmail(email); }
          catch (err) { if (err.code !== 'auth/user-not-found') throw err; }
          $('#reset-done').innerHTML = `<p class="form-success">If an account exists for <strong>${esc(email)}</strong>, a reset link is on its way. Check your spam folder too.</p>`;
          return;
        }
        case 'local': {
          if (!name) throw uiErr('Add your first name.');
          state = normalize({ name, track: null });
          closeModal(true);
          openModal('track-first');
          return;
        }
        case 'profile': {
          if (!name) throw uiErr('Your name can’t be empty.');
          state.name = name.slice(0, 40);
          persist();
          if (CLOUD && auth.currentUser) auth.currentUser.updateProfile({ displayName: state.name }).catch(() => {});
          refreshHeader();
          toast('Name updated.');
          return;
        }
        case 'delete': {
          await deleteAccount(pw);
          return;
        }
      }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') return;
      showFormError(friendly(err));
      if (err.code === 'auth/email-already-in-use') memo.email = email;
    } finally {
      setBusy(btn, false);
    }
  });

  document.addEventListener('input', e => {
    if (e.target.name === 'email') memo.email = e.target.value.trim();
    if (e.target.id === 'f-pw' && modalMode === 'signup') {
      const bar = $('#pw-bar');
      if (bar) bar.dataset.level = passwordStrength(e.target.value);
    }
  });

  /* ---------------- App navigation ---------------- */
  function refreshHeader() {
    if (!state || !state.track) return;
    $('#app-name').textContent = state.name;
    $('#app-track').textContent = TRACKS[state.track].name;
    updateNavStart();
  }

  function openApp(view) {
    landing.hidden = true;
    app.hidden = false;
    refreshHeader();
    setSync(CLOUD ? (navigator.onLine ? 'saved' : 'offline') : 'local');
    go(view);
  }

  function go(view) {
    currentView = view;
    $$('.side-item[data-view]').forEach(b => b.classList.toggle('is-active', b.dataset.view === view));
    if (view === 'terms') renderTerms();
    else if (view === 'account') renderAccount();
    else renderDashboard();
    window.scrollTo(0, 0);
  }

  function showLanding() {
    app.hidden = true;
    landing.hidden = false;
    currentView = 'dashboard';
    updateNavStart();
    window.scrollTo(0, 0);
  }

  function updateNavStart() {
    const signedIn = Boolean(state && state.track);
    $('#nav-start').textContent = signedIn ? 'Open FirstDay' : 'Get started';
    $$('[data-action="login"]').forEach(a => { a.textContent = signedIn ? 'My account' : 'Log in'; });
  }

  function needsVerify() {
    const u = CLOUD && auth.currentUser;
    return Boolean(u && !u.emailVerified && u.providerData.some(p => p.providerId === 'password'));
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

      ${needsVerify() ? `
        <div class="notice notice-warn dash-notice">
          <span>Verify your email so you can always recover your account.</span>
          <button class="text-btn" data-action="resend-verify">Resend link</button>
          <button class="text-btn" data-action="refresh-verify">I've verified</button>
        </div>` : ''}

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
      </div>`;
  }

  /* ---------------- Account ---------------- */
  function renderAccount() {
    const u = CLOUD ? auth.currentUser : null;
    const hasPw = Boolean(u && u.providerData.some(p => p.providerId === 'password'));
    const hasGoogle = Boolean(u && u.providerData.some(p => p.providerId === 'google.com'));
    const methods = [hasGoogle && 'Google', hasPw && 'Email and password'].filter(Boolean).join(', ');

    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">Settings</p>
        <h1>Account</h1>
        <p class="page-sub">${CLOUD ? 'Changes sync to every device you’re signed in on.' : 'Cloud accounts aren’t connected yet, so this profile only lives in this browser.'}</p>
      </div>

      <div class="card settings">
        <h3 class="settings-title">Profile</h3>
        <form data-form="profile" novalidate>
          <label class="field-label" for="p-name">First name</label>
          <div class="inline-row">
            <input class="input" id="p-name" name="name" maxlength="40" autocomplete="given-name" value="${esc(state.name)}">
            <button class="btn btn-ghost" type="submit"><span>Save</span></button>
          </div>
          <p class="form-error" role="alert"></p>
        </form>
        ${u ? `
          <dl class="meta">
            <div><dt>Email</dt><dd>${esc(u.email || '—')}</dd></div>
            <div><dt>Sign-in method</dt><dd>${esc(methods || '—')}</dd></div>
            ${hasPw ? `<div><dt>Email verified</dt><dd>${u.emailVerified ? 'Yes'
              : 'Not yet · <button class="text-btn" data-action="resend-verify">Resend link</button> · <button class="text-btn" data-action="refresh-verify">I’ve verified</button>'}</dd></div>` : ''}
          </dl>` : ''}
      </div>

      <div class="card settings">
        <h3 class="settings-title">Track</h3>
        <p class="page-sub">You’re on the <strong>${esc(TRACKS[state.track].name)}</strong> track. Progress on each track is saved separately.</p>
        <button class="btn btn-ghost btn-small" data-action="change-track">Change track</button>
      </div>

      ${hasPw ? `
        <div class="card settings">
          <h3 class="settings-title">Password</h3>
          <p class="page-sub">We’ll email you a secure link to set a new password.</p>
          <button class="btn btn-ghost btn-small" data-action="send-reset"><span>Send password reset email</span></button>
        </div>` : ''}

      <div class="card settings">
        <h3 class="settings-title">Session</h3>
        <p class="page-sub">${CLOUD ? 'You’ll stay signed in on this device until you sign out.' : 'Return to the home page. Your progress stays saved in this browser.'}</p>
        <button class="btn btn-ghost btn-small" data-action="signout">${CLOUD ? 'Sign out on this device' : 'Back to home page'}</button>
      </div>

      <div class="card settings danger">
        <h3 class="settings-title">Danger zone</h3>
        <div class="danger-row">
          <div><strong>Reset progress</strong><p class="hint">Clears mastered terms and quiz scores on every track.</p></div>
          <button class="btn btn-danger-ghost btn-small" data-action="reset-progress">Reset progress</button>
        </div>
        ${u ? `
          <div class="danger-row">
            <div><strong>Delete account</strong><p class="hint">Permanently deletes your account and all progress.</p></div>
            <button class="btn btn-danger btn-small" data-action="delete-open">Delete account</button>
          </div>` : ''}
      </div>`;
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
    if (!body) return;
    if (termsTab === 'list') renderList(body);
    else if (termsTab === 'quiz') renderQuiz(body);
    else renderStudy(body);
  }

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
      const prev = state.quizBest[state.track];
      if (prev == null || pct > prev) { state.quizBest[state.track] = pct; persist(); }
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

  /* ---------------- Click handling ---------------- */
  document.addEventListener('click', async e => {
    const el = e.target.closest('[data-action], [data-view], [data-tab], [data-track]');
    if (!el) {
      if (e.target.closest('.nav-links a')) toggleNav(false);
      return;
    }
    if (el.tagName === 'A') e.preventDefault();

    if (el.dataset.track) {
      draftTrack = el.dataset.track;
      renderModal();
      const again = $(`[data-track="${draftTrack}"]`, modalBody);
      if (again) again.focus();
      return;
    }
    if (el.dataset.view) { go(el.dataset.view); return; }
    if (el.dataset.tab) {
      termsTab = el.dataset.tab;
      if (termsTab === 'quiz' && quiz && quiz.done) newQuiz();
      if (termsTab === 'study' && deck && fc.i >= deck.cards.length) newDeck();
      renderTerms();
      return;
    }

    switch (el.dataset.action) {
      case 'start':
        toggleNav(false);
        state && state.track ? openApp('dashboard') : openModal('signup');
        break;
      case 'login':
        toggleNav(false);
        if (state && state.track) openApp(el.textContent.trim() === 'My account' ? 'account' : 'dashboard');
        else openModal('login');
        break;
      case 'mode':
        clearFormError();
        openModal(el.dataset.mode);
        break;
      case 'google': googleSignIn(el); break;
      case 'pw-toggle': {
        const input = el.previousElementSibling;
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        el.textContent = show ? 'Hide' : 'Show';
        el.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        input.focus();
        break;
      }
      case 'close-modal': closeModal(); break;
      case 'track-finish': {
        if (!draftTrack) return;
        const first = modalMode === 'track-first';
        state.track = draftTrack;
        persist();
        closeModal(true);
        if (first) toast(`You're all set on the ${TRACKS[state.track].name} track.`);
        openApp(first ? 'dashboard' : currentView);
        break;
      }
      case 'change-track': openModal('track'); break;
      case 'signout': closeModal(true); signOut(); break;
      case 'send-reset': {
        setBusy(el, true);
        try { await auth.sendPasswordResetEmail(auth.currentUser.email); toast(`Reset link sent to ${auth.currentUser.email}.`); }
        catch (err) { toast(friendly(err)); }
        finally { setBusy(el, false); }
        break;
      }
      case 'resend-verify': {
        try { await auth.currentUser.sendEmailVerification(); toast(`Verification link sent to ${auth.currentUser.email}.`); }
        catch (err) { toast(friendly(err)); }
        break;
      }
      case 'refresh-verify': {
        try {
          await auth.currentUser.reload();
          toast(auth.currentUser.emailVerified ? 'Email verified. Thanks!' : "Not verified yet — click the link in your email first.");
          go(currentView);
        } catch (err) { toast(friendly(err)); }
        break;
      }
      case 'reset-progress':
        if (confirm('Reset all progress on every track? This can’t be undone.')) {
          state.mastered = {};
          state.quizBest = {};
          deck = null; quiz = null;
          persist();
          toast('Progress reset.');
          go(currentView);
        }
        break;
      case 'delete-open': openModal('delete'); break;
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

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  updateNavStart();
})();