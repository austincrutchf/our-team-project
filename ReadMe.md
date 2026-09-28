# FirstDay 🦫

**Practice the job before you start it.** FirstDay helps students and new hires get ready for internships and first jobs. Pick a career track, then practice the real work: tasks from a simulated manager, a resume and cover letter builder, and the key terms your team expects you to know.

## Features

- **On the Job** — Real assignments from a simulated manager, graded instantly with specific feedback.
  - IT: write automations in a built-in code editor (runs against hidden test cases)
  - Finance: a working spreadsheet with formulas, VLOOKUP, and fill down
  - Accounting: journal entries and a bank reconciliation
  - Marketing, Consulting, HR: campaign metrics, writing, and sorting tasks
- **Resume & cover letter** — Build step by step, answer questions and have it written for you, paste text, or upload a PDF/Word file. Get line-by-line fixes, an optional job-posting keyword check, and a polished version to download.
- **Key terms** — Flashcards, a searchable glossary, and a quiz for each track.
- **Six tracks** — IT, Finance, Marketing, Accounting, Consulting, and Human Resources.

Everything is graded in the browser with built-in rules — no paid AI or API required.

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

Progress is saved in the browser, so each person's work stays on their own device.

## Built for

The Congressional App Challenge.