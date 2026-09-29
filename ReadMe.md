# FirstDay 🦫

**Practice the job before you start it.** FirstDay helps students and new hires get ready for internships and first jobs. Pick a career track, then practice the real work: tasks from a simulated manager, a resume and cover letter builder, and the key terms your team expects you to know.

## Features

- **On the Job** — Real assignments from a simulated manager, graded instantly with specific feedback.
  - IT: write automations in a built-in code editor (runs against hidden test cases)
  - Finance: a working spreadsheet with formulas, VLOOKUP, and fill down
  - Accounting: journal entries and a bank reconciliation
  - Marketing, Consulting, HR: campaign metrics, writing, and sorting tasks
- **Resume & cover letter** — Build step by step, answer questions and have it written for you, paste text, or upload a PDF/Word file. Get line-by-line fixes, an optional job-posting keyword check, and a polished version to download.
- **Mock interviews** — Answer real interview questions for your track (behavioral and situational), get graded against a rubric with specific feedback, and reveal a strong sample answer to compare against.
- **Key terms** — 30 terms per track with flashcards, a searchable glossary, a vocab quiz, and "In context" workplace scenarios for every term.
- **Six tracks** — IT, Finance, Marketing, Accounting, Consulting, and Human Resources.

## Pricing

- **Free** — one track at a time (switching is free).
- **Pro ($4.99/month)** — keep every track open and jump between them from the account menu.

Checkout is in the app (Settings → Upgrade to Pro, or "Get Pro" on the home page) and supports discount codes. To take real card payments, paste a Stripe Payment Link into `PAYMENT_LINK` in `app.js`. The price is `PRO_PRICE`, and codes live in `DISCOUNTS`.

Everything is graded in the browser with built-in rules — no paid AI or API required.

## Google sign-in

"Continue with Google" is on the sign-up/login modal, wired through `auth.js` (Supabase Auth). It's off until you set it up — the button shows an alert instead of doing anything until then. Progress itself is unaffected either way; it still lives only in the browser's localStorage.

1. Create a free project at [supabase.com](https://supabase.com).
2. In that project: **Authentication → Providers → Google → Enable**. That page links straight to the Google Cloud Console screen you need and tells you exactly what to paste where. The one thing Google asks for is an "Authorized redirect URI" — use the callback URL Supabase shows right there (`https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`).
3. In Supabase: **Authentication → URL Configuration → Redirect URLs** — add every URL you'll actually open the site from, e.g. `http://localhost:8000` for local testing, plus your real domain once it's hosted.
4. **Project Settings → API** — copy the **Project URL** and the **anon public** key.
5. Open `auth.js` and paste them into `SUPABASE_URL` and `SUPABASE_ANON_KEY` at the top.

## Run it locally

Open the folder in VS Code, install the **Live Server** extension, then right-click `index.html` → **Open with Live Server**.

Or, from this folder:

```
python3 -m http.server 8000
```

and visit http://localhost:8000

## Files

| File | What it does |
|---|---|
| `index.html` | Page structure |
| `style.css` | All styling |
| `app.js` | App logic: tracks, assignments, grading, resume tools |
| `auth.js` | Google sign-in (Supabase Auth) — see "Google sign-in" above |

Progress is saved in the browser, so each person's work stays on their own device.

## Built for

The Congressional App Challenge.
