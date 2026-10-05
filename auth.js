/* =========================================================
   FirstDay — accounts via Supabase Auth (Google + email/password)
   ---------------------------------------------------------
   This file is self-contained: it never touches app state
   directly. It talks to app.js two ways:
     1. Events it dispatches on `window`:
          firstday:auth         detail: { name, email, avatarUrl }
          firstday:signed-out   (no detail)
        Fired for Google sign-in, email/password sign-in, AND a
        silent session restore on page load — app.js treats all
        three the same way.
     2. A small API it exposes as `window.FirstDayAuth`, which
        app.js calls for anything that needs a direct answer:
          signUp({ email, password, username, first, last })
          signInWithPassword({ email, password })
          signOut()
          acceptTerms()
   Progress itself still lives only in this browser's
   localStorage — this file adds identity, not data sync.

   SETUP (one-time):
   1. Create a free project at https://supabase.com
   2. In that project: Authentication -> Providers -> enable Google.
      Google needs its own OAuth client first — Supabase's Google
      provider page links straight to the Google Cloud Console
      screen and tells you exactly what to paste where. The one
      value Google will ask you for is the "Authorized redirect
      URI" — use the callback URL Supabase shows on that same page
      (looks like https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback).
      Email/password sign-in needs no extra setup — it's on by default.
   3. In Supabase: Authentication -> URL Configuration -> Redirect URLs,
      add every URL you'll actually open this site from, e.g.
      http://localhost:8000 and http://127.0.0.1:8000 for local testing,
      plus your real domain once this is hosted somewhere.
   4. Project Settings -> API: copy the "Project URL" and the
      "anon public" key into the two constants below.
   ========================================================= */
(() => {
  'use strict';

  const SUPABASE_URL = 'https://sfhrdgmzejgoyfshowna.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmaHJkZ216ZWpnb3lmc2hvd25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MzQ1NDIsImV4cCI6MjEwNjIxMDU0Mn0.3tTwg4ehpaINULBgy1hSf-PU-y7MlffbjKkpcmmiew0';

  let client = null;

  function profileFromUser(user) {
    const meta = user.user_metadata || {};
    return {
      name: meta.full_name || meta.name || meta.given_name || '',
      email: user.email || '',
      avatarUrl: meta.avatar_url || meta.picture || ''
    };
  }

  function announceSignedIn(user) {
    window.dispatchEvent(new CustomEvent('firstday:auth', { detail: profileFromUser(user) }));
  }

  function validatePassword(password) {
    if (typeof password !== 'string') return { ok: false, message: 'Password must be at least 8 characters and include at least one number and one symbol.' };
    if (password.length < 8 || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      return { ok: false, message: 'Password must be at least 8 characters and include at least one number and one symbol.' };
    }
    return { ok: true };
  }

  // Turns a Supabase error into the plain-language message app.js shows the user.
  function friendlyAuthError(error) {
    const msg = (error && error.message) || '';
    if (/already registered|already exists/i.test(msg)) return 'That email already has an account — try logging in instead.';
    if (/invalid login credentials/i.test(msg)) return 'That email and password don’t match an account.';
    if (/password.*at least/i.test(msg)) return msg;
    if (/rate limit/i.test(msg)) return 'Too many attempts — wait a bit and try again.';
    return msg || 'Something went wrong. Please try again.';
  }

  if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase && window.supabase.createClient) {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Restores a session if the browser still has one (e.g. after a refresh).
    client.auth.getSession().then(({ data }) => {
      if (data && data.session && data.session.user) announceSignedIn(data.session.user);
    });

    // Fires on the redirect back from Google, on email/password sign-in, and on sign-out.
    client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session && session.user) announceSignedIn(session.user);
      else if (event === 'SIGNED_OUT') window.dispatchEvent(new CustomEvent('firstday:signed-out'));
    });

    window.FirstDayAuth = {
      async signUp({ email, password, username, first, last }) {
        const passwordCheck = validatePassword(password);
        if (!passwordCheck.ok) return { ok: false, message: passwordCheck.message };
        const { data, error } = await client.auth.signUp({
          email, password,
          options: { data: { username, first_name: first, last_name: last, full_name: `${first} ${last}`.trim() } }
        });
        if (error) return { ok: false, message: friendlyAuthError(error) };
        if (data && data.user && !data.session) return { ok: true, needsConfirmation: true };
        return { ok: true };
      },
      async signInWithPassword({ email, password }) {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) return {
          ok: false,
          message: friendlyAuthError(error),
          invalidCredentials: /invalid login credentials|invalid_credentials/i.test(`${error.code || ''} ${error.message || ''}`)
        };
        return { ok: true };
      },
      signOut() { return client.auth.signOut(); },
      acceptTerms() { return client.auth.updateUser({ data: { tos_accepted_at: new Date().toISOString() } }); }
    };
  } else {
    console.warn('[FirstDay] Sign-in isn’t configured yet — set SUPABASE_URL and SUPABASE_ANON_KEY at the top of auth.js. See the comment there for setup steps.');
  }

  document.addEventListener('click', e => {
    if (e.target.closest('#google-signin-btn')) {
      if (!client) { alert('Google sign-in isn’t set up yet on this copy of the site.'); return; }
      sessionStorage.setItem('firstday:oauth-pending', '1');
      client.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + window.location.pathname }
      });
    }
  });
})();
