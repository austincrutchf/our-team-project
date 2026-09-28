/* =========================================================
   FirstDay — app.js
   Onboarding, dashboard, On the Job assignments, key terms,
   resume & cover letter tools, and account settings.
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
    { title: 'Mock interviews', text: 'Answer interview questions for your track and get scored on your answers.' },
    { title: 'Chat with your boss', text: 'Ask questions and get feedback from your manager between tasks.' }
  ];

  /* =========================================================
     ON THE JOB — assignments from your (simulated) manager
     Everything is graded in the browser. No AI, no API.
     ========================================================= */
  const BOSSES = {
    it:         { name: 'Jordan Reyes',   role: 'IT Manager',          initials: 'JR', intro: "Welcome to the help desk team. I'll send you real requests from our queue — the ones I'd normally hand to a new analyst." },
    finance:    { name: 'Priya Shah',     role: 'Finance Manager',     initials: 'PS', intro: "Glad you're here. Most of what we do lives in spreadsheets, so that's where I'll start you." },
    marketing:  { name: 'Marcus Bell',    role: 'Marketing Director',  initials: 'MB', intro: "Welcome aboard. You'll be working on real campaign numbers and real copy — I care about both." },
    accounting: { name: 'Dana Whitfield', role: 'Controller',          initials: 'DW', intro: "Happy to have you on the close team. Accuracy first, speed second — the books have to balance." },
    consulting: { name: 'Elena Park',     role: 'Engagement Manager',  initials: 'EP', intro: "You're staffed on our coffee chain engagement. Structure your thinking and lead with the answer." },
    hr:         { name: 'Tom Alvarez',    role: 'HR Business Partner', initials: 'TA', intro: "Welcome to People Ops. You'll help us hire and onboard — fair, organized, and friendly." }
  };

  const TOOL_LABELS = { code: 'Code', sheet: 'Spreadsheet', journal: 'Journal entry', writing: 'Writing', sort: 'Sorting' };

  const words = s => (s || '').trim().split(/\s+/).filter(Boolean).length;
  const sentences = s => (s || '').trim().split(/(?<=[.!?])\s+/).filter(Boolean);

  const JOBS = {
    /* ---------------- IT ---------------- */
    it: [
      {
        id: 'it-usernames',
        title: 'Automate new-hire usernames',
        summary: 'Write a function that turns a full name into a login.',
        tool: 'code', minutes: 15,
        brief: "We've got 40 new hires starting Monday and I'm not creating accounts by hand. Write makeUsername(fullName) so it builds each login automatically: first initial + last name, all lowercase, letters only. HR's spreadsheet is messy — expect extra spaces, hyphens, apostrophes, and middle names.",
        deliver: ['A working makeUsername function', 'It passes the visible tests', 'It also handles the edge cases I test after you submit'],
        hints: [
          'Split the name into words with fullName.trim().split(/\\s+/) — that ignores extra spaces.',
          'The first word gives the initial and the LAST word is the last name, so middle names are skipped.',
          'Lowercase first, then remove anything that isn\u2019t a letter: .toLowerCase().replace(/[^a-z]/g, "")'
        ],
        praise: 'Perfect — I just ran it on the whole list and every account came out clean. That saved me an afternoon.',
        code: {
          fn: 'makeUsername',
          starter:
`// Build a login username for a new hire.
// Rule: first initial + last name, lowercase, letters only.
// Example: makeUsername("Maria Lopez") -> "mlopez"

function makeUsername(fullName) {
  // your code here

}
`,
          tests: [
            { label: 'Simple name', args: ['Maria Lopez'], expect: 'mlopez' },
            { label: 'Extra spaces', args: ['  Devon   Carter  '], expect: 'dcarter' },
            { label: 'Apostrophe', args: ["Shaquille O'Neal"], expect: 'soneal' }
          ],
          hidden: [
            { label: 'Hyphenated first name', args: ['Mary-Kate Olsen'], expect: 'molsen' },
            { label: 'Mixed capitals', args: ['JAMES smith'], expect: 'jsmith' },
            { label: 'Middle name', args: ['Ana Maria Cruz'], expect: 'acruz' },
            { label: 'Hyphenated last name', args: ['Chloe Zhang-Wu'], expect: 'czhangwu' }
          ]
        }
      },
      {
        id: 'it-sla',
        title: 'Flag tickets breaking our SLA',
        summary: 'Automate a report of open tickets older than 48 hours.',
        tool: 'code', minutes: 20,
        brief: "Our SLA says every open ticket gets handled within 48 hours. Write overdueTickets(tickets, now) that returns the IDs of open tickets that have been open for MORE than 48 hours, oldest first. I'll run it every morning so we see what's about to blow up.",
        deliver: ['Only tickets with status "open"', 'Only tickets open for more than 48 hours (exactly 48 is still OK)', 'IDs sorted oldest first'],
        hints: [
          'new Date(t.openedAt) turns the text into a date. Subtracting two dates gives you milliseconds.',
          '48 hours is 48 * 60 * 60 * 1000 milliseconds. Use > (not >=) so exactly 48 hours doesn\u2019t count.',
          'Chain it: tickets.filter(...).sort((a, b) => new Date(a.openedAt) - new Date(b.openedAt)).map(t => t.id)'
        ],
        praise: "This is great. I'm adding it to the morning report — nothing slips past 48 hours now.",
        code: {
          fn: 'overdueTickets',
          starter:
`// Return the IDs of OPEN tickets that have been open for
// MORE than 48 hours, sorted oldest first.
//
// tickets: [{ id: "T-101", status: "open", openedAt: "2026-09-25T09:00:00Z" }, ...]
// now:     "2026-09-28T12:00:00Z"

function overdueTickets(tickets, now) {
  // your code here

}
`,
          tests: [
            {
              label: 'Mixed queue',
              args: [[
                { id: 'T-101', status: 'open', openedAt: '2026-09-25T09:00:00Z' },
                { id: 'T-102', status: 'closed', openedAt: '2026-09-20T10:00:00Z' },
                { id: 'T-103', status: 'open', openedAt: '2026-09-27T09:00:00Z' },
                { id: 'T-104', status: 'open', openedAt: '2026-09-24T08:00:00Z' }
              ], '2026-09-28T12:00:00Z'],
              expect: ['T-104', 'T-101']
            },
            { label: 'Empty queue', args: [[], '2026-09-28T12:00:00Z'], expect: [] }
          ],
          hidden: [
            {
              label: 'Exactly 48 hours is not overdue',
              args: [[
                { id: 'T-201', status: 'open', openedAt: '2026-09-26T12:00:00Z' },
                { id: 'T-202', status: 'open', openedAt: '2026-09-26T11:59:00Z' }
              ], '2026-09-28T12:00:00Z'],
              expect: ['T-202']
            },
            {
              label: 'Closed tickets are ignored',
              args: [[
                { id: 'T-301', status: 'closed', openedAt: '2026-09-01T12:00:00Z' },
                { id: 'T-302', status: 'closed', openedAt: '2026-09-02T12:00:00Z' }
              ], '2026-09-28T12:00:00Z'],
              expect: []
            },
            {
              label: 'Sorted oldest first',
              args: [[
                { id: 'T-401', status: 'open', openedAt: '2026-09-25T00:00:00Z' },
                { id: 'T-402', status: 'open', openedAt: '2026-09-22T00:00:00Z' },
                { id: 'T-403', status: 'open', openedAt: '2026-09-20T00:00:00Z' }
              ], '2026-09-28T12:00:00Z'],
              expect: ['T-403', 'T-402', 'T-401']
            }
          ]
        }
      }
    ],

    /* ---------------- Finance ---------------- */
    finance: [
      {
        id: 'fin-vlookup',
        title: 'Build the portfolio summary',
        summary: 'Calculate market values and pull sectors with VLOOKUP.',
        tool: 'sheet', minutes: 15,
        brief: "Client meeting at 2. I need the portfolio summary: market value for each holding, the total, and each holding's sector pulled from the lookup table on the right. Use formulas, not typed numbers — the prices update tomorrow and I don't want to redo this.",
        deliver: ['Market value for each holding (D2:D7)', 'Sector for each holding using VLOOKUP (E2:E7)', 'Total market value (D9)'],
        hints: [
          'Market value = shares × price. Type =B2*C2 in D2, then click Fill down.',
          'VLOOKUP finds a value in the first column of a table and returns a column to its right: =VLOOKUP(what, table, column number, FALSE)',
          'In E2: =VLOOKUP(A2, $G$2:$H$9, 2, FALSE). The $ signs lock the table so it doesn\u2019t shift when you fill down, and FALSE means exact match.'
        ],
        praise: "This is exactly what I needed for the meeting — and since it's all formulas, tomorrow's update is free.",
        sheet: {
          cols: 8, rows: 9,
          widths: { A: 76, B: 72, C: 86, D: 116, E: 150, F: 20, G: 72, H: 150 },
          formats: { B: 'int', C: 'money', D: 'money' },
          bold: ['A9'],
          grid: [
            ['Ticker', 'Shares', 'Price', 'Market value', 'Sector', null, 'Ticker', 'Sector'],
            ['AAPL', 120, 228.5, null, null, null, 'KO', 'Consumer Staples'],
            ['JPM', 85, 212.4, null, null, null, 'XOM', 'Energy'],
            ['XOM', 150, 118.3, null, null, null, 'AAPL', 'Technology'],
            ['PFE', 300, 29.1, null, null, null, 'PFE', 'Health Care'],
            ['NVDA', 60, 131.8, null, null, null, 'JPM', 'Financials'],
            ['KO', 200, 69.9, null, null, null, 'NVDA', 'Technology'],
            [null, null, null, null, null, null, 'WMT', 'Consumer Staples'],
            ['Total', null, null, null, null, null, 'UNH', 'Health Care']
          ],
          editable: ['D2:D7', 'E2:E7', 'D9'],
          groups: [
            { label: 'Market value for each holding', weight: 35, cells: 'D2:D7', expect: [27420, 18054, 17745, 8730, 7908, 13980], require: 'formula',
              tip: 'Market value is shares × price — type =B2*C2 in D2 and fill down.' },
            { label: 'Sector pulled with VLOOKUP', weight: 45, cells: 'E2:E7', expect: ['Technology', 'Financials', 'Energy', 'Health Care', 'Technology', 'Consumer Staples'], require: 'VLOOKUP',
              tip: 'Use an exact-match VLOOKUP: =VLOOKUP(A2, $G$2:$H$9, 2, FALSE). Without FALSE, Excel assumes the table is sorted and returns wrong answers.' },
            { label: 'Total market value', weight: 20, cells: 'D9', expect: [93837], require: 'formula',
              tip: 'Total the market values with =SUM(D2:D7).' }
          ]
        }
      },
      {
        id: 'fin-comps',
        title: 'Price an acquisition with comps',
        summary: 'Calculate P/E ratios and an implied share price.',
        tool: 'sheet', minutes: 15,
        brief: "We're looking at buying Halberd Tools. Run quick comps: P/E for each comparable company, the average P/E, and Halberd's implied share price using that average and Halberd's EPS. I want to see if their asking price is reasonable.",
        deliver: ['P/E for each comparable company (D2:D5)', 'Average P/E (D7)', "Halberd's implied share price (D10)"],
        hints: [
          'P/E is share price ÷ earnings per share. In D2: =B2/C2, then fill down.',
          'The average of a range: =AVERAGE(D2:D5)',
          'Implied price = average P/E × Halberd\u2019s EPS: =D7*C9'
        ],
        praise: 'Nice — an implied price around $65 tells me their $80 ask is rich. This gives us a real number to negotiate with.',
        sheet: {
          cols: 4, rows: 10,
          widths: { A: 170, B: 100, C: 90, D: 130 },
          formats: { B: 'money', C: 'money', D: 'x' },
          cellFormats: { D10: 'money' },
          bold: ['A7', 'A9', 'A10'],
          grid: [
            ['Company', 'Share price', 'EPS', 'P/E'],
            ['Ridgeway Industrial', 84, 5.6, null],
            ['Northbeam Tools', 126, 7, null],
            ['Castellan Mfg', 57.2, 4.4, null],
            ['Vantor Equipment', 98.4, 6, null],
            [null, null, null, null],
            ['Average P/E', null, null, null],
            [null, null, null, null],
            ['Halberd EPS', null, 4.2, null],
            ['Implied share price', null, null, null]
          ],
          editable: ['D2:D5', 'D7', 'D10'],
          groups: [
            { label: 'P/E for each company', weight: 40, cells: 'D2:D5', expect: [15, 18, 13, 16.4], require: 'formula',
              tip: 'P/E is share price ÷ EPS — type =B2/C2 in D2 and fill down.' },
            { label: 'Average P/E', weight: 30, cells: 'D7', expect: [15.6], require: 'formula',
              tip: 'Use =AVERAGE(D2:D5) for the average P/E.' },
            { label: "Halberd's implied share price", weight: 30, cells: 'D10', expect: [65.52], require: 'formula',
              tip: "Multiply the average P/E by Halberd's EPS: =D7*C9." }
          ]
        }
      }
    ],

    /* ---------------- Accounting ---------------- */
    accounting: [
      {
        id: 'acct-equipment',
        title: 'Record an equipment purchase',
        summary: 'Write the journal entry for a partly-financed purchase.',
        tool: 'journal', minutes: 10,
        brief: 'We bought a new printer-copier today for $4,800. We paid $1,800 in cash and put the rest on account with the vendor. Record the journal entry so it hits the general ledger before close.',
        deliver: ['The correct accounts', 'Debits and credits on the correct sides', 'An entry that balances', 'A short description'],
        hints: [
          'Three accounts are involved: the asset you bought, the cash you paid, and what you still owe.',
          'Assets increase with a debit. Cash going down is a credit. Money you owe (a liability) going up is a credit.',
          'Debit Equipment $4,800. Credit Cash $1,800. Credit Accounts Payable for the remaining balance.'
        ],
        praise: 'Clean entry — balanced, right accounts, right sides. Posting it now.',
        journal: {
          accounts: ['Cash', 'Accounts Receivable', 'Supplies', 'Prepaid Insurance', 'Equipment', 'Accumulated Depreciation', 'Accounts Payable', 'Wages Payable', 'Notes Payable', 'Revenue', 'Wages Expense', 'Rent Expense', 'Depreciation Expense'],
          answer: [
            { account: 'Equipment', side: 'debit', amount: 4800, why: 'The printer-copier is a new asset, and assets increase with a debit of the full $4,800 cost.' },
            { account: 'Cash', side: 'credit', amount: 1800, why: 'Cash went down by the $1,800 you paid, and assets decrease with a credit.' },
            { account: 'Accounts Payable', side: 'credit', amount: 3000, why: 'You still owe the vendor $3,000 ($4,800 − $1,800), and liabilities increase with a credit.' }
          ]
        }
      },
      {
        id: 'acct-bankrec',
        title: 'Reconcile the bank account',
        summary: 'Make the bank balance and the books agree.',
        tool: 'sheet', minutes: 15,
        brief: "Month-end close. The bank statement says $18,420 but our books say $16,975. Finish the bank reconciliation so both sides land on the same adjusted balance. If they don't match, something's wrong and I need to know.",
        deliver: ['Adjusted bank balance (B7)', 'Adjusted book balance (E7)', 'Difference between them (B9) — it should be 0'],
        hints: [
          'Bank side: start with the bank balance, ADD deposits the bank hasn\u2019t recorded yet, SUBTRACT checks that haven\u2019t cleared.',
          'Book side: start with the book balance, SUBTRACT fees and bounced (NSF) checks the bank took out, ADD interest the bank paid.',
          'B7: =B2+B3-B4-B5   E7: =E2-E3-E4+E5   B9: =B7-E7'
        ],
        praise: 'Both sides at $16,830 — reconciled. I\u2019ll book the fee, the NSF check, and the interest.',
        sheet: {
          cols: 5, rows: 9,
          widths: { A: 190, B: 110, C: 20, D: 190, E: 110 },
          formats: { B: 'money', E: 'money' },
          bold: ['A7', 'D7', 'A9'],
          grid: [
            ['Bank side', 'Amount', null, 'Book side', 'Amount'],
            ['Balance per bank', 18420, null, 'Balance per books', 16975],
            ['Add: deposit in transit', 2150, null, 'Less: bank service fee', 45],
            ['Less: check #1043', 1260, null, 'Less: NSF customer check', 380],
            ['Less: check #1047', 2480, null, 'Add: interest earned', 280],
            [null, null, null, null, null],
            ['Adjusted bank balance', null, null, 'Adjusted book balance', null],
            [null, null, null, null, null],
            ['Difference (should be 0)', null, null, null, null]
          ],
          editable: ['B7', 'E7', 'B9'],
          groups: [
            { label: 'Adjusted bank balance', weight: 35, cells: 'B7', expect: [16830], require: 'formula',
              tip: 'Bank side: add the deposit in transit and subtract both outstanding checks: =B2+B3-B4-B5.' },
            { label: 'Adjusted book balance', weight: 35, cells: 'E7', expect: [16830], require: 'formula',
              tip: 'Book side: subtract the fee and the NSF check, then add interest: =E2-E3-E4+E5.' },
            { label: 'Difference is zero', weight: 30, cells: 'B9', expect: [0], require: 'formula',
              tip: 'Show the difference with a formula, =B7-E7, so you can prove the two sides match.' }
          ]
        }
      }
    ],

    /* ---------------- Marketing ---------------- */
    marketing: [
      {
        id: 'mkt-metrics',
        title: 'Report on Q3 paid campaigns',
        summary: 'Calculate CTR, conversion rate, CAC, and ROAS by channel.',
        tool: 'sheet', minutes: 15,
        brief: "Q3 campaigns just wrapped. Fill in CTR, conversion rate, CAC, and ROAS for every channel, then tell me which channel is losing us money. I'm presenting budget changes to leadership Friday.",
        deliver: ['CTR (G2:G5) and conversion rate (H2:H5)', 'CAC (I2:I5) and ROAS (J2:J5)', 'Which channel to pause'],
        hints: [
          'CTR = clicks ÷ impressions. Conversion rate = conversions ÷ clicks. Leave them as decimals — the columns are already formatted as percents.',
          'CAC = spend ÷ conversions. ROAS = revenue ÷ spend.',
          'Row 2 formulas: G2 =D2/C2, H2 =E2/D2, I2 =B2/E2, J2 =F2/B2 — then fill each one down. Any ROAS under 1.0 loses money.'
        ],
        praise: "Great breakdown. Email is our best return and Display is burning cash — that's the story I'm taking to leadership.",
        sheet: {
          cols: 10, rows: 5,
          widths: { A: 84, B: 84, C: 104, D: 76, E: 96, F: 90, G: 74, H: 92, I: 80, J: 72 },
          formats: { B: 'money0', C: 'int', D: 'int', E: 'int', F: 'money0', G: 'pct', H: 'pct', I: 'money', J: 'x2' },
          grid: [
            ['Channel', 'Spend', 'Impressions', 'Clicks', 'Conversions', 'Revenue', 'CTR', 'Conv. rate', 'CAC', 'ROAS'],
            ['Search', 12000, 240000, 9600, 480, 43200, null, null, null, null],
            ['Social', 9000, 600000, 6000, 150, 13500, null, null, null, null],
            ['Email', 1500, 50000, 2500, 125, 11250, null, null, null, null],
            ['Display', 6000, 800000, 2400, 48, 4320, null, null, null, null]
          ],
          editable: ['G2:J5'],
          groups: [
            { label: 'Click-through rate (CTR)', weight: 20, cells: 'G2:G5', expect: [0.04, 0.01, 0.05, 0.003], require: 'formula', pct: true,
              tip: 'CTR is clicks ÷ impressions: =D2/C2, filled down.' },
            { label: 'Conversion rate', weight: 20, cells: 'H2:H5', expect: [0.05, 0.025, 0.05, 0.02], require: 'formula', pct: true,
              tip: 'Conversion rate is conversions ÷ clicks: =E2/D2, filled down.' },
            { label: 'Customer acquisition cost (CAC)', weight: 20, cells: 'I2:I5', expect: [25, 60, 12, 125], require: 'formula',
              tip: 'CAC is spend ÷ conversions: =B2/E2, filled down.' },
            { label: 'Return on ad spend (ROAS)', weight: 20, cells: 'J2:J5', expect: [3.6, 1.5, 7.5, 0.72], require: 'formula',
              tip: 'ROAS is revenue ÷ spend: =F2/B2, filled down.' }
          ]
        },
        questions: [
          { id: 'pause', prompt: 'Which channel is losing money and should be paused?', options: ['Search', 'Social', 'Email', 'Display'], answer: 'Display', weight: 20,
            tip: 'Check ROAS: Display returns $0.72 for every $1 spent, so it loses money. Anything under 1.0 is a loss.' }
        ]
      },
      {
        id: 'mkt-email',
        title: 'Write the spring launch email',
        summary: 'Draft a promo email that people will actually open.',
        tool: 'writing', minutes: 15,
        brief: "The spring collection launches Thursday. Draft the promo email to our list: 20% off with code SPRING20, ends Sunday at midnight. Keep it short — people skim — and make it obvious what to click.",
        deliver: ['A subject line that fits in an inbox (20–60 characters)', 'Preview text that adds something new', 'A short body (40–150 words) with the code, the deadline, and a clear call to action'],
        hints: [
          'Subject lines get cut off on phones — about 20 to 60 characters is the safe zone.',
          'Preview text is the gray line after the subject. Don\u2019t repeat the subject; add a reason to open.',
          'Include the exact code SPRING20, the Sunday midnight deadline, and a button-style call to action like "Shop the collection".'
        ],
        praise: "This is sendable. Short, clear, and the code is impossible to miss. I'm scheduling it for Thursday 9 AM.",
        writing: {
          fields: [
            { id: 'subject', label: 'Subject line', type: 'input', placeholder: 'What people see in their inbox', counter: 'chars' },
            { id: 'preview', label: 'Preview text', type: 'input', placeholder: 'The line shown after the subject', counter: 'chars' },
            { id: 'body', label: 'Email body', type: 'textarea', rows: 10, placeholder: 'Write the email here…', counter: 'words' }
          ],
          checks: [
            { label: 'Subject line is 20–60 characters', weight: 15, test: f => f.subject.trim().length >= 20 && f.subject.trim().length <= 60,
              tip: f => `Your subject line is ${f.subject.trim().length} characters — aim for 20 to 60 so it doesn't get cut off.` },
            { label: 'Mentions the 20% discount', weight: 10, test: f => /\b20\s?%|20 percent|twenty percent/i.test(f.subject + ' ' + f.body),
              tip: 'Say "20% off" — the discount is the main reason to open.' },
            { label: 'Includes the code SPRING20', weight: 20, test: f => /SPRING20/.test(f.subject + ' ' + f.body),
              tip: 'Include the exact code SPRING20 (all caps) so people can copy it.' },
            { label: 'States the deadline', weight: 15, test: f => /sunday/i.test(f.body),
              tip: 'Mention that the offer ends Sunday at midnight — deadlines drive clicks.' },
            { label: 'Clear call to action', weight: 15, test: f => /shop now|shop the|start shopping|browse|get yours|grab|claim|see the collection|explore|use code/i.test(f.body),
              tip: 'End with a clear call to action, like "Shop the collection".' },
            { label: 'Preview text is 30–90 characters and adds something new', weight: 10,
              test: f => { const p = f.preview.trim(); return p.length >= 30 && p.length <= 90 && p.toLowerCase() !== f.subject.trim().toLowerCase(); },
              tip: 'Write 30–90 characters of preview text that adds a new detail instead of repeating the subject.' },
            { label: 'Body is 40–150 words', weight: 10, test: f => words(f.body) >= 40 && words(f.body) <= 150,
              tip: f => `Your body is ${words(f.body)} words — keep it between 40 and 150 so skimmers read it.` },
            { label: "Doesn't shout", weight: 5,
              test: f => { const t = f.subject + ' ' + f.body; const caps = (t.match(/\b[A-Z]{3,}\b/g) || []).filter(w => w !== 'SPRING20').length; return caps <= 1 && (t.match(/!/g) || []).length <= 2; },
              tip: 'Ease up on ALL CAPS and exclamation points — they read as spam and can trip spam filters.' }
          ]
        }
      }
    ],

    /* ---------------- Consulting ---------------- */
    consulting: [
      {
        id: 'con-tree',
        title: "Structure the client's profit problem",
        summary: 'Sort possible causes into a MECE profit tree.',
        tool: 'sort', minutes: 10,
        brief: "Our client, a regional coffee chain, saw profits fall 22% this year. Before kickoff, sort these possible causes into our profit tree — revenue (price or volume) and costs (variable or fixed) — so we cover everything without overlap.",
        deliver: ['Every cause placed in exactly one branch', 'Revenue causes split into price vs. volume', 'Cost causes split into variable vs. fixed'],
        hints: [
          'Profit = revenue − costs. Revenue = price × volume.',
          'Variable costs rise and fall with how much you sell (ingredients, cups). Fixed costs stay the same no matter what (rent, salaries).',
          'Discounts change the price customers pay. Fewer visits or closed stores change volume.'
        ],
        praise: "Clean, MECE tree. That's the structure we'll open the kickoff with.",
        sort: {
          buckets: [
            { id: 'price', label: 'Revenue: price' },
            { id: 'volume', label: 'Revenue: volume' },
            { id: 'variable', label: 'Costs: variable' },
            { id: 'fixed', label: 'Costs: fixed' }
          ],
          items: [
            { id: 'c1', text: 'Heavier use of discounts and promo codes', answer: 'price', why: 'Discounts lower the price each customer actually pays.' },
            { id: 'c2', text: 'Fewer customers visiting each store', answer: 'volume', why: 'Fewer visits means fewer drinks sold — that\u2019s volume.' },
            { id: 'c3', text: 'Coffee bean prices rose 30%', answer: 'variable', why: 'Beans are used per drink, so their cost rises with every sale — variable.' },
            { id: 'c4', text: 'Rent increased at downtown locations', answer: 'fixed', why: 'Rent is the same whether you sell 10 drinks or 10,000 — fixed.' },
            { id: 'c5', text: 'Customers switching to cheaper drinks', answer: 'price', why: 'A cheaper mix lowers the average price per drink.' },
            { id: 'c6', text: 'Two stores closed for renovation', answer: 'volume', why: 'Closed stores sell nothing, which lowers volume.' },
            { id: 'c7', text: 'Paper cup and lid costs went up', answer: 'variable', why: 'Every drink uses a cup and lid, so that cost scales with sales.' },
            { id: 'c8', text: 'New regional manager salaries', answer: 'fixed', why: 'Salaries don\u2019t change with the number of drinks sold — fixed.' }
          ]
        }
      },
      {
        id: 'con-summary',
        title: 'Write the executive summary',
        summary: 'Lead with the answer in 120 words or less.',
        tool: 'writing', minutes: 15,
        brief: "Partner meeting in 20 minutes. Write the executive summary for the coffee client — 120 words max, recommendation first. Key facts: profit is down 22%. Coffee bean costs, up 30%, drive most of it. Loyalty members spend 2x what non-members do. We're recommending a 5% price increase on specialty drinks and expanding the loyalty program.",
        deliver: ['The recommendation in the first sentence', '50–120 words', 'The key numbers and root cause', 'A concrete next step at the end'],
        hints: [
          'Consultants lead with the answer. Start with "We recommend…"',
          'Then the why: the 22% profit drop, driven by 30% higher bean costs, and the 2x loyalty spend.',
          'Close with a next step — for example, piloting the price increase in a few stores next month.'
        ],
        praise: 'That reads like a partner wrote it. Answer first, tight, and it ends with an action.',
        writing: {
          fields: [
            { id: 'summary', label: 'Executive summary', type: 'textarea', rows: 9, placeholder: 'Start with the recommendation…', counter: 'words' }
          ],
          checks: [
            { label: 'Leads with the recommendation', weight: 20, test: f => /recommend/i.test(sentences(f.summary)[0] || ''),
              tip: 'Put the recommendation in your very first sentence — start with "We recommend…".' },
            { label: '50–120 words', weight: 15, test: f => words(f.summary) >= 50 && words(f.summary) <= 120,
              tip: f => `You're at ${words(f.summary)} words — partners want 50 to 120.` },
            { label: 'Mentions the 22% profit decline', weight: 10, test: f => /\b22\s?%|22 percent|twenty-two percent/i.test(f.summary),
              tip: 'Include the size of the problem: profit is down 22%.' },
            { label: 'Names the root cause (coffee bean costs)', weight: 15, test: f => /bean/i.test(f.summary),
              tip: 'Name the root cause — coffee bean costs rose 30%.' },
            { label: 'Includes the 5% price increase', weight: 15, test: f => /\b5\s?%|five percent|5 percent/i.test(f.summary) && /pric/i.test(f.summary),
              tip: 'Spell out the first recommendation: a 5% price increase on specialty drinks.' },
            { label: 'Includes the loyalty program', weight: 15, test: f => /loyalty/i.test(f.summary),
              tip: 'Include the second recommendation: expand the loyalty program (members spend 2x).' },
            { label: 'Ends with a next step', weight: 10,
              test: f => { const s = sentences(f.summary); return /next step|pilot|next week|next month|by (monday|tuesday|wednesday|thursday|friday)|we will|we'll|kick off|timeline|begin|start/i.test(s[s.length - 1] || ''); },
              tip: 'Finish with a concrete next step, like piloting the price change in five stores next month.' }
          ]
        }
      }
    ],

    /* ---------------- HR ---------------- */
    hr: [
      {
        id: 'hr-screen',
        title: 'Screen applicants for Sales Coordinator',
        summary: 'Decide who meets the must-have requirements.',
        tool: 'sort', minutes: 10,
        brief: "We're hiring a Sales Coordinator. The must-haves are at least 1 year of customer-facing experience, availability to work full-time, and comfort with Excel. Sort these applicants into Interview or Not a fit, based only on those requirements.",
        deliver: ['A decision for every applicant', 'Decisions based only on the three must-haves'],
        hints: [
          'Check each applicant against all three must-haves. Missing any one means Not a fit.',
          'Customer-facing means working directly with customers — retail, restaurants, call centers, bank tellers. Warehouse work isn\u2019t.',
          'Watch the details: 6 months is less than a year, and part-time availability doesn\u2019t meet full-time.'
        ],
        praise: 'Spot on, and fair — you screened on the requirements and nothing else. Scheduling those three now.',
        sort: {
          buckets: [
            { id: 'yes', label: 'Interview' },
            { id: 'no', label: 'Not a fit' }
          ],
          items: [
            { id: 'a1', text: 'Aisha K.', sub: '2 years retail sales associate · Full-time · Excel: pivot tables', answer: 'yes', why: 'Retail is customer-facing, 2 years is enough, full-time, and she knows Excel.' },
            { id: 'a2', text: 'Ben R.', sub: '3 years warehouse inventory lead · Full-time · Advanced Excel', answer: 'no', why: 'Warehouse inventory isn\u2019t customer-facing, so he misses a must-have despite strong Excel.' },
            { id: 'a3', text: 'Carla M.', sub: '18 months call center rep · Part-time only (20 hrs/week) · Excel basics', answer: 'no', why: 'She\u2019s only available part-time, and the role is full-time.' },
            { id: 'a4', text: 'Diego S.', sub: '1 year restaurant server and host · Full-time · Uses Excel for scheduling', answer: 'yes', why: 'One year serving customers meets the bar, he\u2019s full-time, and he uses Excel.' },
            { id: 'a5', text: 'Emma T.', sub: '6-month front desk internship · Full-time · Excel coursework', answer: 'no', why: 'Six months is less than the required 1 year of customer-facing experience.' },
            { id: 'a6', text: 'Farah N.', sub: '4 years bank teller · Full-time · Microsoft Office (Excel, Word)', answer: 'yes', why: 'Bank tellers work with customers all day, she\u2019s full-time, and she lists Excel.' }
          ]
        }
      },
      {
        id: 'hr-welcome',
        title: "Write a new hire's welcome email",
        summary: 'Give a new hire everything they need for day one.',
        tool: 'writing', minutes: 10,
        brief: "Riley Chen starts Monday, October 5 at 9:00 AM at our Main Street office, 2nd floor. Write their welcome email: tell them to ask for Tom at the front desk and to bring a government-issued photo ID for their I-9 paperwork. Make them feel welcome — first impressions matter.",
        deliver: ['A clear subject line', 'The date, time, and exact location', 'Who to ask for and what to bring', 'A warm, readable email (60–200 words)'],
        hints: [
          'New hires are nervous. Put the logistics where they\u2019re easy to find: date, time, place.',
          'Include the full location — Main Street office, 2nd floor — and that they should ask for Tom.',
          'Don\u2019t forget the government-issued photo ID for the I-9. Without it, they can\u2019t finish paperwork on day one.'
        ],
        praise: 'Riley is going to walk in knowing exactly where to go. Warm and organized — sending it now.',
        writing: {
          fields: [
            { id: 'subject', label: 'Subject line', type: 'input', placeholder: 'Subject', counter: 'chars' },
            { id: 'body', label: 'Email body', type: 'textarea', rows: 11, placeholder: 'Hi Riley,', counter: 'words' }
          ],
          checks: [
            { label: 'Greets Riley by name', weight: 10, test: f => /riley/i.test(f.body.slice(0, 80)),
              tip: 'Open by greeting Riley by name.' },
            { label: 'Gives the start date', weight: 15, test: f => /october\s*5(th)?|oct\.?\s*5(th)?|10\/5/i.test(f.subject + ' ' + f.body),
              tip: 'Include the start date: Monday, October 5.' },
            { label: 'Gives the start time', weight: 15, test: f => /\b9(:00)?\s?(a\.?m\.?)/i.test(f.body),
              tip: 'Include the start time: 9:00 AM.' },
            { label: 'Gives the exact location', weight: 15, test: f => /main st(reet)?/i.test(f.body) && /(2nd|second) floor/i.test(f.body),
              tip: 'Give the full location — the Main Street office, 2nd floor.' },
            { label: 'Says who to ask for', weight: 10, test: f => /\btom\b/i.test(f.body),
              tip: 'Tell Riley to ask for Tom at the front desk.' },
            { label: 'Says what to bring', weight: 15, test: f => (/\bID\b|identification|I-9/i.test(f.body)) && /photo|government|I-9/i.test(f.body),
              tip: 'Remind Riley to bring a government-issued photo ID for the I-9.' },
            { label: 'Subject line is clear', weight: 10, test: f => /welcome|first day|day one|start/i.test(f.subject),
              tip: 'Use a subject line that makes the purpose obvious, like "Welcome to the team — your first day".' },
            { label: '60–200 words', weight: 10, test: f => words(f.body) >= 60 && words(f.body) <= 200,
              tip: f => `Your email is ${words(f.body)} words — 60 to 200 keeps it warm without burying the details.` }
          ]
        }
      }
    ]
  };

  /* ---------------- Quiz content ---------------- */
  // Quiz clues never contain the term itself or what an acronym stands for.
  const CLUES = {
    'API': 'A published set of rules that lets one piece of software request data or actions from another.',
    'Cron job': 'A task set up to run automatically on a schedule, such as every Monday at 9 AM.',
    'Active Directory': 'Microsoft\u2019s service for managing user accounts, computers, and permissions across a company.',
    'Help desk ticket': 'A logged request for IT support that gets assigned, tracked, and closed once the problem is solved.',
    'VPN': 'An encrypted tunnel that lets remote employees reach internal company systems safely from anywhere.',
    'SLA': 'A written promise that sets how quickly a support team must respond to and fix problems.',
    'Patch management': 'The process of testing and rolling out software updates that fix bugs and security holes.',
    'DNS': 'Works like the internet\u2019s phone book, turning a web address someone types into the numeric address a computer can reach.',
    'EBITDA': 'A profit measure that leaves out borrowing costs, what\u2019s owed to the government, and the gradual write-down of long-term assets, showing how core operations perform.',
    'DCF': 'A valuation method that projects the money a business will generate in future years and converts it into what it\u2019s worth today.',
    'WACC': 'The blended rate a company pays to fund itself through both borrowing and selling shares, often used as the hurdle rate for new projects.',
    'Liquidity': 'How quickly an asset can be turned into money without dropping its value much.',
    'P/E ratio': 'A valuation multiple: what one share costs in the market divided by the company\u2019s profit per share.',
    'Basis point': 'One hundredth of 1% (0.01%), commonly used to describe small moves in interest rates and bond yields.',
    'Working capital': 'Current assets minus current liabilities: a quick read on whether a company can cover its short-term bills.',
    'Due diligence': 'A deep investigation of a company\u2019s finances, legal issues, and risks before a deal closes.',
    'KPI': 'A measurable number a team tracks to see whether it\u2019s hitting an important goal.',
    'CTR': 'The share of people who saw an ad or link and then selected it.',
    'Conversion rate': 'The percentage of visitors who complete a desired action, like buying or signing up.',
    'CAC': 'Total sales and marketing spending divided by the number of new buyers it brought in.',
    'SEO': 'Improving a website\u2019s content and structure so it ranks higher in unpaid Google results.',
    'A/B test': 'An experiment that shows two versions of something to different groups to see which performs better.',
    'Buyer persona': 'A research-based profile of an ideal customer, used to guide messaging and targeting.',
    'ROAS': 'Revenue earned for every dollar put into advertising.',
    'Accrual accounting': 'Recording revenue when it\u2019s earned and expenses when they\u2019re incurred, no matter when money actually changes hands.',
    'Accounts receivable': 'Money customers still owe the company for goods or services already delivered.',
    'Accounts payable': 'Money the company still owes its suppliers for things it already got.',
    'General ledger': 'The master record of every financial transaction a company makes, organized by account.',
    'Reconciliation': 'Comparing two sets of records, like a bank statement and the books, to make sure they match.',
    'Depreciation': 'Spreading the cost of a physical asset over the years it\u2019s expected to be useful.',
    'Journal entry': 'A record of one transaction using debits and credits that must balance.',
    'Month-end close': 'The process of finalizing, reviewing, and locking the books once each accounting period wraps up.',
    'Deliverable': 'A specific output promised to the client, such as a report, model, or presentation.',
    'Scope creep': 'When a project slowly grows beyond what was originally agreed, without extra time or budget.',
    'MECE': 'Breaking a problem into parts that don\u2019t overlap and together cover every possibility.',
    'Stakeholder': 'Anyone affected by, or with influence over, a project and its outcome.',
    'Hypothesis-driven approach': 'Starting with a likely answer, then using analysis to prove or disprove it instead of analyzing everything first.',
    'Utilization rate': 'The share of a consultant\u2019s working hours that are billed to clients.',
    'Engagement': 'A single client project, from kickoff to final handoff.',
    'Executive summary': 'The short opening section that gives busy leaders the key findings and recommendations up front.',
    'Onboarding': 'The process of getting a new hire set up and settled, from paperwork to training and introductions.',
    'ATS': 'Software used to post openings, collect résumés, and move candidates through each hiring stage.',
    'Total compensation': 'The full value of everything a worker receives, including salary, bonuses, and benefits.',
    'Performance review': 'A formal evaluation of someone\u2019s work, usually done on a set schedule.',
    'Retention': 'An organization\u2019s ability to keep its people over time.',
    'Open enrollment': 'The yearly window when workers can sign up for or change their benefits.',
    'Exempt employee': 'A worker who, under U.S. labor law, isn\u2019t entitled to overtime pay, typically a salaried professional.',
    'Headcount': 'The number of people employed, often used when planning budgets and hiring.'
  };
  // Workplace scenarios. The first option is the right answer; options are shuffled when shown.
  const CONTEXT = {
    it: [
      { term: 'VPN', prompt: 'A remote employee can load Gmail and news sites from home, but not the internal HR portal. Coworkers in the office can open the portal fine. What should you check first?',
        options: ['Whether she\u2019s connected to the VPN', 'Whether DNS is down for the whole company', 'Whether the HR portal\u2019s SLA has expired', 'Whether a cron job is blocking her laptop'],
        why: 'Public sites work and in-office coworkers are fine, so the internet and the portal are both up. Internal systems usually need the company VPN when you\u2019re remote.' },
      { term: 'Cron job', prompt: 'Every Monday at 9 AM, someone on your team manually exports the same report. Your manager wants it to happen on its own. What should you set up?',
        options: ['A cron job', 'An SLA', 'A DNS record', 'A VPN'],
        why: 'A cron job runs a task automatically on a schedule, like every Monday at 9 AM.' },
      { term: 'SLA', prompt: 'It\u2019s 1:30 PM. Your SLA requires a first response within 4 hours. Which ticket needs you first?',
        options: ['Opened at 10:00 AM, no reply yet', 'Opened at 11:30 AM, no reply yet', 'Opened at 12:45 PM, no reply yet', 'Opened at 9:00 AM, you replied at 9:20 AM'],
        why: 'The 10:00 AM ticket hits its 4-hour deadline at 2:00 PM, just 30 minutes away. The 9:00 AM ticket already got a response, so it\u2019s safe.' },
      { term: 'Patch management', prompt: 'A security flaw is announced in your company laptops\u2019 operating system, and the vendor released a fix yesterday. What does good patch management look like here?',
        options: ['Test the fix on a few machines, then roll it out to everyone', 'Install it on every computer right away without testing', 'Wait until someone reports a problem', 'Turn off automatic updates so nothing breaks'],
        why: 'Security fixes should go out quickly, but testing on a small group first catches updates that break other software.' },
      { term: 'Active Directory', prompt: 'A new hire starts Monday and needs one login that works for email, Wi-Fi, and shared drives. Where would IT create that account?',
        options: ['Active Directory', 'The DNS server', 'The VPN', 'A help desk ticket'],
        why: 'Active Directory manages user accounts and permissions, so one login can work across company systems.' },
      { term: 'DNS', prompt: 'Nobody can reach the company website by typing its address, but it loads fine when someone types its numeric IP address instead. What\u2019s most likely broken?',
        options: ['DNS', 'The VPN', 'Active Directory', 'The website\u2019s API'],
        why: 'The site itself is up, since the IP address works. DNS is what turns the name people type into that IP address.' },
      { term: 'API', prompt: 'Your team\u2019s app shows live weather data that comes from another company\u2019s service. What makes that connection possible?',
        options: ['An API', 'A VPN', 'An SLA', 'Active Directory'],
        why: 'An API is how one program requests data from another, like your app asking a weather service for today\u2019s forecast.' }
    ],
    finance: [
      { term: 'P/E ratio', prompt: 'Two companies each earned $10M last year. Company A is worth $150M in the market and Company B is worth $250M. Which is true?',
        options: ['Company B has the higher P/E, so investors pay more for each dollar of its profit', 'Company A has the higher P/E', 'They have the same P/E because their profits are equal', 'You can\u2019t compare P/E without knowing their WACC'],
        why: 'P/E is market value divided by earnings: A is 15x and B is 25x. Investors pay $25 for each $1 of B\u2019s profit.' },
      { term: 'Basis point', prompt: 'The Fed raises interest rates from 5.25% to 5.50%. How would an analyst describe the move?',
        options: ['A 25 basis point increase', 'A 2.5 basis point increase', 'A 0.25 basis point increase', 'A 250 basis point increase'],
        why: 'The rate rose 0.25 percentage points, and each basis point is 0.01%, so that\u2019s 25 basis points.' },
      { term: 'Working capital', prompt: 'A company has $2M in current assets and $2.5M in current liabilities. What does that tell you?',
        options: ['Its working capital is negative, so it may struggle to pay short-term bills', 'Its working capital is $4.5M', 'It\u2019s very liquid', 'Its EBITDA must be negative'],
        why: 'Working capital is current assets minus current liabilities: $2M − $2.5M = −$0.5M. It owes more in the short term than it can easily cover.' },
      { term: 'DCF', prompt: 'In a DCF model, your manager raises the discount rate from 8% to 12%. All else equal, what happens to the company\u2019s estimated value?',
        options: ['It goes down', 'It goes up', 'It stays the same', 'It depends only on EBITDA'],
        why: 'A higher discount rate makes future money worth less today, so the present value drops.' },
      { term: 'EBITDA', prompt: 'An analyst says, \u201cTheir EBITDA looks great, but they\u2019re buried in loan payments.\u201d Why can EBITDA be misleading here?',
        options: ['EBITDA ignores interest, so heavy borrowing costs don\u2019t show up in it', 'EBITDA counts interest twice', 'EBITDA only includes cash sales', 'EBITDA subtracts loan payments but not taxes'],
        why: 'EBITDA is measured before interest, so a company with big debt costs can look healthier than it really is.' },
      { term: 'WACC', prompt: 'A project is expected to return 7% a year. The company\u2019s WACC is 9%. What should the analyst recommend?',
        options: ['Reject it: it earns less than it costs to fund', 'Accept it: any positive return is good', 'Accept it: 7% beats inflation', 'WACC doesn\u2019t matter when choosing projects'],
        why: 'WACC is the company\u2019s cost of money. Earning 7% on money that costs 9% destroys value.' },
      { term: 'Due diligence', prompt: 'Before buying a smaller competitor, your firm spends six weeks reviewing its contracts, lawsuits, and financial records. What is this called?',
        options: ['Due diligence', 'A DCF', 'Working capital management', 'Liquidity analysis'],
        why: 'Due diligence is the deep investigation of a business before a deal closes.' },
      { term: 'Liquidity', prompt: 'You need to turn $5,000 of investments into cash by tomorrow without losing value. Which is the most liquid?',
        options: ['Shares of a large public company', 'A rental property', 'A stake in a private startup', 'A rare painting'],
        why: 'Large public stocks trade every second at a clear price. The others can take weeks or months to sell at full value.' }
    ],
    marketing: [
      { term: 'CTR', prompt: 'An ad was shown 50,000 times and clicked 1,000 times. What is its CTR?',
        options: ['2%', '5%', '0.2%', '20%'],
        why: 'CTR is clicks divided by impressions: 1,000 ÷ 50,000 = 0.02, or 2%.' },
      { term: 'ROAS', prompt: 'Campaign A spent $10,000 and brought in $30,000 in revenue. Campaign B spent $4,000 and brought in $16,000. Which has the better ROAS?',
        options: ['Campaign B, 4.0 vs. 3.0', 'Campaign A, because it made more revenue', 'They\u2019re equal', 'You can\u2019t tell without the CTR'],
        why: 'ROAS is revenue divided by ad spend. A earns $3 per $1 and B earns $4 per $1, even though A made more in total.' },
      { term: 'CAC', prompt: 'You spent $6,000 on ads and gained 150 new customers. What is your CAC?',
        options: ['$40', '$25', '$400', '$900'],
        why: 'CAC is spend divided by new customers: $6,000 ÷ 150 = $40.' },
      { term: 'Conversion rate', prompt: 'Your landing page got 2,000 visitors and 60 sign-ups. After a redesign, it got 2,000 visitors and 90 sign-ups. What improved?',
        options: ['Conversion rate, from 3% to 4.5%', 'CTR, from 3% to 4.5%', 'CAC, from 3% to 4.5%', 'Traffic, from 2,000 to 3,000'],
        why: 'Conversion rate is actions divided by visitors: 60 ÷ 2,000 = 3%, then 90 ÷ 2,000 = 4.5%. Traffic stayed the same.' },
      { term: 'A/B test', prompt: 'You want to know whether a red or a green \u201cBuy now\u201d button gets more purchases. What\u2019s the most reliable approach?',
        options: ['Show each version to a random half of visitors at the same time', 'Use red for a month, then green the next month', 'Ask the team which color they prefer', 'Pick the color your competitor uses'],
        why: 'Splitting visitors at the same time is an A/B test. Switching month to month mixes in other changes, like holidays or sales.' },
      { term: 'SEO', prompt: 'People search Google for your product\u2019s topic all the time, but your blog posts almost never show up in the results. What should you work on?',
        options: ['SEO', 'ROAS', 'CAC', 'Your A/B test schedule'],
        why: 'SEO is what helps your pages rank in unpaid search results.' },
      { term: 'Buyer persona', prompt: 'Your team writes: \u201cMaya, 34, runs a small bakery, shops on her phone, and cares most about saving time.\u201d What is this?',
        options: ['A buyer persona', 'A KPI', 'An A/B test', 'A conversion goal'],
        why: 'A buyer persona is a profile of your ideal customer that guides messaging and targeting.' }
    ],
    accounting: [
      { term: 'Accrual accounting', prompt: 'A customer buys $2,000 of product on credit in March and pays in April. Under accrual accounting, when is the revenue recorded?',
        options: ['In March, when the sale is made', 'In April, when the cash arrives', 'Half in March and half in April', 'After the bank reconciliation'],
        why: 'Accrual accounting records revenue when it\u2019s earned, not when the cash shows up.' },
      { term: 'Accounts receivable', prompt: 'You ship $2,000 of product to a customer who will pay in 30 days. Which account increases?',
        options: ['Accounts receivable', 'Accounts payable', 'Cash', 'Depreciation expense'],
        why: 'The customer owes you money, and that\u2019s tracked in accounts receivable until they pay.' },
      { term: 'Accounts payable', prompt: 'Your company receives a $900 invoice from a supplier, due in 30 days. Which account increases?',
        options: ['Accounts payable', 'Accounts receivable', 'Revenue', 'Cash'],
        why: 'You owe the supplier, and money you owe for things you\u2019ve received goes in accounts payable.' },
      { term: 'Depreciation', prompt: 'A $12,000 delivery van is expected to last 4 years and be worth nothing at the end. Using straight-line depreciation, how much is expensed each year?',
        options: ['$3,000', '$12,000', '$4,000', '$1,000'],
        why: 'Straight-line spreads the cost evenly: $12,000 ÷ 4 years = $3,000 a year.' },
      { term: 'Journal entry', prompt: 'A journal entry debits Supplies $500 and credits Cash $400. What\u2019s wrong with it?',
        options: ['It doesn\u2019t balance: debits must equal credits', 'Supplies should never be debited', 'Cash can never be credited', 'Nothing, as long as the description is clear'],
        why: 'Every journal entry has to balance. $500 of debits needs $500 of credits.' },
      { term: 'Reconciliation', prompt: 'Your bank statement shows $450 less than your books. You find a $450 check you wrote that hasn\u2019t cleared the bank yet. What are you doing?',
        options: ['A bank reconciliation', 'Recording depreciation', 'Accrual accounting', 'Writing a journal entry'],
        why: 'Matching your books to the bank statement and explaining the differences is a reconciliation.' },
      { term: 'Month-end close', prompt: 'It\u2019s the 3rd of the month, and the controller wants everyone\u2019s reconciliations and accruals for last month done by Friday. What\u2019s happening?',
        options: ['Month-end close', 'An external audit', 'Depreciation', 'A general ledger reset'],
        why: 'Finalizing and reviewing last month\u2019s books in the first days of the new month is the month-end close.' }
    ],
    consulting: [
      { term: 'Scope creep', prompt: 'Halfway through a 6-week project, the client asks you to \u201calso take a quick look\u201d at their European market, which isn\u2019t in the contract. What is this?',
        options: ['Scope creep', 'A new deliverable already in the contract', 'MECE', 'High utilization'],
        why: 'Work growing beyond what was agreed, without more time or budget, is scope creep. Flag it to your manager.' },
      { term: 'MECE', prompt: 'Your manager breaks \u201cWhy are profits down?\u201d into two branches: \u201crevenue fell\u201d and \u201ccosts rose.\u201d Why is that a strong start?',
        options: ['The branches don\u2019t overlap and together cover every possible cause', 'It lists causes from most to least likely', 'It focuses on costs, which are easier to fix', 'It lets the team skip the analysis'],
        why: 'That\u2019s MECE: profit can only fall if revenue drops or costs rise, and the two don\u2019t overlap.' },
      { term: 'Hypothesis-driven approach', prompt: 'On day one, your team says, \u201cWe think the client should close its three weakest stores,\u201d then gathers data to test that idea. What approach is this?',
        options: ['Hypothesis-driven', 'Scope creep', 'MECE', 'Utilization'],
        why: 'Starting with a likely answer and testing it with data is a hypothesis-driven approach. It\u2019s faster than analyzing everything first.' },
      { term: 'Utilization rate', prompt: 'You billed 32 hours to clients in a 40-hour week. What is your utilization rate?',
        options: ['80%', '32%', '125%', '8%'],
        why: 'Utilization is billed hours divided by total hours: 32 ÷ 40 = 80%.' },
      { term: 'Executive summary', prompt: 'The client\u2019s CEO has two minutes before a board meeting. What should you hand her?',
        options: ['The executive summary', 'The full 60-slide appendix', 'Your raw data spreadsheet', 'The project timeline'],
        why: 'The executive summary puts the key findings and recommendation up front for busy leaders.' },
      { term: 'Stakeholder', prompt: 'The client\u2019s head of sales isn\u2019t on your project team, but your recommendation will change how her team gets paid. What is she?',
        options: ['A stakeholder', 'Out of scope', 'A deliverable', 'Not relevant until the project ends'],
        why: 'Anyone affected by the outcome is a stakeholder, and she should be consulted early.' },
      { term: 'Deliverable', prompt: 'The contract lists a pricing model, a market-sizing report, and a final presentation. What are these?',
        options: ['Deliverables', 'Stakeholders', 'Hypotheses', 'Engagements'],
        why: 'Deliverables are the specific outputs you promised the client.' }
    ],
    hr: [
      { term: 'Exempt employee', prompt: 'A salaried marketing manager worked 50 hours last week. She\u2019s classified as exempt. How much overtime pay is she owed?',
        options: ['None: exempt employees aren\u2019t entitled to overtime', '10 hours at 1.5 times her rate', '10 hours at her normal rate', 'It depends on her last performance review'],
        why: 'Exempt employees are salaried and aren\u2019t covered by overtime rules.' },
      { term: 'Total compensation', prompt: 'A candidate is choosing between $60,000 with great health insurance and a 5% retirement match, or $63,000 with no benefits. What should she compare?',
        options: ['Total compensation: salary plus the value of benefits', 'Only the salary', 'Only the start dates', 'Each company\u2019s headcount'],
        why: 'Benefits can be worth thousands of dollars, so the $60,000 offer may actually be worth more.' },
      { term: 'Retention', prompt: 'Half of last year\u2019s new hires left within six months. Which metric is the HR team most worried about?',
        options: ['Retention', 'Headcount', 'Open enrollment', 'Total compensation'],
        why: 'Retention measures how well a company keeps its people, and losing half of new hires is a retention problem.' },
      { term: 'Onboarding', prompt: 'A new hire\u2019s first week includes setting up payroll, getting a laptop, meeting her team, and compliance training. What is this process?',
        options: ['Onboarding', 'Open enrollment', 'A performance review', 'Retention planning'],
        why: 'Onboarding is everything that gets a new hire set up and settled in.' },
      { term: 'Open enrollment', prompt: 'It\u2019s November, and employees are emailing HR to switch health plans for next year. What\u2019s likely going on?',
        options: ['Open enrollment', 'Performance review season', 'Onboarding', 'A headcount freeze'],
        why: 'Open enrollment is the yearly window to change benefits, and it\u2019s often in the fall.' },
      { term: 'ATS', prompt: 'Your company gets 900 applications for one role. What helps recruiters sort, filter, and track them?',
        options: ['An ATS', 'Total compensation data', 'Open enrollment', 'A performance review'],
        why: 'An applicant tracking system collects applications and moves candidates through hiring stages.' },
      { term: 'Headcount', prompt: 'Finance tells HR, \u201cWe can add three positions next year.\u201d What are they approving?',
        options: ['More headcount', 'Better retention', 'An onboarding plan', 'Higher total compensation'],
        why: 'Headcount is the number of people employed. Adding positions increases it.' }
    ]
  };

  /* ---------------- Helpers ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const uiErr = msg => Object.assign(new Error(msg), { ui: true });

  /* ---------------- Saved progress (this browser) ---------------- */
  const LOCAL_KEY = 'firstday:v1';
  const THEME_KEY = 'firstday:theme';
  const loadLocal = () => { try { const r = localStorage.getItem(LOCAL_KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } };
  const loadTheme = () => { try { return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; } };
  const saveLocal = d => { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(d)); } catch (e) { /* ignore */ } };

  const normalize = d => ({
    name: d && typeof d.name === 'string' && d.name.trim() ? d.name.trim().slice(0, 40) : 'Intern',
    track: d && TRACKS[d.track] ? d.track : null,
    mastered: d && d.mastered && typeof d.mastered === 'object' ? d.mastered : {},
    quizBest: d && d.quizBest && typeof d.quizBest === 'object' ? d.quizBest : {},
    tasks: d && d.tasks && typeof d.tasks === 'object' ? d.tasks : {}
  });

  /* ---------------- App state ---------------- */
  let state = null;          // { name, track, mastered, quizBest, tasks }
  let currentView = 'dashboard';
  {
    const local = loadLocal();
    if (local && TRACKS[local.track]) state = normalize(local);
  }

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
  const quizKey = kind => kind === 'context' ? state.track + ':context' : state.track;
  const bestQuiz = (kind = 'vocab') => state.quizBest[quizKey(kind)] != null ? state.quizBest[quizKey(kind)] : null;

  /* ---------------- Saving ---------------- */
  function persist() {
    if (!state) return;
    saveLocal(state);
    setSync();
  }
  function setSync() {
    const el = $('#sync-status');
    if (el) { el.textContent = 'Saved on this device'; el.dataset.s = 'local'; }
  }
  const friendly = err => (err && err.ui) ? err.message : 'Something went wrong. Please try again.';

  /* ---------------- Elements ---------------- */
  const landing = $('#landing');
  const app = $('#app');
  const main = $('#app-main');
  const modal = $('#modal');
  const modalBody = $('#modal-body');
  const nav = $('.nav');
  let theme = loadTheme();
  app.dataset.theme = theme;

  /* ---------------- Toast ---------------- */
  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 4200);
  }

  /* ---------------- Modal (get started + track picker) ---------------- */
  let modalMode = null;
  let modalLocked = false;
  let draftTrack = null;

  function openModal(mode) {
    modalMode = mode;
    modalLocked = mode === 'track-first';
    if (mode === 'track' || mode === 'track-first') draftTrack = state ? state.track : null;
    renderModal();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const first = $('input, .track-opt', modalBody);
    if (first) first.focus();
  }

  function closeModal(force) {
    if (modalLocked && !force) return;
    modal.hidden = true;
    modalMode = null;
    modalLocked = false;
    document.body.style.overflow = '';
  }

  function renderModal() {
    $('.modal-close', modal).hidden = modalLocked;
    const mode = modalMode;

    if (mode === 'signup' || mode === 'login') {
      modalBody.innerHTML = `
        <p class="eyebrow">Get started</p>
        <h2 id="modal-title">Let's set up your first day.</h2>
        <p class="page-sub">Your progress is saved in this browser.</p>
        <form class="auth-form" data-form="local" novalidate>
          <label class="field-label" for="f-name">First name</label>
          <input class="input" id="f-name" name="name" maxlength="40" autocomplete="given-name" required>
          <p class="form-error" role="alert"></p>
          <button class="btn btn-primary btn-block" type="submit"><span>Continue</span></button>
        </form>`;
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
          <span></span>
          <button class="btn btn-primary" data-action="track-finish" ${draftTrack ? '' : 'disabled'}>${first ? 'Start my first day' : 'Switch track'}</button>
        </div>`;
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

  /* ---------------- Forms ---------------- */
  document.addEventListener('submit', e => {
    const form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();
    clearFormError();
    const name = (new FormData(form).get('name') || '').toString().trim();
    try {
      if (form.dataset.form === 'local') {
        if (!name) throw uiErr('Add your first name.');
        state = normalize({ name, track: null });
        closeModal(true);
        openModal('track-first');
      } else if (form.dataset.form === 'profile') {
        if (!name) throw uiErr('Your name can\u2019t be empty.');
        state.name = name.slice(0, 40);
        persist();
        refreshHeader();
        toast('Name updated.');
      }
    } catch (err) {
      showFormError(friendly(err));
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
    setSync();
    go(view);
  }

  function go(view) {
    if (view === 'task' && !findTask(currentTaskId)) view = 'job';
    currentView = view;
    const navView = view === 'task' ? 'job' : view;
    $$('.side-item[data-view]').forEach(b => b.classList.toggle('is-active', b.dataset.view === navView));
    if (view === 'job') renderJobList();
    else if (view === 'task') renderTask();
    else if (view === 'terms') renderTerms();
    else if (view === 'docs') renderDocs();
    else if (view === 'account') renderAccount();
    else if (view === 'settings') renderSettings();
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

  /* ---------------- Dashboard ---------------- */
  function renderDashboard() {
    const track = TRACKS[state.track];
    const total = trackTerms().length;
    const done = masteredCount();
    const pct = Math.round((done / total) * 100);
    const best = bestQuiz();
    const js = jobStats();

    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">${esc(track.name)} track</p>
        <h1>Welcome, ${esc(state.name)}.</h1>
        <p class="page-sub">Here's where you stand before day one.</p>
      </div>

      <div class="stat-cards">
        <div class="card">
          <p class="card-label">Assignments passed</p>
          <div class="card-value">${js.done}/${js.total}</div>
          <p class="hint">${js.avg == null ? 'Your manager has work waiting for you.' : `Average grade: ${letter(js.avg)}`}</p>
        </div>
        <div class="card">
          <p class="card-label">Key terms mastered</p>
          <div class="card-value">${done}/${total}</div>
          <div class="bar" aria-hidden="true"><span style="width:${pct}%"></span></div>
        </div>
        <div class="card">
          <p class="card-label">Best quiz scores</p>
          <div class="card-value">${best == null ? '&mdash;' : best + '%'}</div>
          <p class="hint">${best == null ? 'Vocab quiz not taken yet' : 'Vocab quiz'} &middot; In context: ${bestQuiz('context') == null ? 'not taken yet' : bestQuiz('context') + '%'}</p>
        </div>
        <div class="card">
          <p class="card-label">Your track</p>
          <div class="card-value card-value-sm">${esc(track.name)}</div>
          <button class="text-btn" data-action="change-track">Change track</button>
        </div>
      </div>

      <h2 class="block-title">Your modules</h2>
      <div class="module-grid">
        <div class="card module module-feature">
          <span class="status status-open">Available</span>
          <h3>On the Job</h3>
          <p>Real assignments from ${esc(BOSSES[state.track].name)}, your ${esc(BOSSES[state.track].role.toLowerCase())}. Do the work, hand it in, get graded.</p>
          <button class="btn btn-primary btn-small" data-view="job">${js.done ? 'Continue assignments' : 'See your first assignment'}</button>
        </div>
        <div class="card module">
          <span class="status status-open">Available</span>
          <h3>Resume &amp; cover letter</h3>
          <p>Build, paste, or upload yours. Get line-by-line fixes, a job-posting keyword check, and a polished version to download.</p>
          <button class="btn btn-primary btn-small" data-view="docs">${docs.resume.model || docs.cover.source ? 'Open your materials' : 'Polish your resume'}</button>
        </div>
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
    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">Settings</p>
        <h1>Account</h1>
        <p class="page-sub">Your profile and progress are saved in this browser.</p>
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
      </div>

      <div class="card settings">
        <h3 class="settings-title">Track</h3>
        <p class="page-sub">You’re on the <strong>${esc(TRACKS[state.track].name)}</strong> track. Progress on each track is saved separately.</p>
        <button class="btn btn-ghost btn-small" data-action="change-track">Change track</button>
      </div>

      <div class="card settings">
        <h3 class="settings-title">Home page</h3>
        <p class="page-sub">Go back to the FirstDay home page. Your progress stays saved.</p>
        <button class="btn btn-ghost btn-small" data-action="signout">Back to home page</button>
      </div>

      <div class="card settings danger">
        <h3 class="settings-title">Danger zone</h3>
        <div class="danger-row">
          <div><strong>Reset progress</strong><p class="hint">Clears assignment grades and drafts, mastered terms, and quiz scores on every track.</p></div>
          <button class="btn btn-danger-ghost btn-small" data-action="reset-progress">Reset progress</button>
        </div>
      </div>`;
  }

  function renderSettings() {
    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">You</p>
        <h1>Settings</h1>
        <p class="page-sub">Choose how FirstDay looks on this device.</p>
      </div>

      <div class="card settings">
        <h3 class="settings-title">Appearance</h3>
        <label class="field-label" for="setting-theme">Color theme</label>
        <select class="input settings-theme" id="setting-theme" data-theme-setting>
          <option value="light" ${theme === 'light' ? 'selected' : ''}>Light</option>
          <option value="dark" ${theme === 'dark' ? 'selected' : ''}>Dark</option>
        </select>
        <p class="hint settings-hint">Your choice is saved in this browser.</p>
      </div>

      <div class="card settings">
        <h3 class="settings-title">Change password</h3>
        <p class="page-sub">Password changes aren’t available because FirstDay currently saves your profile on this device and doesn’t use password-based sign-in.</p>
      </div>`;
  }

  /* ---------------- Key terms ---------------- */
  let termsTab = 'study';
  let deck = null;                 // { track, cards }
  let fc = { i: 0, flipped: false };
  let quizzes = {};                // { vocab, context } → { track, qs, i, score, picked, done }

  function renderTerms() {
    const track = TRACKS[state.track];
    const tabs = [['study', 'Study'], ['list', 'All terms'], ['quiz', 'Vocab quiz'], ['context', 'In context']];
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
    else if (termsTab === 'quiz') renderQuiz(body, 'vocab');
    else if (termsTab === 'context') renderQuiz(body, 'context');
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
            <button class="btn btn-ghost" data-tab="quiz">Take the vocab quiz</button>
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

  function newQuiz(kind) {
    const pool = trackTerms();
    let qs;
    if (kind === 'context') {
      qs = shuffle(CONTEXT[state.track] || []).map(c => ({
        prompt: c.prompt, answer: c.options[0], opts: shuffle(c.options), why: c.why, term: c.term
      }));
    } else {
      // Alternate directions so knowing one form isn't enough, and never show a giveaway definition
      qs = shuffle(pool).map((card, k) => {
        const others = shuffle(pool.filter(x => x.t !== card.t)).slice(0, 3);
        const clue = CLUES[card.t] || card.d;
        const full = `${card.t}: ${card.d}`;
        return k % 2 === 0
          ? { ask: 'Which term matches this description?', prompt: clue, answer: card.t, opts: shuffle([card.t, ...others.map(x => x.t)]), why: full }
          : { ask: 'Which description fits this term?', prompt: card.t, isTerm: true, answer: clue, opts: shuffle([clue, ...others.map(x => CLUES[x.t] || x.d)]), why: full };
      });
    }
    quizzes[kind] = { track: state.track, qs, i: 0, score: 0, picked: null, done: false };
  }

  function renderQuiz(body, kind) {
    if (!quizzes[kind] || quizzes[kind].track !== state.track) newQuiz(kind);
    const quiz = quizzes[kind];
    const n = quiz.qs.length;
    const label = kind === 'context' ? 'In context' : 'Vocab quiz';

    if (quiz.done) {
      const pct = Math.round((quiz.score / n) * 100);
      const best = bestQuiz(kind);
      body.innerHTML = `
        <div class="card result">
          <p class="card-label">${label}: your score</p>
          <div class="card-value">${pct}%</div>
          <p class="page-sub">${quiz.score} of ${n} correct${best != null ? ` &middot; Best: ${best}%` : ''}</p>
          <div class="btn-row center">
            <button class="btn btn-primary" data-action="quiz-restart" data-kind="${kind}">Retake</button>
            ${kind === 'vocab'
              ? '<button class="btn btn-ghost" data-tab="context">Try it in context</button>'
              : '<button class="btn btn-ghost" data-tab="study">Back to studying</button>'}
          </div>
        </div>`;
      return;
    }

    const q = quiz.qs[quiz.i];
    const answered = quiz.picked !== null;
    const correct = answered && q.opts[quiz.picked] === q.answer;
    body.innerHTML = `
      <div class="card">
        <p class="card-label">${label} &middot; Question ${quiz.i + 1} of ${n} &middot; Score ${quiz.score}</p>
        ${kind === 'context'
          ? `<p class="quiz-q">${esc(q.prompt)}</p>`
          : `<p class="quiz-ask">${esc(q.ask)}</p><p class="quiz-q ${q.isTerm ? 'quiz-term' : ''}">${esc(q.prompt)}</p>`}
        <div class="quiz-opts">
          ${q.opts.map((opt, idx) => {
            let cls = '';
            if (answered && opt === q.answer) cls = 'is-right';
            else if (answered && idx === quiz.picked) cls = 'is-wrong';
            return `<button class="quiz-opt ${cls}" data-action="quiz-pick" data-kind="${kind}" data-idx="${idx}" ${answered ? 'disabled' : ''}>${esc(opt)}</button>`;
          }).join('')}
        </div>
        ${answered ? `<div class="quiz-why ${correct ? 'is-ok' : 'is-no'}" aria-live="polite"><strong>${correct ? 'Correct.' : 'Not quite.'}</strong> ${esc(q.why)}</div>` : ''}
        <div class="quiz-foot">
          <span class="fc-count">${kind === 'context' ? (answered ? `Term: ${esc(q.term)}` : 'Pick the best answer.') : ''}</span>
          ${answered ? `<button class="btn btn-primary btn-small" data-action="quiz-next" data-kind="${kind}">${quiz.i + 1 === n ? 'See results' : 'Next question'}</button>` : ''}
        </div>
      </div>`;
  }

  function quizPick(kind, idx) {
    const quiz = quizzes[kind];
    if (!quiz || quiz.picked !== null) return;
    quiz.picked = idx;
    if (quiz.qs[quiz.i].opts[idx] === quiz.qs[quiz.i].answer) quiz.score += 1;
    renderTermsBody();
  }

  function quizNext(kind) {
    const quiz = quizzes[kind];
    quiz.i += 1;
    quiz.picked = null;
    if (quiz.i >= quiz.qs.length) {
      quiz.done = true;
      const pct = Math.round((quiz.score / quiz.qs.length) * 100);
      const key = quizKey(kind);
      const prev = state.quizBest[key];
      if (prev == null || pct > prev) { state.quizBest[key] = pct; persist(); }
    }
    renderTermsBody();
  }

  /* ---------------- Assignment helpers ---------------- */
  const jobTasks = () => JOBS[state.track] || [];
  const findTask = id => jobTasks().find(t => t.id === id);
  const taskRecord = id => (state.tasks && state.tasks[id]) || null;
  const PASS = 70;
  const letter = s => s >= 97 ? 'A+' : s >= 93 ? 'A' : s >= 90 ? 'A-' : s >= 87 ? 'B+' : s >= 83 ? 'B' : s >= 80 ? 'B-'
    : s >= 77 ? 'C+' : s >= 73 ? 'C' : s >= 70 ? 'C-' : s >= 67 ? 'D+' : s >= 60 ? 'D' : 'F';
  const gradeTone = s => s >= 90 ? 'great' : s >= 80 ? 'good' : s >= PASS ? 'ok' : 'low';
  const tipText = (tip, fields) => typeof tip === 'function' ? tip(fields) : tip;

  function jobStats() {
    const tasks = jobTasks();
    const done = tasks.filter(t => { const r = taskRecord(t.id); return r && r.best >= PASS; });
    const graded = tasks.map(t => taskRecord(t.id)).filter(Boolean);
    const avg = graded.length ? Math.round(graded.reduce((a, r) => a + r.best, 0) / graded.length) : null;
    return { total: tasks.length, done: done.length, avg };
  }

  /* Drafts: work-in-progress stays on this device, so nothing is lost between visits */
  const DRAFT_KEY = 'firstday:drafts';
  let drafts = (() => { try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; } catch (e) { return {}; } })();
  let draftTimer = null;
  const getDraft = id => (drafts[id] = drafts[id] || {});
  function saveDrafts() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts)); } catch (e) { /* ignore */ } }, 250);
  }
  function clearDraft(id) { delete drafts[id]; saveDrafts(); }

  /* =========================================================
     Spreadsheet engine: A1 refs, ranges, + - * / ^ &, comparisons,
     SUM AVERAGE MIN MAX COUNT ROUND ABS IF IFERROR VLOOKUP SUMIF COUNTIF
     ========================================================= */
  const colLetter = i => String.fromCharCode(65 + i);
  const parseRef = ref => { const m = /^\$?([A-Z])\$?(\d+)$/.exec(ref); return m ? { c: m[1].charCodeAt(0) - 65, r: +m[2] } : null; };
  function expandRange(a, b) {
    const p = parseRef(a), q = parseRef(b);
    if (!p || !q) return [];
    const out = [];
    for (let r = Math.min(p.r, q.r); r <= Math.max(p.r, q.r); r++) {
      const row = [];
      for (let c = Math.min(p.c, q.c); c <= Math.max(p.c, q.c); c++) row.push(colLetter(c) + r);
      out.push(row);
    }
    return out;
  }
  const cellsIn = spec => spec.includes(':') ? expandRange(...spec.split(':')).flat() : [spec];

  const ERR = code => ({ err: code });
  const isErr = v => Boolean(v && typeof v === 'object' && 'err' in v);

  const TOKEN_RE = /\s*(?:(\d+(?:\.\d+)?|\.\d+)(%)?|"((?:[^"]|"")*)"|(\$?[A-Za-z]\$?\d+)(?::(\$?[A-Za-z]\$?\d+))?(?![A-Za-z0-9_(])|([A-Za-z_][A-Za-z0-9_.]*)|(<>|<=|>=|[-+*/^&=<>(),]))/y;

  function tokenize(src) {
    const toks = [];
    let pos = 0;
    while (pos < src.length) {
      if (/^\s*$/.test(src.slice(pos))) break;
      TOKEN_RE.lastIndex = pos;
      const m = TOKEN_RE.exec(src);
      if (!m) throw ERR('#ERROR!');
      pos = TOKEN_RE.lastIndex;
      if (m[1] !== undefined) toks.push({ t: 'num', v: parseFloat(m[1]) / (m[2] ? 100 : 1) });
      else if (m[3] !== undefined) toks.push({ t: 'str', v: m[3].replace(/""/g, '"') });
      else if (m[4] !== undefined) toks.push(m[5] !== undefined
        ? { t: 'range', a: m[4].toUpperCase().replace(/\$/g, ''), b: m[5].toUpperCase().replace(/\$/g, '') }
        : { t: 'ref', v: m[4].toUpperCase().replace(/\$/g, '') });
      else if (m[6] !== undefined) toks.push({ t: 'id', v: m[6].toUpperCase() });
      else toks.push({ t: 'op', v: m[7] });
    }
    return toks;
  }

  function parseFormula(src) {
    const toks = tokenize(src);
    let i = 0;
    const isOp = v => toks[i] && toks[i].t === 'op' && toks[i].v === v;
    const binary = (sub, ops) => () => {
      let a = sub();
      while (toks[i] && toks[i].t === 'op' && ops.includes(toks[i].v)) {
        const op = toks[i++].v;
        a = { k: 'bin', op, a, b: sub() };
      }
      return a;
    };
    function unary() {
      if (isOp('-') || isOp('+')) { const op = toks[i++].v; return { k: 'neg', op, a: unary() }; }
      return primary();
    }
    const power = binary(unary, ['^']);
    const product = binary(power, ['*', '/']);
    const sum = binary(product, ['+', '-']);
    const concat = binary(sum, ['&']);
    const compare = binary(concat, ['=', '<>', '<', '>', '<=', '>=']);
    function primary() {
      const tk = toks[i++];
      if (!tk) throw ERR('#ERROR!');
      if (tk.t === 'num' || tk.t === 'str') return { k: 'lit', v: tk.v };
      if (tk.t === 'ref') return { k: 'ref', v: tk.v };
      if (tk.t === 'range') return { k: 'range', a: tk.a, b: tk.b };
      if (tk.t === 'id') {
        if (tk.v === 'TRUE' || tk.v === 'FALSE') return { k: 'lit', v: tk.v === 'TRUE' };
        if (!isOp('(')) throw ERR('#NAME?');
        i++;
        const args = [];
        if (!isOp(')')) {
          args.push(compare());
          while (isOp(',')) { i++; args.push(compare()); }
        }
        if (!isOp(')')) throw ERR('#ERROR!');
        i++;
        return { k: 'fn', name: tk.v, args };
      }
      if (tk.t === 'op' && tk.v === '(') {
        const e = compare();
        if (!isOp(')')) throw ERR('#ERROR!');
        i++;
        return e;
      }
      throw ERR('#ERROR!');
    }
    const ast = compare();
    if (i < toks.length) throw ERR('#ERROR!');
    return ast;
  }

  const toNum = v => {
    if (isErr(v)) return v;
    if (typeof v === 'number') return v;
    if (v === '' || v == null) return 0;
    if (typeof v === 'boolean') return v ? 1 : 0;
    if (typeof v === 'object') return ERR('#VALUE!');
    const n = Number(String(v).replace(/[$,]/g, ''));
    return isNaN(n) ? ERR('#VALUE!') : n;
  };
  const toStr = v => typeof v === 'boolean' ? (v ? 'TRUE' : 'FALSE') : v == null ? '' : String(v);
  const isNumeric = v => typeof v === 'number' || (typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v)));
  function cmpVals(a, b) {
    if (isNumeric(a) && isNumeric(b)) return Number(a) - Number(b);
    const x = toStr(a).trim().toLowerCase(), y = toStr(b).trim().toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  }
  function compareOp(a, b, op) {
    const c = cmpVals(a, b);
    return op === '=' ? c === 0 : op === '<>' ? c !== 0 : op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0;
  }
  function matchesCriteria(v, crit) {
    const m = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(toStr(crit));
    const op = m[1] || '=';
    return compareOp(v, m[2], op);
  }

  function evalNode(n, get) {
    switch (n.k) {
      case 'lit': return n.v;
      case 'ref': return get(n.v);
      case 'range': return { range: expandRange(n.a, n.b) };
      case 'neg': { const v = toNum(evalNode(n.a, get)); return isErr(v) ? v : (n.op === '-' ? -v : v); }
      case 'bin': {
        const a = evalNode(n.a, get), b = evalNode(n.b, get);
        if (isErr(a)) return a;
        if (isErr(b)) return b;
        if (n.op === '&') return toStr(a) + toStr(b);
        if (['=', '<>', '<', '>', '<=', '>='].includes(n.op)) return compareOp(a, b, n.op);
        const x = toNum(a), y = toNum(b);
        if (isErr(x)) return x;
        if (isErr(y)) return y;
        if (n.op === '+') return x + y;
        if (n.op === '-') return x - y;
        if (n.op === '*') return x * y;
        if (n.op === '/') return y === 0 ? ERR('#DIV/0!') : x / y;
        return Math.pow(x, y);
      }
      case 'fn': return callFn(n.name, n.args, get);
    }
    return ERR('#ERROR!');
  }

  function callFn(name, args, get) {
    const val = a => evalNode(a, get);
    const flat = () => {
      const out = [];
      for (const a of args) {
        const v = val(a);
        if (v && v.range) v.range.flat().forEach(r => out.push(get(r)));
        else out.push(v);
      }
      return out;
    };
    const numbers = () => {
      const vals = flat();
      const bad = vals.find(isErr);
      if (bad) return bad;
      return vals.filter(v => typeof v === 'number');
    };
    switch (name) {
      case 'SUM': { const ns = numbers(); return isErr(ns) ? ns : ns.reduce((a, b) => a + b, 0); }
      case 'AVERAGE': { const ns = numbers(); if (isErr(ns)) return ns; return ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : ERR('#DIV/0!'); }
      case 'MIN': { const ns = numbers(); return isErr(ns) ? ns : ns.length ? Math.min(...ns) : 0; }
      case 'MAX': { const ns = numbers(); return isErr(ns) ? ns : ns.length ? Math.max(...ns) : 0; }
      case 'COUNT': { const vals = flat(); return vals.filter(v => typeof v === 'number').length; }
      case 'ABS': { const x = toNum(val(args[0])); return isErr(x) ? x : Math.abs(x); }
      case 'ROUND': {
        const x = toNum(val(args[0])), d = args[1] ? toNum(val(args[1])) : 0;
        if (isErr(x)) return x;
        if (isErr(d)) return d;
        const f = Math.pow(10, d);
        return Math.round((x + Number.EPSILON) * f) / f;
      }
      case 'IF': {
        if (args.length < 2) return ERR('#N/A');
        const c = val(args[0]);
        if (isErr(c)) return c;
        const truthy = typeof c === 'boolean' ? c : toNum(c) !== 0;
        return truthy ? val(args[1]) : (args[2] ? val(args[2]) : false);
      }
      case 'IFERROR': { const v = val(args[0]); return isErr(v) ? (args[1] ? val(args[1]) : '') : v; }
      case 'VLOOKUP': {
        if (args.length < 3) return ERR('#N/A');
        const look = val(args[0]);
        if (isErr(look)) return look;
        const table = val(args[1]);
        if (!table || !table.range) return ERR('#VALUE!');
        const col = toNum(val(args[2]));
        if (isErr(col)) return col;
        const rows = table.range;
        if (col < 1 || col > rows[0].length) return ERR('#REF!');
        let approx = true;
        if (args[3]) { const a = val(args[3]); approx = typeof a === 'boolean' ? a : toNum(a) !== 0; }
        if (!approx) {
          const hit = rows.find(r => cmpVals(get(r[0]), look) === 0 && get(r[0]) !== '');
          return hit ? get(hit[col - 1]) : ERR('#N/A');
        }
        // Approximate match assumes the first column is sorted (just like Excel)
        let last = -1;
        for (let k = 0; k < rows.length; k++) {
          const key = get(rows[k][0]);
          if (key === '' || key == null) continue;
          if (cmpVals(key, look) <= 0) last = k; else break;
        }
        return last < 0 ? ERR('#N/A') : get(rows[last][col - 1]);
      }
      case 'SUMIF':
      case 'COUNTIF': {
        const rng = val(args[0]);
        if (!rng || !rng.range) return ERR('#VALUE!');
        const crit = val(args[1]);
        const cells = rng.range.flat();
        let sumCells = cells;
        if (name === 'SUMIF' && args[2]) {
          const s = val(args[2]);
          if (!s || !s.range) return ERR('#VALUE!');
          sumCells = s.range.flat();
        }
        let total = 0, count = 0;
        cells.forEach((ref, k) => {
          if (matchesCriteria(get(ref), crit)) {
            count++;
            const v = get(sumCells[k]);
            if (typeof v === 'number') total += v;
          }
        });
        return name === 'SUMIF' ? total : count;
      }
    }
    return ERR('#NAME?');
  }

  function computeSheet(raw) {
    const cache = {}, visiting = new Set();
    const get = ref => {
      if (ref in cache) return cache[ref];
      if (visiting.has(ref)) return ERR('#CIRC!');
      const s = raw[ref];
      let v;
      if (s == null || s === '') v = '';
      else if (typeof s === 'number') v = s;
      else if (String(s).trim().startsWith('=')) {
        visiting.add(ref);
        try {
          v = evalNode(parseFormula(String(s).trim().slice(1)), get);
          if (v && v.range) v = ERR('#VALUE!');
        } catch (e) { v = isErr(e) ? e : ERR('#ERROR!'); }
        visiting.delete(ref);
      } else {
        const str = String(s).trim();
        const n = Number(str.replace(/[$,]/g, ''));
        v = str !== '' && !isNaN(n) ? n : String(s);
      }
      cache[ref] = v;
      return v;
    };
    return get;
  }

  function fmtCell(v, f) {
    if (isErr(v)) return v.err;
    if (v === '' || v == null) return '';
    if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
    if (typeof v !== 'number') return String(v);
    const n2 = (x, d) => x.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
    switch (f) {
      case 'money': return (v < 0 ? '-$' : '$') + n2(Math.abs(v), 2);
      case 'money0': return (v < 0 ? '-$' : '$') + n2(Math.abs(v), 0);
      case 'pct': return n2(v * 100, 1) + '%';
      case 'x': return n2(v, 1) + 'x';
      case 'x2': return n2(v, 2) + 'x';
      case 'int': return n2(v, 0);
      default: return Number.isInteger(v) ? v.toLocaleString('en-US') : v.toLocaleString('en-US', { maximumFractionDigits: 4 });
    }
  }

  // Fill down: shift relative row references, keep $-locked ones
  const shiftFormula = (src, dr) => String(src).replace(/(\$?)([A-Za-z])(\$?)(\d+)(?![A-Za-z0-9(])/g,
    (m, dc, c, drow, r) => dc + c + drow + (drow ? r : String(+r + dr)));

  function sheetBase(task) {
    if (task._base) return task._base;
    const base = {};
    task.sheet.grid.forEach((row, r) => row.forEach((v, c) => { if (v !== null && v !== undefined) base[colLetter(c) + (r + 1)] = v; }));
    task._base = base;
    task._editable = new Set(task.sheet.editable.flatMap(cellsIn));
    return base;
  }
  const sheetRaw = (task, draft) => Object.assign({}, sheetBase(task), draft.cells || {});
  const cellFormat = (task, ref) => (task.sheet.cellFormats && task.sheet.cellFormats[ref]) || (task.sheet.formats || {})[ref[0]];
  const nearly = (a, b) => Math.abs(a - b) <= Math.max(0.005, Math.abs(b) * 0.0005);

  /* ---------------- Code runner (sandboxed in a Web Worker) ---------------- */
  // Self-contained: its source is also sent to the worker, so it can't use outside variables.
  function executeTests(p) {
    var logs = [];
    var con = {
      log: function () {
        if (logs.length >= 30) return;
        logs.push(Array.prototype.map.call(arguments, function (x) {
          try { return typeof x === 'string' ? x : JSON.stringify(x); } catch (e) { return String(x); }
        }).join(' '));
      }
    };
    var fn;
    try {
      fn = new Function('console', p.code + '\n;return (typeof ' + p.fnName + ' === "function") ? ' + p.fnName + ' : null;')(con);
    } catch (err) {
      return { compileError: String((err && err.message) || err), blocked: err instanceof EvalError, logs: logs, results: [] };
    }
    if (!fn) return { compileError: 'Could not find a function named ' + p.fnName + '. Keep the original function name.', logs: logs, results: [] };
    var results = p.tests.map(function (t) {
      try {
        var got = fn.apply(null, JSON.parse(JSON.stringify(t.args)));
        if (got === undefined) return { undef: true };
        return { got: JSON.parse(JSON.stringify(got)) };
      } catch (err) {
        return { error: String((err && err.message) || err) };
      }
    });
    return { results: results, logs: logs };
  }

  let workerURL = null;
  function runCode(code, fnName, tests) {
    const payload = { code, fnName, tests: tests.map(t => ({ args: t.args })) };
    const inline = () => { try { return executeTests(payload); } catch (e) { return { compileError: String(e.message || e), logs: [], results: [] }; } };
    return new Promise(resolve => {
      let worker;
      try {
        if (typeof Worker === 'undefined') throw new Error('no worker');
        workerURL = workerURL || URL.createObjectURL(new Blob(
          ['self.onmessage = function (e) { self.postMessage((' + executeTests.toString() + ')(e.data)); };'],
          { type: 'text/javascript' }));
        worker = new Worker(workerURL);
      } catch (e) { resolve(inline()); return; }
      let done = false;
      const finish = r => { if (done) return; done = true; clearTimeout(timer); worker.terminate(); resolve(r); };
      const timer = setTimeout(() => finish({ timeout: true, logs: [], results: [] }), 3000);
      worker.onmessage = e => finish(e.data);
      worker.onerror = e => { if (e && e.preventDefault) e.preventDefault(); if (!done) { done = true; clearTimeout(timer); worker.terminate(); resolve(inline()); } };
      worker.postMessage(payload);
    });
  }

  const showVal = v => { try { return JSON.stringify(v); } catch (e) { return String(v); } };
  const sameVal = (a, b) => stableJSON(a) === stableJSON(b);
  const stableJSON = v => {
    if (Array.isArray(v)) return '[' + v.map(stableJSON).join(',') + ']';
    if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + stableJSON(v[k])).join(',') + '}';
    return JSON.stringify(v);
  };

  /* ---------------- Grading ---------------- */
  async function gradeTask(task) {
    const d = getDraft(task.id);
    let items = [];

    if (task.tool === 'code') {
      const all = task.code.tests.map(t => ({ ...t, hidden: false })).concat(task.code.hidden.map(t => ({ ...t, hidden: true })));
      const run = await runCode(d.code != null ? d.code : task.code.starter, task.code.fn, all);
      const per = 100 / all.length;
      if (run.compileError || run.timeout) {
        const msg = run.timeout ? 'Your code ran too long — check for an infinite loop.' : run.blocked
          ? 'This browser blocked running code on this page. Open FirstDay from your own copy of the files to use the code editor.'
          : 'Your code has an error: ' + run.compileError;
        items = all.map(t => ({ label: (t.hidden ? 'Hidden check: ' : '') + t.label, ok: false, points: 0, max: per, tip: msg }));
        return finalize(task, items, run);
      }
      items = all.map((t, k) => {
        const r = run.results[k] || {};
        const ok = !r.error && !r.undef && sameVal(r.got, t.expect);
        let tip = '';
        if (r.error) tip = `On "${t.label}" your code threw an error: ${r.error}.`;
        else if (r.undef) tip = `On "${t.label}" your function didn't return anything — add a return statement.`;
        else if (!ok) tip = t.hidden ? `It fails the "${t.label}" case. Think about that situation and adjust.` : `For ${showVal(t.args[0]).slice(0, 60)} it should return ${showVal(t.expect)}, but returned ${showVal(r.got)}.`;
        return { label: (t.hidden ? 'Hidden check: ' : '') + t.label, ok, points: ok ? per : 0, max: per, tip };
      });
      return finalize(task, items, run);
    }

    if (task.tool === 'sheet') {
      const raw = sheetRaw(task, d);
      const get = computeSheet(raw);
      task.sheet.groups.forEach(g => {
        const cells = cellsIn(g.cells);
        let good = 0;
        const wrong = [];
        let tip = g.tip;
        cells.forEach((ref, k) => {
          const exp = g.expect[k];
          const v = get(ref);
          const src = String(raw[ref] == null ? '' : raw[ref]).trim();
          const isFormula = src.startsWith('=');
          let valueOk = typeof exp === 'number'
            ? typeof v === 'number' && nearly(v, exp)
            : typeof v === 'string' && v.trim().toLowerCase() === String(exp).toLowerCase();
          let ok = valueOk && isFormula && (g.require !== 'VLOOKUP' || /VLOOKUP\s*\(/i.test(src));
          if (ok) { good++; return; }
          wrong.push(ref);
          if (tip !== g.tip) return; // keep the first specific tip
          if (src === '') tip = `${ref} is empty. ${g.tip}`;
          else if (isErr(v)) tip = `${ref} shows ${v.err}. ${v.err === '#N/A' ? 'VLOOKUP couldn\u2019t find a match — use FALSE for an exact match and lock the table with $ signs.' : v.err === '#DIV/0!' ? 'Something is dividing by an empty or zero cell — check your references.' : v.err === '#NAME?' ? 'Check the spelling of your function name.' : 'Check the formula.'} ${g.tip}`;
          else if (valueOk && !isFormula) tip = `${ref} has the right number typed in, but I asked for formulas so it updates when the data changes. ${g.tip}`;
          else if (valueOk && g.require === 'VLOOKUP') tip = `${ref} is right, but use VLOOKUP so it works for any ticker. ${g.tip}`;
          else if (g.pct && typeof v === 'number' && nearly(v, exp * 100)) tip = `${ref} looks multiplied by 100. Leave it as a decimal — the column is already formatted as a percent.`;
        });
        const max = g.weight;
        items.push({
          label: g.label, ok: good === cells.length, points: max * good / cells.length, max,
          detail: cells.length > 1 ? `${good} of ${cells.length} correct${wrong.length ? ' — check ' + wrong.join(', ') : ''}` : '',
          tip
        });
      });
    }

    if (task.tool === 'journal') {
      const amt = x => { const n = parseFloat(String(x == null ? '' : x).replace(/[$,\s]/g, '')); return isNaN(n) ? 0 : Math.round(n * 100) / 100; };
      const lines = (d.rows || []).map(r => ({ account: r.account || '', debit: amt(r.debit), credit: amt(r.credit) }))
        .filter(l => l.account || l.debit || l.credit);
      const dr = lines.reduce((a, l) => a + l.debit, 0), cr = lines.reduce((a, l) => a + l.credit, 0);
      const balanced = dr > 0 && Math.abs(dr - cr) < 0.005;
      items.push({ label: 'Debits equal credits', ok: balanced, points: balanced ? 20 : 0, max: 20,
        tip: dr === 0 && cr === 0 ? 'Enter your journal entry lines first.' : `Your debits ($${dr.toFixed(2)}) and credits ($${cr.toFixed(2)}) don't match — every entry has to balance.` });
      const ans = task.journal.answer;
      const each = 60 / ans.length;
      ans.forEach(a => {
        const l = lines.find(x => x.account === a.account);
        const onSide = l && (a.side === 'debit' ? l.debit > 0 && !l.credit : l.credit > 0 && !l.debit);
        const amount = l ? (a.side === 'debit' ? l.debit : l.credit) : 0;
        const right = onSide && Math.abs(amount - a.amount) < 0.005;
        let tip = '';
        if (!l) tip = `You're missing ${a.account}. ${a.why}`;
        else if (!onSide) tip = `${a.account} should be a ${a.side}. ${a.why}`;
        else if (!right) tip = `${a.account} has the right side but the wrong amount. ${a.why}`;
        items.push({ label: `${a.account} ${a.side}ed correctly`, ok: right, points: right ? each : onSide ? each / 2 : 0, max: each, tip });
      });
      const extra = lines.filter(l => !ans.some(a => a.account === l.account));
      items.push({ label: 'Only the accounts this transaction affects', ok: extra.length === 0, points: extra.length ? 0 : 10, max: 10,
        tip: extra.length ? `Remove ${extra.map(e => e.account || 'the blank-account line').join(', ')} — that account isn't part of this transaction.` : '' });
      const memoOk = words(d.memo) >= 3;
      items.push({ label: 'Includes a description', ok: memoOk, points: memoOk ? 10 : 0, max: 10,
        tip: 'Add a short description so anyone reading the ledger knows what happened, like "Purchased printer-copier, part cash, part on account."' });
    }

    if (task.tool === 'writing') {
      const f = {};
      task.writing.fields.forEach(x => { f[x.id] = (d.fields && d.fields[x.id]) || ''; });
      task.writing.checks.forEach(c => {
        let ok = false;
        try { ok = Boolean(c.test(f)); } catch (e) { ok = false; }
        items.push({ label: c.label, ok, points: ok ? c.weight : 0, max: c.weight, tip: ok ? '' : tipText(c.tip, f) });
      });
    }

    if (task.tool === 'sort') {
      const per = 100 / task.sort.items.length;
      const bucket = id => (task.sort.buckets.find(b => b.id === id) || {}).label;
      task.sort.items.forEach(it => {
        const pick = d.assign && d.assign[it.id];
        const ok = pick === it.answer;
        items.push({ label: it.text, ok, points: ok ? per : 0, max: per,
          detail: pick ? (ok ? bucket(pick) : `You chose ${bucket(pick)}`) : 'Not sorted',
          tip: pick ? `${it.text}: ${it.why}` : `You didn't sort "${it.text}". ${it.why}` });
      });
    }

    (task.questions || []).forEach(q => {
      const pick = d.answers && d.answers[q.id];
      const ok = pick === q.answer;
      items.push({ label: q.prompt, ok, points: ok ? q.weight : 0, max: q.weight, detail: pick ? `You chose ${pick}` : 'Not answered', tip: q.tip });
    });

    return finalize(task, items);
  }

  function finalize(task, items, run) {
    const max = items.reduce((a, it) => a + it.max, 0) || 1;
    const got = items.reduce((a, it) => a + it.points, 0);
    const score = Math.round((got / max) * 100);
    return { score, grade: letter(score), items, run };
  }

  function bossReply(task, result) {
    const miss = result.items.find(it => !it.ok);
    const s = result.score;
    if (s >= 90) return task.praise + (miss ? ' One small thing for next time: ' + miss.tip : '');
    if (s >= 80) return 'Solid work — this is close to ready. ' + (miss ? miss.tip : '');
    if (s >= PASS) return "Good start, but I can't use this yet. " + (miss ? miss.tip : '');
    return "Let's take another pass before this goes anywhere. " + (miss ? miss.tip : '') + ' Grab a hint if you\u2019re stuck.';
  }

  /* ---------------- On the Job: screens ---------------- */
  let currentTaskId = null;
  const lastResults = {};       // shown after submitting (this visit only)
  const hintsShown = {};
  let lastSheetCell = null;
  let codeOutput = {};          // last "Run tests" output per task

  const statusFor = task => {
    const r = taskRecord(task.id);
    if (r) return { text: `Best: ${letter(r.best)}`, cls: 'st-' + gradeTone(r.best) };
    if (drafts[task.id] && Object.keys(drafts[task.id]).length) return { text: 'In progress', cls: 'st-progress' };
    return { text: 'New', cls: 'st-new' };
  };

  function bossHeader(boss, time) {
    return `
      <div class="msg-head">
        <span class="msg-avatar" aria-hidden="true">${boss.initials}</span>
        <span class="msg-from"><strong>${esc(boss.name)}</strong><span>${esc(boss.role)}</span></span>
        ${time ? `<span class="msg-time">${time}</span>` : ''}
      </div>`;
  }

  function renderJobList() {
    const boss = BOSSES[state.track];
    const tasks = jobTasks();
    const st = jobStats();
    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">${esc(TRACKS[state.track].name)} track</p>
        <h1>On the Job</h1>
        <p class="page-sub">Real assignments from your manager. Do the work right here, hand it in, and get graded.</p>
      </div>

      <div class="msg msg-intro">
        ${bossHeader(boss, 'Your manager')}
        <p class="msg-body">${esc(boss.intro)}</p>
      </div>

      <div class="job-progress">
        <span><strong>${st.done} of ${st.total}</strong> assignments passed</span>
        ${st.avg != null ? `<span>Average grade: <strong>${letter(st.avg)}</strong></span>` : ''}
        <div class="bar" aria-hidden="true"><span style="width:${Math.round(st.done / st.total * 100)}%"></span></div>
      </div>

      <div class="job-list">
        ${tasks.map(t => {
          const s = statusFor(t);
          const r = taskRecord(t.id);
          return `
            <button class="job-card" data-open-task="${t.id}">
              <span class="job-card-top">
                <span class="tool-chip tool-${t.tool}">${TOOL_LABELS[t.tool]}</span>
                <span class="job-status ${s.cls}">${s.text}</span>
              </span>
              <span class="job-card-title">${esc(t.title)}</span>
              <span class="job-card-sum">${esc(t.summary)}</span>
              <span class="job-card-foot">
                <span>About ${t.minutes} min</span>
                <span class="job-card-cta">${r ? (r.best >= 90 ? 'Review' : 'Improve your grade') : drafts[t.id] ? 'Continue' : 'Start'}</span>
              </span>
            </button>`;
        }).join('')}
      </div>`;
  }

  function renderTask() {
    const task = findTask(currentTaskId);
    if (!task) { go('job'); return; }
    const boss = BOSSES[state.track];
    const d = getDraft(task.id);
    const rec = taskRecord(task.id);
    const shown = hintsShown[task.id] || 0;
    const idx = jobTasks().indexOf(task);
    const nextTask = jobTasks()[idx + 1];

    main.innerHTML = `
      <button class="back-link" data-view="job">&larr; All assignments</button>
      <div class="page-head task-head">
        <h1>${esc(task.title)}</h1>
        <p class="task-meta">
          <span class="tool-chip tool-${task.tool}">${TOOL_LABELS[task.tool]}</span>
          <span>About ${task.minutes} min</span>
          ${rec ? `<span>Best grade: <strong>${letter(rec.best)}</strong> (${rec.best}%) after ${rec.attempts} ${rec.attempts === 1 ? 'try' : 'tries'}</span>` : ''}
        </p>
      </div>

      <div class="msg">
        ${bossHeader(boss, '9:02 AM')}
        <p class="msg-body">${esc(task.brief)}</p>
        <div class="deliver">
          <p class="deliver-title">What to hand in</p>
          <ul>${task.deliver.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
      </div>

      <section class="workspace" aria-label="Your workspace">
        ${renderTool(task, d)}
        ${renderQuestions(task, d)}
      </section>

      <div class="hints">
        ${task.hints.slice(0, shown).map((h, k) => `<p class="hint-line"><strong>Hint ${k + 1}.</strong> ${esc(h)}</p>`).join('')}
        ${shown < task.hints.length ? `<button class="text-btn" data-action="hint">${shown ? 'Show another hint' : 'Need a hint?'} (${shown} of ${task.hints.length})</button>` : ''}
      </div>

      <div class="submit-bar">
        <button class="text-btn text-btn-muted" data-action="task-reset">Start over</button>
        <div class="btn-row">
          ${task.tool === 'code' ? '<button class="btn btn-ghost" data-action="run-tests"><span>Run tests</span></button>' : ''}
          <button class="btn btn-primary" data-action="submit-task"><span>Submit to ${esc(boss.name.split(' ')[0])}</span></button>
        </div>
      </div>

      <div id="result-slot">${lastResults[task.id] ? renderResult(task, lastResults[task.id], nextTask) : ''}</div>`;

    wireTool(task, d);
  }

  function renderResult(task, res, nextTask) {
    const boss = BOSSES[state.track];
    const tone = gradeTone(res.score);
    return `
      <div class="result-card tone-${tone}" tabindex="-1" id="result-card">
        <div class="result-top">
          <span class="grade-big">${res.grade}</span>
          <div>
            <p class="result-score">${res.score}% &middot; ${res.score >= PASS ? 'Passed' : 'Not passed yet'}</p>
            <p class="hint">${res.score >= PASS ? 'Your best grade is saved. You can keep improving it.' : `You need ${PASS}% to pass. Your work is saved — fix it and resubmit.`}</p>
          </div>
        </div>
        <div class="msg msg-reply">
          ${bossHeader(boss, 'Just now')}
          <p class="msg-body">${esc(bossReply(task, res))}</p>
        </div>
        <ul class="rubric">
          ${res.items.map(it => `
            <li class="${it.ok ? 'ok' : it.points > 0 ? 'part' : 'miss'}">
              <span class="rb-mark" aria-hidden="true">${it.ok ? '&#10003;' : it.points > 0 ? '&frac12;' : '&#10007;'}</span>
              <span class="rb-text">
                <span class="rb-label">${esc(it.label)}</span>
                ${it.detail ? `<span class="rb-detail">${esc(it.detail)}</span>` : ''}
                ${!it.ok && it.tip ? `<span class="rb-tip">${esc(it.tip)}</span>` : ''}
              </span>
              <span class="rb-pts">${Math.round(it.points)}/${Math.round(it.max)}</span>
            </li>`).join('')}
        </ul>
        ${res.score >= PASS && nextTask ? `<button class="btn btn-primary btn-small" data-open-task="${nextTask.id}">Next assignment: ${esc(nextTask.title)}</button>` : ''}
        ${res.score >= PASS && !nextTask ? '<button class="btn btn-ghost btn-small" data-view="job">Back to all assignments</button>' : ''}
      </div>`;
  }

  function renderQuestions(task, d) {
    if (!task.questions) return '';
    d.answers = d.answers || {};
    return task.questions.map(q => `
      <div class="question">
        <p class="question-prompt">${esc(q.prompt)}</p>
        <div class="pill-row" role="group" aria-label="${esc(q.prompt)}">
          ${q.options.map(o => `<button type="button" class="pill ${d.answers[q.id] === o ? 'is-on' : ''}" aria-pressed="${d.answers[q.id] === o}" data-answer="${q.id}" data-value="${esc(o)}">${esc(o)}</button>`).join('')}
        </div>
      </div>`).join('');
  }

  /* ---------------- Tools ---------------- */
  function renderTool(task, d) {
    if (task.tool === 'code') {
      if (d.code == null) d.code = task.code.starter;
      const out = codeOutput[task.id];
      return `
        <div class="tool-head"><span>${esc(task.code.fn)}.js</span><span class="hint">JavaScript &middot; Tab indents</span></div>
        <div class="code-editor">
          <pre class="code-gutter" aria-hidden="true"></pre>
          <textarea class="code-input" id="code-input" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Code editor">${esc(d.code)}</textarea>
        </div>
        <div class="tests">
          <p class="tests-title">Tests</p>
          ${task.code.tests.map((t, k) => {
            const r = out && out.results && out.results[k];
            const cls = !out ? '' : r && r.pass ? 'pass' : 'fail';
            return `
              <div class="test ${cls}">
                <span class="test-mark" aria-hidden="true">${!out ? '&middot;' : r && r.pass ? '&#10003;' : '&#10007;'}</span>
                <div>
                  <p class="test-label">${esc(t.label)}</p>
                  <p class="test-io"><code>${esc(task.code.fn)}(${esc(t.args.map(a => showVal(a)).join(', ')).slice(0, 160)}${showVal(t.args).length > 160 ? '…' : ''})</code> should return <code>${esc(showVal(t.expect))}</code></p>
                  ${r && !r.pass ? `<p class="test-got">${esc(r.msg)}</p>` : ''}
                </div>
              </div>`;
          }).join('')}
          <p class="hint">After you submit, ${task.code.hidden.length} hidden tests check edge cases too.</p>
          ${out && out.error ? `<p class="code-error">${esc(out.error)}</p>` : ''}
          ${out && out.logs && out.logs.length ? `<div class="console"><p class="tests-title">Console</p><pre>${esc(out.logs.join('\n'))}</pre></div>` : ''}
        </div>`;
    }

    if (task.tool === 'sheet') {
      const s = task.sheet;
      sheetBase(task);
      d.cells = d.cells || {};
      const get = computeSheet(sheetRaw(task, d));
      const boldSet = new Set(s.bold || []);
      let rows = '';
      for (let r = 1; r <= s.rows; r++) {
        rows += `<tr><th scope="row">${r}</th>`;
        for (let c = 0; c < s.cols; c++) {
          const ref = colLetter(c) + r;
          const v = get(ref);
          const shown = fmtCell(v, cellFormat(task, ref));
          const numeric = typeof v === 'number';
          const cls = [r === 1 ? 'hdr' : '', boldSet.has(ref) ? 'b' : '', numeric ? 'num' : '', isErr(v) ? 'is-err' : ''].join(' ');
          if (task._editable.has(ref)) {
            rows += `<td class="ed ${cls}"><input class="cell-in" data-ref="${ref}" value="${esc(shown)}" spellcheck="false" autocomplete="off" aria-label="Cell ${ref}"></td>`;
          } else {
            rows += `<td class="lk ${cls}" data-cell="${ref}">${esc(shown)}</td>`;
          }
        }
        rows += '</tr>';
      }
      return `
        <div class="tool-head"><span>Workbook</span><span class="hint">White cells are yours to fill in. Start formulas with =</span></div>
        <div class="fbar">
          <span class="fbar-ref" id="fbar-ref">&nbsp;</span>
          <span class="fbar-fx" aria-hidden="true">fx</span>
          <input class="fbar-input" id="fbar-input" spellcheck="false" autocomplete="off" aria-label="Formula bar" placeholder="Click a cell">
        </div>
        <div class="sheet-wrap">
          <table class="sheet">
            <colgroup><col style="width:36px">${Array.from({ length: s.cols }, (_, c) => `<col style="width:${(s.widths && s.widths[colLetter(c)]) || 90}px">`).join('')}</colgroup>
            <thead><tr><th></th>${Array.from({ length: s.cols }, (_, c) => `<th scope="col">${colLetter(c)}</th>`).join('')}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="sheet-tools">
          <button class="btn btn-ghost btn-small" data-action="fill-down">Fill down</button>
          <span class="hint">Select a cell with a formula, then Fill down to copy it to the cells below. Use $ (like $G$2) to lock a reference.</span>
        </div>`;
    }

    if (task.tool === 'journal') {
      d.rows = d.rows || [{}, {}, {}];
      d.memo = d.memo || '';
      const opts = task.journal.accounts;
      return `
        <div class="tool-head"><span>General journal</span><span class="hint">Entry date: today</span></div>
        <div class="je-wrap">
          <table class="je">
            <thead><tr><th scope="col">Account</th><th scope="col" class="num">Debit</th><th scope="col" class="num">Credit</th><th><span class="sr-only">Remove</span></th></tr></thead>
            <tbody>
              ${d.rows.map((row, i) => `
                <tr>
                  <td><select class="input je-acct" data-row="${i}" aria-label="Account, line ${i + 1}">
                    <option value="">Choose an account</option>
                    ${opts.map(o => `<option ${row.account === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}
                  </select></td>
                  <td><input class="input je-amt num" data-row="${i}" data-side="debit" inputmode="decimal" placeholder="0.00" value="${esc(row.debit || '')}" aria-label="Debit, line ${i + 1}"></td>
                  <td><input class="input je-amt num" data-row="${i}" data-side="credit" inputmode="decimal" placeholder="0.00" value="${esc(row.credit || '')}" aria-label="Credit, line ${i + 1}"></td>
                  <td><button class="je-remove" data-action="je-remove" data-row="${i}" aria-label="Remove line ${i + 1}" ${d.rows.length <= 2 ? 'disabled' : ''}>&times;</button></td>
                </tr>`).join('')}
            </tbody>
            <tfoot><tr><th scope="row">Totals</th><td class="num" id="je-dr"></td><td class="num" id="je-cr"></td><td></td></tr></tfoot>
          </table>
        </div>
        <div class="je-foot">
          <button class="btn btn-ghost btn-small" data-action="je-add">Add a line</button>
          <span class="je-status" id="je-status" aria-live="polite"></span>
        </div>
        <label class="field-label" for="je-memo">Description</label>
        <input class="input" id="je-memo" value="${esc(d.memo)}" placeholder="What happened, in a few words" maxlength="140">`;
    }

    if (task.tool === 'writing') {
      d.fields = d.fields || {};
      return `
        <div class="tool-head"><span>${task.writing.fields.length > 1 ? 'Draft' : 'Document'}</span><span class="hint">Your draft saves as you type</span></div>
        <div class="writing">
          ${task.writing.fields.map(f => `
            <div class="w-field">
              <div class="w-label-row">
                <label class="field-label" for="w-${f.id}">${esc(f.label)}</label>
                <span class="w-count" id="wc-${f.id}"></span>
              </div>
              ${f.type === 'textarea'
                ? `<textarea class="input w-input" id="w-${f.id}" data-field="${f.id}" data-counter="${f.counter}" rows="${f.rows || 8}" placeholder="${esc(f.placeholder || '')}">${esc(d.fields[f.id] || '')}</textarea>`
                : `<input class="input w-input" id="w-${f.id}" data-field="${f.id}" data-counter="${f.counter}" placeholder="${esc(f.placeholder || '')}" value="${esc(d.fields[f.id] || '')}" maxlength="160">`}
            </div>`).join('')}
        </div>`;
    }

    if (task.tool === 'sort') {
      d.assign = d.assign || {};
      const counts = {};
      task.sort.buckets.forEach(b => { counts[b.id] = 0; });
      Object.values(d.assign).forEach(b => { if (b in counts) counts[b]++; });
      const sorted = Object.keys(d.assign).length;
      return `
        <div class="tool-head"><span>Sort each item</span><span class="hint">${sorted} of ${task.sort.items.length} sorted</span></div>
        <div class="bucket-summary">
          ${task.sort.buckets.map(b => `<span class="bucket-count"><strong>${counts[b.id]}</strong> ${esc(b.label)}</span>`).join('')}
        </div>
        <div class="sort-list">
          ${task.sort.items.map(it => `
            <div class="sort-item ${d.assign[it.id] ? 'is-sorted' : ''}">
              <div class="sort-text">
                <p class="sort-title">${esc(it.text)}</p>
                ${it.sub ? `<p class="sort-sub">${esc(it.sub)}</p>` : ''}
              </div>
              <div class="pill-row" role="group" aria-label="${esc(it.text)}">
                ${task.sort.buckets.map(b => `<button type="button" class="pill ${d.assign[it.id] === b.id ? 'is-on' : ''}" aria-pressed="${d.assign[it.id] === b.id}" data-sort="${it.id}" data-bucket="${b.id}">${esc(b.label)}</button>`).join('')}
              </div>
            </div>`).join('')}
        </div>`;
    }
    return '';
  }

  function wireTool(task, d) {
    if (task.tool === 'code') {
      const ta = $('#code-input'), gutter = $('.code-gutter');
      const lines = () => { gutter.textContent = Array.from({ length: ta.value.split('\n').length }, (_, k) => k + 1).join('\n'); };
      lines();
      ta.addEventListener('input', () => { d.code = ta.value; saveDrafts(); lines(); });
      ta.addEventListener('scroll', () => { gutter.scrollTop = ta.scrollTop; });
      ta.addEventListener('keydown', e => {
        if (e.key === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          ta.setRangeText('  ', ta.selectionStart, ta.selectionEnd, 'end');
          ta.dispatchEvent(new Event('input'));
        } else if (e.key === 'Enter') {
          const before = ta.value.slice(0, ta.selectionStart);
          const line = before.split('\n').pop();
          const indent = (line.match(/^\s*/) || [''])[0] + (/[{([]\s*$/.test(line) ? '  ' : '');
          e.preventDefault();
          ta.setRangeText('\n' + indent, ta.selectionStart, ta.selectionEnd, 'end');
          ta.dispatchEvent(new Event('input'));
        }
      });
      return;
    }

    if (task.tool === 'sheet') {
      const fIn = $('#fbar-input'), fRef = $('#fbar-ref');
      let sel = null;
      const refresh = () => {
        const get = computeSheet(sheetRaw(task, d));
        $$('.sheet .cell-in').forEach(inp => {
          const v = get(inp.dataset.ref);
          if (document.activeElement !== inp) inp.value = fmtCell(v, cellFormat(task, inp.dataset.ref));
          const td = inp.parentElement;
          td.classList.toggle('is-err', isErr(v));
          td.classList.toggle('num', typeof v === 'number');
        });
        $$('.sheet td.lk[data-cell]').forEach(td => { td.textContent = fmtCell(get(td.dataset.cell), cellFormat(task, td.dataset.cell)); });
      };
      const select = (ref, editable) => {
        sel = editable ? ref : null;
        lastSheetCell = editable ? ref : lastSheetCell;
        fRef.textContent = ref;
        const raw = sheetRaw(task, d)[ref];
        fIn.value = raw == null ? '' : String(raw);
        fIn.readOnly = !editable;
        $$('.sheet td').forEach(td => td.classList.remove('is-sel'));
        const el = $(`.sheet [data-ref="${ref}"]`) || $(`.sheet [data-cell="${ref}"]`);
        if (el) (el.closest('td') || el).classList.add('is-sel');
      };
      const focusCell = ref => { const el = $(`.sheet .cell-in[data-ref="${ref}"]`); if (el) { el.focus(); el.select(); } };
      const moveFrom = (ref, dr, dc) => {
        const p = parseRef(ref);
        const next = colLetter(p.c + dc) + (p.r + dr);
        if (task._editable.has(next)) focusCell(next);
        else $(`.sheet .cell-in[data-ref="${ref}"]`).blur();
      };
      $$('.sheet .cell-in').forEach(inp => {
        const ref = inp.dataset.ref;
        inp.addEventListener('focus', () => {
          const raw = d.cells[ref];
          inp.value = raw == null ? '' : raw;
          select(ref, true);
        });
        inp.addEventListener('input', () => { d.cells[ref] = inp.value; fIn.value = inp.value; saveDrafts(); refresh(); });
        inp.addEventListener('blur', refresh);
        inp.addEventListener('keydown', e => {
          if (e.key === 'Enter') { e.preventDefault(); moveFrom(ref, e.shiftKey ? -1 : 1, 0); }
          else if (e.key === 'Escape') inp.blur();
          else if (e.key === 'ArrowDown' && !inp.value.startsWith('=')) { e.preventDefault(); moveFrom(ref, 1, 0); }
          else if (e.key === 'ArrowUp' && !inp.value.startsWith('=')) { e.preventDefault(); moveFrom(ref, -1, 0); }
        });
      });
      $$('.sheet td.lk[data-cell]').forEach(td => td.addEventListener('click', () => select(td.dataset.cell, false)));
      fIn.addEventListener('input', () => {
        if (!sel) return;
        d.cells[sel] = fIn.value;
        const inp = $(`.sheet .cell-in[data-ref="${sel}"]`);
        if (inp) inp.value = fmtCell(computeSheet(sheetRaw(task, d))(sel), cellFormat(task, sel));
        saveDrafts();
        refresh();
      });
      fIn.addEventListener('keydown', e => { if (e.key === 'Enter' && sel) { e.preventDefault(); moveFrom(sel, 1, 0); } });
      if (lastSheetCell && task._editable.has(lastSheetCell)) select(lastSheetCell, true);
      return;
    }

    if (task.tool === 'journal') {
      const amt = x => { const n = parseFloat(String(x || '').replace(/[$,\s]/g, '')); return isNaN(n) ? 0 : n; };
      const totals = () => {
        const dr = d.rows.reduce((a, r) => a + amt(r.debit), 0), cr = d.rows.reduce((a, r) => a + amt(r.credit), 0);
        const money = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        $('#je-dr').textContent = money(dr);
        $('#je-cr').textContent = money(cr);
        const s = $('#je-status');
        if (!dr && !cr) { s.textContent = 'Enter amounts to see if the entry balances.'; s.className = 'je-status'; }
        else if (Math.abs(dr - cr) < 0.005) { s.textContent = 'Balanced'; s.className = 'je-status is-ok'; }
        else { s.textContent = `Out of balance by ${money(Math.abs(dr - cr))}`; s.className = 'je-status is-off'; }
      };
      totals();
      $$('.je-acct').forEach(sel => sel.addEventListener('change', () => { d.rows[+sel.dataset.row].account = sel.value; saveDrafts(); }));
      $$('.je-amt').forEach(inp => inp.addEventListener('input', () => { d.rows[+inp.dataset.row][inp.dataset.side] = inp.value; saveDrafts(); totals(); }));
      $('#je-memo').addEventListener('input', e => { d.memo = e.target.value; saveDrafts(); });
      return;
    }

    if (task.tool === 'writing') {
      const count = inp => {
        const el = $('#wc-' + inp.dataset.field);
        el.textContent = inp.dataset.counter === 'words' ? `${words(inp.value)} words` : `${inp.value.trim().length} characters`;
      };
      $$('.w-input').forEach(inp => {
        count(inp);
        inp.addEventListener('input', () => { d.fields[inp.dataset.field] = inp.value; saveDrafts(); count(inp); });
      });
    }
  }

  /* ---------------- On the Job: actions ---------------- */
  function openTask(id) {
    currentTaskId = id;
    lastSheetCell = null;
    go('task');
  }

  async function runTests(btn) {
    const task = findTask(currentTaskId);
    const d = getDraft(task.id);
    setBusy(btn, true);
    const run = await runCode(d.code, task.code.fn, task.code.tests);
    setBusy(btn, false);
    const out = { logs: run.logs || [], results: [] };
    if (run.timeout) out.error = 'Your code ran too long — check for an infinite loop.';
    else if (run.compileError) out.error = run.blocked
      ? 'This browser blocked running code on this page. Open FirstDay from your own copy of the files to use the code editor.'
      : 'Error: ' + run.compileError;
    else out.results = task.code.tests.map((t, k) => {
      const r = run.results[k] || {};
      if (r.error) return { pass: false, msg: 'Error: ' + r.error };
      if (r.undef) return { pass: false, msg: 'Returned nothing — did you forget return?' };
      return sameVal(r.got, t.expect) ? { pass: true } : { pass: false, msg: 'Returned ' + showVal(r.got) };
    });
    codeOutput[task.id] = out;
    const passed = out.results.filter(r => r.pass).length;
    renderTask();
    toast(out.error ? 'Your code has an error — see below the tests.' : `${passed} of ${task.code.tests.length} tests passing.`);
  }

  async function submitTask(btn) {
    const task = findTask(currentTaskId);
    setBusy(btn, true);
    const res = await gradeTask(task);
    setBusy(btn, false);
    lastResults[task.id] = res;
    state.tasks = state.tasks || {};
    const prev = state.tasks[task.id] || { best: 0, attempts: 0 };
    state.tasks[task.id] = { best: Math.max(prev.best, res.score), attempts: prev.attempts + 1, last: res.score };
    persist();
    if (task.tool === 'code' && res.run && res.run.results) {
      codeOutput[task.id] = {
        logs: res.run.logs || [],
        results: task.code.tests.map((t, k) => {
          const r = res.run.results[k] || {};
          if (r.error) return { pass: false, msg: 'Error: ' + r.error };
          if (r.undef) return { pass: false, msg: 'Returned nothing — did you forget return?' };
          return sameVal(r.got, t.expect) ? { pass: true } : { pass: false, msg: 'Returned ' + showVal(r.got) };
        })
      };
    }
    renderTask();
    const card = $('#result-card');
    if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'start' }); card.focus({ preventScroll: true }); }
  }

  function fillDown() {
    const task = findTask(currentTaskId);
    const d = getDraft(task.id);
    if (!lastSheetCell) { toast('Click a cell with a formula first, then Fill down.'); return; }
    const src = d.cells[lastSheetCell];
    if (!src) { toast(`${lastSheetCell} is empty — type a formula there first.`); return; }
    const p = parseRef(lastSheetCell);
    let r = p.r + 1, filled = 0;
    while (task._editable.has(colLetter(p.c) + r)) {
      d.cells[colLetter(p.c) + r] = String(src).startsWith('=') ? '=' + shiftFormula(String(src).slice(1), r - p.r) : src;
      r++; filled++;
    }
    if (!filled) { toast('There are no cells to fill below this one.'); return; }
    saveDrafts();
    renderTask();
    toast(`Filled ${filled} cell${filled === 1 ? '' : 's'} down from ${lastSheetCell}.`);
  }

  /* =========================================================
     RESUME & COVER LETTER
     Build, paste, or upload → review → polished version.
     All rule-based, in the browser. Nothing is invented.
     ========================================================= */
  const DOCS_KEY = 'firstday:docs';
  const blankResume = () => ({ name: '', email: '', phone: '', location: '', link: '', summaryHeading: 'Summary', summary: '', experience: [], education: [], skills: '', extras: [], references: false, personal: [], street: '' });
  const blankExp = () => ({ title: '', org: '', location: '', start: '', end: '', current: false, bullets: '' });
  const blankEdu = () => ({ school: '', degree: '', location: '', date: '', gpa: '', details: '' });
  const blankExtra = () => ({ heading: '', lines: '' });

  function loadDocs() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(DOCS_KEY)); } catch (e) { d = null; }
    d = d || {};
    d.tab = d.tab === 'cover' ? 'cover' : 'resume';
    d.job = Object.assign({ title: '', company: '', manager: '', posting: '', mode: 'posting' }, d.job || {});
    d.resume = Object.assign({ stage: 'start', step: 0, source: null, model: null, notice: false }, d.resume || {});
    d.cover = Object.assign({ stage: 'start', step: 0, source: null, body: '', notice: false }, d.cover || {});
    d.cover.guided = Object.assign({ opening: '', why: '', company: '', closing: '' }, d.cover.guided || {});
    d.cover.write = Object.assign({ strengths: [], example: '', why: '' }, d.cover.write || {});
    d.prefs = Object.assign({ rejected: [], remove: {} }, d.prefs || {});
    return d;
  }
  let docs = loadDocs();
  let docsTimer = null;
  function saveDocs() {
    clearTimeout(docsTimer);
    docsTimer = setTimeout(() => { try { localStorage.setItem(DOCS_KEY, JSON.stringify(docs)); } catch (e) { /* ignore */ } }, 200);
  }
  const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  function setPath(obj, path, value) {
    const keys = path.split('.');
    let o = obj;
    keys.slice(0, -1).forEach(k => { if (o[k] == null) o[k] = {}; o = o[k]; });
    o[keys[keys.length - 1]] = value;
  }
  const capFirst = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /* ---------------- Dates ---------------- */
  const MON = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const MONN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function normDate(s) {
    if (!s) return '';
    const t = String(s).trim().replace(/\s+/g, ' ');
    if (/^(present|current|now)$/i.test(t)) return 'Present';
    let m = t.match(/^(\d{1,2})\/(\d{2,4})$/);
    if (m) { const mo = +m[1]; let y = +m[2]; if (y < 100) y += 2000; if (mo >= 1 && mo <= 12) return MONN[mo - 1] + ' ' + y; }
    m = t.match(/^([A-Za-z]+)\.?,?\s+(\d{4})$/);
    if (m) {
      const i = MON.indexOf(m[1].slice(0, 3).toLowerCase());
      if (i >= 0 && /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(m[1])) return MONN[i] + ' ' + m[2];
      if (/^(spring|summer|fall|autumn|winter)$/i.test(m[1])) return capFirst(m[1].toLowerCase()).replace('Autumn', 'Fall') + ' ' + m[2];
    }
    return t;
  }
  const MONTH_WORDS = 'january|february|march|april|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sept|sep|oct|nov|dec';
  const DPART = `(?:(?:${MONTH_WORDS})\\.?,?\\s*|(?:spring|summer|fall|autumn|winter)\\s+|\\d{1,2}\\/)?(?:19|20)\\d{2}`;
  const RANGE_RE = new RegExp(`(${DPART})\\s*(?:-|–|—|to)\\s*(${DPART}|present|current|now)`, 'i');
  const SINGLE_RE = new RegExp(`(${DPART})`, 'i');
  const cleanPiece = s => s.replace(/\(\s*\)/g, '').replace(/^[\s|,–—\-:·•]+|[\s|,–—\-:·•]+$/g, '').replace(/\s{2,}/g, ' ');
  function findDates(str) {
    let m = str.match(RANGE_RE);
    if (m) return { start: normDate(m[1]), end: normDate(m[2]), rest: str.replace(m[0], '  ') };
    m = str.match(SINGLE_RE);
    if (m) return { start: '', end: normDate(m[1]), rest: str.replace(m[0], '  ') };
    return null;
  }
  const dateRange = e => [e.start, e.current ? 'Present' : e.end].filter(Boolean).join(' – ');

  /* ---------------- Parsing pasted / uploaded text ---------------- */
  const BULLET_RE = /^\s*(?:[•●▪◦‣∙·*>➢➤✓\-–—]|\d+[.)])\s*/;
  const LOC_TAIL_RE = /,?\s*((?:[A-Z][a-zA-Z.']*\s?){1,3},\s*[A-Z]{2})\s*$/;
  const LOC_RE = /^((?:[A-Z][a-zA-Z.']*\s?){1,3},\s*[A-Z]{2}|remote|hybrid)$/i;
  const STREET_RE = /\d+\s+[A-Za-z0-9.' ]+?\s(?:st|street|ave|avenue|rd|road|blvd|boulevard|ln|lane|dr|drive|ct|court|way|pl|place|terrace|ter|hwy|highway|pike|cir|circle|pkwy|parkway)\b\.?,?/i;
  const PERSONAL_RE = /(date of birth|\bDOB\b|\bage\s*:?\s*\d|\b\d{2} years old\b|marital status|\breligion\b|nationality|\bSSN\b|social security|\bheight\b\s*:|\bweight\b\s*:)/i;
  const KNOWN_HEADINGS = [
    [/^(work |professional |relevant |employment )?(experience|employment|work history)$/i, 'experience'],
    [/^(education|academics|academic background)$/i, 'education'],
    [/^(technical |relevant )?skills( (&|and) (interests|tools|languages|certifications))?$|^(skills and abilities|core competencies|tools)$/i, 'skills'],
    [/^(professional |personal )?(summary|profile)$|^about( me)?$/i, 'summary'],
    [/^(career )?objective$/i, 'objective'],
    [/^references?( available (upon|on) request)?\.?$/i, 'references'],
    [/^(activities|leadership|extracurriculars?|volunteer(ing)?( experience)?|community (service|involvement)|awards?|honors?|awards (&|and) honors|honors (&|and) awards|certifications?|licenses( (&|and) certifications)?|projects|languages|clubs|athletics|sports|achievements|publications|(relevant )?coursework|interests|hobbies|hobbies (&|and) interests|leadership (&|and) activities|activities (&|and) leadership|leadership experience|additional information)$/i, 'extra']
  ];
  function headingOf(line) {
    if (BULLET_RE.test(line) && !/^\s*\d/.test(line)) return null;
    const t = line.trim();
    let cand = t.replace(/:$/, ''), rest = '';
    const colon = t.match(/^([A-Za-z &/]{3,40}):\s*(.+)$/);
    if (colon) { cand = colon[1]; rest = colon[2]; }
    if (cand.split(/\s+/).length > 6) return null;
    for (const [re, type] of KNOWN_HEADINGS) {
      if (re.test(cand.trim())) return { type, heading: titleCase(cand.trim()), rest };
    }
    if (!colon && /^[A-Z][A-Z &/]{3,}$/.test(cand) && !/\d/.test(cand)) return { type: 'extra', heading: titleCase(cand), rest: '' };
    return null;
  }
  function titleCase(s) {
    const small = new Set(['and', 'of', 'the', 'in', 'on', 'for', 'to', 'a', '&']);
    return s.toLowerCase().split(/\s+/).map((w, i) => (i && small.has(w)) ? w : capFirst(w)).join(' ');
  }

  function parseResumeText(text) {
    const m = blankResume();
    const lines = String(text || '').replace(/\r/g, '').replace(/\u00a0/g, ' ').split('\n')
      .map(l => l.replace(/\t/g, '  ').replace(/\s+$/, '')).filter(l => l.trim() !== '');
    let i = 0;
    const header = [];
    while (i < lines.length && !headingOf(lines[i])) header.push(lines[i++]);

    // Header: name, contact details, maybe a summary
    const summaryBits = [];
    header.forEach((line, k) => {
      let t = line.trim();
      if (PERSONAL_RE.test(t)) { m.personal.push(t); return; }
      if (STREET_RE.test(t)) { m.street = t.match(STREET_RE)[0].replace(/,\s*$/, '').trim(); t = t.replace(STREET_RE, ' '); }
      const email = t.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
      if (email && !m.email) m.email = email[0];
      const noEmail = t.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, ' ');
      const phone = noEmail.match(/(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
      if (phone && !m.phone) m.phone = phone[0].trim();
      const link = noEmail.match(/(?:https?:\/\/)?(?:www\.)?(?:linkedin\.com\/in|github\.com)\/[\w-]+\/?|https?:\/\/\S+/i);
      if (link && !m.link) m.link = link[0].replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
      const pieces = noEmail.split(/\s*[|•·]\s*|\s{2,}/).map(cleanPiece).filter(Boolean);
      pieces.forEach(p => { if (!m.location && LOC_RE.test(p)) m.location = p; });
      const hasContact = email || phone || link;
      if (k === 0 && !hasContact && t.split(/\s+/).length <= 5) { m.name = t; return; }
      if (k === 0 && hasContact) { const first = pieces[0]; if (first && !/\d|@/.test(first) && first.split(/\s+/).length <= 4 && !LOC_RE.test(first)) m.name = first; return; }
      if (!hasContact && !m.location && t.split(/\s+/).length > 6) summaryBits.push(t);
      else if (!hasContact && !m.location) { const loc = t.match(LOC_TAIL_RE); if (loc) m.location = loc[1]; }
    });
    if (summaryBits.length) m.summary = summaryBits.join(' ');

    // Sections
    const sections = [];
    let cur = null;
    for (; i < lines.length; i++) {
      const h = headingOf(lines[i]);
      if (h) { cur = { type: h.type, heading: h.heading, lines: [] }; sections.push(cur); if (h.rest) cur.lines.push(h.rest); continue; }
      if (cur) cur.lines.push(lines[i]);
    }

    sections.forEach(sec => {
      const personal = sec.lines.filter(l => PERSONAL_RE.test(l));
      m.personal.push(...personal.map(l => l.replace(BULLET_RE, '').trim()));
      const lines2 = sec.lines.filter(l => !PERSONAL_RE.test(l));
      if (/reference/i.test(sec.heading) || sec.type === 'references') { m.references = true; return; }
      if (lines2.some(l => /references? (are )?available/i.test(l))) m.references = true;
      const body = lines2.filter(l => !/references? (are )?available/i.test(l));
      if (sec.type === 'summary' || sec.type === 'objective') {
        m.summaryHeading = sec.type === 'objective' ? 'Objective' : 'Summary';
        m.summary = [m.summary, body.map(l => l.replace(BULLET_RE, '').trim()).join(' ')].filter(Boolean).join(' ');
      } else if (sec.type === 'experience') {
        m.experience.push(...parseEntries(body));
      } else if (sec.type === 'education') {
        m.education.push(...parseEducation(body));
      } else if (sec.type === 'skills') {
        const items = body.join('\n').split(/[,;|•·\n]/).map(s => s.replace(BULLET_RE, '').replace(/^[A-Za-z &/]{2,25}:\s*/, '').trim()).filter(Boolean);
        m.skills = [m.skills, items.join(', ')].filter(Boolean).join(', ');
      } else if (body.length) {
        m.extras.push({ heading: sec.heading, lines: body.map(l => l.replace(BULLET_RE, '').trim()).join('\n') });
      }
    });
    return m;
  }

  function splitHeader(text) {
    let loc = '';
    let t = text;
    const tail = t.match(LOC_TAIL_RE);
    if (tail) { loc = tail[1]; t = t.slice(0, tail.index); }
    let parts = t.split(/\s*\|\s*|\s+[•·]\s+|\s+[–—-]\s+|\s{2,}|\n/).map(cleanPiece).filter(Boolean);
    parts = parts.filter(p => { if (!loc && LOC_RE.test(p)) { loc = p; return false; } return true; });
    if (parts.length === 1 && / at /i.test(parts[0])) parts = parts[0].split(/ at /i);
    else if (parts.length === 1 && parts[0].includes(', ')) { const k = parts[0].indexOf(', '); parts = [parts[0].slice(0, k), parts[0].slice(k + 2)]; }
    return { title: parts[0] || '', org: parts.slice(1).join(', '), location: loc };
  }

  function parseEntries(lines) {
    const entries = [];
    let e = null;
    lines.forEach(raw => {
      const isBullet = BULLET_RE.test(raw) && !/^\s*\d{1,2}\/\d/.test(raw);
      const t = raw.replace(BULLET_RE, '').trim();
      const hasDate = RANGE_RE.test(t) || (SINGLE_RE.test(t) && t.split(/\s+/).length <= 10);
      const first = (t.split(/\s+/)[0] || '').toLowerCase().replace(/[^a-z]/g, '');
      const verbStart = Boolean(VERB[first]) || /^(responsible|helped|worked|assisted|duties|responsibilities|in|was|i|my|did)$/.test(first);
      const headDated = e && !e._bullets.length && e._head.some(h => RANGE_RE.test(h) || SINGLE_RE.test(h));
      const headerLike = !isBullet && (hasDate || (t.split(/\s+/).length <= 8 && !/[.;]$/.test(t) && !(verbStart && headDated)));
      if (headerLike && (!e || e._bullets.length)) { e = { _head: [t], _bullets: [] }; entries.push(e); return; }
      if (headerLike && e && !e._bullets.length && e._head.length < 3) { e._head.push(t); return; }
      if (!e) { e = { _head: [], _bullets: [] }; entries.push(e); }
      e._bullets.push(t);
    });
    return entries.map(x => {
      const out = blankExp();
      let head = x._head.join('\n');
      const dt = findDates(head);
      if (dt) { out.start = dt.start; out.end = dt.end; head = dt.rest; if (dt.end === 'Present') { out.current = true; out.end = ''; } }
      const h = splitHeader(head.split('\n').map(cleanPiece).filter(Boolean).join('\n'));
      Object.assign(out, { title: h.title, org: h.org, location: h.location });
      out.bullets = x._bullets.join('\n');
      return out;
    });
  }

  function parseEducation(lines) {
    const out = [];
    let e = null;
    lines.forEach(raw => {
      const t = raw.replace(BULLET_RE, '').trim();
      const isSchool = !BULLET_RE.test(raw) && /(university|college|school|academy|institute|polytechnic)\b/i.test(t) && !/(coursework|honors|dean)/i.test(t);
      if (isSchool && (!e || e.school)) { e = blankEdu(); out.push(e); }
      if (!e) { e = blankEdu(); out.push(e); }
      let rest = t;
      const g = rest.match(/GPA\s*:?\s*([0-4]\.\d{1,2})(\s*\/\s*[0-9.]+)?|([0-4]\.\d{1,2})(\s*\/\s*4\.0+)?\s*GPA/i);
      if (g) { e.gpa = g[1] || g[3]; rest = cleanPiece(rest.replace(g[0], ' ')); }
      const dt = findDates(rest);
      if (dt && !e.date) {
        e.date = (/expected/i.test(rest) ? 'Expected ' : '') + (dt.start ? dt.start + ' – ' : '') + dt.end;
        rest = cleanPiece(dt.rest.replace(/expected|anticipated|graduat\w*|class of/ig, ' '));
      }
      if (!rest) return;
      if (isSchool && !e.school) {
        const tail = rest.match(LOC_TAIL_RE);
        if (tail) { e.location = tail[1]; rest = cleanPiece(rest.slice(0, tail.index)); }
        const parts = rest.split(/\s*\|\s*|\s{2,}|\s[–—]\s/).map(cleanPiece).filter(Boolean);
        e.school = parts[0] || rest;
        if (parts[1] && !e.degree) e.degree = parts.slice(1).join(', ');
      } else if (!e.degree && /(bachelor|master|associate|diploma|\bb\.?s\b|\bb\.?a\b|\bm\.?b\.?a\b|major|minor|degree|candidate|concentration|program)/i.test(rest)) {
        e.degree = rest;
      } else {
        e.details = (e.details ? e.details + '\n' : '') + rest;
      }
    });
    return out;
  }

  function parseCoverText(text) {
    let paras = String(text || '').replace(/\r/g, '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    if (paras.length === 1) paras = paras[0].split('\n').map(p => p.trim()).filter(Boolean);
    return paras.join('\n\n');
  }

  /* ---------------- Reading uploaded files ---------------- */
  const LIBS = {
    pdf: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js',
    pdfWorker: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js',
    mammoth: 'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js'
  };
  const loadScript = src => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-lib="${src}"]`);
    if (existing && existing.dataset.ready) { resolve(); return; }
    const s = existing || document.createElement('script');
    s.addEventListener('load', () => { s.dataset.ready = '1'; resolve(); });
    s.addEventListener('error', () => reject(uiErr("Couldn't load the file reader. Check your internet connection, or paste the text instead.")));
    if (!existing) { s.src = src; s.dataset.lib = src; document.head.appendChild(s); }
  });
  async function readFileText(file) {
    const name = file.name.toLowerCase();
    if (file.size > 10 * 1024 * 1024) throw uiErr('That file is over 10 MB. Try a smaller file.');
    if (name.endsWith('.txt') || name.endsWith('.md')) return await file.text();
    if (name.endsWith('.pdf')) {
      await loadScript(LIBS.pdf);
      const lib = window.pdfjsLib;
      lib.GlobalWorkerOptions.workerSrc = LIBS.pdfWorker;
      const pdf = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const out = [];
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const tc = await page.getTextContent();
        const pageLines = [];
        let line = '', lineX = null, lastY = null, lastEnd = null;
        const flush = () => { if (line.trim()) pageLines.push({ text: line, x: lineX }); line = ''; lineX = null; lastEnd = null; };
        tc.items.forEach(it => {
          if (!('str' in it)) return;
          const x = it.transform[4], y = Math.round(it.transform[5]);
          if (lastY !== null && Math.abs(y - lastY) > 2) flush();
          if (lastEnd !== null && x - lastEnd > 1.5 && !line.endsWith(' ') && !it.str.startsWith(' ')) line += ' ';
          if (lineX === null && it.str.trim()) lineX = x;
          line += it.str;
          lastY = y;
          lastEnd = x + (it.width || 0);
          if (it.hasEOL) { flush(); lastY = null; }
        });
        flush();
        // Bullet symbols are often drawn as shapes, not text: treat indented lines after a heading as bullets
        const minX = Math.min(...pageLines.map(l => l.x));
        let seenHeading = false;
        pageLines.forEach(l => {
          if (headingOf(l.text)) { seenHeading = true; out.push(l.text); return; }
          const indented = seenHeading && l.x - minX > 12 && l.text.trim().split(/\s+/).length >= 3 && !BULLET_RE.test(l.text);
          out.push(indented ? '• ' + l.text.trim() : l.text);
        });
        out.push('');
      }
      const text = out.join('\n');
      if (!text.trim()) throw uiErr("This PDF looks like a scanned image, so there's no text to read. Paste the text instead.");
      return text;
    }
    if (name.endsWith('.docx')) {
      await loadScript(LIBS.mammoth);
      const r = await window.mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
      const dom = new DOMParser().parseFromString(r.value, 'text/html');
      const lines = [];
      dom.body.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6').forEach(el => {
        if (el.tagName === 'P' && el.closest('li')) return;
        const t = el.textContent.replace(/\s+/g, ' ').trim();
        if (t) lines.push(el.tagName === 'LI' ? '• ' + t : t);
      });
      return lines.join('\n');
    }
    if (name.endsWith('.doc')) throw uiErr("Older .doc files can't be read. In Word, choose File → Save As → Word Document (.docx) or PDF, then upload that.");
    if (/\.(png|jpe?g|heic|gif)$/.test(name)) throw uiErr("Images can't be read. Upload a PDF or Word file, or paste the text.");
    throw uiErr('Upload a PDF, Word (.docx), or text file.');
  }

  /* ---------------- Language rules ---------------- */
  const IRREG = {
    lead: ['led', 'leading'], run: ['ran', 'running'], make: ['made', 'making'], write: ['wrote', 'writing'], build: ['built', 'building'],
    sell: ['sold', 'selling'], teach: ['taught', 'teaching'], oversee: ['oversaw', 'overseeing'], drive: ['drove', 'driving'],
    begin: ['began', 'beginning'], grow: ['grew', 'growing'], win: ['won', 'winning'], keep: ['kept', 'keeping'], meet: ['met', 'meeting'],
    bring: ['brought', 'bringing'], give: ['gave', 'giving'], take: ['took', 'taking'], plan: ['planned', 'planning'], ship: ['shipped', 'shipping'],
    spend: ['spent', 'spending'], find: ['found', 'finding'], hold: ['held', 'holding'], speak: ['spoke', 'speaking'], pay: ['paid', 'paying'],
    map: ['mapped', 'mapping'], log: ['logged', 'logging'], cut: ['cut', 'cutting'], shop: ['shopped', 'shopping']
  };
  const VERB_BASES = ('manage create handle lead organize train answer help maintain process coordinate develop run make write build plan track prepare ' +
    'support assist update schedule serve sell teach oversee review analyze design implement launch increase reduce improve deliver research monitor ' +
    'resolve operate greet clean cook balance respond communicate collaborate mentor tutor coach direct supervise negotiate draft edit fix install ' +
    'configure troubleshoot automate generate recruit onboard compile calculate reconcile audit promote photograph volunteer raise welcome drive ' +
    'begin grow win keep meet bring give take ship spend find hold speak pay map log cut establish streamline conduct assemble document evaluate ' +
    'identify ensure provide contribute achieve earn complete exceed host facilitate advise instruct prioritize restock collect distribute verify ' +
    'boost save expand secure present participate attend lift shop assist check sort load unload count order close open wash fold bag stack').split(' ');
  const VERB = {};
  VERB_BASES.forEach(b => {
    const ir = IRREG[b];
    const past = ir ? ir[0] : b.endsWith('e') ? b + 'd' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ied' : b + 'ed';
    const ing = ir ? ir[1] : b.endsWith('ie') ? b.slice(0, -2) + 'ying' : (b.endsWith('e') && !b.endsWith('ee')) ? b.slice(0, -1) + 'ing' : b + 'ing';
    const s = /(s|sh|ch|x|z|o)$/.test(b) ? b + 'es' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ies' : b + 's';
    const f = { base: b, past, ing, s };
    [b, past, ing, s].forEach(x => { if (!VERB[x]) VERB[x] = f; });
  });
  const SPELL = [
    [/\brecieve(d|s)?\b/gi, 'receive$1'], [/\bmanagment\b/gi, 'management'], [/\bresponsibilties\b/gi, 'responsibilities'],
    [/\bacheive(d|s|ment|ments)?\b/gi, 'achieve$1'], [/\bseperate(d|ly)?\b/gi, 'separate$1'], [/\bcom+unica?tion\b/gi, 'communication'],
    [/\bcostumer(s)?\b/gi, 'customer$1'], [/\bexperiance\b/gi, 'experience'], [/\benviroment\b/gi, 'environment'], [/\bcalender\b/gi, 'calendar'],
    [/\bdefinately\b/gi, 'definitely'], [/\bindependant\b/gi, 'independent'], [/\bliason\b/gi, 'liaison'], [/\bmaintainance\b/gi, 'maintenance'],
    [/\boccured\b/gi, 'occurred'], [/\bbegining\b/gi, 'beginning'], [/\bsuc+es+ful(ly)?\b/gi, 'successful$1'], [/\bteh\b/gi, 'the'],
    [/\badress\b/gi, 'address'], [/\bexcell\b/gi, 'Excel'], [/\bmicrosoft excel\b/gi, 'Microsoft Excel'], [/\bpower ?point\b/gi, 'PowerPoint'],
    [/\blinkedin\b/gi, 'LinkedIn'], [/\bjavascript\b/gi, 'JavaScript'], [/\bgithub\b/gi, 'GitHub'], [/\bquickbooks\b/gi, 'QuickBooks'],
    [/\byoutube\b/gi, 'YouTube'], [/\btiktok\b/gi, 'TikTok'], [/\bhubspot\b/gi, 'HubSpot'], [/\bwhich was\b/gi, 'which was']
  ];
  function fixSpelling(t) { let out = t; SPELL.forEach(([re, rep]) => { out = out.replace(re, rep); }); return out; }
  const BUZZ = /\b(team player|hard[- ]worker|hard[- ]working|detail[- ]oriented|fast learner|quick learner|people person|go[- ]getter|self[- ]starter|think outside the box|results[- ]driven|passionate|dynamic|synergy)\b/i;

  function polishLine(raw, current) {
    let t = raw.replace(BULLET_RE, '').replace(/\s+/g, ' ').trim();
    const why = [];
    const note = r => { if (r && !why.includes(r)) why.push(r); };
    const apply = (re, rep, reason) => { const n = t.replace(re, rep); if (n !== t) { t = n; note(reason); } };
    const tense = (v, cur) => cur ? v.base : v.past;
    const isCur = current === true;

    apply(/^(?:I|We)\s+(?=[a-z])/i, '', 'Dropped "I" — resumes skip first person');
    apply(/^(?:my\s+)?(?:duties|responsibilities|tasks|job duties)\s+(?:included|include|were|involved)\s*:?\s*/i, isCur ? 'Handle ' : 'Handled ', 'Replaced "Duties included" with an action verb');
    let m = t.match(/^(?:was |am |were |is )?(?:responsible|in charge) (?:for|of)\s+(\w+)(.*)$/i);
    if (m) {
      const v = VERB[m[1].toLowerCase()];
      t = (v && m[1].toLowerCase() === v.ing) ? capFirst(tense(v, isCur)) + m[2] : (isCur ? 'Oversee ' : 'Oversaw ') + m[1] + m[2];
      note('Replaced "Responsible for" with an action verb');
    }
    m = t.match(/^help(?:ed|ing|s)?\s+(?:to\s+)?(with\s+)?(\w+)(.*)$/i);
    if (m) {
      const v = VERB[m[2].toLowerCase()];
      const after = m[3].match(/^\s+(\w+)(.*)$/);
      const v2 = after && VERB[after[1].toLowerCase()];
      if (m[1]) t = (isCur ? 'Support ' : 'Supported ') + m[2] + m[3];
      else if (v && m[2].toLowerCase() === v.base) t = (isCur ? 'Assist in ' : 'Assisted in ') + v.ing + m[3];
      else if (v2 && after[1].toLowerCase() === v2.base) t = (isCur ? 'Assist ' : 'Assisted ') + m[2] + ' in ' + v2.ing + after[2];
      else t = (isCur ? 'Assist ' : 'Assisted ') + m[2] + m[3];
      note('Swapped "Helped" for a stronger verb');
    }
    apply(/^assist(?:ed|ing|s)? with\s+/i, isCur ? 'Support ' : 'Supported ', 'Swapped "Assisted with" for a stronger verb');
    apply(/^work(?:ed|ing|s)? on\s+/i, isCur ? 'Contribute to ' : 'Contributed to ', 'Replaced "Worked on" with a clearer verb');
    apply(/^work(?:ed|ing|s)? with\s+/i, isCur ? 'Collaborate with ' : 'Collaborated with ', 'Replaced "Worked with" with a clearer verb');
    apply(/^did\s+/i, isCur ? 'Complete ' : 'Completed ', 'Replaced "Did" with a stronger verb');
    if (current !== null) {
      const w = t.match(/^([A-Za-z]+)(.*)$/);
      if (w) {
        const lw = w[1].toLowerCase(), v = VERB[lw];
        if (v) {
          const want = tense(v, isCur);
          if (lw !== want && [v.base, v.past, v.ing, v.s].includes(lw)) {
            t = capFirst(want) + w[2];
            note(isCur ? 'Current role: switched to present tense' : 'Past role: switched to past tense');
          }
        }
      }
    }
    apply(/\s*\b(?:successfully|very|really|basically|various)\b/gi, '', 'Cut filler words');
    apply(/^\s+/, '', null);
    apply(/,?\s*(?:and\s+)?etc\.?\s*$/i, '', 'Cut "etc." — be specific instead');
    const sp = fixSpelling(t); if (sp !== t) { t = sp; note('Fixed spelling or capitalization'); }
    const before = t;
    t = capFirst(t.replace(/\s+([,.;])/g, '$1').replace(/[.;,]+$/, '').trim());
    if (t !== before) note('Consistent formatting');
    return { text: t, why };
  }

  /* ---------------- Job posting keywords ---------------- */
  const KNOWN_SKILLS = ['microsoft excel', 'excel', 'powerpoint', 'microsoft word', 'google sheets', 'google workspace', 'microsoft office', 'sql', 'python',
    'javascript', 'java', 'html', 'css', 'tableau', 'power bi', 'salesforce', 'hubspot', 'crm', 'quickbooks', 'sap', 'jira', 'zendesk', 'servicenow',
    'active directory', 'windows', 'macos', 'linux', 'networking', 'troubleshooting', 'customer service', 'communication', 'written communication',
    'teamwork', 'leadership', 'project management', 'time management', 'problem solving', 'problem-solving', 'data analysis', 'data entry',
    'financial modeling', 'financial analysis', 'forecasting', 'budgeting', 'accounts payable', 'accounts receivable', 'reconciliation',
    'bookkeeping', 'gaap', 'journal entries', 'social media', 'seo', 'content creation', 'copywriting', 'google analytics', 'email marketing',
    'adobe', 'photoshop', 'canva', 'research', 'presentations', 'scheduling', 'recruiting', 'onboarding', 'payroll', 'hris', 'sales', 'cold calling',
    'negotiation', 'spanish', 'bilingual', 'attention to detail', 'organization', 'organizational', 'multitasking', 'cash handling', 'pos',
    'inventory', 'a/b testing', 'market research', 'analytics', 'reporting', 'documentation', 'help desk', 'technical support', 'hardware',
    'software', 'cybersecurity', 'cloud', 'aws', 'azure', 'scripting', 'automation', 'powershell', 'ticketing', 'vlookup', 'pivot tables',
    'due diligence', 'valuation', 'accounting', 'auditing', 'marketing', 'branding', 'public speaking', 'microsoft teams', 'slack', 'zoom',
    'interviewing', 'employee relations', 'benefits administration', 'compliance', 'customer experience', 'retail', 'hospitality'];
  const SKILL_CASE = { 'microsoft excel': 'Microsoft Excel', excel: 'Excel', powerpoint: 'PowerPoint', 'microsoft word': 'Microsoft Word', 'google sheets': 'Google Sheets',
    'google workspace': 'Google Workspace', 'microsoft office': 'Microsoft Office', sql: 'SQL', python: 'Python', javascript: 'JavaScript', java: 'Java',
    html: 'HTML', css: 'CSS', tableau: 'Tableau', 'power bi': 'Power BI', salesforce: 'Salesforce', hubspot: 'HubSpot', crm: 'CRM', quickbooks: 'QuickBooks',
    sap: 'SAP', jira: 'Jira', zendesk: 'Zendesk', servicenow: 'ServiceNow', 'active directory': 'Active Directory', windows: 'Windows', macos: 'macOS',
    linux: 'Linux', gaap: 'GAAP', seo: 'SEO', 'google analytics': 'Google Analytics', adobe: 'Adobe', photoshop: 'Photoshop', canva: 'Canva', hris: 'HRIS',
    spanish: 'Spanish', pos: 'POS', aws: 'AWS', azure: 'Azure', powershell: 'PowerShell', vlookup: 'VLOOKUP', 'a/b testing': 'A/B testing',
    'microsoft teams': 'Microsoft Teams', slack: 'Slack', zoom: 'Zoom' };
  const POSTING_STOP = new Set(('a an the and or but for nor with without within into onto from to of in on at by as is are be been being was were will would can could ' +
    'should may might must shall do does did have has had having this that these those it its our your their we you they them us he she his her who whom which what ' +
    'when where why how all any each both few more most other some such no not only own same so than too very just also about above after again against below ' +
    'between during over under up down out off per via etc including include includes ability able across along among work working works role roles position ' +
    'positions job jobs candidate candidates team teams company companies experience experiences skills skill strong excellent preferred required requirements ' +
    'responsibilities responsibility qualifications qualified opportunity opportunities years year plus knowledge understanding environment ideal looking seeking ' +
    'join help new well related relevant based basic high level highly various others time day days week weeks hour hours full part apply applicants application ' +
    'equal employer status race color religion sex gender national origin disability veteran age benefits salary range compensation insurance ensure provide ' +
    'support within daily across successful success must-have nice please using use while through part-time full-time including minimum degree bachelor ' +
    'currently current want make making need needs great good best key other person people fast paced fast-paced every student students intern interns ' +
    'internship summer duties include perform performs performing assist assists assisting various tasks task other duties assigned').split(' '));
  function extractKeywords(posting) {
    const text = ' ' + String(posting || '').toLowerCase().replace(/[’']/g, "'") + ' ';
    if (text.trim().length < 40) return null;
    const hits = [];
    KNOWN_SKILLS.slice().sort((a, b) => b.length - a.length).forEach(k => {
      if (new RegExp(`(^|[^a-z])${reEsc(k)}([^a-z]|$)`).test(text) && !hits.some(h => h.includes(k) || k.includes(h))) hits.push(k);
    });
    const counts = {};
    (text.match(/[a-z][a-z+#-]{3,}/g) || []).forEach(w => {
      if (POSTING_STOP.has(w) || hits.some(h => h.includes(w))) return;
      counts[w] = (counts[w] || 0) + 1;
    });
    const freq = Object.entries(counts).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w);
    return hits.concat(freq).slice(0, 18);
  }
  const kwLabel = k => SKILL_CASE[k] || capFirst(k);
  function hasKeyword(doc, k) {
    const d = doc.toLowerCase();
    if (k.includes(' ') || k.length < 5) return new RegExp(`(^|[^a-z])${reEsc(k).replace(/\\? /g, '[\\s-]+')}([^a-z]|$)`).test(d);
    const stem = k.slice(0, Math.max(4, k.length - 3));
    return new RegExp(`(^|[^a-z])${reEsc(stem)}[a-z]*`).test(d);
  }
  function keywordReport(docText, posting) {
    const list = extractKeywords(posting);
    if (!list) return null;
    const matched = list.filter(k => hasKeyword(docText, k));
    const missing = list.filter(k => !matched.includes(k));
    return { list, matched, missing };
  }

  /* ---------------- Resume analysis → polished version ---------------- */
  const SYNONYMS = {
    managed: ['Directed', 'Coordinated', 'Oversaw', 'Ran'], created: ['Designed', 'Built', 'Developed', 'Produced'],
    led: ['Directed', 'Headed', 'Guided', 'Spearheaded'], organized: ['Coordinated', 'Arranged', 'Planned'], handled: ['Processed', 'Resolved', 'Managed'],
    supported: ['Enabled', 'Backed', 'Aided'], assisted: ['Supported', 'Aided', 'Partnered with'], answered: ['Responded to', 'Resolved', 'Addressed'],
    developed: ['Built', 'Created', 'Designed'], helped: ['Supported', 'Enabled'], worked: ['Collaborated', 'Contributed', 'Partnered'],
    trained: ['Coached', 'Mentored', 'Taught'], processed: ['Handled', 'Completed', 'Rang up'], served: ['Assisted', 'Welcomed', 'Supported'],
    supervised: ['Oversaw', 'Watched over', 'Led'], closed: ['Secured', 'Locked up', 'Wrapped up'], made: ['Built', 'Produced', 'Created']
  };
  const FILLER_SKILLS = /^(internet|the internet|e-?mail|web browsing|google search|computers?|typing|hard[- ]?working|hard worker|team player|punctual|responsible|reliable|fast learner|quick learner|people person|detail[- ]oriented|self[- ]starter|motivated|friendly|honest)$/i;
  const SKILL_ALIASES = { excel: 'Excel', 'ms excel': 'Microsoft Excel', 'microsoft excel': 'Microsoft Excel', word: 'Microsoft Word', 'ms word': 'Microsoft Word',
    powerpoint: 'PowerPoint', 'power point': 'PowerPoint', 'google sheets': 'Google Sheets', 'ms office': 'Microsoft Office', 'microsoft office': 'Microsoft Office' };
  const normSkill = s => { const k = s.toLowerCase().trim(); return SKILL_ALIASES[k] || SKILL_CASE[k] || (s === s.toLowerCase() ? capFirst(s) : s); };

  function analyzeResume(src, job, prefs) {
    const m = JSON.parse(JSON.stringify(src));
    const changes = [], todos = [], cuts = [];
    const filled = o => Object.entries(o).some(([k, v]) => k !== 'current' && typeof v === 'string' && v.trim());
    m.experience = m.experience.filter(filled);
    m.education = m.education.filter(filled);
    m.extras = m.extras.filter(x => (x.lines || '').trim());
    const rejected = new Set(prefs.rejected);
    const change = (id, where, before, after, why) => {
      if (before === after) return before;
      const c = { id: 'r:' + id, where, before, after, why };
      changes.push(c);
      if (rejected.has(c.id)) { c.rejected = true; return before; }
      return after;
    };
    const removed = c => { const k = 'r:' + c.id; return k in prefs.remove ? prefs.remove[k] : c.def; };
    const cut = c => { c.key = 'r:' + c.id; cuts.push(c); return removed(c); };

    // Contact
    if (!m.name.trim()) todos.push({ text: 'Add your name at the top', step: 0 });
    else if (m.name === m.name.toLowerCase() || (m.name === m.name.toUpperCase() && m.name.length > 3)) m.name = change('name', 'Name', m.name, titleCase(m.name), 'Capitalized your name');
    if (!m.email.trim()) todos.push({ text: 'Add your email address', detail: 'Recruiters need a way to reach you.', step: 0 });
    else if (/(sexy|cutie|baby|lol|420|69|xoxo|princess|gamer|hottie|swag|thug|babe)/i.test(m.email)) todos.push({ text: 'Use a professional email address', detail: `"${m.email}" may not be taken seriously. A firstname.lastname address works best.`, step: 0 });
    if (!m.phone.trim()) todos.push({ text: 'Add your phone number', step: 0 });
    if (m.street && !cut({ id: 'street', label: `Street address: ${m.street}`, why: 'City and state are enough. A full address takes space and shares more than employers need.', def: true })) {
      m.location = [m.street, m.location].filter(Boolean).join(', ');
    }
    if (m.personal && m.personal.length && !cut({ id: 'personal', label: `Personal details: ${m.personal.join('; ')}`, why: 'Age, birthday, and similar details don\u2019t belong on a resume — employers aren\u2019t allowed to use them, and they take up space.', def: true })) {
      m.extras.push({ heading: 'Personal', lines: m.personal.join('\n') });
    }

    if (docs.resume.source === 'write' && !m.summary.trim() && m.experience.length) {
      m.summary = change('wsummary', 'Summary', '', writtenSummary(m, job), 'Wrote a summary from your answers');
    }
    // Summary
    if (m.summary.trim()) {
      if (m.summaryHeading === 'Objective') {
        m.summaryHeading = change('objective', 'Summary', 'Objective', 'Summary', '"Objective" sections are outdated — a Summary focuses on what you offer');
        todos.push({ text: 'Rewrite your summary around what you offer', detail: 'Two lines: who you are, your strongest skill, and what you want to do next — not what you want from the employer.', step: 0 });
      }
      const s = m.summary.replace(/\s+/g, ' ').trim();
      const fixed = capFirst(fixSpelling(s.replace(/\b(?:very|really|basically)\s+/gi, '')));
      m.summary = change('summary', 'Summary', s, fixed, 'Cut filler words and fixed spelling');
      if (BUZZ.test(m.summary)) todos.push({ text: 'Back up buzzwords in your summary', detail: `Words like "${m.summary.match(BUZZ)[0]}" don't convince anyone on their own. Replace them with a specific strength or result.`, step: 0 });
    }

    // Experience
    if (!m.experience.length) todos.push({ text: 'Add at least one experience', detail: 'Jobs, internships, volunteering, clubs, and school projects all count.', step: 1 });
    const numless = [], firstVerbs = {};
    let longOnes = 0, shortOnes = 0;
    m.experience.forEach((e, ei) => {
      const label = [e.title, e.org].filter(Boolean).join(' · ') || `Experience ${ei + 1}`;
      const current = Boolean(e.current) || /present|current|now/i.test(e.end || '');
      const s0 = normDate(e.start), e0 = current ? '' : normDate(e.end);
      if (s0 !== (e.start || '') || e0 !== (e.end || '')) {
        const before = [e.start, e.current ? 'Present' : e.end].filter(Boolean).join(' – ');
        const after = [s0, current ? 'Present' : e0].filter(Boolean).join(' – ');
        if (change(`exp${ei}date`, label, before, after, 'Consistent date format') === after) { e.start = s0; e.end = e0; e.current = current; }
      }
      if (!e.start && !e.end && !e.current) todos.push({ text: `Add dates to ${label}`, step: 1 });
      const written = e.kind !== undefined;
      if (written) e.bullets = writtenBullets(e, current, change, ei, label).join('\n');
      const lines = (e.bullets || '').split('\n').map(x => x.trim()).filter(Boolean);
      if (!lines.length) todos.push(written
        ? { text: `Tell us what you did at ${e.org || label}`, detail: 'Pick the role type, check what you did, or describe it in your own words.', step: 1 }
        : { text: `Add bullet points to ${label}`, detail: '2–4 bullets: what you did and what happened because of it.', step: 1 });
      const out = lines.map((line, bi) => {
        const text = written ? line : change(`exp${ei}b${bi}`, label, line.replace(BULLET_RE, '').trim(), polishLine(line, current).text, polishLine(line, current).why.join(' · '));
        const first = (text.split(/\s+/)[0] || '').toLowerCase();
        if (first) firstVerbs[first] = (firstVerbs[first] || 0) + 1;
        if (!/\d/.test(text) && !/^(earned|won|selected|promoted|named|received|awarded)\b/i.test(text)) numless.push({ label, text });
        const n = words(text);
        if (n > 30) longOnes++;
        if (n < 4) shortOnes++;
        return text;
      });
      e.bullets = out.join('\n');
      if (!e.title) todos.push({ text: `Add a job title for ${e.org || 'your experience ' + (ei + 1)}`, step: 1 });
    });
    if (numless.length) todos.push({ text: `Add numbers to ${numless.length} bullet${numless.length === 1 ? '' : 's'}`, detail: 'Numbers make results real. How many customers, how much money, how many hours saved, what percent grew? Only use numbers you can back up.', list: numless.slice(0, 8).map(x => x.text), step: 1 });
    if (longOnes) todos.push({ text: `Shorten ${longOnes} long bullet${longOnes === 1 ? '' : 's'}`, detail: 'Bullets over 30 words get skimmed. Split them or cut the setup.', step: 1 });
    if (shortOnes) todos.push({ text: `Add detail to ${shortOnes} very short bullet${shortOnes === 1 ? '' : 's'}`, detail: 'Say what you did and what it led to.', step: 1 });
    Object.entries(firstVerbs).filter(([, c]) => c >= 3).forEach(([v, c]) => {
      const past = VERB[v] ? VERB[v].past : v;
      const ideas = SYNONYMS[past] || ['Handled', 'Completed', 'Delivered', 'Coordinated'];
      todos.push({ text: `${c} bullets start with "${capFirst(v)}"`, detail: `Mix it up so each bullet stands out. Try: ${ideas.join(', ')}.`, step: 1 });
    });
    const allBullets = m.experience.map(e => e.bullets).join(' ');
    if (BUZZ.test(allBullets)) todos.push({ text: 'Replace buzzwords with proof', detail: `"${allBullets.match(BUZZ)[0]}" is something to show, not say. Describe a moment that proves it.`, step: 1 });

    // Education
    if (!m.education.length) todos.push({ text: 'Add your education', detail: 'Include your school, expected graduation date, and GPA if it\u2019s 3.0 or higher.', step: 2 });
    const hasCollege = m.education.some(ed => /(university|college|institute)/i.test(ed.school));
    m.education.forEach((ed, i) => {
      const gpa = parseFloat(ed.gpa);
      if (!isNaN(gpa) && gpa < 3.0 && cut({ id: `gpa${i}`, label: `GPA ${ed.gpa} (${ed.school || 'education'})`, why: 'A GPA under 3.0 is usually better left off — it isn\u2019t required.', def: false })) ed.gpa = '';
      if (hasCollege && /high school|\bhs\b/i.test(ed.school) && cut({ id: `hs${i}`, label: ed.school, why: 'Once you\u2019re in college, high school usually comes off your resume unless it\u2019s notable.', def: false })) ed._drop = true;
    });
    m.education = m.education.filter(ed => !ed._drop);

    // Skills
    const rawSkills = (m.skills || '').split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
    const filler = rawSkills.filter(s => FILLER_SKILLS.test(s));
    let skills = rawSkills;
    if (filler.length && cut({ id: 'filler', label: `Skills: ${filler.join(', ')}`, why: 'Basics like email and buzzwords like "team player" don\u2019t add anything to a skills list. Show soft skills in your bullets instead.', def: true })) {
      skills = skills.filter(s => !FILLER_SKILLS.test(s));
    }
    const seen = new Set();
    const cleaned = skills.map(normSkill).filter(s => { const k = s.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
    m.skills = change('skills', 'Skills', skills.join(', '), cleaned.join(', '), 'Fixed capitalization and removed duplicates');
    if (!rawSkills.length) todos.push({ text: 'Add a skills section', detail: 'List tools and abilities that match the job: software, languages, certifications.', step: 3 });

    // Extras
    m.extras = m.extras.filter((x, i) => {
      if (/interest|hobb/i.test(x.heading)) {
        return !cut({ id: `interests${i}`, label: `${x.heading} section`, why: 'Interests can spark conversation, but keep them only if they relate to the job or you have room.', def: false });
      }
      return true;
    });
    m.extras.forEach((x, xi) => {
      const lines = (x.lines || '').split('\n').map(s => s.trim()).filter(Boolean);
      x.lines = lines.map((line, li) => {
        const r = polishLine(line, null);
        return change(`x${xi}l${li}`, x.heading || 'Additional', line.replace(BULLET_RE, '').trim(), r.text, r.why.join(' · '));
      }).join('\n');
    });
    if (m.references) {
      if (!cut({ id: 'refs', label: '"References available upon request"', why: 'Employers already assume this — it just takes up space.', def: true })) {
        m.extras.push({ heading: 'References', lines: 'Available upon request' });
      }
    }

    // Job posting fit
    const docText = [m.summary, m.experience.map(e => [e.title, e.org, e.bullets].join(' ')).join(' '), m.skills, m.education.map(e => [e.degree, e.details].join(' ')).join(' '), m.extras.map(x => x.lines).join(' ')].join(' ');
    const keywords = keywordReport(docText, job.posting);
    if (keywords && m.experience.length) {
      const matches = m.experience.map(e => keywords.list.some(k => hasKeyword([e.title, e.org, e.bullets].join(' '), k)));
      if (!matches.some(Boolean)) {
        todos.push({ text: 'Connect your experience to this job', detail: `None of your bullets use words from the posting. Where it\u2019s true, show the overlap — for example: ${keywords.list.slice(0, 4).map(kwLabel).join(', ')}.`, step: 1 });
      } else if (m.experience.length >= 3) {
        m.experience = m.experience.filter((e, i) => matches[i] || !cut({ id: `unrelated${i}`, label: [e.title, e.org].filter(Boolean).join(' · ') || `Experience ${i + 1}`, why: 'Your other experience lines up with the posting better. If space is tight, this is the first to go.', def: false }));
      }
    }
    if (!keywords && job.mode !== 'none') todos.push({ text: 'Paste the job posting', detail: 'We\u2019ll check which of its keywords your resume is missing. Or choose "No specific job" for a general version.', step: 4 });

    const total = words(docText + ' ' + m.name);
    if (total > 650) todos.push({ text: 'Trim to one page', detail: `Your resume is about ${total} words. For students and early-career roles, one page (roughly 400–600 words) is the standard.`, step: 1 });

    return { model: m, changes, todos, cuts, keywords };
  }

  /* ---------------- Cover letter analysis → polished version ---------------- */
  const coverBody = c => c.source === 'write' ? writtenCoverBody(c) : c.source === 'build'
    ? [c.guided.opening, c.guided.why, c.guided.company, c.guided.closing].map(s => (s || '').trim()).filter(Boolean).join('\n\n')
    : (c.body || '');

  function analyzeCover(c, job, resumeModel, prefs) {
    const changes = [], todos = [];
    const rejected = new Set(prefs.rejected);
    const change = (id, where, before, after, why) => {
      if (before === after) return before;
      const ch = { id: 'c:' + id, where, before, after, why };
      changes.push(ch);
      if (rejected.has(ch.id)) { ch.rejected = true; return before; }
      return after;
    };
    const role = job.title.trim(), company = job.company.trim();
    const stepWhy = c.source === 'build' ? 3 : c.source === 'write' ? 2 : 1;
    const stepEx = c.source === 'build' ? 2 : 1;
    let paras = coverBody(c).split(/\n\s*\n/).map(p => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
    let greetingIn = '';
    if (paras.length && /^(dear|to whom|hello|hi|greetings|good (morning|afternoon))\b/i.test(paras[0]) && paras[0].length < 90) greetingIn = paras.shift();
    let signName = (resumeModel && resumeModel.name) || (state && state.name) || '';
    if (paras.length) {
      const last = paras[paras.length - 1];
      const sign = last.match(/^(sincerely|best regards|best wishes|best|regards|respectfully|thank you|thanks|warm regards|kind regards|yours truly)\s*[,!]?\s*((?:[A-Z][A-Za-z.'-]*)(?:\s[A-Z][A-Za-z.'-]*){0,3})?\s*$/i);
      if (sign) { paras.pop(); if (sign[2]) signName = signName || sign[2]; }
    }
    if (c.source === 'write' && !(c.write.why || '').trim()) todos.push({ text: company ? `Say why you want to work at ${company}` : 'Say why you want this job', detail: 'One or two sentences about something specific: a product, a value, or something you read about them.', step: 2 });
    if (c.source === 'write' && !(c.write.example || '').trim() && !(resumeModel && resumeModel.experience.length)) todos.push({ text: 'Add your best example', detail: 'What did you do, and what happened because of it? Or build your resume first and we\u2019ll pull an example from it.', step: 1 });
    if (!paras.length) todos.push({ text: 'Write your letter first', step: 1 });

    if (signName && (signName === signName.toLowerCase() || signName === signName.toUpperCase())) signName = titleCase(signName);
    const wantGreeting = `Dear ${job.manager.trim() || 'Hiring Manager'},`;
    const greeting = change('greet', 'Greeting', greetingIn, wantGreeting,
      !greetingIn ? 'Added a greeting' : /whom|sir|madam/i.test(greetingIn) ? '"To whom it may concern" sounds dated — address the hiring manager' : 'Addressed the hiring manager directly');

    paras = paras.map((p, pi) => {
      let t = p;
      const why = [];
      const apply = (re, rep, reason) => { const n = t.replace(re, rep); if (n !== t) { t = n; if (!why.includes(reason)) why.push(reason); } };
      apply(/^my name is [^,.]+(?:,| and)\s*(i\s)?/i, (m0, i2) => (i2 ? 'I ' : ''), 'Skipped "My name is" — your name is already at the top');
      if (pi === 0) {
        apply(/^I am writing (?:this letter )?(?:to|in order to) (?:apply|express|submit|formally)[^.!?]*[.!?]\s*/i,
          `I'm excited to apply for the ${role || 'open'} position${company ? ' at ' + company : ''}. `, 'Replaced a generic opening with a direct one');
      }
      apply(/(^|[.!?]\s+)I (?:strongly |truly |really )?(?:believe|feel|think)(?: that)?\s+(\w)/g, (m0, pre, ch) => pre + ch.toUpperCase(), 'Cut "I believe / I feel" — say it with confidence');
      apply(/\b(?:very|really|basically)\s+/gi, '', 'Cut filler words');
      const sp = fixSpelling(t); if (sp !== t) { t = sp; why.push('Fixed spelling or capitalization'); }
      t = capFirst(t.replace(/\s{2,}/g, ' ').trim());
      return change(`p${pi}`, `Paragraph ${pi + 1}`, p, t, why.join(' · '));
    });

    const full = paras.join(' ');
    if (paras.length) {
      const last = paras[paras.length - 1];
      if (!/(look forward|welcome the (chance|opportunity)|discuss|interview|speak with|talk with|hear(ing)? from you|conversation|meet with)/i.test(last)) {
        const add = `I would welcome the chance to discuss how I can contribute to ${company || 'your team'}.`;
        if (change('cta', 'Closing', '', add, 'Added a clear next step at the end') === add) paras[paras.length - 1] = last.replace(/\s*$/, ' ') + add;
      }
    }
    if (company && !new RegExp(reEsc(company), 'i').test(paras.join(' '))) todos.push({ text: `Mention ${company} by name`, detail: 'Show the letter was written for them, not copied. Add one specific thing you admire about the company.', step: stepWhy });
    if (role && !new RegExp(reEsc(role), 'i').test(paras.join(' '))) todos.push({ text: `Name the role: ${role}`, detail: 'Hiring managers often fill several roles at once. Say which one you want in your first paragraph.', step: c.source === 'write' ? 0 : 1 });
    if (!role || !company) todos.push({ text: 'Add the job title and company', detail: 'We use them to personalize your opening and closing.', step: 0 });
    const wc = words(paras.join(' '));
    if (wc && wc < 200) todos.push({ text: 'Add more detail', detail: `Your letter is ${wc} words. Aim for 250–400: one strong example with a result goes a long way.`, step: stepEx });
    if (wc > 400) todos.push({ text: 'Trim your letter', detail: `Your letter is ${wc} words. Keep it under 400 — hiring managers skim.`, step: 1 });
    if (paras.length && paras.length < 3) todos.push({ text: 'Break it into 3–4 short paragraphs', detail: 'Opening, your best example, why this company, and a closing.', step: 1 });
    if (paras.length && !/\d/.test(full)) todos.push({ text: 'Add one concrete result with a number', detail: 'For example: "I trained 4 new hires" or "I raised $1,200 for our food drive."', step: stepEx });
    if (BUZZ.test(full)) todos.push({ text: 'Show, don\u2019t tell', detail: `Instead of saying you\u2019re "${full.match(BUZZ)[0]}", describe a moment that proves it.`, step: stepEx });
    const sents = sentences(full);
    const iStarts = sents.filter(s => /^I\b/.test(s)).length;
    if (sents.length >= 5 && iStarts / sents.length > 0.5) todos.push({ text: 'Vary how your sentences start', detail: `${iStarts} of ${sents.length} sentences start with "I". Lead some with the result or the company instead.`, step: 1 });

    const keywords = keywordReport(full, job.posting);
    if (!keywords && job.mode !== 'none') todos.push({ text: 'Paste the job posting', detail: 'We\u2019ll check which of its keywords your letter mentions. Or choose "No specific job."', step: 0 });
    return { greeting, paras, signName, changes, todos, cuts: [], keywords, resume: resumeModel };
  }

  /* ---------------- Document output (preview, Word, PDF, text) ---------------- */
  const S = {
    doc: 'font-family:Calibri,Arial,Helvetica,sans-serif;color:#1a1a1a;font-size:10.5pt;line-height:1.35;',
    name: 'font-size:20pt;font-weight:bold;margin:0;text-align:center;letter-spacing:0.3px;',
    contact: 'text-align:center;margin:4px 0 10px;font-size:9.5pt;color:#333;',
    h2: 'font-size:11pt;font-weight:bold;text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid #1a1a1a;margin:12px 0 5px;padding-bottom:2px;',
    table: 'width:100%;border-collapse:collapse;',
    tdL: 'padding:0;text-align:left;vertical-align:top;',
    tdR: 'padding:0;text-align:right;vertical-align:top;white-space:nowrap;',
    ul: 'margin:3px 0 7px 18px;padding:0;',
    li: 'margin:0 0 2px 0;',
    p: 'margin:0 0 6px 0;'
  };
  const lines = s => (s || '').split('\n').map(x => x.trim()).filter(Boolean);
  const row = (l, r, lStyle) => `<table style="${S.table}"><tr><td style="${S.tdL}${lStyle || ''}">${l}</td><td style="${S.tdR}${lStyle || ''}">${r}</td></tr></table>`;

  function resumeHTML(m) {
    const contact = [m.location, m.phone, m.email, m.link].filter(Boolean).map(esc).join(' &nbsp;|&nbsp; ');
    let h = `<div style="${S.doc}"><p style="${S.name}">${esc(m.name || 'Your Name')}</p>${contact ? `<p style="${S.contact}">${contact}</p>` : ''}`;
    if (m.summary.trim()) h += `<p style="${S.h2}">${esc(m.summaryHeading || 'Summary')}</p><p style="${S.p}">${esc(m.summary)}</p>`;
    if (m.education.length) {
      h += `<p style="${S.h2}">Education</p>`;
      m.education.forEach(ed => {
        h += row(`<b>${esc(ed.school)}</b>`, esc(ed.location || ''));
        const sub = [ed.degree, ed.gpa ? `GPA: ${ed.gpa}` : ''].filter(Boolean).join(' &nbsp;|&nbsp; ');
        if (sub || ed.date) h += row(`<i>${sub}</i>`, esc(ed.date || ''));
        const det = lines(ed.details);
        h += det.length ? `<ul style="${S.ul}">${det.map(x => `<li style="${S.li}">${esc(x)}</li>`).join('')}</ul>` : '<div style="height:5px"></div>';
      });
    }
    if (m.experience.length) {
      h += `<p style="${S.h2}">Experience</p>`;
      m.experience.forEach(e => {
        h += row(`<b>${esc(e.title)}</b>${e.org ? `, ${esc(e.org)}` : ''}`, esc(dateRange(e)));
        if (e.location) h += row(`<i>${esc(e.location)}</i>`, '');
        const b = lines(e.bullets);
        h += b.length ? `<ul style="${S.ul}">${b.map(x => `<li style="${S.li}">${esc(x)}</li>`).join('')}</ul>` : '<div style="height:5px"></div>';
      });
    }
    m.extras.forEach(x => {
      const l = lines(x.lines);
      if (!l.length) return;
      h += `<p style="${S.h2}">${esc(x.heading || 'Additional')}</p><ul style="${S.ul}">${l.map(y => `<li style="${S.li}">${esc(y)}</li>`).join('')}</ul>`;
    });
    if (m.skills.trim()) h += `<p style="${S.h2}">Skills</p><p style="${S.p}">${esc(m.skills)}</p>`;
    return h + '</div>';
  }

  function resumeText(m) {
    const out = [m.name, [m.location, m.phone, m.email, m.link].filter(Boolean).join(' | '), ''];
    if (m.summary.trim()) out.push((m.summaryHeading || 'Summary').toUpperCase(), m.summary, '');
    if (m.education.length) { out.push('EDUCATION'); m.education.forEach(ed => { out.push([ed.school, ed.location, ed.date].filter(Boolean).join(' | ')); if (ed.degree || ed.gpa) out.push([ed.degree, ed.gpa ? 'GPA: ' + ed.gpa : ''].filter(Boolean).join(' | ')); lines(ed.details).forEach(x => out.push('• ' + x)); }); out.push(''); }
    if (m.experience.length) { out.push('EXPERIENCE'); m.experience.forEach(e => { out.push([[e.title, e.org].filter(Boolean).join(', '), e.location, dateRange(e)].filter(Boolean).join(' | ')); lines(e.bullets).forEach(x => out.push('• ' + x)); out.push(''); }); }
    m.extras.forEach(x => { if (lines(x.lines).length) { out.push((x.heading || 'Additional').toUpperCase()); lines(x.lines).forEach(y => out.push('• ' + y)); out.push(''); } });
    if (m.skills.trim()) out.push('SKILLS', m.skills);
    return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  const todayLong = () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  function coverHTML(a) {
    const r = a.resume || {};
    const contact = [r.location, r.phone, r.email].filter(Boolean).map(esc).join(' &nbsp;|&nbsp; ');
    const p = 'margin:0 0 12px 0;';
    let h = `<div style="${S.doc}font-size:11pt;line-height:1.5;">`;
    if (a.signName) h += `<p style="${S.name}font-size:16pt;">${esc(a.signName)}</p>`;
    if (contact) h += `<p style="${S.contact}border-bottom:1px solid #1a1a1a;padding-bottom:8px;margin-bottom:18px;">${contact}</p>`;
    h += `<p style="${p}">${todayLong()}</p>`;
    const to = [docs.job.manager, docs.job.company].filter(Boolean);
    if (to.length) h += `<p style="${p}">${to.map(esc).join('<br>')}</p>`;
    h += `<p style="${p}">${esc(a.greeting)}</p>`;
    a.paras.forEach(x => { h += `<p style="${p}">${esc(x)}</p>`; });
    h += `<p style="margin:18px 0 0 0;">Sincerely,<br>${esc(a.signName || 'Your Name')}</p></div>`;
    return h;
  }
  function coverText(a) {
    const r = a.resume || {};
    return [a.signName, [r.location, r.phone, r.email].filter(Boolean).join(' | '), '', todayLong(), '',
      ...[docs.job.manager, docs.job.company].filter(Boolean), '', a.greeting, '', ...a.paras.flatMap(x => [x, '']), 'Sincerely,', a.signName || '']
      .join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  function downloadWord(bodyHTML, filename) {
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${esc(filename)}</title><style>@page { size: 8.5in 11in; margin: 0.6in 0.7in; } body { margin: 0; }</style></head><body>${bodyHTML}</body></html>`;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename + '.doc';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  function printDocument(bodyHTML) {
    let area = document.getElementById('print-area');
    if (!area) { area = document.createElement('div'); area.id = 'print-area'; document.body.appendChild(area); }
    area.innerHTML = bodyHTML;
    document.body.classList.add('is-printing');
    const done = () => { document.body.classList.remove('is-printing'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    try { window.print(); } catch (e) { toast('Printing is blocked here. Use Download Word instead, then save as PDF from Word.'); }
    setTimeout(done, 60000);
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); toast('Copied. Paste it anywhere.'); }
    catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('Copied. Paste it anywhere.'); } catch (e2) { toast('Couldn\u2019t copy automatically — select the text and copy it.'); }
      ta.remove();
    }
  }
  /* ---------------- "Tell us, we'll write it" ---------------- */
  // Role types → common tasks. {n} = a number the student fills in, {t} = a short detail.
  const ROLE_KINDS = {
    retail: { label: 'Retail or sales', phrase: 'retail', tasks: [
      { id: 'serve', label: 'Helped customers find what they needed', text: 'Served {n}+ customers per shift, answering questions and helping them find products', plain: 'Served customers, answering questions and helping them find products', slot: 'Customers per shift' },
      { id: 'register', label: 'Worked the register', text: 'Processed purchases and returns on the register, handling ${n}+ in sales per shift', plain: 'Processed purchases and returns accurately on the register', slot: 'Sales per shift ($)' },
      { id: 'stock', label: 'Stocked shelves or set up displays', text: 'Restocked shelves and built displays across {n} departments to keep the floor shopping-ready', plain: 'Restocked shelves and built displays to keep the floor shopping-ready', slot: 'Departments' },
      { id: 'train', label: 'Trained new employees', text: 'Trained {n} new team members on the register and store policies', plain: 'Trained new team members on the register and store policies', slot: 'People trained' },
      { id: 'signup', label: 'Signed customers up for rewards or cards', text: 'Signed up {n} customers for the store loyalty program', plain: 'Signed customers up for the store loyalty program', slot: 'Sign-ups' }
    ] },
    food: { label: 'Restaurant or food service', phrase: 'food service', tasks: [
      { id: 'orders', label: 'Took orders and served customers', text: 'Took and served orders for {n}+ customers per shift in a fast-paced environment', plain: 'Took and served customer orders in a fast-paced environment', slot: 'Customers per shift' },
      { id: 'prep', label: 'Prepared food', text: 'Prepared food following safety and quality standards, averaging {n} orders per hour', plain: 'Prepared food following safety and quality standards', slot: 'Orders per hour' },
      { id: 'cash', label: 'Handled payments', text: 'Handled cash and card payments accurately, balancing the drawer at the end of each shift', plain: 'Handled cash and card payments accurately', slot: '' },
      { id: 'train', label: 'Trained new employees', text: 'Trained {n} new employees on food prep and customer service', plain: 'Trained new employees on food prep and customer service', slot: 'People trained' },
      { id: 'clean', label: 'Kept the kitchen or dining area clean', text: 'Kept the kitchen and dining area clean and organized to meet health standards', plain: 'Kept the kitchen and dining area clean and organized to meet health standards', slot: '' }
    ] },
    childcare: { label: 'Camp, babysitting, or childcare', phrase: 'childcare', tasks: [
      { id: 'supervise', label: 'Watched a group of kids', text: 'Supervised a group of {n} children, keeping them safe and engaged', plain: 'Supervised children, keeping them safe and engaged', slot: 'Kids in your group' },
      { id: 'activities', label: 'Planned or led activities', text: 'Planned and led {n}+ activities, games, and lessons each week', plain: 'Planned and led daily activities, games, and lessons', slot: 'Activities per week' },
      { id: 'parents', label: 'Talked with parents', text: "Updated parents on each child's day, needs, and progress", plain: "Updated parents on each child's day, needs, and progress", slot: '' },
      { id: 'conflict', label: 'Handled conflicts between kids', text: 'Resolved conflicts between children calmly and fairly', plain: 'Resolved conflicts between children calmly and fairly', slot: '' },
      { id: 'train', label: 'Trained new counselors or sitters', text: 'Trained {n} new counselors on routines and safety procedures', plain: 'Trained new counselors on routines and safety procedures', slot: 'People trained' }
    ] },
    tutoring: { label: 'Tutoring or teaching', phrase: 'tutoring', tasks: [
      { id: 'tutor', label: 'Tutored students', text: 'Tutored {n} students in {t}', plain: 'Tutored students in {t}', slot: 'Students', tslot: 'Subject (e.g., algebra)', tdefault: 'core subjects' },
      { id: 'plans', label: 'Made practice problems or study plans', text: 'Created practice problems and study plans tailored to each student', plain: 'Created practice problems and study plans tailored to each student', slot: '' },
      { id: 'grades', label: 'Helped students improve their grades', text: 'Helped {n} students raise their grades by at least one letter', plain: 'Helped students raise their grades and confidence', slot: 'Students who improved' },
      { id: 'report', label: 'Kept parents or teachers updated', text: 'Shared progress updates with parents and teachers', plain: 'Shared progress updates with parents and teachers', slot: '' }
    ] },
    office: { label: 'Office or front desk', phrase: 'office work', tasks: [
      { id: 'phones', label: 'Answered phones and emails', text: 'Answered and routed {n}+ phone calls and emails per day', plain: 'Answered and routed phone calls and emails', slot: 'Calls and emails per day' },
      { id: 'data', label: 'Entered or updated records', text: 'Entered and updated records in {t}', plain: 'Entered and updated records in {t}', slot: '', tslot: 'Software (e.g., Excel)', tdefault: 'spreadsheets' },
      { id: 'schedule', label: 'Scheduled appointments', text: 'Scheduled {n}+ appointments per week and kept calendars up to date', plain: 'Scheduled appointments and kept calendars up to date', slot: 'Appointments per week' },
      { id: 'files', label: 'Organized files or supplies', text: 'Organized files and supplies so the team could find what they needed faster', plain: 'Organized files and supplies so the team could find what they needed faster', slot: '' },
      { id: 'greet', label: 'Greeted visitors', text: 'Greeted {n}+ visitors per day and directed them to the right person', plain: 'Greeted visitors and directed them to the right person', slot: 'Visitors per day' }
    ] },
    volunteer: { label: 'Volunteering or community service', phrase: 'volunteering', tasks: [
      { id: 'hours', label: 'Volunteered regularly', text: 'Volunteered {n}+ hours supporting the organization\u2019s programs', plain: 'Volunteered regularly to support the organization\u2019s programs', slot: 'Total hours' },
      { id: 'event', label: 'Helped run an event', text: 'Co-organized an event that served {n}+ people', plain: 'Co-organized a community event', slot: 'People served' },
      { id: 'raise', label: 'Raised money', text: 'Raised ${n} through fundraising efforts', plain: 'Raised money through fundraising efforts', slot: 'Amount raised ($)' },
      { id: 'donations', label: 'Sorted or handed out donations', text: 'Sorted and distributed donations to {n}+ families in need', plain: 'Sorted and distributed donations to families in need', slot: 'Families' }
    ] },
    club: { label: 'Club, team leadership, or student government', phrase: 'leadership', tasks: [
      { id: 'lead', label: 'Led a group', text: 'Led a team of {n} members in planning meetings and projects', plain: 'Led members in planning meetings and projects', slot: 'Members' },
      { id: 'events', label: 'Organized events', text: 'Organized {n} events, handling planning, promotion, and logistics', plain: 'Organized events, handling planning, promotion, and logistics', slot: 'Events' },
      { id: 'grow', label: 'Grew membership', text: 'Grew membership by {n} members through outreach and events', plain: 'Grew membership through outreach and events', slot: 'New members' },
      { id: 'budget', label: 'Managed money or a budget', text: 'Managed a ${n} budget for activities and supplies', plain: 'Managed the budget for activities and supplies', slot: 'Budget ($)' },
      { id: 'compete', label: 'Represented the group at competitions', text: 'Represented the club at {n} competitions and school events', plain: 'Represented the club at competitions and school events', slot: 'Competitions' }
    ] },
    sports: { label: 'Sports or athletics', phrase: 'athletics', tasks: [
      { id: 'train', label: 'Trained regularly', text: 'Trained {n}+ hours per week while balancing a full course load', plain: 'Trained year-round while balancing a full course load', slot: 'Hours per week' },
      { id: 'captain', label: 'Was a captain or leader', text: 'Served as team captain, leading warm-ups and motivating {n} teammates', plain: 'Served as team captain, leading warm-ups and motivating teammates', slot: 'Teammates' },
      { id: 'compete', label: 'Competed in games or meets', text: 'Competed in {n}+ games or meets per season', plain: 'Competed in games and meets throughout the season', slot: 'Games per season' },
      { id: 'mentor', label: 'Mentored younger players', text: 'Mentored {n} younger players on skills and team expectations', plain: 'Mentored younger players on skills and team expectations', slot: 'Players' }
    ] },
    other: { label: 'Something else', phrase: '', tasks: [] }
  };
  const STRENGTHS = ['Customer service', 'Communication', 'Leadership', 'Organization', 'Working with numbers', 'Teaching others', 'Problem solving', 'Creativity', 'Technology'];

  const blankWriteExp = () => Object.assign(blankExp(), { kind: '', tasks: {}, story: '', proud: '' });
  const cleanNum = v => String(v || '').replace(/[^\d.,]/g, '').replace(/[.,]$/, '');
  const lowerFirst = s => (s && /^[A-Z][a-z]/.test(s)) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
  const joinList = arr => arr.length <= 1 ? (arr[0] || '') : arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];

  const CASUAL_VERBS = new Set(['rang', 'talked', 'dealt', 'took', 'made', 'watched', 'got', 'did', 'was', 'cleaned', 'closed', 'opened', 'set', 'put', 'went', 'kept', 'sold', 'washed', 'cooked', 'helped', 'worked', 'answered', 'ran', 'led', 'showed', 'taught', 'fixed', 'counted', 'folded', 'bagged', 'cashiered']);
  const CASUAL_FILLER = /^(?:i\s+|we\s+|basically\s+|just\s+|kinda\s+|kind of\s+|sort of\s+|like\s+|also\s+|mostly\s+|usually\s+|sometimes\s+|would\s+|used to\s+|really\s+|always\s+|then\s+)+/i;
  const CASUAL = [
    [/^rang (?:people|customers|them) up\b/i, 'Processed purchases for customers'],
    [/^rang up\b/i, 'Processed'],
    [/^talked (?:to|with)\b/i, 'Communicated with'],
    [/^dealt with\b/i, 'Handled'],
    [/^took care of\b/i, 'Cared for'],
    [/^made sure\b/i, 'Ensured'],
    [/^helped out(?: with)?\b/i, 'Supported'],
    [/^watched\s+(?=(?:the\s+|a\s+)?(?:kids|children|campers|toddlers))/i, 'Supervised '],
    [/^got promoted\b/i, 'Promoted'],
    [/^got (?=employee|an award|the award|recognized|named|voted)/i, 'Earned '],
    [/^was (?:named|chosen as|picked as|voted)\b/i, 'Selected as'],
    [/^did returns\b/i, 'Processed returns'],
    [/^did (?:the )?inventory\b/i, 'Completed inventory counts'],
    [/^cleaned up\b/i, 'Cleaned'],
    [/^answered (?:the )?phones?\b/i, 'Answered phone calls'],
    [/^closed (?:up )?the store\b/i, 'Closed the store'],
    [/^opened and closed\b/i, 'Opened and closed'],
    [/\bemployee of the (month|year|week)\b/gi, (m0, p1) => 'Employee of the ' + capFirst(p1.toLowerCase())],
    [/\b(january|february|march|april|june|july|august|september|october|november|december)\b/gi, (m0) => capFirst(m0.toLowerCase())],
    [/\bkids\b/gi, 'children'], [/\bstuff\b/gi, 'tasks'], [/\ba lot of\b/gi, 'many'], [/\blots of\b/gi, 'many'], [/\bgonna\b/gi, 'going to'], [/\bbc\b|\bcuz\b|\bcause\b/gi, 'because']
  ];
  function casualClause(s) {
    let t = s.trim().replace(CASUAL_FILLER, '');
    CASUAL.forEach(([re, rep]) => { t = t.replace(re, rep); });
    return t.replace(/\s{2,}/g, ' ').trim();
  }
  function splitCasual(text) {
    const chunks = String(text || '').replace(/\r/g, '').split(/\n+|(?<=[.!?])\s+|;\s*/).map(s => s.trim()).filter(Boolean);
    const out = [];
    chunks.forEach(chunk => {
      const pieces = chunk.split(/,\s*(?:and\s+)?|\s+and\s+/);
      const seps = chunk.match(/,\s*(?:and\s+)?|\s+and\s+/g) || [];
      let cur = pieces[0];
      for (let k = 1; k < pieces.length; k++) {
        const first = (pieces[k].trim().replace(CASUAL_FILLER, '').split(/\s+/)[0] || '').toLowerCase();
        if (VERB[first] || CASUAL_VERBS.has(first)) { out.push(cur); cur = pieces[k]; }
        else cur += seps[k - 1] + pieces[k];
      }
      out.push(cur);
    });
    return out.map(s => s.trim()).filter(s => words(s) >= 2);
  }
  function casualToBullet(text, current) {
    let t = casualClause(text);
    if (/^(employee|student|volunteer|player|athlete|member|camper|counselor) of the (month|year|week|season)/i.test(t) || (/(award|honor|recognition|scholarship)/i.test(t) && !VERB[(t.split(/\s+/)[0] || '').toLowerCase()])) t = 'Earned ' + lowerFirst(t);
    return polishLine(t, current).text;
  }

  function writtenBullets(e, current, change, ei, label) {
    const kind = ROLE_KINDS[e.kind];
    const out = [];
    if (kind) {
      kind.tasks.forEach(task => {
        const pick = e.tasks && e.tasks[task.id];
        if (!pick || !pick.on) return;
        const n = cleanNum(pick.n);
        const t = (pick.t || '').trim() || task.tdefault || '';
        let s = (n && task.text.includes('{n}')) ? task.text.replace('{n}', n) : task.plain;
        s = s.replace('{t}', t).replace(/\$\$/g, '$');
        out.push(polishLine(s, current).text);
      });
    }
    const keyWords = x => (x.toLowerCase().match(/[a-z]{4,}/g) || []).map(w => w.replace(/(ing|ed|es|s)$/, ''));
    splitCasual(e.story).forEach((clause, k) => {
      const b = casualToBullet(clause, current);
      const have = new Set(out.flatMap(keyWords));
      const mine = keyWords(b);
      if (out.length && mine.length && mine.every(w => have.has(w))) {
        const kept = change(`w${ei}s${k}`, label, clause, '', 'Already covered by another bullet, so we left it out');
        if (kept) out.push(kept);
        return;
      }
      out.push(change(`w${ei}s${k}`, label, clause, b, 'Turned your words into a resume bullet'));
    });
    if ((e.proud || '').trim()) {
      const b = casualToBullet(e.proud, false); // achievements already happened: past tense
      out.push(change(`w${ei}p`, label, e.proud.trim(), b, 'Turned your words into a resume bullet'));
    }
    return out;
  }

  function eduLevel(m) {
    const eds = (m && m.education) || [];
    const college = eds.find(ed => /(university|college|institute)/i.test(ed.school));
    const any = college || eds.find(ed => ed.school);
    const major = any && (any.degree || '').match(/\bin\s+([A-Z][A-Za-z &]+)/);
    const level = college ? 'College student' : eds.some(ed => /high school|academy|\bhs\b/i.test(ed.school)) ? 'High school student' : 'Student';
    return major ? `${major[1].trim()} student` : level;
  }

  function writtenSummary(m, job) {
    const kinds = [...new Set(m.experience.map(e => ROLE_KINDS[e.kind] && ROLE_KINDS[e.kind].phrase).filter(Boolean))];
    const titles = m.experience.map(e => (e.title || '').trim().toLowerCase()).filter(Boolean);
    const skills = (m.skills || '').split(/[,;\n]/).map(s => s.trim()).filter(s => s && !FILLER_SKILLS.test(s)).map(normSkill).slice(0, 2);
    const exp = kinds.length ? kinds.slice(0, 3) : titles.slice(0, 2);
    let s = eduLevel(m);
    if (exp.length) s += ` with experience in ${joinList(exp)}`;
    if (skills.length) s += `${exp.length ? ',' : ''} skilled in ${joinList(skills)}`;
    s += '.';
    if (job.title && job.title.trim()) s += ` Looking to bring that experience to a ${job.title.trim()} role${job.company && job.company.trim() ? ` at ${job.company.trim()}` : ''}.`;
    return s;
  }

  function writtenCoverBody(c) {
    const w = c.write || {};
    const job = docs.job, r = docs.resume.model;
    const role = job.title.trim(), company = job.company.trim();
    const strengths = (w.strengths || []).map(s => s.toLowerCase());
    const titles = r ? [...new Set(r.experience.map(e => (e.title || '').trim().toLowerCase()).filter(Boolean))].slice(0, 2) : [];
    const who = r ? eduLevel(r).toLowerCase() : 'student';
    const article = /^[aeiou]/i.test(who) ? 'an' : 'a';
    const p1 = `I'm excited to apply for the ${role || 'open'} position${company ? ` at ${company}` : ''}. As ${article} ${who}${titles.length ? ` with experience as ${titles.map(t => (/^[aeiou]/.test(t) ? 'an ' : 'a ') + t).join(' and ')}` : ''}, I'm ready to bring ${strengths.length ? joinList(strengths) : 'energy and a willingness to learn'} to your team.`;
    let p2 = (w.example || '').trim();
    if (!p2 && r) {
      const picks = [];
      r.experience.forEach(e => {
        const lines = e.kind !== undefined ? writtenBullets(e, false, (i, l, b, a) => a, 0, '') : (e.bullets || '').split('\n').map(x => polishLine(x, false).text);
        lines.filter(x => /\d/.test(x)).forEach(x => { if (picks.length < 2) picks.push({ org: e.org, text: x }); });
      });
      if (picks.length) {
        const org = picks[0].org ? `At ${picks[0].org}, ` : 'In my recent role, ';
        p2 = `${org}I ${lowerFirst(picks[0].text)}${picks[1] ? `. I also ${lowerFirst(picks[1].text)}` : ''}. That experience taught me to stay organized and reliable when things get busy.`;
      }
    }
    const p3 = (w.why || '').trim();
    const p4 = `Thank you for considering my application. I would welcome the chance to discuss how I can contribute to ${company || 'your team'}.`;
    return [p1, p2, p3, p4].filter(Boolean).join('\n\n');
  }

  /* ---------------- Resume & cover letter: screens ---------------- */
  const RESUME_STEPS = ['Contact', 'Experience', 'Education', 'Skills & more', 'Target job'];
  const coverSteps = c => c.source === 'build' ? ['Target job', 'Opening', 'Why you', 'Why them', 'Closing']
    : c.source === 'write' ? ['Target job', 'About you', 'Why them'] : ['Target job', 'Your letter'];
  const docLabel = tab => tab === 'resume' ? 'resume' : 'cover letter';
  let lastAnalysis = {};

  function renderDocs() {
    const tab = docs.tab, d = docs[tab];
    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">Your materials</p>
        <h1>Resume &amp; cover letter</h1>
        <p class="page-sub">Build from scratch, paste, or upload what you have. We fix what we can, flag what only you can fix, and give you a polished version to download.</p>
      </div>
      <div class="tabs" role="tablist">
        ${[['resume', 'Resume'], ['cover', 'Cover letter']].map(([id, l]) => `<button class="tab ${tab === id ? 'is-active' : ''}" role="tab" aria-selected="${tab === id}" data-doc="tab" data-id="${id}">${l}</button>`).join('')}
      </div>
      <div id="doc-body">${docBody(tab, d)}</div>`;
    if (d.stage === 'upload') wireUpload(tab);
  }

  function docBody(tab, d) {
    if (d.stage === 'paste') return docPaste(tab);
    if (d.stage === 'upload') return docUpload(tab);
    if (d.stage === 'edit' && docExists(tab)) return docEdit(tab, d);
    if (d.stage === 'review' && docExists(tab)) return docReview(tab, d);
    return docStart(tab, d);
  }
  const docExists = tab => tab === 'resume' ? Boolean(docs.resume.model) : Boolean(docs.cover.source);

  function docStart(tab, d) {
    const has = docExists(tab);
    let saved = '';
    if (has) {
      const summary = tab === 'resume'
        ? `${docs.resume.model.experience.length} experience${docs.resume.model.experience.length === 1 ? '' : 's'}, ${docs.resume.model.education.length} school${docs.resume.model.education.length === 1 ? '' : 's'}`
        : `${words(coverBody(docs.cover))} words`;
      saved = `
        <div class="card doc-saved">
          <div><p class="card-label">Saved on this device</p><h3 class="settings-title">Your ${docLabel(tab)}</h3><p class="hint">${summary}${docs.job.company ? ` · Targeting ${esc(docs.job.title || 'a role')} at ${esc(docs.job.company)}` : ''}</p></div>
          <div class="btn-row"><button class="btn btn-ghost btn-small" data-doc="edit">Keep editing</button><button class="btn btn-primary btn-small" data-doc="review">Review &amp; polish</button></div>
        </div>
        <h2 class="block-title doc-or">Or start a new one</h2>`;
    }
    const opt = (id, title, text) => `<button class="start-opt" data-doc="begin" data-id="${id}"><span class="start-title">${title}</span><span class="start-text">${text}</span></button>`;
    return saved + `
      <div class="start-grid">
        ${opt('build', 'Build it step by step', tab === 'resume' ? 'Write each section yourself with examples to guide you. We polish it at the end.' : 'Write each part with prompts and examples. We polish it at the end.')}
        ${opt('write', tab === 'resume' ? 'Tell us, we\u2019ll write it' : 'Write it for me', tab === 'resume' ? 'Answer simple questions about what you\u2019ve done. We turn your answers into a finished resume.' : 'Answer two quick questions. We draft the letter from your answers and your resume.')}
        ${opt('paste', 'Paste it in', tab === 'resume' ? 'Already have one? Paste the text and we sort it into sections.' : 'Already have a draft? Paste it and we polish it.')}
        ${opt('upload', 'Upload a file', 'PDF, Word (.docx), or a text file.')}
      </div>`;
  }

  function docPaste(tab) {
    return `
      <div class="card">
        <label class="field-label" for="paste-text">Paste your ${docLabel(tab)}</label>
        <textarea class="input paste-box" id="paste-text" rows="16" placeholder="Paste the full text here — formatting doesn't need to be perfect."></textarea>
        <p class="form-error" role="alert"></p>
        <div class="modal-foot">
          <button class="text-btn" data-doc="to-start">Back</button>
          <button class="btn btn-primary" data-doc="paste-go">${tab === 'resume' ? 'Read my resume' : 'Read my letter'}</button>
        </div>
      </div>`;
  }

  function docUpload(tab) {
    return `
      <div class="card">
        <label class="dropzone" for="doc-file" id="dropzone">
          <span class="drop-title">Choose a file</span>
          <span class="hint">or drag it here · PDF, Word (.docx), or .txt · up to 10 MB</span>
        </label>
        <input type="file" id="doc-file" class="sr-only" accept=".pdf,.docx,.doc,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain">
        <p class="upload-status" id="upload-status" aria-live="polite"></p>
        <p class="form-error" role="alert"></p>
        <div class="modal-foot"><button class="text-btn" data-doc="to-start">Back</button><span></span></div>
      </div>`;
  }

  function wireUpload(tab) {
    const input = $('#doc-file'), zone = $('#dropzone'), status = $('#upload-status');
    const handle = async file => {
      if (!file) return;
      clearFormError();
      status.textContent = `Reading ${file.name}…`;
      zone.classList.add('is-busy-zone');
      try {
        const text = await readFileText(file);
        importText(tab, text, 'upload');
      } catch (err) {
        status.textContent = '';
        showFormError(err && err.ui ? err.message : 'We couldn\u2019t read that file. Try a different format, or paste the text instead.');
      } finally { zone.classList.remove('is-busy-zone'); }
    };
    input.addEventListener('change', () => handle(input.files[0]));
    ['dragenter', 'dragover'].forEach(ev => zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.add('is-over'); }));
    ['dragleave', 'drop'].forEach(ev => zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.remove('is-over'); }));
    zone.addEventListener('drop', e => handle(e.dataTransfer && e.dataTransfer.files[0]));
  }

  function importText(tab, text, source) {
    if (!String(text || '').trim()) throw uiErr('There\u2019s no text to read.');
    if (tab === 'resume') {
      const m = parseResumeText(text);
      docs.resume = Object.assign(docs.resume, { model: m, source, stage: 'edit', step: 0, notice: true });
    } else {
      docs.cover = Object.assign(docs.cover, { body: parseCoverText(text), source, stage: 'edit', step: 0, notice: true });
    }
    docs.prefs = { rejected: [], remove: {} };
    saveDocs();
    renderDocs();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ---------------- Builder ---------------- */
  const fld = (label, path, opts = {}) => {
    const val = getPath(docs, path);
    const id = 'f-' + path.replace(/\./g, '-');
    const control = opts.area
      ? `<textarea class="input" id="${id}" data-bind="${path}" rows="${opts.rows || 4}" placeholder="${esc(opts.ph || '')}">${esc(val || '')}</textarea>`
      : `<input class="input" id="${id}" data-bind="${path}" value="${esc(val || '')}" placeholder="${esc(opts.ph || '')}" ${opts.type ? `type="${opts.type}"` : ''} ${opts.disabled ? 'disabled' : ''} ${opts.auto ? `autocomplete="${opts.auto}"` : ''}>`;
    return `<div class="f ${opts.wide ? 'f-wide' : ''}"><label class="field-label" for="${id}">${label}${opts.optional ? ' <span class="opt">optional</span>' : ''}</label>${control}${opts.help ? `<p class="hint f-help">${opts.help}</p>` : ''}</div>`;
  };

  function docEdit(tab, d) {
    const steps = tab === 'resume' ? RESUME_STEPS : coverSteps(d);
    const s = Math.min(d.step, steps.length - 1);
    const last = s === steps.length - 1;
    return `
      <button class="back-link" data-doc="to-start">&larr; Start options</button>
      ${d.notice ? `<div class="notice doc-notice"><span>${tab === 'resume' ? 'We sorted your resume into sections. Check each step to make sure everything landed in the right place, then review.' : 'We read your letter. Add the job details, check the text, then review.'}</span><button class="text-btn" data-doc="dismiss">Got it</button></div>` : ''}
      <ol class="stepper">
        ${steps.map((l, i) => `<li><button class="step ${i === s ? 'is-current' : ''} ${i < s ? 'is-done' : ''}" data-doc="step" data-id="${i}" ${i === s ? 'aria-current="step"' : ''}><span class="step-n">${i + 1}</span><span>${l}</span></button></li>`).join('')}
      </ol>
      <div class="card doc-form">${tab === 'resume' ? resumeStep(s) : coverStep(d, s)}</div>
      <div class="submit-bar">
        <button class="btn btn-ghost" data-doc="prev" ${s === 0 ? 'disabled' : ''}>Back</button>
        <div class="btn-row">
          ${!last ? '<button class="text-btn" data-doc="review">Skip to review</button>' : ''}
          <button class="btn btn-primary" data-doc="${last ? 'review' : 'next'}">${last ? 'Review &amp; polish' : 'Next: ' + steps[s + 1]}</button>
        </div>
      </div>`;
  }

  function resumeStep(s) {
    const m = docs.resume.model;
    if (s === 0) return `
      <h2 class="form-title">Contact</h2>
      <div class="f-grid">
        ${fld('Full name', 'resume.model.name', { auto: 'name' })}
        ${fld('Email', 'resume.model.email', { type: 'email', auto: 'email' })}
        ${fld('Phone', 'resume.model.phone', { type: 'tel', auto: 'tel' })}
        ${fld('City and state', 'resume.model.location', { ph: 'Columbus, OH', help: 'City and state only — never your street address.' })}
        ${fld('LinkedIn or portfolio', 'resume.model.link', { optional: true, ph: 'linkedin.com/in/yourname', wide: true })}
        ${fld('Summary', 'resume.model.summary', { optional: true, area: true, rows: 3, wide: true, ph: 'Student with two years of customer service experience and strong spreadsheet skills, looking for an entry-level office role.', help: 'Two lines: who you are, your strongest skill, and what you want to do next.' })}
      </div>`;
    if (s === 1 && docs.resume.source === 'write') return `
      <h2 class="form-title">Experience</h2>
      <p class="page-sub form-sub">Tell us about each job, club, team, or volunteer role. Check what you did and we\u2019ll write the bullet points.</p>
      ${m.experience.map((e, i) => writeEntry(e, i)).join('')}
      <button class="btn btn-ghost btn-small" data-doc="add" data-id="experience">${m.experience.length ? 'Add another experience' : 'Add an experience'}</button>`;
    if (s === 1) return `
      <h2 class="form-title">Experience</h2>
      <p class="page-sub form-sub">Jobs, internships, volunteering, clubs, and school projects all count. Most recent first.</p>
      ${m.experience.map((e, i) => `
        <div class="entry">
          <div class="entry-head"><strong>${esc(e.title || 'New experience')}</strong><button class="text-btn text-btn-muted" data-doc="remove" data-id="experience.${i}">Remove</button></div>
          <div class="f-grid">
            ${fld('Job title or role', `resume.model.experience.${i}.title`, { ph: 'Sales Associate' })}
            ${fld('Company or organization', `resume.model.experience.${i}.org`, { ph: 'Target' })}
            ${fld('Location', `resume.model.experience.${i}.location`, { optional: true, ph: 'Columbus, OH' })}
            <div class="f f-dates">
              ${fld('Start', `resume.model.experience.${i}.start`, { ph: 'Jun 2024' })}
              ${fld('End', `resume.model.experience.${i}.end`, { ph: e.current ? 'Present' : 'Aug 2025', disabled: e.current })}
            </div>
            <label class="check f-wide"><input type="checkbox" data-bind="resume.model.experience.${i}.current" ${e.current ? 'checked' : ''}> I currently work here</label>
            ${fld('What you did — one bullet per line', `resume.model.experience.${i}.bullets`, { area: true, rows: 5, wide: true,
              ph: 'Served 80+ customers per shift at a busy checkout lane\nTrained 3 new cashiers on the register and return policy\nReorganized the stockroom, cutting restock time by 20 minutes',
              help: 'Start each line with an action verb, then say what happened because of it. Numbers make it real.' })}
          </div>
        </div>`).join('')}
      <button class="btn btn-ghost btn-small" data-doc="add" data-id="experience">${m.experience.length ? 'Add another experience' : 'Add an experience'}</button>`;
    if (s === 2) return `
      <h2 class="form-title">Education</h2>
      ${m.education.map((e, i) => `
        <div class="entry">
          <div class="entry-head"><strong>${esc(e.school || 'New school')}</strong><button class="text-btn text-btn-muted" data-doc="remove" data-id="education.${i}">Remove</button></div>
          <div class="f-grid">
            ${fld('School', `resume.model.education.${i}.school`, { ph: 'Lincoln High School' })}
            ${fld('Degree or program', `resume.model.education.${i}.degree`, { optional: true, ph: 'High School Diploma' })}
            ${fld('Graduation date', `resume.model.education.${i}.date`, { ph: 'Expected Jun 2027' })}
            ${fld('GPA', `resume.model.education.${i}.gpa`, { optional: true, ph: '3.9', help: 'Include it if it\u2019s 3.0 or higher.' })}
            ${fld('Location', `resume.model.education.${i}.location`, { optional: true, ph: 'Denver, CO' })}
            ${fld('Honors, awards, or relevant courses — one per line', `resume.model.education.${i}.details`, { optional: true, area: true, rows: 3, wide: true, ph: 'Honor Roll, 4 semesters\nRelevant coursework: Algebra II, Intro to Business' })}
          </div>
        </div>`).join('')}
      <button class="btn btn-ghost btn-small" data-doc="add" data-id="education">${m.education.length ? 'Add another school' : 'Add a school'}</button>`;
    if (s === 3) return `
      <h2 class="form-title">Skills &amp; more</h2>
      <div class="f-grid">
        ${fld('Skills — separate with commas', 'resume.model.skills', { area: true, rows: 3, wide: true, ph: 'Excel (VLOOKUP, pivot tables), PowerPoint, Spanish (conversational), customer service', help: 'Tools, software, languages, and certifications. Skip basics like "email."' })}
      </div>
      <h3 class="sub-title">Other sections</h3>
      <p class="page-sub form-sub">Activities, leadership, awards, certifications, projects.</p>
      ${m.extras.map((x, i) => `
        <div class="entry">
          <div class="entry-head"><strong>${esc(x.heading || 'New section')}</strong><button class="text-btn text-btn-muted" data-doc="remove" data-id="extras.${i}">Remove</button></div>
          <div class="f-grid">
            ${fld('Section name', `resume.model.extras.${i}.heading`, { ph: 'Leadership & Activities', wide: true })}
            ${fld('Items — one per line', `resume.model.extras.${i}.lines`, { area: true, rows: 4, wide: true, ph: 'Key Club — Service Project Lead, 2025\nJunior varsity soccer, 2 years' })}
          </div>
        </div>`).join('')}
      <button class="btn btn-ghost btn-small" data-doc="add" data-id="extras">Add a section</button>`;
    return jobStep('resume');
  }

  function writeEntry(e, i) {
    const kind = ROLE_KINDS[e.kind];
    const base = `resume.model.experience.${i}`;
    const tasks = kind && kind.tasks.length ? `
      <fieldset class="tasks">
        <legend class="field-label">What did you do? Check everything that applies.</legend>
        ${kind.tasks.map(t => {
          const pk = (e.tasks || {})[t.id] || {};
          return `
            <div class="task-row ${pk.on ? 'is-on' : ''}">
              <label class="check"><input type="checkbox" data-bind="${base}.tasks.${t.id}.on" ${pk.on ? 'checked' : ''}> ${esc(t.label)}</label>
              ${pk.on && (t.slot || t.tslot) ? `<div class="task-slots">
                ${t.slot ? `<label class="slot-label">${esc(t.slot)}<input class="input slot" inputmode="decimal" data-bind="${base}.tasks.${t.id}.n" value="${esc(pk.n || '')}" placeholder="e.g. ${/\$/.test(t.slot) ? '500' : '10'}"></label>` : ''}
                ${t.tslot ? `<label class="slot-label">${esc(t.tslot.replace(/\s*\(.*\)$/, ''))}<input class="input slot" data-bind="${base}.tasks.${t.id}.t" value="${esc(pk.t || '')}" placeholder="${esc((t.tslot.match(/\((.*)\)/) || ['', ''])[1])}"></label>` : ''}
              </div>` : ''}
            </div>`;
        }).join('')}
        <p class="hint">Numbers are optional but make your resume much stronger. Honest estimates are fine.</p>
      </fieldset>` : '';
    return `
      <div class="entry" data-entry="${i}">
        <div class="entry-head"><strong>${esc(e.title || 'New experience')}</strong><button class="text-btn text-btn-muted" data-doc="remove" data-id="experience.${i}">Remove</button></div>
        <div class="f-grid">
          ${fld('Your title or role', `${base}.title`, { ph: 'Sales Associate' })}
          ${fld('Where', `${base}.org`, { ph: 'Target' })}
          <div class="f f-dates">
            ${fld('Start', `${base}.start`, { ph: 'Jun 2024' })}
            ${fld('End', `${base}.end`, { ph: e.current ? 'Present' : 'Aug 2025', disabled: e.current })}
          </div>
          ${fld('Location', `${base}.location`, { optional: true, ph: 'Columbus, OH' })}
          <label class="check f-wide"><input type="checkbox" data-bind="${base}.current" ${e.current ? 'checked' : ''}> I still do this</label>
          <div class="f f-wide">
            <label class="field-label" for="f-kind-${i}">What kind of role was it?</label>
            <select class="input" id="f-kind-${i}" data-bind="${base}.kind">
              <option value="">Choose one</option>
              ${Object.entries(ROLE_KINDS).map(([k, v]) => `<option value="${k}" ${e.kind === k ? 'selected' : ''}>${esc(v.label)}</option>`).join('')}
            </select>
          </div>
        </div>
        ${tasks}
        <div class="f-grid">
          ${fld(kind && kind.tasks.length ? 'Anything else you did? Say it however you\u2019d say it.' : 'What did you do? Say it however you\u2019d say it.', `${base}.story`, { optional: Boolean(kind && kind.tasks.length), area: true, rows: 3, wide: true, ph: 'i rang people up, did returns, and closed the store on weekends' })}
          ${fld('Anything you\u2019re proud of?', `${base}.proud`, { optional: true, wide: true, ph: 'Got promoted to shift lead after 6 months' })}
        </div>
        <div class="bullet-preview" id="bp-${i}">${bulletPreview(e)}</div>
      </div>`;
  }

  function bulletPreview(e) {
    const current = Boolean(e.current) || /present|current|now/i.test(e.end || '');
    const lines = writtenBullets(e, current, (id, w, before, after) => after, 0, '');
    return `<p class="deliver-title">Your bullet points</p>${lines.length
      ? `<ul>${lines.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`
      : '<p class="hint">Pick a role type and check what you did — your bullet points appear here as you go.</p>'}`;
  }
  function updateBulletPreview(i) {
    const el = $('#bp-' + i);
    const e = docs.resume.model && docs.resume.model.experience[i];
    if (el && e && e.kind !== undefined) el.innerHTML = bulletPreview(e);
  }

  function jobStep(tab) {
    const none = docs.job.mode === 'none';
    const pill = (id, label, on) => `<button type="button" class="pill ${on ? 'is-on' : ''}" aria-pressed="${on}" data-doc="jobmode" data-id="${id}">${label}</button>`;
    const basics = `
        ${fld('Job title', 'job.title', { optional: none, ph: 'Marketing Assistant' })}
        ${fld('Company', 'job.company', { optional: none, ph: 'Brightline Co.' })}
        ${tab === 'cover' ? fld('Hiring manager\u2019s name', 'job.manager', { optional: true, ph: 'Ms. Jordan Lee', help: 'Check the posting or LinkedIn. If you can\u2019t find it, we\u2019ll use "Dear Hiring Manager."' }) : ''}`;
    return `
      <h2 class="form-title">Target job</h2>
      <p class="page-sub form-sub">Are you applying to a specific job? Tailoring to a real posting helps, but it\u2019s optional.</p>
      <div class="pill-row job-mode" role="group" aria-label="Job posting">
        ${pill('posting', 'I have a job posting', !none)}
        ${pill('none', 'No specific job', none)}
      </div>
      ${none
        ? (tab === 'resume'
          ? '<p class="notice">We\u2019ll polish it as a general resume you can send anywhere. You can add a posting any time.</p>'
          : `<p class="notice">No posting? No problem. Add the role and company if you know them — it makes the letter much stronger.</p><div class="f-grid">${basics}</div>`)
        : `<p class="page-sub form-sub">Paste a real posting you found. We check which of its keywords you\u2019re missing${tab === 'cover' ? ' and personalize your opening and closing' : ''}. This is shared between your resume and cover letter.</p>
           <div class="f-grid">${basics}
             ${fld('Job posting', 'job.posting', { area: true, rows: 10, wide: true, ph: 'Paste the full job description — responsibilities and qualifications.' })}
           </div>`}`;
  }

  function coverStep(c, s) {
    if (s === 0) return jobStep('cover');
    if (c.source === 'write' && s === 1) {
      const picks = c.write.strengths;
      const hasResume = Boolean(docs.resume.model && docs.resume.model.experience.length);
      return `
        <h2 class="form-title">About you</h2>
        <p class="page-sub form-sub">Pick up to two strengths you want the letter to highlight.</p>
        <div class="pill-row" role="group" aria-label="Strengths">
          ${STRENGTHS.map(x => `<button type="button" class="pill ${picks.includes(x) ? 'is-on' : ''}" aria-pressed="${picks.includes(x)}" data-doc="strength" data-id="${esc(x)}">${esc(x)}</button>`).join('')}
        </div>
        <div class="f-grid">
          ${fld('Your best example', 'cover.write.example', { optional: hasResume, area: true, rows: 5, wide: true,
            ph: 'At Target, I trained three new cashiers and signed up more loyalty members than anyone else on my team in my first month.',
            help: hasResume ? 'Leave this blank and we\u2019ll pull your strongest numbered bullet points from your resume.' : 'One story: what you did, and what happened because of it. Include a number if you can.' })}
        </div>`;
    }
    if (c.source === 'write' && s === 2) return `
      <h2 class="form-title">Why them</h2>
      <p class="page-sub form-sub">What draws you to ${docs.job.company ? esc(docs.job.company) : 'this company'}? Something specific beats something general.</p>
      <div class="f-grid">${fld('Why this company', 'cover.write.why', { area: true, rows: 4, wide: true, ph: `${docs.job.company || 'Brightline'}\u2019s focus on customer experience matches how I like to work — I spent two years helping shoppers at a busy store.` })}</div>
      <div class="example"><p class="deliver-title">Example</p><p>Brightline\u2019s focus on small local businesses stood out to me. My family runs a small shop, and I\u2019ve seen firsthand how much the right partner matters.</p></div>`;
    if (c.source !== 'build') return `
      <h2 class="form-title">Your letter</h2>
      <div class="f-grid">
        ${fld('Letter text — leave a blank line between paragraphs', 'cover.body', { area: true, rows: 18, wide: true })}
      </div>`;
    const prompts = [
      null,
      ['Opening', 'cover.guided.opening', 'Which role are you applying for, and why does it excite you? One or two sentences.',
        "I'm excited to apply for the Sales Coordinator role at Brightline. After two years helping customers find the right products, I'm ready to support a sales team at a bigger scale."],
      ['Why you', 'cover.guided.why', 'Your strongest example. What did you do, and what happened because of it? Include a number if you can.',
        'At Target, I served 80+ customers a shift and trained three new cashiers. When our store launched a loyalty program, I signed up more members than anyone on my team in the first month.'],
      ['Why them', 'cover.guided.company', 'What specifically draws you to this company? A product, a value, or something you read about them.',
        "Brightline's focus on small local businesses stood out to me. My family runs a small shop, and I've seen firsthand how much the right partner matters."],
      ['Closing', 'cover.guided.closing', 'Restate your interest and invite a conversation.',
        'I would love to bring that same energy to your team. Thank you for your time, and I look forward to speaking with you.']
    ][s];
    return `
      <h2 class="form-title">${prompts[0]}</h2>
      <p class="page-sub form-sub">${prompts[2]}</p>
      <div class="f-grid">${fld(prompts[0], prompts[1], { area: true, rows: 6, wide: true, ph: prompts[3] })}</div>
      <div class="example"><p class="deliver-title">Example</p><p>${esc(prompts[3])}</p></div>`;
  }

  /* ---------------- Review ---------------- */
  function docReview(tab, d) {
    const job = docs.job.mode === 'none' ? Object.assign({}, docs.job, { posting: '' }) : docs.job;
    const a = tab === 'resume'
      ? analyzeResume(docs.resume.model, job, docs.prefs)
      : analyzeCover(docs.cover, job, docs.resume.model, docs.prefs);
    lastAnalysis[tab] = a;
    const applied = a.changes.filter(c => !c.rejected).length;
    const steps = tab === 'resume' ? RESUME_STEPS : coverSteps(docs.cover);
    const kw = a.keywords;
    const doc = tab === 'resume' ? resumeHTML(a.model) : coverHTML(a);

    const todoHtml = a.todos.length ? a.todos.map(t => `
      <li>
        <p class="rv-title">${esc(t.text)}</p>
        ${t.detail ? `<p class="rv-detail">${esc(t.detail)}</p>` : ''}
        ${t.list ? `<ul class="rv-list">${t.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${t.step != null ? `<button class="text-btn" data-doc="goto" data-id="${t.step}">Fix in ${esc(steps[Math.min(t.step, steps.length - 1)])}</button>` : ''}
      </li>`).join('') : '<li class="rv-empty">Nothing left for you to add. Nice.</li>';

    const changeHtml = a.changes.length ? a.changes.map(c => `
      <li class="${c.rejected ? 'is-rejected' : ''}">
        <p class="rv-where">${esc(c.where)}</p>
        ${c.before ? `<p class="rv-before"><span class="sr-only">Before: </span>${esc(c.before)}</p>` : ''}
        <p class="rv-after"><span class="sr-only">After: </span>${!c.before ? '<strong>Added: </strong>' + esc(c.after) : c.after ? esc(c.after) : '<em>Left out</em>'}</p>
        ${c.why ? `<p class="rv-why">${esc(c.why)}</p>` : ''}
        <button class="text-btn" data-doc="reject" data-id="${esc(c.id)}">${c.rejected ? 'Use this fix' : 'Keep my original'}</button>
      </li>`).join('') : '<li class="rv-empty">No automatic fixes needed.</li>';

    const cutHtml = a.cuts.map(c => {
      const on = c.key in docs.prefs.remove ? docs.prefs.remove[c.key] : c.def;
      return `<li><label class="check"><input type="checkbox" data-doc="cut" data-id="${esc(c.key)}" ${on ? 'checked' : ''}><span><strong>${esc(c.label)}</strong><span class="rv-detail">${esc(c.why)}</span></span></label></li>`;
    }).join('');

    const kwHtml = kw ? `
      <p class="rv-detail">Hiring software and recruiters scan for words from the posting. Only add ones that are true for you.</p>
      <div class="chips">
        ${kw.matched.map(k => `<span class="chip chip-hit">${esc(kwLabel(k))}</span>`).join('')}
        ${kw.missing.map(k => tab === 'resume' && KNOWN_SKILLS.includes(k)
          ? `<button class="chip chip-miss" data-doc="add-skill" data-id="${esc(k)}" title="Add to your skills">+ ${esc(kwLabel(k))}</button>`
          : `<span class="chip chip-miss">${esc(kwLabel(k))}</span>`).join('')}
      </div>
      ${kw.missing.length ? `<p class="hint">${tab === 'resume' ? 'Click a skill to add it to your skills section — only if you really have it. For the rest, work them into your bullets where they\u2019re true.' : 'Work a few of the missing ones into your letter where they\u2019re true for you.'}</p>` : ''}`
      : `<p class="rv-detail">${docs.job.mode === 'none' ? 'You chose no specific job, so this is a general version you can send anywhere.' : 'Paste a job posting to see which keywords you\u2019re matching.'}</p><button class="text-btn" data-doc="goto" data-id="${tab === 'resume' ? 4 : 0}">${docs.job.mode === 'none' ? 'Tailor it to a job posting' : 'Add a job posting'}</button>`;

    return `
      <button class="back-link" data-doc="to-start">&larr; Start options</button>
      <div class="review-stats">
        <div><strong>${applied}</strong><span>fixes made for you</span></div>
        <div><strong>${a.todos.length}</strong><span>${a.todos.length === 1 ? 'thing' : 'things'} only you can add</span></div>
        <div><strong>${kw ? `${kw.matched.length}/${kw.list.length}` : '—'}</strong><span>${kw ? 'job keywords matched' : docs.job.mode === 'none' ? 'general version (no job posting)' : 'no job posting yet'}</span></div>
      </div>
      <div class="review-grid">
        <section class="review-doc" aria-label="Polished ${docLabel(tab)}">
          <div class="doc-actions">
            <button class="btn btn-primary btn-small" data-doc="dl-word">Download Word</button>
            <button class="btn btn-ghost btn-small" data-doc="dl-pdf">Save as PDF</button>
            <button class="btn btn-ghost btn-small" data-doc="copy">Copy text</button>
            <button class="text-btn" data-doc="edit">Edit</button>
          </div>
          <div class="paper">${doc}</div>
        </section>
        <div class="review-side">
          <section class="rv-panel rv-todo"><h2>Only you can add</h2><ul class="rv-items">${todoHtml}</ul></section>
          ${a.cuts.length ? `<section class="rv-panel"><h2>Might not belong</h2><p class="rv-detail">Checked items are left out of your polished version.</p><ul class="rv-items rv-cuts">${cutHtml}</ul></section>` : ''}
          <section class="rv-panel"><h2>Job posting match</h2>${kwHtml}</section>
          <section class="rv-panel"><h2>What we fixed</h2><ul class="rv-items rv-changes">${changeHtml}</ul></section>
        </div>
      </div>`;
  }

  /* ---------------- Resume & cover letter: actions ---------------- */
  const keepScroll = fn => { const y = window.scrollY; fn(); window.scrollTo({ top: y, behavior: 'instant' }); };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-doc]');
    if (!el || el.dataset.doc === 'cut') return;
    const tab = docs.tab, d = docs[tab];
    const id = el.dataset.id;
    const steps = tab === 'resume' ? RESUME_STEPS : coverSteps(docs.cover);
    const goStage = (stage, step) => { d.stage = stage; if (step != null) d.step = step; saveDocs(); renderDocs(); window.scrollTo({ top: 0, behavior: 'instant' }); };

    switch (el.dataset.doc) {
      case 'tab': docs.tab = id; saveDocs(); renderDocs(); break;
      case 'begin': {
        if (docExists(tab) && !confirm(`Start a new ${docLabel(tab)}? Your saved one on this device will be replaced.`)) return;
        docs.prefs = { rejected: [], remove: {} };
        if (id === 'build') {
          if (tab === 'resume') {
            const m = blankResume();
            m.name = (state && state.name && state.name !== 'Intern') ? state.name : '';
            m.experience.push(blankExp());
            m.education.push(blankEdu());
            docs.resume = Object.assign(docs.resume, { model: m, source: 'build', notice: false });
          } else {
            docs.cover = Object.assign(docs.cover, { source: 'build', body: '', notice: false, guided: { opening: '', why: '', company: '', closing: '' } });
          }
          goStage('edit', 0);
        } else if (id === 'write') {
          if (tab === 'resume') {
            const m = blankResume();
            m.name = (state && state.name && state.name !== 'Intern') ? state.name : '';
            m.experience.push(blankWriteExp());
            m.education.push(blankEdu());
            docs.resume = Object.assign(docs.resume, { model: m, source: 'write', notice: false });
          } else {
            docs.cover = Object.assign(docs.cover, { source: 'write', body: '', notice: false, write: { strengths: [], example: '', why: '' } });
          }
          goStage('edit', 0);
        } else goStage(id);
        break;
      }
      case 'to-start': goStage('start'); break;
      case 'paste-go': {
        const text = $('#paste-text').value;
        if (!text.trim()) { showFormError(`Paste your ${docLabel(tab)} first.`); return; }
        importText(tab, text, 'paste');
        break;
      }
      case 'dismiss': d.notice = false; saveDocs(); keepScroll(renderDocs); break;
      case 'step': goStage('edit', +id); break;
      case 'next': goStage('edit', Math.min(d.step + 1, steps.length - 1)); break;
      case 'prev': goStage('edit', Math.max(d.step - 1, 0)); break;
      case 'edit': goStage('edit'); break;
      case 'goto': goStage('edit', +id); break;
      case 'review': d.notice = false; goStage('review'); break;
      case 'add': {
        const m = docs.resume.model;
        m[id].push(id === 'experience' ? (docs.resume.source === 'write' ? blankWriteExp() : blankExp()) : id === 'education' ? blankEdu() : blankExtra());
        saveDocs(); keepScroll(renderDocs);
        const fields = $$(`.entry`);
        const lastEntry = fields[fields.length - 1];
        if (lastEntry) { const f = $('input', lastEntry); if (f) f.focus({ preventScroll: false }); }
        break;
      }
      case 'remove': {
        const [list, idx] = id.split('.');
        docs.resume.model[list].splice(+idx, 1);
        saveDocs(); keepScroll(renderDocs);
        break;
      }
      case 'reject': {
        const r = docs.prefs.rejected;
        const i = r.indexOf(id);
        if (i === -1) r.push(id); else r.splice(i, 1);
        saveDocs(); keepScroll(renderDocs);
        break;
      }
      case 'jobmode': docs.job.mode = id; saveDocs(); keepScroll(renderDocs); break;
      case 'strength': {
        const list = docs.cover.write.strengths;
        const i = list.indexOf(id);
        if (i > -1) list.splice(i, 1); else { list.push(id); if (list.length > 2) list.shift(); }
        saveDocs(); keepScroll(renderDocs);
        break;
      }
      case 'add-skill': {
        const m = docs.resume.model;
        const label = kwLabel(id);
        m.skills = [m.skills.trim().replace(/,\s*$/, ''), label].filter(Boolean).join(', ');
        saveDocs(); keepScroll(renderDocs);
        toast(`Added ${label} to your skills.`);
        break;
      }
      case 'dl-word':
      case 'dl-pdf':
      case 'copy': {
        const a = lastAnalysis[tab];
        if (!a) return;
        const name = (tab === 'resume' ? a.model.name : a.signName) || 'FirstDay';
        const file = name.trim().replace(/[^A-Za-z0-9]+/g, '_') + (tab === 'resume' ? '_Resume' : '_Cover_Letter');
        const html = tab === 'resume' ? resumeHTML(a.model) : coverHTML(a);
        if (el.dataset.doc === 'dl-word') { downloadWord(html, file); toast(`Downloading ${file}.doc — it opens in Word or Google Docs.`); }
        else if (el.dataset.doc === 'dl-pdf') { toast('In the print window, choose "Save as PDF" as the destination.'); setTimeout(() => printDocument(html), 50); }
        else copyText(tab === 'resume' ? resumeText(a.model) : coverText(a));
        break;
      }
    }
  });

  document.addEventListener('change', e => {
    const el = e.target;
    if (el.matches('[data-theme-setting]')) {
      theme = el.value === 'dark' ? 'dark' : 'light';
      app.dataset.theme = theme;
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
      return;
    }
    if (el.dataset && el.dataset.doc === 'cut') {
      docs.prefs.remove[el.dataset.id] = el.checked;
      saveDocs(); keepScroll(renderDocs);
      return;
    }
    if (el.dataset && el.dataset.bind && el.tagName === 'SELECT') {
      setPath(docs, el.dataset.bind, el.value);
      saveDocs(); keepScroll(renderDocs);
      return;
    }
    if (el.dataset && el.dataset.bind && el.type === 'checkbox') {
      setPath(docs, el.dataset.bind, el.checked);
      if (/\.current$/.test(el.dataset.bind) && el.checked) setPath(docs, el.dataset.bind.replace(/current$/, 'end'), '');
      saveDocs(); keepScroll(renderDocs);
    }
  });
  document.addEventListener('input', e => {
    const el = e.target;
    if (!el.dataset || !el.dataset.bind || el.type === 'checkbox') return;
    if (el.tagName === 'SELECT') return;
    setPath(docs, el.dataset.bind, el.value);
    saveDocs();
    const wm = el.dataset.bind.match(/^resume\.model\.experience\.(\d+)\./);
    if (wm && docs.resume.source === 'write') updateBulletPreview(+wm[1]);
    const head = el.closest('.entry') && $('.entry-head strong', el.closest('.entry'));
    if (head && /\.(title|school|heading)$/.test(el.dataset.bind)) head.textContent = el.value || head.textContent;
  });

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
    const el = e.target.closest('[data-action], [data-view], [data-tab], [data-track], [data-open-task], [data-answer], [data-sort]');
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
    if (el.dataset.openTask) { openTask(el.dataset.openTask); return; }
    if (el.dataset.answer || el.dataset.sort) {
      const d = getDraft(currentTaskId);
      if (el.dataset.answer) { d.answers = d.answers || {}; d.answers[el.dataset.answer] = el.dataset.value; }
      else { d.assign = d.assign || {}; d.assign[el.dataset.sort] = el.dataset.bucket; }
      saveDrafts();
      const y = window.scrollY;
      renderTask();
      window.scrollTo({ top: y, behavior: 'instant' });
      return;
    }
    if (el.dataset.tab) {
      termsTab = el.dataset.tab;
      const qk = termsTab === 'context' ? 'context' : 'vocab';
      if ((termsTab === 'quiz' || termsTab === 'context') && quizzes[qk] && quizzes[qk].done) newQuiz(qk);
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
      case 'signout': closeModal(true); showLanding(); break;
      case 'reset-progress':
        if (confirm('Reset all progress on every track? This can’t be undone.')) {
          state.mastered = {};
          state.quizBest = {};
          state.tasks = {};
          drafts = {};
          saveDrafts();
          Object.keys(lastResults).forEach(k => delete lastResults[k]);
          codeOutput = {};
          deck = null; quizzes = {};
          persist();
          toast('Progress reset.');
          go(currentView);
        }
        break;
      case 'fc-flip': fc.flipped = !fc.flipped; renderTermsBody(); break;
      case 'fc-got': nextCard(true); break;
      case 'fc-learning': nextCard(false); break;
      case 'fc-restart': newDeck(); renderTermsBody(); break;
      case 'toggle-master': toggleMastered(el); break;
      case 'quiz-pick': quizPick(el.dataset.kind, +el.dataset.idx); break;
      case 'quiz-next': quizNext(el.dataset.kind); break;
      case 'quiz-restart': newQuiz(el.dataset.kind); renderTermsBody(); break;
      case 'demo-submit': demoSubmit(el); break;
      case 'hint': hintsShown[currentTaskId] = (hintsShown[currentTaskId] || 0) + 1; { const y = window.scrollY; renderTask(); window.scrollTo({ top: y, behavior: 'instant' }); } break;
      case 'run-tests': runTests(el); break;
      case 'submit-task': submitTask(el); break;
      case 'fill-down': fillDown(); break;
      case 'je-add': getDraft(currentTaskId).rows.push({}); saveDrafts(); { const y = window.scrollY; renderTask(); window.scrollTo({ top: y, behavior: 'instant' }); } break;
      case 'je-remove': {
        const d = getDraft(currentTaskId);
        if (d.rows.length > 2) { d.rows.splice(+el.dataset.row, 1); saveDrafts(); const y = window.scrollY; renderTask(); window.scrollTo({ top: y, behavior: 'instant' }); }
        break;
      }
      case 'task-reset':
        if (confirm('Start this assignment over? Your current work will be cleared. Your best grade stays.')) {
          clearDraft(currentTaskId);
          delete lastResults[currentTaskId];
          delete codeOutput[currentTaskId];
          lastSheetCell = null;
          renderTask();
        }
        break;
      case 'nav-toggle': toggleNav(); break;
    }
  });

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  updateNavStart();
})();