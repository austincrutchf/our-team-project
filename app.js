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
      { t: 'DNS', d: 'Domain Name System — the system that translates website names into the IP addresses computers use.' },
      { t: 'Firewall', d: "A security system that monitors network traffic and blocks connections that don't meet set rules." },
      { t: 'IP address', d: 'A unique number that identifies a device on a network so data can reach it.' },
      { t: 'DHCP', d: 'Dynamic Host Configuration Protocol — the service that automatically hands out IP addresses to devices when they join a network.' },
      { t: 'Multi-factor authentication', d: 'A login method that requires two or more kinds of proof, such as a password plus a code from your phone.' },
      { t: 'Phishing', d: 'A scam email, text, or message that pretends to be from a trusted source to trick people into sharing passwords or clicking harmful links.' },
      { t: 'Malware', d: 'Malicious software, like viruses, spyware, or ransomware, designed to damage systems or steal data.' },
      { t: 'Encryption', d: 'Scrambling data so only someone with the right key can read it.' },
      { t: 'Backup', d: 'A copy of data stored separately so it can be restored if the original is lost, deleted, or damaged.' },
      { t: 'Cloud computing', d: 'Using servers, storage, and software over the internet from a provider like AWS or Microsoft Azure instead of owning the hardware.' },
      { t: 'SaaS', d: 'Software as a Service — software you use through a browser or app on a subscription, like Google Workspace or Salesforce, instead of installing it yourself.' },
      { t: 'Server', d: 'A computer that provides files, apps, or services to other computers over a network.' },
      { t: 'Bandwidth', d: 'The maximum amount of data a network connection can carry at once.' },
      { t: 'Latency', d: 'The delay between sending a request and getting a response, usually measured in milliseconds.' },
      { t: 'Least privilege', d: 'Giving each user only the access they need to do their job, and nothing more.' },
      { t: 'Root cause analysis', d: "Digging past the symptoms of a problem to find the underlying reason it happened, so it doesn't happen again." },
      { t: 'Escalation', d: "Passing an issue to someone with more expertise or authority when it can't be solved at the current level." },
      { t: 'Incident', d: 'An unplanned outage or disruption to an IT service, like email going down for the whole company.' },
      { t: 'Script', d: 'A short program that automates a series of commands, like creating user accounts or cleaning up old files.' },
      { t: 'Endpoint', d: 'Any device that connects to the company network, such as a laptop, phone, or tablet.' },
      { t: 'Remote desktop', d: 'A tool that lets you see and control another computer over the network, often used by IT to fix problems without being there.' },
      { t: 'Knowledge base', d: 'A searchable library of how-to articles and known fixes that help users and IT staff solve common problems.' },
      { t: 'Uptime', d: 'The percentage of time a system is running and available, often promised as something like 99.9%.' }
    ],
    finance: [
      { t: 'EBITDA', d: 'Earnings before interest, taxes, depreciation, and amortization — a common measure of operating profitability.' },
      { t: 'DCF', d: 'Discounted cash flow — a valuation method that estimates value by discounting projected future cash flows to today.' },
      { t: 'WACC', d: 'Weighted average cost of capital — the blended rate a company pays for its debt and equity financing.' },
      { t: 'Liquidity', d: 'How quickly an asset can be turned into cash without significantly affecting its price.' },
      { t: 'P/E ratio', d: "A company's share price divided by its earnings per share." },
      { t: 'Basis point', d: 'One hundredth of a percentage point (0.01%), used to describe changes in rates and yields.' },
      { t: 'Working capital', d: 'Current assets minus current liabilities — a measure of short-term financial health.' },
      { t: 'Due diligence', d: "An investigation of a business's financials, legal standing, and risks before a deal is completed." },
      { t: 'Revenue', d: 'The total money a company brings in from selling its products or services, before any costs are subtracted.' },
      { t: 'Gross margin', d: 'Revenue minus the direct cost of making the product, shown as a percentage of revenue.' },
      { t: 'Net income', d: 'The profit left after subtracting every expense, including interest and taxes, from revenue — the bottom line.' },
      { t: 'Free cash flow', d: 'Cash from operations minus capital expenditures — the cash a company has left to repay debt, pay dividends, or reinvest.' },
      { t: 'Balance sheet', d: "A snapshot of what a company owns (assets), owes (liabilities), and the owners' stake (equity) on a specific date." },
      { t: 'Income statement', d: "A report of a company's revenue, expenses, and profit over a period, like a quarter or a year." },
      { t: 'Cash flow statement', d: 'A report showing how cash moved in and out of a company over a period, split into operating, investing, and financing activities.' },
      { t: 'Market capitalization', d: "The total value of a company's shares: share price times the number of shares outstanding." },
      { t: 'Enterprise value', d: 'The value of a whole business to all its investors: market cap plus debt, minus cash.' },
      { t: 'Dividend', d: 'A payment a company makes to its shareholders, usually in cash, out of its profits.' },
      { t: 'Bond', d: 'A loan an investor makes to a company or government, which pays interest and returns the original amount on a set date.' },
      { t: 'Yield', d: 'The income an investment pays each year as a percentage of its price.' },
      { t: 'Equity', d: 'Ownership in a company. On a balance sheet, it equals assets minus liabilities.' },
      { t: 'Leverage', d: 'Using borrowed money to fund investments or operations. More leverage can boost returns but also increases risk.' },
      { t: 'Diversification', d: "Spreading money across different investments so one bad performer doesn't sink the whole portfolio." },
      { t: 'Compound interest', d: 'Earning interest on both your original money and the interest it has already earned.' },
      { t: 'Present value', d: 'What a future amount of money is worth today, after accounting for the return you could earn in the meantime.' },
      { t: 'IRR', d: "Internal rate of return — the yearly return that makes an investment's net present value equal zero, used to compare projects." },
      { t: 'NPV', d: "Net present value — the value today of all of a project's future cash flows minus its upfront cost. A positive NPV means it creates value." },
      { t: 'CapEx', d: 'Capital expenditures — money spent on long-term assets like buildings, equipment, or technology.' },
      { t: 'Variance analysis', d: 'Comparing actual results to the budget or forecast and explaining the differences.' },
      { t: 'Forecast', d: "A projection of future results, like next year's revenue, based on past data and assumptions." }
    ],
    marketing: [
      { t: 'KPI', d: 'Key performance indicator — a measurable value that shows whether a goal is being met.' },
      { t: 'CTR', d: 'Click-through rate — the share of people who click a link or ad out of everyone who saw it.' },
      { t: 'Conversion rate', d: 'The percentage of visitors who complete a desired action, such as a purchase or sign-up.' },
      { t: 'CAC', d: 'Customer acquisition cost — the total sales and marketing spend needed to win one new customer.' },
      { t: 'SEO', d: 'Search engine optimization — improving content so it ranks higher in unpaid search results.' },
      { t: 'A/B test', d: 'An experiment that shows two versions of something to different groups to see which performs better.' },
      { t: 'Buyer persona', d: 'A research-based profile of an ideal customer used to guide messaging and targeting.' },
      { t: 'ROAS', d: 'Return on ad spend — revenue generated for every dollar spent on advertising.' },
      { t: 'Impressions', d: 'The number of times an ad or post was displayed, whether or not anyone clicked.' },
      { t: 'Reach', d: 'The number of unique people who saw your content at least once.' },
      { t: 'Engagement rate', d: 'The share of people who interacted with content (likes, comments, shares, clicks) out of those who saw it.' },
      { t: 'CPC', d: 'Cost per click — how much you pay, on average, each time someone clicks your ad.' },
      { t: 'CPM', d: 'Cost per mille — what you pay for every 1,000 ad impressions.' },
      { t: 'Funnel', d: 'The stages people move through from first hearing about a brand to buying — usually awareness, consideration, and conversion.' },
      { t: 'Call to action', d: 'A prompt that tells people exactly what to do next, like “Shop now” or “Sign up free.”' },
      { t: 'Landing page', d: 'A web page built for one campaign with a single goal, like sign-ups, where people arrive after clicking an ad.' },
      { t: 'Brand awareness', d: 'How familiar your target audience is with your brand and what it offers.' },
      { t: 'Target audience', d: 'The specific group of people a campaign is meant to reach.' },
      { t: 'Retargeting', d: "Showing ads to people who already visited your site or interacted with your brand but didn't buy." },
      { t: 'Organic traffic', d: 'Visitors who find your website through unpaid search results rather than ads.' },
      { t: 'Paid media', d: 'Any marketing exposure you pay for, such as search ads, social ads, or sponsored posts.' },
      { t: 'Churn rate', d: 'The percentage of customers who stop buying or cancel during a period.' },
      { t: 'Customer lifetime value', d: 'The total revenue a business expects from one customer over the whole relationship, often called LTV.' },
      { t: 'Content calendar', d: 'A schedule of what content will be published, when, and on which channels.' },
      { t: 'Influencer marketing', d: 'Partnering with people who have large or trusted social followings to promote a product.' },
      { t: 'Segmentation', d: 'Dividing a market or customer list into groups with shared traits so messaging can be tailored to each.' },
      { t: 'Bounce rate', d: 'The percentage of visitors who leave a website after viewing only one page.' },
      { t: 'Open rate', d: 'The percentage of email recipients who opened the email.' },
      { t: 'Value proposition', d: 'A clear statement of the benefit a product delivers and why customers should choose it over alternatives.' },
      { t: 'Market share', d: "A company's sales as a percentage of total sales in its market." }
    ],
    accounting: [
      { t: 'Accrual accounting', d: 'Recording revenue when it is earned and expenses when they are incurred, regardless of when cash moves.' },
      { t: 'Accounts receivable', d: 'Money customers owe the company for goods or services already delivered.' },
      { t: 'Accounts payable', d: 'Money the company owes its suppliers for goods or services it has received.' },
      { t: 'General ledger', d: "The master record of all a company's financial transactions, organized by account." },
      { t: 'Reconciliation', d: 'Comparing two sets of records, such as a bank statement and the ledger, to make sure they match.' },
      { t: 'Depreciation', d: 'Spreading the cost of a physical asset over the years it is expected to be useful.' },
      { t: 'Journal entry', d: 'A record of a transaction using debits and credits that must balance.' },
      { t: 'Month-end close', d: 'The process of finalizing, reviewing, and locking the books at the end of each month.' },
      { t: 'Debit', d: 'An entry on the left side of an account. Debits increase assets and expenses and decrease liabilities, equity, and revenue.' },
      { t: 'Credit', d: 'An entry on the right side of an account. Credits increase liabilities, equity, and revenue and decrease assets.' },
      { t: 'Assets', d: 'Things a company owns that have value, such as cash, inventory, equipment, and money owed by customers.' },
      { t: 'Liabilities', d: 'Amounts a company owes to others, like loans, unpaid bills, and wages owed.' },
      { t: 'Chart of accounts', d: 'The complete, numbered list of every account a company uses to record transactions.' },
      { t: 'Trial balance', d: "A report listing every account's balance to confirm that total debits equal total credits." },
      { t: 'Accrued expense', d: 'An expense that has been incurred but not yet paid or billed, like wages employees earned at month-end.' },
      { t: 'Prepaid expense', d: "A cost paid in advance for something used later, like a year of insurance; it's recorded as an asset and expensed over time." },
      { t: 'Deferred revenue', d: "Cash received from customers for goods or services not yet delivered; it's a liability until it's earned." },
      { t: 'Invoice', d: 'A bill sent to a customer listing what was sold, the amount owed, and when payment is due.' },
      { t: 'Purchase order', d: 'A document a buyer sends a supplier to officially order goods at an agreed price and quantity.' },
      { t: 'Three-way match', d: 'Checking that the purchase order, receiving report, and supplier invoice agree before paying a bill.' },
      { t: 'Cost of goods sold', d: 'The direct costs of producing the products a company sold during a period, like materials and factory labor.' },
      { t: 'Inventory', d: 'Goods a company holds to sell, including raw materials and finished products.' },
      { t: 'Audit', d: "An independent examination of a company's financial records to confirm they're accurate and follow accounting rules." },
      { t: 'GAAP', d: 'Generally Accepted Accounting Principles — the standard rules U.S. companies follow when preparing financial statements.' },
      { t: 'Internal controls', d: "Processes that protect a company's assets and prevent errors or fraud, like requiring two approvals for large payments." },
      { t: 'Petty cash', d: 'A small amount of cash kept on hand for minor expenses, tracked with receipts.' },
      { t: 'Payroll', d: 'The process of calculating and paying employee wages, including taxes and deductions.' },
      { t: 'Write-off', d: "Removing an asset's value from the books when it can't be recovered, like a customer debt that will never be paid." },
      { t: 'Aging report', d: "A report that sorts unpaid customer invoices by how long they've been outstanding, like 0–30, 31–60, and 90+ days." },
      { t: 'Fiscal year', d: "The 12-month period a company uses for accounting and reporting, which doesn't have to match the calendar year." }
    ],
    consulting: [
      { t: 'Deliverable', d: 'A specific output promised to the client, such as a report, model, or presentation.' },
      { t: 'Scope creep', d: 'When a project gradually grows beyond what was originally agreed, without added time or budget.' },
      { t: 'MECE', d: 'Mutually exclusive, collectively exhaustive — breaking a problem into parts that do not overlap and cover everything.' },
      { t: 'Stakeholder', d: 'Anyone who is affected by or has influence over a project and its outcome.' },
      { t: 'Hypothesis-driven approach', d: 'Starting with a likely answer and using analysis to prove or disprove it, instead of analyzing everything first.' },
      { t: 'Utilization rate', d: "The share of a consultant's working hours that are billed to clients." },
      { t: 'Engagement', d: 'A single client project, from kickoff to final delivery.' },
      { t: 'Executive summary', d: 'A short opening section that gives busy leaders the key findings and recommendations up front.' },
      { t: 'Issue tree', d: 'A diagram that breaks a big problem into smaller questions, branch by branch, so each can be analyzed.' },
      { t: 'Statement of work', d: "The document that defines a project's scope, deliverables, timeline, and fees before work begins." },
      { t: 'Kickoff meeting', d: 'The first meeting of a project, where the team and client align on goals, scope, roles, and timeline.' },
      { t: 'Workstream', d: 'One focused part of a larger project, usually owned by a small team, like pricing or operations.' },
      { t: 'Benchmarking', d: "Comparing a client's performance or practices to competitors or industry leaders." },
      { t: 'Market sizing', d: 'Estimating the total size of a market, often with a quick logical calculation built from assumptions.' },
      { t: '80/20 rule', d: 'The idea that roughly 80% of results come from 20% of causes, used to focus effort where it matters most.' },
      { t: 'Pyramid principle', d: 'A way of communicating that starts with the main answer, then gives supporting arguments, then the details.' },
      { t: 'SWOT analysis', d: "A framework that looks at a company's Strengths, Weaknesses, Opportunities, and Threats." },
      { t: 'Steering committee', d: 'A group of senior client leaders who oversee a project, review progress, and make key decisions.' },
      { t: 'Change management', d: 'Helping people and organizations adopt a new process, system, or structure so it actually sticks.' },
      { t: 'Billable hours', d: 'Time a consultant spends working directly on client projects that the client can be charged for.' },
      { t: 'So what', d: 'The implication of a finding — why it matters and what the client should do about it.' },
      { t: 'Implementation roadmap', d: 'A step-by-step plan showing how and when a recommendation will be put into action.' },
      { t: 'Pain point', d: 'A specific problem or frustration a customer or client is experiencing.' },
      { t: 'Quick win', d: 'An improvement that can be made fast and cheaply to show early results and build momentum.' },
      { t: 'Best practice', d: 'A method widely recognized as the most effective way to do something, often borrowed from industry leaders.' },
      { t: 'Synthesis', d: 'Pulling many findings together into a few clear insights and a recommendation.' },
      { t: 'Buy-in', d: 'Agreement and support from the people who need to approve or carry out a decision.' },
      { t: 'Value chain', d: 'The full set of activities a company performs to create and deliver its product, from raw materials to customer service.' },
      { t: "Porter's Five Forces", d: 'A framework for judging how competitive an industry is, using rivalry, new entrants, substitutes, buyer power, and supplier power.' },
      { t: 'Interview guide', d: 'A prepared list of questions consultants use when interviewing clients, customers, or experts.' }
    ],
    hr: [
      { t: 'Onboarding', d: 'The process of integrating a new hire, from paperwork and setup to training and introductions.' },
      { t: 'ATS', d: 'Applicant tracking system — software used to post jobs, collect applications, and move candidates through hiring.' },
      { t: 'Total compensation', d: 'The full value of what an employee receives, including salary, bonuses, and benefits.' },
      { t: 'Performance review', d: "A formal evaluation of an employee's work, usually done on a regular schedule." },
      { t: 'Retention', d: 'An organization’s ability to keep its employees over time.' },
      { t: 'Open enrollment', d: 'The yearly window when employees can sign up for or change their benefits.' },
      { t: 'Exempt employee', d: 'An employee who, under U.S. labor law, is not entitled to overtime pay, typically salaried professionals.' },
      { t: 'Headcount', d: 'The number of people employed, often used when planning budgets and hiring.' },
      { t: 'Offboarding', d: "The process of handling an employee's departure, including returning equipment, removing system access, and final pay." },
      { t: 'Turnover rate', d: 'The percentage of employees who leave a company during a period.' },
      { t: 'Job description', d: "A document outlining a role's responsibilities, qualifications, pay range, and who it reports to." },
      { t: 'Requisition', d: 'An internal request to fill a position, usually approved before a job is posted.' },
      { t: 'Background check', d: "A screening of a candidate's history, such as criminal records, employment, or education, usually after an offer and with their consent." },
      { t: 'Form I-9', d: 'The U.S. form employers use to verify that every new hire is authorized to work in the country.' },
      { t: 'Form W-4', d: 'The U.S. tax form an employee fills out so the employer knows how much federal income tax to withhold from pay.' },
      { t: 'FMLA', d: 'Family and Medical Leave Act — a U.S. law giving eligible employees up to 12 weeks of unpaid, job-protected leave for certain family and medical reasons.' },
      { t: 'PTO', d: 'Paid time off — a bank of paid days employees can use for vacation, illness, or personal time.' },
      { t: '401(k) match', d: "Money an employer adds to an employee's retirement account based on what the employee contributes." },
      { t: 'Employee handbook', d: "A document explaining a company's policies, expectations, benefits, and procedures." },
      { t: 'Non-exempt employee', d: 'An employee who is entitled to overtime pay under U.S. labor law, usually paid hourly.' },
      { t: 'Pay band', d: 'The salary range, from minimum to maximum, a company sets for a job level.' },
      { t: 'Employee engagement', d: 'How committed, motivated, and connected employees feel to their work and company.' },
      { t: 'Exit interview', d: "A conversation with a departing employee to learn why they're leaving and what could improve." },
      { t: 'Structured interview', d: 'An interview where every candidate is asked the same questions and scored with the same rubric.' },
      { t: 'DEI', d: 'Diversity, equity, and inclusion — efforts to build a workforce from different backgrounds and make sure everyone is treated fairly and feels they belong.' },
      { t: 'Employer brand', d: 'How a company is seen as a place to work by candidates and employees.' },
      { t: 'HRIS', d: 'Human Resources Information System — software that stores employee records, payroll, benefits, and time off in one place.' },
      { t: 'Probationary period', d: "An initial period, often 60 to 90 days, when a new hire's performance is closely reviewed." },
      { t: 'Succession planning', d: 'Identifying and developing employees who can step into key roles when leaders leave or retire.' },
      { t: "Workers' compensation", d: 'Insurance that covers medical costs and lost wages for employees injured on the job.' }
    ]
  };

  const COMING_NEXT = [
    { title: 'Chat with your boss', text: 'Ask questions and get feedback from your manager between tasks.' }
  ];

  const LANDING_FAQ = [
    ['Is FirstDay actually free?', 'Yes — one track at a time, every core tool: assignments, resume and cover letter review, mock interviews, key terms. No credit card. Pro just adds the ability to keep more than one track open.'],
    ['Do I need to already know the field?', 'No — that’s the point. The vocabulary and the first assignment are written assuming you’re starting from zero.'],
    ['Is anything I write sent anywhere?', 'No. Grading, resume feedback, and everything else runs in your browser, and your progress is saved on this device, not on a server. Signing in with Google or an email and password only shares your name and email, for login — never your work.'],
    ['What if I pick the wrong track?', 'Switch anytime from Settings — it’s free, and progress on each track is kept separately, so nothing is lost if you switch back later.']
  ];

  const TERMS_CONTENT = [
    ['What this is', 'FirstDay is a practice tool built by a high school student for the 2026 Congressional App Challenge. It’s not a real employer, and nothing you do here — tasks, interviews, resume feedback — is reviewed by an actual company.'],
    ['Accounts', 'You need to be at least 13 years old to create an account. Use real info when you sign up (or use Google) so account recovery actually works, and keep your password to yourself.'],
    ['Your work stays with you', 'Resumes, cover letters, task answers, and interview answers are graded automatically in your browser and saved on your device, not on a server. We don’t read them. Signing in only shares your name and email, for login.'],
    ['Fair use', 'Don’t try to break, scrape, or abuse the practice tools, and don’t submit anyone else’s personal information.'],
    ['Pro', 'Pro unlocks extra tracks for a monthly fee, handled through Stripe. This isn’t an auto-renewing subscription tracked in-app yet — reach out through the Contact link if you need anything changed.'],
    ['No guarantees', 'This is a practice tool, not professional career advice. Grading is automated and won’t be perfect — use your judgment.'],
    ['Changes', 'These terms might change as the app grows. The date below will update when they do.'],
    ['Ending your account', 'Stop using FirstDay anytime. Want your account or data gone completely? Reach out through the Contact link and we’ll take care of it.']
  ];
  const TERMS_UPDATED = 'September 28, 2026';

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

  /* ---------------- Mock interviews ---------------- */
  function starChecks() {
    return [
      { label: 'Gives a specific example', weight: 25,
        test: a => words(a) >= 40,
        tip: a => `Give a specific example — right now this is ${words(a)} words. Aim for at least a few full sentences so the interviewer has something to go on.` },
      { label: 'Describes what you specifically did', weight: 25,
        test: a => (a.match(/\bI\s+[a-z]+/gi) || []).length >= 3,
        tip: 'Use "I" to describe what you specifically did — not just what "we" or the team did.' },
      { label: 'Explains the outcome', weight: 25,
        test: a => /(result|resulted|as a result|so that|which (led|meant)|ended up|outcome|improved|reduced|increased|fixed|resolved|learned|since then|from then on|because of (this|that))/i.test(a),
        tip: 'Close the loop — say what happened as a result, or what you learned from it.' },
      { label: 'Tells it like a short story', weight: 25,
        test: a => sentences(a).length >= 3,
        tip: 'Walk through it in order: what was going on, what you did about it, and how it turned out.' }
    ];
  }

  function fitChecks() {
    return [
      { label: 'Gives a specific example or experience', weight: 25,
        test: a => words(a) >= 40,
        tip: a => `Ground this in something specific you've actually done — right now this is ${words(a)} words.` },
      { label: 'Uses your own concrete details', weight: 25,
        test: a => (a.match(/\bI\s+[a-z]+/gi) || []).length >= 2,
        tip: 'Use "I" to talk about what you specifically did or built, not just general interests.' },
      { label: 'Says why this field, specifically', weight: 25,
        test: a => /(because|which is why|that'?s why|so I|drawn to|interested in|want to|what I like|the reason)/i.test(a),
        tip: 'Connect it back to why this field specifically — not just that you like it, but what draws you to it.' },
      { label: 'Tells it like a short story', weight: 25,
        test: a => sentences(a).length >= 3,
        tip: 'Walk through it in a few sentences: how you got interested, a specific example, then why it points to this field.' }
    ];
  }

  const INTERVIEWS = {
    it: [
      { id: 'iv-it-fit', tag: 'Getting to know you', category: 'behavioral',
        prompt: 'Tell me about yourself, and why IT support and systems work interests you.',
        hints: ['Keep it tight — a few focused sentences beats a rambling two minutes.', 'End with why this role specifically, not just "I like computers."'],
        sample: "I've always been the person friends and family call when their Wi-Fi breaks or their laptop won't update — I like the puzzle of figuring out what's actually wrong. In school I set up and managed the network for our robotics team's competition laptops, which taught me to stay calm when several things break at once. I'm drawn to IT support specifically because you get a clear win every time you close a ticket, and the problems are different every day.",
        checks: fitChecks() },
      { id: 'iv-it-mistake', tag: 'Handling a mistake', category: 'behavioral',
        prompt: 'Tell me about a time you made a mistake with a system or a piece of technology. What happened, and what did you do?',
        hints: ["It's fine to admit a real mistake — what matters is what you did next.", 'Say specifically what you’d do differently, not just "I learned to be more careful."'],
        sample: "I once pushed a script that renamed files across a shared folder without previewing it first, and it broke the naming convention our team relied on. I let my supervisor know right away instead of trying to quietly fix it, then wrote a small undo script using the log I'd saved. Since then I always run a dry run or work on a copy first before anything touches shared files.",
        checks: starChecks() },
      { id: 'iv-it-conflict', tag: 'Working with others', category: 'behavioral',
        prompt: 'Tell me about a time you disagreed with a teammate or a manager about how to solve a technical problem.',
        hints: ["Focus on how you resolved it, not just who was right.", "It's okay if you ended up being wrong — say what changed your mind."],
        sample: "A teammate wanted to reimage a laptop that kept freezing, but I thought it was a single bad driver. I asked if we could try my fix first since it would take ten minutes instead of an hour, and we agreed on a time limit. I fixed it with a driver update, which resolved the freezing for good, and we agreed that if it hadn't worked we'd have gone straight to his approach — having that fallback made it an easy conversation.",
        checks: starChecks() },
      { id: 'iv-it-tech', tag: 'On the job', category: 'technical',
        prompt: "A new hire says their laptop won't turn on at all. Walk me through how you'd troubleshoot it.",
        hints: ['Start with the simplest, most common cause before anything complicated.', "Mention what you'd ask the person, not just what you'd check yourself."],
        sample: "First I'd ask what they've already tried and whether any lights or sounds happen when they press power — that tells me if it's totally dead or stuck mid-boot. I'd check the obvious stuff first: is it actually plugged in, is the outlet working, is the charging cable or port damaged. If it still won't power on with a charger I know works, I'd try a long press of the power button to clear a stuck state, then escalate to hardware repair and log a ticket with everything I already tried so we don't repeat steps.",
        checks: [
          { label: 'Checks the power source first', weight: 25, test: a => /plug|power (cable|cord|outlet|adapter|strip)|charg(e|er|ing)|outlet|battery/i.test(a),
            tip: 'Start with the obvious: is it plugged in, is the outlet working, is the cable or charger damaged.' },
          { label: 'Asks the user questions to gather info', weight: 25, test: a => /ask|confirm|check (if|whether)|when did|does it|any (lights|sounds|noise)/i.test(a),
            tip: "Mention what you'd ask the person — what they've already tried, whether there's any sign of life at all." },
          { label: 'Starts simple before assuming the worst', weight: 25, test: a => /simplest|rule out|start with|first|before (anything|assuming)|basic/i.test(a),
            tip: "Say that you'd rule out the simple, common causes before assuming it's a serious hardware failure." },
          { label: 'Mentions escalating or documenting the issue', weight: 25, test: a => /ticket|escalate|log|document|record|hardware (repair|team)/i.test(a),
            tip: "If your own steps don't fix it, mention logging a ticket or escalating to hardware repair with what you've already tried." }
        ] }
    ],
    finance: [
      { id: 'iv-fin-fit', tag: 'Getting to know you', category: 'behavioral',
        prompt: 'Tell me about yourself, and why finance is the field you want to start your career in.',
        hints: ['Keep it tight — a few focused sentences beats a rambling two minutes.', 'End with why this role specifically, not just "I’m good with numbers."'],
        sample: "I got interested in finance after building a stock-tracking spreadsheet for a class project and realizing how much a single assumption — like a growth rate — could change a valuation. I've since taught myself the basics of reading a 10-K and built a couple of simple models on my own. I want to start in finance because the work is both analytical and has a real, visible outcome — a model either holds up or it doesn't.",
        checks: fitChecks() },
      { id: 'iv-fin-mistake', tag: 'Handling a mistake', category: 'behavioral',
        prompt: 'Tell me about a time you made an error in a calculation, model, or analysis. What did you do?',
        hints: ["It's fine to admit a real mistake — what matters is what you did next.", 'Say specifically what you’d do differently, not just "I learned to double-check."'],
        sample: "While building a practice DCF, I forgot to discount the terminal value back to present, which made the valuation look far too high. I caught it because the number seemed unreasonable compared to the company's actual market cap, so I went back through the formula step by step and found the missing discount factor and fixed the model. Since then I always sanity-check a valuation against a real benchmark before I trust the output.",
        checks: starChecks() },
      { id: 'iv-fin-conflict', tag: 'Working with others', category: 'behavioral',
        prompt: 'Tell me about a time you disagreed with someone about a number or an assumption in an analysis.',
        hints: ["Focus on how you resolved it, not just who was right.", "It's okay if you ended up being wrong — say what changed your mind."],
        sample: "On a group project, a teammate wanted to use last year's 20% growth rate for next year's forecast, but I thought that was too aggressive given the market had slowed. Instead of just overriding it, I pulled a couple of comparable companies' recent growth rates and showed the range was closer to 8–12%. I proposed 10% as a middle ground, and we ended up agreeing on that number and noting the assumption clearly so anyone reviewing the model could see why.",
        checks: starChecks() },
      { id: 'iv-fin-tech', tag: 'On the job', category: 'technical',
        prompt: "Walk me through how you'd figure out whether a company is a good investment.",
        hints: ['Cover more than one angle — the numbers alone rarely tell the whole story.', 'Mention comparing the company to something, not just describing it in isolation.'],
        sample: "I'd start with the financial statements — revenue growth, margins, and whether cash flow actually backs up the reported earnings. Then I'd look at valuation, comparing the P/E or EV/EBITDA to similar companies to see if it's cheap or expensive relative to peers. I'd also factor in qualitative risk, like how much debt they're carrying and whether they have a real competitive advantage, since a cheap stock with a shrinking moat is still a bad investment.",
        checks: [
          { label: 'Mentions the financial statements or key metrics', weight: 25, test: a => /income statement|balance sheet|cash flow|revenue|earnings|margin|EBITDA/i.test(a),
            tip: "Start with the fundamentals — revenue, margins, cash flow, or earnings." },
          { label: 'Mentions a valuation method', weight: 25, test: a => /DCF|discounted cash flow|comparable|comps|multiple|P\/E|EV\/EBITDA|valuation/i.test(a),
            tip: 'Mention how you’d actually value it — a DCF, or comparing multiples like P/E.' },
          { label: 'Mentions risk', weight: 25, test: a => /risk|debt|competition|competitive|moat|leverage/i.test(a),
            tip: "Bring up risk — debt levels, competition, or how durable their advantage is." },
          { label: 'Compares to peers or a benchmark', weight: 25, test: a => /peer|comparable|industry|benchmark|compare|similar compan/i.test(a),
            tip: "A number means little on its own — mention comparing it to peers or an industry benchmark." }
        ] }
    ],
    marketing: [
      { id: 'iv-mkt-fit', tag: 'Getting to know you', category: 'behavioral',
        prompt: 'Tell me about yourself, and why marketing is the field you want to break into.',
        hints: ['Keep it tight — a few focused sentences beats a rambling two minutes.', 'End with why this role specifically, not just "I’m creative."'],
        sample: "I ran the Instagram account for my school's spring fundraiser last year and watched our reach triple once I started posting at different times and testing different captions. That hooked me — I liked that you could actually measure what worked instead of just guessing. I want to start in marketing because I like combining that creative side with the data side to figure out what actually gets someone to act.",
        checks: fitChecks() },
      { id: 'iv-mkt-mistake', tag: 'Handling a mistake', category: 'behavioral',
        prompt: 'Tell me about a time a campaign, post, or piece of content you made didn’t perform the way you expected.',
        hints: ["It's fine to admit it flopped — what matters is what you did next.", 'Say specifically what you’d do differently next time.'],
        sample: "I once spent most of my prep time on the graphic for a post and barely thought about the caption, and it underperformed everything else that week. When I looked at what similar posts from other accounts were doing, I noticed the caption was almost always what drove people to comment or share, not just the image. After that I started writing the caption first and treating the visual as support instead of the other way around, which improved how my posts performed.",
        checks: starChecks() },
      { id: 'iv-mkt-conflict', tag: 'Working with others', category: 'behavioral',
        prompt: 'Tell me about a time you disagreed with someone on your team about a marketing decision, like messaging or a channel to use.',
        hints: ["Focus on how you resolved it, not just who was right.", "It's okay if you ended up being wrong — say what changed your mind."],
        sample: "A teammate wanted to put our whole budget into Instagram ads, but I noticed our data showed most of our recent sign-ups actually came from email. Instead of arguing, I pulled the numbers from the last two campaigns and showed the split, then I suggested we divide the budget with more weight toward email. We ended up doing that and set a checkpoint to revisit it after a month based on results.",
        checks: starChecks() },
      { id: 'iv-mkt-tech', tag: 'On the job', category: 'technical',
        prompt: 'How would you measure whether a marketing campaign actually worked?',
        hints: ['Say that the right metric depends on the campaign’s goal — awareness and sales aren’t measured the same way.', "Mention comparing the result to something, not just reporting a number."],
        sample: "It depends on the goal of the campaign — if it's about awareness I'd look at reach and impressions, but if it's about driving sales I'd look at conversion rate and cost per acquisition. I'd compare those numbers to a baseline or a goal set before the campaign started, not just look at them in isolation. I'd also want to see it against similar past campaigns so I know if the result is actually good or just average.",
        checks: [
          { label: 'Names a specific metric', weight: 25, test: a => /CTR|click-through|conversion|ROAS|CAC|engagement|reach|impressions|cost per/i.test(a),
            tip: 'Name an actual metric — conversion rate, CTR, ROAS, reach, and so on.' },
          { label: 'Compares to a goal or baseline', weight: 25, test: a => /goal|baseline|benchmark|target|compare|before and after/i.test(a),
            tip: "A number alone doesn't mean much — mention comparing it to a goal or baseline set beforehand." },
          { label: 'Matches the metric to the campaign’s objective', weight: 25, test: a => /objective|depends on|awareness|sales|leads|purpose of the campaign/i.test(a),
            tip: "Say that the right metric depends on what the campaign was actually trying to do." },
          { label: 'Compares to past campaigns', weight: 25, test: a => /past campaign|previous|history|trend|similar/i.test(a),
            tip: "Mention checking it against past campaigns so you know if the result is actually good." }
        ] }
    ],
    accounting: [
      { id: 'iv-acct-fit', tag: 'Getting to know you', category: 'behavioral',
        prompt: 'Tell me about yourself, and why accounting is the field you want to start in.',
        hints: ['Keep it tight — a few focused sentences beats a rambling two minutes.', 'End with why this role specifically, not just "I’m good at math."'],
        sample: "I've always liked that accounting has a right answer — the books either balance or they don't, and I find that satisfying to work toward. I managed the budget for a school club last year, tracking every dollar in a spreadsheet so we could show exactly where fundraising money went. I want to start in accounting because I like the precision of it, and because it's a skill that's useful in almost any company or industry.",
        checks: fitChecks() },
      { id: 'iv-acct-mistake', tag: 'Handling a mistake', category: 'behavioral',
        prompt: 'Tell me about a time you found an error in your own work, like a number that didn’t add up. What did you do?',
        hints: ["It's fine to admit a real mistake — what matters is what you did next.", "Say what you actually did to fix it, not just that you \"caught\" it."],
        sample: "While reconciling a club's expense log, I noticed the running total didn't match our bank statement by about forty dollars. Instead of just adjusting the number to make it match, I went back through every transaction and found a reimbursement that had been entered twice. I flagged it to the treasurer and we fixed the duplicate entry so the record was actually accurate, not just balanced.",
        checks: starChecks() },
      { id: 'iv-acct-conflict', tag: 'Working with others', category: 'behavioral',
        prompt: 'Tell me about a time you disagreed with someone about how a transaction or expense should be recorded or categorized.',
        hints: ["Focus on how you resolved it, not just who was right.", "It's okay if you ended up being wrong — say what changed your mind."],
        sample: "A club member wanted to log a personal purchase as a group expense because it was 'close enough' to what we needed. I explained that mixing that in would make our records inaccurate, and I suggested we keep it out of the books and let the group vote on reimbursing them separately instead. I updated the log accordingly, which resolved the issue and kept our expense records accurate for anyone who reviewed them later.",
        checks: starChecks() },
      { id: 'iv-acct-tech', tag: 'On the job', category: 'technical',
        prompt: 'Explain the difference between cash and accrual accounting, and why the difference matters.',
        hints: ['Define both sides clearly before explaining why it matters.', 'Mention why a company would care, not just the textbook definition.'],
        sample: "Cash accounting records a transaction when cash is actually received or paid, while accrual accounting records it when it's earned or incurred, regardless of when the cash moves. The difference matters because accrual gives a more accurate picture of a company's financial health in a given period — cash accounting can make a company look better or worse than it really is just based on payment timing. That's why GAAP generally requires accrual accounting for larger companies.",
        checks: [
          { label: 'Explains cash-basis timing', weight: 25, test: a => /cash (in|out)|when (cash|money) (is )?(received|paid)|actually (received|paid)/i.test(a),
            tip: 'Explain cash accounting: it records money when it’s actually received or paid.' },
          { label: 'Explains accrual-basis timing', weight: 25, test: a => /earned|incurred|when it'?s? earned|regardless of (when|the) cash/i.test(a),
            tip: 'Explain accrual accounting: it records revenue and expenses when they’re earned or incurred, not when cash moves.' },
          { label: 'Says why it matters for accuracy', weight: 25, test: a => /accurate|misleading|picture of|matching/i.test(a),
            tip: "Say why it matters — accrual gives a more accurate picture of financial health." },
          { label: 'Mentions GAAP or standard practice', weight: 25, test: a => /GAAP|standard|required|larger compan/i.test(a),
            tip: "Mention that GAAP generally requires accrual accounting for larger companies." }
        ] }
    ],
    consulting: [
      { id: 'iv-con-fit', tag: 'Getting to know you', category: 'behavioral',
        prompt: 'Tell me about yourself, and why consulting is the path you want to start on.',
        hints: ['Keep it tight — a few focused sentences beats a rambling two minutes.', 'End with why this role specifically, not just "I like problem-solving."'],
        sample: "I like being dropped into a problem I don't know much about yet and figuring out how to structure it. That happened a lot when I did case competitions in school, where we'd get an unfamiliar business problem and two hours to build a recommendation. I want to start in consulting because you get exposed to a different industry and problem every engagement, and the job forces you to think clearly under time pressure.",
        checks: fitChecks() },
      { id: 'iv-con-mistake', tag: 'Handling a mistake', category: 'behavioral',
        prompt: 'Tell me about a time your initial approach to a problem or analysis turned out to be wrong. What did you do?',
        hints: ["It's fine to admit the first approach was wrong — what matters is catching it and adjusting.", "Say what you actually did once you noticed, not just that you noticed."],
        sample: "On a case competition, our team spent the first hour building a detailed pricing model before I realized the actual issue was customer churn, not price. Once I noticed our numbers weren't explaining the client's real problem, I flagged it to the team and we restructured around a churn analysis instead, even though it meant scrapping work. We still finished on time, which fixed what would have been a much bigger problem the night before the final presentation.",
        checks: starChecks() },
      { id: 'iv-con-conflict', tag: 'Working with others', category: 'behavioral',
        prompt: 'Tell me about a time you disagreed with a teammate about how to structure or prioritize a project.',
        hints: ["Focus on how you resolved it, not just who was right.", "It's okay if you ended up being wrong — say what changed your mind."],
        sample: "A teammate wanted to dive straight into building slides, but I thought we needed to agree on the actual recommendation first so the slides wouldn't need to be redone. I suggested we spend fifteen minutes outlining our answer and the points supporting it, and I timed us to keep it tight. It felt slower at first, but we finished faster as a result, since we weren't rebuilding slides around a changing argument.",
        checks: starChecks() },
      { id: 'iv-con-tech', tag: 'On the job', category: 'technical',
        prompt: 'A client wants to know roughly how many coffee shops there are in Chicago. How would you estimate that?',
        hints: ['Break the problem into a chain of smaller, reasonable assumptions.', "Finish by checking your number against something you actually know."],
        sample: "I'd start with Chicago's population, then estimate what share of people drink coffee out regularly and how often per week. From there I'd estimate how many customers a typical coffee shop can serve in a day based on hours and turnover, and divide total weekly demand by that capacity to get a rough number of shops. At the end I'd sanity-check the number against something I actually know, like how many coffee shops I'd guess are in a neighborhood I'm familiar with, scaled up.",
        checks: [
          { label: 'Starts from population', weight: 25, test: a => /population|residents|people (in|live)/i.test(a),
            tip: "Start with Chicago's population as your base number." },
          { label: 'Estimates frequency or demand per person', weight: 25, test: a => /per (person|capita|week|day)|frequency|average|how often/i.test(a),
            tip: 'Estimate how often an average person buys coffee out, to turn population into demand.' },
          { label: 'Breaks the problem into steps', weight: 25, test: a => /break (it |this )?down|start with|assume|estimate|step/i.test(a),
            tip: "Walk through it as a chain of steps and assumptions, not a single guess." },
          { label: 'Sanity-checks the final number', weight: 25, test: a => /sanity[- ]check|reasonable|cross[- ]check|compare (it |this )?to|gut check/i.test(a),
            tip: "Finish by sanity-checking your estimate against something you actually know." }
        ] }
    ],
    hr: [
      { id: 'iv-hr-fit', tag: 'Getting to know you', category: 'behavioral',
        prompt: 'Tell me about yourself, and why HR or people operations is the field you want to start in.',
        hints: ['Keep it tight — a few focused sentences beats a rambling two minutes.', 'End with why this role specifically, not just "I’m a people person."'],
        sample: "I was the go-to person in my friend group and on my team for sorting out conflicts and making sure everyone actually felt heard, and I realized I liked that role more than any specific subject in school. I organized onboarding for new members of a club I was in, building a simple welcome guide so people didn't feel lost their first week. I want to start in HR because I like that the job is really about making the workplace fair and functional for everyone in it.",
        checks: fitChecks() },
      { id: 'iv-hr-mistake', tag: 'Handling a mistake', category: 'behavioral',
        prompt: 'Tell me about a time you handled a people situation and, looking back, would have done differently.',
        hints: ["It's fine to admit it — what matters is what you'd do differently now.", "Say specifically what changed about your approach."],
        sample: "I once gave a teammate feedback about missed deadlines in front of the rest of the group, thinking it would save time since we were all in the same meeting. She was embarrassed and it made the rest of the meeting awkward for everyone. I apologized afterward and talked to her one-on-one instead, and since then I always give that kind of feedback privately first.",
        checks: starChecks() },
      { id: 'iv-hr-conflict', tag: 'Working with others', category: 'behavioral',
        prompt: 'Tell me about a time you had to stay neutral or fair in a disagreement between two people.',
        hints: ["Focus on how you handled both sides fairly, not just the outcome.", "Mention what you actually did, not just that you 'stayed neutral.'"],
        sample: "Two people on a group project each thought the other wasn't contributing enough, and both came to me separately to complain. I made sure to hear each person out fully before saying anything, and I then brought them together to talk through what each of them actually needed from the other. It turned out to be a miscommunication about who owned which part, and I watched it get fixed faster once they heard it from each other directly instead of through me relaying messages back and forth.",
        checks: starChecks() },
      { id: 'iv-hr-tech', tag: 'On the job', category: 'technical',
        prompt: 'An employee tells you a coworker keeps taking credit for their work. How do you handle it?',
        hints: ['Say what you’d do first, not just the eventual outcome.', "Mention getting the other person's side before deciding anything."],
        sample: "First I'd listen to the full story without jumping to conclusions, and ask for specific examples so I understand what actually happened. I'd keep the conversation confidential and let them know I'd look into it fairly rather than assuming either side is right. Then I'd talk to the coworker separately to hear their side, and depending on what I learn, either help mediate a conversation between them or document the issue if it's part of a pattern.",
        checks: [
          { label: 'Listens and gathers specifics first', weight: 25, test: a => /listen|hear (them|her|him) out|ask (for )?(specific )?examples|understand|gather/i.test(a),
            tip: "Start by listening and asking for specific examples before deciding anything." },
          { label: 'Keeps it confidential and fair', weight: 25, test: a => /confidential|both sides|fair|neutral|assum(e|ing)/i.test(a),
            tip: "Mention keeping it confidential and not assuming either side is automatically right." },
          { label: 'Gets the other person’s side', weight: 25, test: a => /talk to (the|her|him|them)|other side|coworker'?s? side|hear (their|his|her)/i.test(a),
            tip: "Mention talking to the coworker separately to hear their side too." },
          { label: 'Has a concrete next step', weight: 25, test: a => /document|follow up|mediate|escalate|pattern/i.test(a),
            tip: "End with a concrete next step — documenting it, mediating a conversation, or following up." }
        ] }
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
    'Headcount': 'The number of people employed, often used when planning budgets and hiring.',
    'Firewall': 'A security barrier that watches incoming and outgoing network traffic and blocks anything that breaks the rules.',
    'IP address': 'The numeric label, like 192.168.1.25, that identifies a device on a network so data knows where to go.',
    'DHCP': 'The network service that automatically gives each device an address when it connects, so nobody has to set one by hand.',
    'Multi-factor authentication': 'Requiring a second proof of identity, like a phone code or fingerprint, on top of a password before someone can sign in.',
    'Phishing': 'A fake message dressed up as a trusted sender to trick someone into giving up a password or clicking a harmful link.',
    'Malware': 'Harmful software, such as a virus or ransomware, built to damage computers or steal information.',
    'Encryption': 'Scrambling data into unreadable code so only someone with the right key can turn it back into something useful.',
    'Backup': 'A separate copy of files kept somewhere else so they can be restored if the originals are lost or damaged.',
    'Cloud computing': 'Renting servers, storage, and software over the internet from a big provider instead of buying and running your own machines.',
    'SaaS': 'Software you subscribe to and use online, like Slack or Salesforce, while the vendor handles hosting and updates.',
    'Server': 'A computer whose job is to provide files, websites, or apps to other computers over a network.',
    'Bandwidth': 'The maximum amount of data a connection can move at one time, like the number of lanes on a highway.',
    'Latency': 'The delay, usually measured in milliseconds, between sending a request and hearing back.',
    'Least privilege': 'The security rule of giving each person only the access their job requires, and nothing extra.',
    'Root cause analysis': 'Digging past the symptoms to find the real reason a problem happened, so it stops coming back.',
    'Escalation': 'Handing an issue up to someone with more expertise or authority when it can\u2019t be solved at the current level.',
    'Incident': 'An unplanned outage or disruption to a service people rely on, like email going down company-wide.',
    'Script': 'A short program that runs a series of commands automatically, like creating 40 user accounts at once.',
    'Endpoint': 'Any device that connects to a company\u2019s network, like a laptop, phone, or tablet, and needs to be secured.',
    'Remote desktop': 'A tool that lets a technician see and control someone else\u2019s computer over the network without being in the room.',
    'Knowledge base': 'A searchable library of how-to articles and known fixes so people can solve common problems without waiting.',
    'Uptime': 'The percentage of time a system is up and available, often promised as a number like 99.9%.',
    'Revenue': 'The total money brought in from sales before any costs are taken out, often called the top line.',
    'Gross margin': 'The share of each sales dollar left after paying the direct cost of making the product, shown as a percentage.',
    'Net income': 'The profit left after every expense, including interest and taxes, is subtracted — the bottom line.',
    'Free cash flow': 'Cash the business generates from operations minus what it spends on equipment and buildings — what\u2019s truly left over.',
    'Balance sheet': 'A snapshot on one date of what a company owns, what it owes, and what\u2019s left for the owners.',
    'Income statement': 'The report that shows sales, expenses, and profit over a period such as a quarter or a year.',
    'Cash flow statement': 'The report that tracks money moving in and out over a period, split into operating, investing, and financing.',
    'Market capitalization': 'Share price times the number of shares outstanding — what the stock market says the company\u2019s equity is worth.',
    'Enterprise value': 'What it would cost to buy the whole business: the value of its shares plus its debt, minus the cash it holds.',
    'Dividend': 'A regular cash payment a company sends its shareholders out of its profits.',
    'Bond': 'A loan investors make to a company or government that pays regular interest and returns the full amount on a set date.',
    'Yield': 'The yearly income an investment pays, expressed as a percentage of what it costs.',
    'Equity': 'Ownership in a business; on the books it equals what the company owns minus what it owes.',
    'Leverage': 'Using borrowed money to fund a business or investment, which magnifies both gains and losses.',
    'Diversification': 'Spreading money across many different investments so one bad pick can\u2019t sink the whole portfolio.',
    'Compound interest': 'Earning returns on both the original amount and the returns already earned, so growth snowballs over time.',
    'Present value': 'What money you\u2019ll receive in the future is worth in today\u2019s dollars, given what you could earn in the meantime.',
    'IRR': 'The single yearly percentage a project is expected to earn, found where its discounted cash flows net to zero.',
    'NPV': 'Today\u2019s value of all a project\u2019s future cash, minus what it costs up front. Above zero means the project creates value.',
    'CapEx': 'Money spent on long-lasting assets such as buildings, machines, or major technology, rather than day-to-day costs.',
    'Variance analysis': 'Comparing actual results to the plan and explaining why the numbers came in higher or lower.',
    'Forecast': 'A projection of future numbers, like next year\u2019s sales, built from past data and assumptions.',
    'Impressions': 'The number of times an ad or post was shown on a screen, counting repeat views.',
    'Reach': 'The number of different people who saw a piece of content at least once.',
    'Engagement rate': 'Likes, comments, shares, and clicks divided by the number of people who saw the post.',
    'CPC': 'Ad spend divided by the number of times people selected the ad.',
    'CPM': 'What an advertiser pays for every thousand times an ad is shown.',
    'Funnel': 'The stages a customer moves through, from first hearing about a brand to finally buying, narrowing at each step.',
    'Call to action': 'The short instruction, like \u201cShop now\u201d or \u201cSign up free,\u201d that tells people exactly what to do next.',
    'Landing page': 'A single web page built around one campaign and one goal, where people arrive after clicking an ad.',
    'Brand awareness': 'How well the target audience recognizes a company and knows what it offers.',
    'Target audience': 'The specific group of people a campaign is designed to reach.',
    'Retargeting': 'Showing ads to people who already visited a site or looked at a product but left without buying.',
    'Organic traffic': 'Website visitors who arrive through unpaid search results instead of paid ads.',
    'Paid media': 'Exposure a brand buys, such as search ads, sponsored posts, and billboards.',
    'Churn rate': 'The percentage of customers who cancel or stop buying during a given period.',
    'Customer lifetime value': 'The total revenue a business expects to earn from one customer over the entire relationship.',
    'Content calendar': 'A schedule showing what posts and articles will go out, on which channels, and on what dates.',
    'Influencer marketing': 'Paying or partnering with popular social media creators to promote a product to their followers.',
    'Segmentation': 'Splitting customers into groups with shared traits, like age or buying habits, so each gets tailored messages.',
    'Bounce rate': 'The percentage of visitors who leave a site after viewing just one page without doing anything else.',
    'Open rate': 'The percentage of people who received an email and actually opened it.',
    'Value proposition': 'A clear statement of the main benefit a product delivers and why someone should pick it over the alternatives.',
    'Market share': 'One company\u2019s sales as a percentage of all sales in its industry.',
    'Debit': 'The left-side entry in an account, which increases assets and expenses.',
    'Credit': 'The right-side entry in an account, which increases liabilities, equity, and revenue.',
    'Assets': 'Things a company owns that hold value, like cash, inventory, and equipment.',
    'Liabilities': 'Amounts a company owes to others, like loans, unpaid bills, and wages not yet paid.',
    'Chart of accounts': 'The master numbered list of every account a business uses to categorize its transactions.',
    'Trial balance': 'A report listing every account\u2019s ending balance to check that total debits equal total credits.',
    'Accrued expense': 'A cost a company has already incurred but hasn\u2019t paid or been billed for yet, like wages earned but not yet paid.',
    'Prepaid expense': 'A cost paid up front for something used later, like a year of insurance, recorded as an asset and used up over time.',
    'Deferred revenue': 'Cash collected from a customer before the work is delivered, held as a liability until it\u2019s earned.',
    'Invoice': 'A bill sent to a customer that lists what was provided, how much is owed, and the due date.',
    'Purchase order': 'The official document a buyer sends a supplier to order goods at an agreed price and quantity.',
    'Three-way match': 'Checking that what was ordered, what was received, and what the supplier billed all agree before paying.',
    'Cost of goods sold': 'The direct cost of making the products that were actually sold during a period, like materials and factory labor.',
    'Inventory': 'Goods a business holds and plans to sell, from raw materials to finished products.',
    'Audit': 'An independent review of a company\u2019s financial records to confirm they\u2019re accurate and follow the rules.',
    'GAAP': 'The standard set of U.S. rules companies follow when preparing financial statements, so reports can be compared.',
    'Internal controls': 'Procedures that prevent mistakes and fraud, like requiring a second approval before a large payment goes out.',
    'Petty cash': 'A small stash of cash kept in the office for minor purchases, tracked with receipts.',
    'Payroll': 'The process of calculating employee pay, withholding taxes and deductions, and paying people on time.',
    'Write-off': 'Removing an amount from the books because it will never be collected or has lost its value.',
    'Aging report': 'A report that sorts unpaid customer bills by how long they\u2019ve been outstanding, such as 0–30, 31–60, and 90+ days.',
    'Fiscal year': 'The 12-month period a company uses for its books and reporting, which may not run January to December.',
    'Issue tree': 'A branching diagram that splits one big question into smaller questions that can each be analyzed.',
    'Statement of work': 'The signed document spelling out a project\u2019s scope, outputs, timeline, and fees before work starts.',
    'Kickoff meeting': 'The first meeting of a project, where the team and client agree on goals, roles, and the timeline.',
    'Workstream': 'One focused slice of a larger project with its own owner and tasks, like pricing or operations.',
    'Benchmarking': 'Comparing a client\u2019s performance to competitors or industry leaders to see where it stands.',
    'Market sizing': 'Estimating how big a market is, often by building a quick calculation from reasonable assumptions.',
    '80/20 rule': 'The idea that a small share of causes, roughly a fifth, produces most of the results.',
    'Pyramid principle': 'Structuring communication so the main answer comes first, followed by supporting points, then the detail underneath.',
    'SWOT analysis': 'A four-box framework covering a company\u2019s internal pluses and minuses and the outside chances and dangers it faces.',
    'Steering committee': 'A group of senior client leaders who meet regularly to review a project\u2019s progress and make the big decisions.',
    'Change management': 'Helping employees adopt a new process or system through communication and training so it actually sticks.',
    'Billable hours': 'Time spent working directly on client work that can be charged to the client.',
    'So what': 'The implication behind a finding: why it matters and what the client should do about it.',
    'Implementation roadmap': 'A step-by-step timeline showing who will do what, and when, to put a recommendation into action.',
    'Pain point': 'A specific frustration or problem that a customer or client keeps running into.',
    'Quick win': 'A fast, low-cost improvement that shows early results and builds support for bigger changes.',
    'Best practice': 'A method widely seen as the most effective way to do something, often borrowed from industry leaders.',
    'Synthesis': 'Pulling many separate findings together into a few clear insights and one recommendation.',
    'Buy-in': 'Real agreement and support from the people who must approve or carry out a decision.',
    'Value chain': 'The full sequence of activities a company performs to create and deliver its product, from sourcing to after-sale service.',
    "Porter's Five Forces": 'A framework that judges how tough an industry is by looking at rivals, new entrants, substitutes, and the power of buyers and suppliers.',
    'Interview guide': 'A prepared list of questions used to keep conversations with clients, customers, or experts focused and consistent.',
    'Offboarding': 'The steps taken when someone leaves a company, like collecting their laptop, shutting off access, and final pay.',
    'Turnover rate': 'The percentage of employees who leave during a given period.',
    'Job description': 'A written summary of a role\u2019s duties, required qualifications, and who it reports to.',
    'Requisition': 'An internal request, approved by leadership, to open and fill a position.',
    'Background check': 'A screening of a candidate\u2019s past, like employment, education, or criminal records, done with their written consent.',
    'Form I-9': 'The U.S. form used to confirm every new hire is legally allowed to work in the country.',
    'Form W-4': 'The U.S. form a new employee fills out so payroll knows how much federal income tax to hold back from each check.',
    'FMLA': 'A U.S. law giving eligible workers up to 12 weeks of unpaid, job-protected time off for things like a new baby or a serious illness.',
    'PTO': 'A bank of paid days employees can use for vacation, sick days, or personal time.',
    '401(k) match': 'Money an employer adds to a worker\u2019s retirement savings based on how much the worker puts in.',
    'Employee handbook': 'The company guide that explains policies, rules, benefits, and procedures for staff.',
    'Non-exempt employee': 'A worker who, under U.S. labor law, must be paid time-and-a-half for hours over 40 in a week.',
    'Pay band': 'The salary range, from minimum to maximum, a company sets for a certain job level.',
    'Employee engagement': 'How committed, motivated, and connected people feel to their work and their company.',
    'Exit interview': 'A conversation with someone who is leaving to learn why and what the company could do better.',
    'Structured interview': 'An interview format where every candidate gets the same questions and is scored with the same rubric.',
    'DEI': 'Efforts to build a workforce from many backgrounds and make sure everyone is treated fairly and feels they belong.',
    'Employer brand': 'A company\u2019s reputation as a place to work, among job seekers and its own staff.',
    'HRIS': 'The central software that stores employee records, payroll, benefits, and time-off balances.',
    'Probationary period': 'The first few months of a new job, often 60 to 90 days, when performance gets a closer look.',
    'Succession planning': 'Identifying and developing people who could step into key roles when current leaders leave or retire.',
    "Workers' compensation": 'Insurance that pays medical bills and lost wages for people hurt while doing their job.'
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
        why: 'An API is how one program requests data from another, like your app asking a weather service for today\u2019s forecast.' },
      { term: 'Help desk ticket', prompt: 'A coworker stops you in the hallway to say her monitor keeps flickering. You\u2019re on your way to a meeting. What\u2019s the best move?',
        options: ['Ask her to submit a help desk ticket so it\u2019s tracked', 'Promise to remember it later', 'Tell her to restart and hope for the best', 'Escalate it straight to the CIO'],
        why: 'A help desk ticket makes sure the issue is logged, assigned, and followed up instead of forgotten.' },
      { term: 'Firewall', prompt: 'Security wants to stop outside computers from reaching the office\u2019s internal file server, while still letting employees use it. What should be configured?',
        options: ['A firewall rule', 'A new DNS record', 'A cron job', 'A longer SLA'],
        why: 'Firewalls allow or block traffic based on rules, like \u201conly internal devices can reach this server.\u201d' },
      { term: 'IP address', prompt: 'Two printers on the same office network keep dropping offline, and you notice both are set to 192.168.1.50. What\u2019s the problem?',
        options: ['An IP address conflict', 'The printers need encryption', 'The VPN is too slow', 'The SLA was missed'],
        why: 'Every device on a network needs its own IP address. Two devices sharing one will fight over it and drop off.' },
      { term: 'DHCP', prompt: 'Visitors\u2019 laptops connect to the guest Wi-Fi but show \u201cNo valid IP configuration.\u201d Office PCs with addresses typed in by hand work fine. What\u2019s most likely down?',
        options: ['The DHCP server', 'Active Directory', 'The firewall\u2019s logging', 'The help desk ticket system'],
        why: 'Devices that rely on DHCP can\u2019t get an address when it\u2019s down, while devices with addresses set by hand keep working.' },
      { term: 'Multi-factor authentication', prompt: 'An employee\u2019s password was leaked in a data breach, but the attacker still couldn\u2019t get into her email because they didn\u2019t have her phone. What protected her?',
        options: ['Multi-factor authentication', 'A strong firewall', 'Patch management', 'A daily backup'],
        why: 'Multi-factor authentication requires a second proof, like a code on your phone, so a stolen password alone isn\u2019t enough.' },
      { term: 'Phishing', prompt: 'An employee forwards an email \u201cfrom the CEO\u201d asking her to urgently buy $500 in gift cards and keep it quiet. The sender is a Gmail address. What is this?',
        options: ['A phishing attempt', 'A normal help desk ticket', 'A patch notice', 'An API request'],
        why: 'Urgency, secrecy, gift cards, and an outside email address are classic signs of phishing. Report it and don\u2019t reply.' },
      { term: 'Malware', prompt: 'After opening an email attachment, a user\u2019s files are all renamed and a message demands payment to unlock them. What has infected the computer?',
        options: ['Malware (ransomware)', 'A DNS error', 'A failed cron job', 'An expired VPN connection'],
        why: 'Ransomware is a type of malware that locks files until a ransom is paid. Disconnect the machine from the network right away.' },
      { term: 'Encryption', prompt: 'A sales laptop full of customer data is left on a train. IT isn\u2019t worried the data will be read. Why not?',
        options: ['The hard drive was encrypted', 'The laptop had a strong firewall', 'The DHCP server was off', 'The laptop was on the VPN'],
        why: 'Without the key, an encrypted drive is just scrambled data to whoever finds it.' },
      { term: 'Backup', prompt: 'A server\u2019s hard drive fails overnight. The team restores everything from last night\u2019s copy and loses only an hour of work. What saved them?',
        options: ['A backup', 'Encryption', 'The firewall', 'Multi-factor authentication'],
        why: 'A backup is a separate copy of data you can restore after a failure, a deletion, or an attack.' },
      { term: 'Cloud computing', prompt: 'Your company needs extra server power for a two-week project, without buying hardware that will sit unused afterward. What\u2019s the best fit?',
        options: ['Cloud computing', 'A bigger on-site server room', 'A new VPN', 'More DHCP addresses'],
        why: 'Cloud computing lets you rent capacity for exactly as long as you need it, then shut it off.' },
      { term: 'SaaS', prompt: 'Your company stops installing an accounting program on every PC and switches to a monthly subscription that runs in the browser and updates itself. What kind of software is this?',
        options: ['SaaS', 'Malware', 'An on-site server', 'A cron job'],
        why: 'Software as a Service runs on the vendor\u2019s systems. You pay a subscription instead of installing and maintaining it.' },
      { term: 'Server', prompt: 'The shared drive and the internal website went down at the same moment. Both run on the same machine in the back closet. What most likely failed?',
        options: ['The server hosting them', 'Each user\u2019s laptop', 'Everyone\u2019s passwords', 'The SLA'],
        why: 'When several services fail at once and share one machine, the server they run on is the first suspect.' },
      { term: 'Bandwidth', prompt: 'Video calls get choppy every afternoon while the whole office uploads large design files. What\u2019s being maxed out?',
        options: ['Bandwidth', 'DNS', 'Active Directory', 'Encryption'],
        why: 'Bandwidth is how much data the connection can carry at once. Lots of big uploads fill it up and squeeze out video calls.' },
      { term: 'Latency', prompt: 'A remote worker has a fast connection, but every click in her remote desktop session to a server overseas has a noticeable pause. What\u2019s the likely issue?',
        options: ['High latency', 'Low bandwidth', 'An IP address conflict', 'An expired password'],
        why: 'Her speed (bandwidth) is fine, but the distance adds delay to every round trip. That delay is latency.' },
      { term: 'Least privilege', prompt: 'A new marketing intern asks for admin rights to the finance server \u201cjust in case.\u201d What principle says you should decline?',
        options: ['Least privilege', 'Patch management', 'Latency', 'Uptime'],
        why: 'Least privilege means people only get the access their job needs. Extra access is extra risk if an account is hacked.' },
      { term: 'Root cause analysis', prompt: 'The same printer jams every Monday. You\u2019ve cleared it five times. Your manager asks you to figure out why it keeps happening instead. What is she asking for?',
        options: ['Root cause analysis', 'An escalation', 'A backup', 'A new SLA'],
        why: 'Clearing the jam fixes the symptom. Root cause analysis finds the underlying reason, like a paper type that only gets loaded on Mondays.' },
      { term: 'Escalation', prompt: 'You\u2019ve spent an hour on a ticket, followed every step in the knowledge base, and the fix needs server access you don\u2019t have. What should you do?',
        options: ['Escalate it to the next support tier', 'Close the ticket as resolved', 'Keep trying until the end of the day', 'Ask the user to restart again'],
        why: 'When a problem is beyond your skills or access, escalating it with good notes gets it fixed faster.' },
      { term: 'Incident', prompt: 'At 9 AM, fifty tickets arrive saying email is down. How should IT treat this?',
        options: ['As one major incident with a single owner and regular updates', 'As fifty separate low-priority tickets', 'As a scheduled maintenance window', 'As fifty password reset requests'],
        why: 'Many reports of the same outage are one incident. One owner and regular updates keep everyone informed while it\u2019s fixed.' },
      { term: 'Script', prompt: 'You need to create accounts for 40 summer interns from a spreadsheet. Doing it by hand would take all day. What should you use?',
        options: ['A script', 'An escalation', 'A firewall', 'Remote desktop'],
        why: 'A script can read the spreadsheet and create every account in minutes, with fewer typos.' },
      { term: 'Endpoint', prompt: 'Security wants antivirus and disk encryption on every laptop, phone, and tablet that connects to company systems. What are these devices called?',
        options: ['Endpoints', 'Servers', 'Firewalls', 'Scripts'],
        why: 'Endpoints are the devices at the edge of the network, and each one is a possible way in for attackers.' },
      { term: 'Remote desktop', prompt: 'A user in another office can\u2019t explain what\u2019s wrong with her settings. The fastest way to help is to see her screen and take control. What do you use?',
        options: ['Remote desktop', 'DHCP', 'A backup', 'A firewall'],
        why: 'Remote desktop lets IT see and control the user\u2019s computer from anywhere.' },
      { term: 'Knowledge base', prompt: 'The help desk answers \u201cHow do I connect to the office printer?\u201d twenty times a week. What would cut down those tickets?',
        options: ['A knowledge base article', 'An escalation', 'More bandwidth', 'A new firewall rule'],
        why: 'A clear self-help article in the knowledge base lets users solve common problems themselves.' },
      { term: 'Uptime', prompt: 'A vendor promises its system will be available 99.9% of the time. Over a 30-day month, about how much downtime does that allow?',
        options: ['About 43 minutes', 'About 3 days', 'About 7 hours', 'Zero minutes'],
        why: '0.1% of 30 days (43,200 minutes) is about 43 minutes. That promised availability is the uptime.' }
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
        why: 'Large public stocks trade every second at a clear price. The others can take weeks or months to sell at full value.' },
      { term: 'Revenue', prompt: 'A coffee shop sells 10,000 drinks at $5 each this quarter and spends $30,000 on rent and supplies. What is its revenue?',
        options: ['$50,000', '$20,000', '$80,000', '$30,000'],
        why: 'Revenue is total sales before costs: 10,000 × $5 = $50,000.' },
      { term: 'Gross margin', prompt: 'A company sells a product for $100 that costs $60 to make. What is its gross margin?',
        options: ['40%', '60%', '$60', '160%'],
        why: 'Gross margin is (revenue − cost to make) ÷ revenue: ($100 − $60) ÷ $100 = 40%.' },
      { term: 'Net income', prompt: 'Revenue is $1M, operating costs are $700K, interest is $50K, and taxes are $60K. What is net income?',
        options: ['$190,000', '$300,000', '$250,000', '$1,000,000'],
        why: 'Net income subtracts everything: $1M − $700K − $50K − $60K = $190K.' },
      { term: 'Free cash flow', prompt: 'A company brings in $500K of cash from operations and spends $200K on new equipment. How much free cash flow does it have?',
        options: ['$300,000', '$700,000', '$500,000', '$200,000'],
        why: 'Free cash flow is operating cash flow minus capital expenditures: $500K − $200K = $300K.' },
      { term: 'Balance sheet', prompt: 'Your manager asks how much cash and debt a company had on December 31. Which financial statement do you open?',
        options: ['The balance sheet', 'The income statement', 'The cash flow statement', 'The stock chart'],
        why: 'The balance sheet shows assets, liabilities, and equity at a single point in time, like year-end.' },
      { term: 'Income statement', prompt: 'You want to know whether a company made a profit last quarter. Which statement shows that?',
        options: ['The income statement', 'The balance sheet', 'A bond prospectus', 'The stock chart'],
        why: 'The income statement walks from revenue through expenses to profit for a period of time.' },
      { term: 'Cash flow statement', prompt: 'A company reports a profit, but its bank balance keeps shrinking. Which statement will show where the money actually went?',
        options: ['The cash flow statement', 'The income statement', 'The balance sheet alone', 'The P/E ratio'],
        why: 'Profit isn\u2019t the same as cash. The cash flow statement shows actual money in and out, like customers paying late or big equipment purchases.' },
      { term: 'Market capitalization', prompt: 'A company\u2019s stock trades at $40 and it has 50 million shares outstanding. What is its market capitalization?',
        options: ['$2 billion', '$40 million', '$90 million', '$1.25 billion'],
        why: 'Market cap is price × shares: $40 × 50 million = $2 billion.' },
      { term: 'Enterprise value', prompt: 'A company has a market cap of $800M, $300M of debt, and $100M of cash. What is its enterprise value?',
        options: ['$1 billion', '$1.2 billion', '$800 million', '$600 million'],
        why: 'Enterprise value = market cap + debt − cash: $800M + $300M − $100M = $1B.' },
      { term: 'Dividend', prompt: 'You own 200 shares of a company that announces a $0.50-per-share quarterly payout. How much will you receive this quarter?',
        options: ['$100', '$50', '$400', '$0.50'],
        why: 'A dividend is paid per share: 200 × $0.50 = $100.' },
      { term: 'Bond', prompt: 'A city needs $50M for a new bridge and wants to borrow it from investors, paying 4% interest a year for 10 years. What will it issue?',
        options: ['Bonds', 'Shares of stock', 'Dividends', 'Options'],
        why: 'Bonds are how governments and companies borrow from investors in exchange for interest payments.' },
      { term: 'Yield', prompt: 'A bond costs $1,000 and pays $50 of interest a year. What is its yield?',
        options: ['5%', '50%', '0.5%', '20%'],
        why: 'Yield is annual income ÷ price: $50 ÷ $1,000 = 5%.' },
      { term: 'Equity', prompt: 'A company has $10M in assets and $6M in liabilities. How much belongs to the shareholders?',
        options: ['$4M', '$16M', '$6M', '$10M'],
        why: 'Shareholders\u2019 equity is assets minus liabilities: $10M − $6M = $4M.' },
      { term: 'Leverage', prompt: 'Two companies earn the same profit, but one funded most of its growth with loans. If sales drop sharply, which is in more danger?',
        options: ['The one with more leverage', 'The one with less debt', 'Both are equally at risk', 'Neither, since their profits are equal'],
        why: 'Loan payments are due no matter what. When sales fall, companies with high leverage feel it most.' },
      { term: 'Diversification', prompt: 'A new employee puts her entire retirement account into her own company\u2019s stock. What would a financial advisor say is missing?',
        options: ['Diversification', 'Leverage', 'Liquidity', 'A higher P/E ratio'],
        why: 'If the company struggles, she could lose her job and her savings at the same time. Spreading money across many investments reduces that risk.' },
      { term: 'Compound interest', prompt: 'You invest $1,000 at 10% a year and reinvest the earnings. How much do you have after two years?',
        options: ['$1,210', '$1,200', '$1,100', '$2,000'],
        why: 'Year 1: $1,000 × 1.10 = $1,100. Year 2: $1,100 × 1.10 = $1,210. The extra $10 is interest earned on interest.' },
      { term: 'Present value', prompt: 'Would you rather have $1,000 today or $1,000 in five years, if you could invest money at 5% a year?',
        options: ['Today, because $1,000 in five years has a lower present value', 'In five years, because it will be worth more', 'It doesn\u2019t matter, since it\u2019s the same $1,000', 'In five years, because of inflation'],
        why: 'Money today can be invested and grow, so $1,000 received later is worth less in today\u2019s terms.' },
      { term: 'IRR', prompt: 'Project A has an expected IRR of 14% and Project B has 9%. The company\u2019s cost of capital is 10%. Which should it pursue?',
        options: ['Project A, because its return beats the cost of capital', 'Project B, because lower returns are safer', 'Both, because both returns are positive', 'Neither, because IRR doesn\u2019t matter'],
        why: 'A project is worth doing when its IRR is higher than what the money costs. 14% clears the 10% hurdle; 9% doesn\u2019t.' },
      { term: 'NPV', prompt: 'A project costs $100K today. The future cash it generates is worth $85K in today\u2019s dollars. What should you recommend?',
        options: ['Reject it: its NPV is −$15K', 'Accept it: it generates cash', 'Accept it: its NPV is $85K', 'Accept it: its NPV is $185K'],
        why: 'NPV = $85K − $100K = −$15K. A negative NPV means the project destroys value.' },
      { term: 'CapEx', prompt: 'Which of these is a capital expenditure?',
        options: ['Buying a $2M machine for the factory', 'Paying this month\u2019s electric bill', 'Paying employees\u2019 salaries', 'Buying snacks for the office'],
        why: 'CapEx is spending on long-term assets that will be used for years, like machinery.' },
      { term: 'Variance analysis', prompt: 'Marketing spent $120K last quarter against a $100K budget. Your manager asks you to explain the $20K gap. What is this work called?',
        options: ['Variance analysis', 'Due diligence', 'A DCF', 'Diversification'],
        why: 'Variance analysis compares actuals to the budget and explains the differences, like an unplanned trade show.' },
      { term: 'Forecast', prompt: 'Sales grew about 5% a year for the last three years. Your manager asks what you expect sales to be next year. What are you building?',
        options: ['A forecast', 'A balance sheet', 'A variance analysis', 'A dividend'],
        why: 'A forecast projects future results using history and assumptions, like continued 5% growth.' }
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
        why: 'A buyer persona is a profile of your ideal customer that guides messaging and targeting.' },
      { term: 'KPI', prompt: 'Your manager says the goal this quarter is to grow newsletter sign-ups. Which is the best KPI to track?',
        options: ['New newsletter sign-ups per week', 'How many ads the team designed', 'How many team meetings were held', 'The office Wi-Fi speed'],
        why: 'A good KPI measures progress toward the actual goal, which here is sign-ups.' },
      { term: 'Impressions', prompt: 'One person scrolls past your ad three times in a day. How does that count?',
        options: ['3 impressions and a reach of 1', '1 impression and a reach of 3', '3 clicks', '3 conversions'],
        why: 'Impressions count every display. Reach counts unique people, so it\u2019s still 1.' },
      { term: 'Reach', prompt: 'Your post was displayed 12,000 times to 4,000 different people. What is its reach?',
        options: ['4,000', '12,000', '3', '16,000'],
        why: 'Reach counts unique people. The 12,000 is impressions, since some people saw it more than once.' },
      { term: 'Engagement rate', prompt: 'A post reached 10,000 people and got 300 likes, comments, and shares. What is its engagement rate?',
        options: ['3%', '30%', '0.3%', '300%'],
        why: 'Engagement rate = interactions ÷ reach: 300 ÷ 10,000 = 3%.' },
      { term: 'CPC', prompt: 'You spent $500 on a search campaign that got 250 clicks. What was your CPC?',
        options: ['$2.00', '$0.50', '$250', '$5.00'],
        why: 'CPC = spend ÷ clicks: $500 ÷ 250 = $2.00.' },
      { term: 'CPM', prompt: 'A display campaign cost $1,200 and delivered 400,000 impressions. What was the CPM?',
        options: ['$3.00', '$0.003', '$300', '$30'],
        why: 'CPM = spend ÷ impressions × 1,000: $1,200 ÷ 400,000 × 1,000 = $3.00.' },
      { term: 'Funnel', prompt: '10,000 people visit your site, 2,000 add something to their cart, and 100 buy. Where is the weakest step?',
        options: ['Between adding to cart and buying', 'Between visiting and adding to cart', 'Before people reach the site', 'There\u2019s no drop-off'],
        why: 'Visit to cart keeps 20% of people (10,000 → 2,000), but cart to purchase keeps only 5% (2,000 → 100). That\u2019s the weakest step in the funnel.' },
      { term: 'Call to action', prompt: 'An email gets lots of opens, but almost nobody clicks. Reading it, you notice it never tells readers what to do and has no obvious link or button. What\u2019s missing?',
        options: ['A clear call to action', 'More impressions', 'A lower CPM', 'A buyer persona'],
        why: 'Without a clear call to action like a \u201cShop the sale\u201d button, readers don\u2019t know what to do next.' },
      { term: 'Landing page', prompt: 'Your ad for a free budgeting guide sends people to your homepage, and they can\u2019t find the guide. What should you build?',
        options: ['A dedicated landing page for the guide', 'A new buyer persona', 'A longer email', 'More ad impressions'],
        why: 'A landing page matches the ad\u2019s promise and has one goal, which improves conversion.' },
      { term: 'Brand awareness', prompt: 'A new sneaker company isn\u2019t pushing sales yet. It just wants people to recognize its name and logo. What\u2019s the campaign goal?',
        options: ['Brand awareness', 'Retargeting', 'Lower CAC', 'Higher conversion rate'],
        why: 'Building recognition before pushing sales is a brand awareness goal, measured with reach, impressions, and surveys.' },
      { term: 'Target audience', prompt: 'A company selling college dorm supplies is running most of its ads to retirees. What\u2019s gone wrong?',
        options: ['The ads aren\u2019t reaching the target audience', 'The CPM is too low', 'The ads need more impressions', 'The landing page is too short'],
        why: 'The target audience is incoming college students and their parents. Ads shown to retirees waste budget.' },
      { term: 'Retargeting', prompt: 'A shopper puts shoes in her cart, leaves without buying, and then sees ads for those exact shoes on social media. What is this?',
        options: ['Retargeting', 'Organic traffic', 'Brand awareness', 'SEO'],
        why: 'Retargeting follows up with people who already showed interest, which often converts better than reaching new people.' },
      { term: 'Organic traffic', prompt: 'Your blog posts started ranking on Google\u2019s first page and visits went up, without any ad spend. What grew?',
        options: ['Organic traffic', 'Paid media', 'Retargeting', 'CPC'],
        why: 'Visitors from unpaid search results are organic traffic, usually the payoff from good SEO.' },
      { term: 'Paid media', prompt: 'Your manager wants a list of every channel where you buy placements: Google Ads, Instagram ads, and a podcast sponsorship. What category are these?',
        options: ['Paid media', 'Organic traffic', 'Earned media', 'Owned media'],
        why: 'Anything you pay to place is paid media. Your own website is owned media, and press coverage is earned media.' },
      { term: 'Churn rate', prompt: 'A streaming service starts the month with 20,000 subscribers, and 1,000 cancel. What\u2019s the monthly churn rate?',
        options: ['5%', '20%', '1%', '50%'],
        why: 'Churn = customers lost ÷ customers at the start: 1,000 ÷ 20,000 = 5%.' },
      { term: 'Customer lifetime value', prompt: 'A customer spends $50 a month and stays 2 years on average. It costs $300 to win each customer. What\u2019s true?',
        options: ['Lifetime value ($1,200) is well above CAC ($300), which is healthy', 'CAC is higher than lifetime value', 'Lifetime value is $50', 'You can\u2019t compare them'],
        why: 'Lifetime value is $50 × 24 months = $1,200. Earning $4 for every $1 spent to win a customer is healthy.' },
      { term: 'Content calendar', prompt: 'Your team keeps scrambling for social posts at the last minute, and it missed a holiday sale entirely. What tool would help?',
        options: ['A content calendar', 'A lower CPM', 'A retargeting list', 'A buyer persona'],
        why: 'A content calendar plans posts ahead, so key dates like holiday sales don\u2019t sneak up on you.' },
      { term: 'Influencer marketing', prompt: 'A skincare brand sends free products and pays a fee to a TikTok creator with 500,000 followers to review them. What strategy is this?',
        options: ['Influencer marketing', 'SEO', 'Organic traffic', 'Retargeting'],
        why: 'Partnering with creators to reach their audience is influencer marketing. Sponsored posts must be clearly disclosed.' },
      { term: 'Segmentation', prompt: 'Instead of sending one email to all 50,000 subscribers, you send one version to first-time buyers and another to loyal repeat customers. What are you doing?',
        options: ['Segmentation', 'Retargeting', 'Churn analysis', 'Paid media'],
        why: 'Segmentation splits your audience into groups so each one gets a more relevant message.' },
      { term: 'Bounce rate', prompt: '80% of visitors from a new ad leave the landing page within seconds without clicking anything. Which metric is high?',
        options: ['Bounce rate', 'CTR', 'Reach', 'Customer lifetime value'],
        why: 'Leaving after one page without interacting is a bounce. A high bounce rate often means the page doesn\u2019t match what the ad promised.' },
      { term: 'Open rate', prompt: 'You sent a newsletter to 8,000 subscribers, and 2,000 opened it. What was the open rate?',
        options: ['25%', '4%', '2,000', '75%'],
        why: 'Open rate = opens ÷ emails delivered: 2,000 ÷ 8,000 = 25%.' },
      { term: 'Value proposition', prompt: 'Which is the strongest headline for a meal-kit company\u2019s homepage?',
        options: ['\u201cDinner in 20 minutes, no grocery trip needed.\u201d', '\u201cWe are a leading, innovative food company.\u201d', '\u201cFounded in 2019.\u201d', '\u201cClick here.\u201d'],
        why: 'A strong value proposition names a specific benefit customers care about, like saving time on dinner.' },
      { term: 'Market share', prompt: 'Total U.S. sales of sports drinks are $10B, and your brand sells $1.5B. What\u2019s your market share?',
        options: ['15%', '1.5%', '85%', '6.7%'],
        why: 'Market share = your sales ÷ total market: $1.5B ÷ $10B = 15%.' }
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
        why: 'Finalizing and reviewing last month\u2019s books in the first days of the new month is the month-end close.' },
      { term: 'General ledger', prompt: 'Your manager asks for every transaction posted to the Office Supplies account this year. Where do you find the complete list?',
        options: ['The general ledger', 'A single invoice', 'The bank statement', 'A purchase order'],
        why: 'The general ledger is the master record of every transaction, organized by account.' },
      { term: 'Debit', prompt: 'Your company buys $800 of office supplies with cash. How is the Supplies account recorded?',
        options: ['Debit Supplies, because the asset increased', 'Credit Supplies', 'Supplies isn\u2019t touched, only Cash', 'Debit Supplies and debit Cash'],
        why: 'Supplies is an asset that went up, and assets increase with a debit. Cash goes down with a credit.' },
      { term: 'Credit', prompt: 'A customer pays $1,000 in cash for a service you just finished. Which account is credited?',
        options: ['Service revenue', 'Cash', 'Accounts payable', 'Supplies expense'],
        why: 'Revenue increases with a credit. Cash, the asset that went up, is debited.' },
      { term: 'Assets', prompt: 'Which of these is an asset?',
        options: ['A delivery truck the company owns', 'A bank loan the company must repay', 'Wages owed to employees', 'Next month\u2019s rent bill'],
        why: 'Assets are things the company owns that have value. The others are amounts the company owes, which are liabilities.' },
      { term: 'Liabilities', prompt: 'A company has $500K in assets and $200K in equity. How much does it owe to others?',
        options: ['$300K', '$700K', '$200K', '$500K'],
        why: 'Assets = liabilities + equity, so liabilities = $500K − $200K = $300K.' },
      { term: 'Chart of accounts', prompt: 'You need to record a new kind of expense and aren\u2019t sure which account number to use. Where do you look?',
        options: ['The chart of accounts', 'The trial balance', 'The aging report', 'The fiscal year calendar'],
        why: 'The chart of accounts lists every account and its number, so everyone records things the same way.' },
      { term: 'Trial balance', prompt: 'Before preparing financial statements, you run a report showing total debits of $482,300 and total credits of $481,800. What does it tell you?',
        options: ['There\u2019s a $500 error to find before moving on', 'The books are ready to close', 'Revenue was $500 higher than expected', 'Nothing, since small differences are normal'],
        why: 'A trial balance should show equal debits and credits. A $500 difference means something was posted wrong.' },
      { term: 'Accrued expense', prompt: 'Employees worked the last week of June, but payday isn\u2019t until July 5. How should June\u2019s books handle those wages?',
        options: ['Record an accrued expense in June', 'Record nothing until July 5', 'Record the wages as revenue', 'Record the wages as a prepaid expense'],
        why: 'The work happened in June, so the cost belongs in June, even though the cash goes out in July.' },
      { term: 'Prepaid expense', prompt: 'On January 1, your company pays $12,000 for a full year of insurance. How much should be expensed in January?',
        options: ['$1,000', '$12,000', '$0', '$6,000'],
        why: 'This is a prepaid expense. Spread the $12,000 over 12 months: $1,000 a month.' },
      { term: 'Deferred revenue', prompt: 'A software company collects $2,400 in January for a 12-month subscription. How much can it count as revenue in January?',
        options: ['$200, with the rest held as deferred revenue', '$2,400', '$0', '$1,200'],
        why: 'Revenue is earned as the service is delivered: $2,400 ÷ 12 = $200 a month. The remaining $2,200 is deferred revenue.' },
      { term: 'Invoice', prompt: 'You finished a $3,000 project for a client with 30-day payment terms. What do you send them?',
        options: ['An invoice', 'A purchase order', 'A trial balance', 'A reconciliation'],
        why: 'An invoice tells the customer what they owe and when. Sending it creates an account receivable.' },
      { term: 'Purchase order', prompt: 'Your company wants to order 500 laptops from a supplier at $900 each. What document formally places the order?',
        options: ['A purchase order', 'An invoice', 'A journal entry', 'An aging report'],
        why: 'The buyer issues a purchase order. The supplier sends an invoice later, after delivering.' },
      { term: 'Three-way match', prompt: 'The purchase order says 100 chairs, the warehouse received 90, and the invoice bills for 100. What should accounts payable do?',
        options: ['Hold payment and resolve the 10-chair gap', 'Pay the full invoice', 'Pay for 100 and ask for 10 more chairs', 'Delete the purchase order'],
        why: 'The three-way match failed. You only pay for what was ordered and actually received.' },
      { term: 'Cost of goods sold', prompt: 'A bike shop sells 40 bikes it bought for $300 each. It also paid $2,000 in rent. What is its cost of goods sold?',
        options: ['$12,000', '$14,000', '$2,000', '$300'],
        why: 'COGS is the direct cost of the items sold: 40 × $300 = $12,000. Rent is an operating expense, not COGS.' },
      { term: 'Inventory', prompt: 'At year-end, a store counts $45,000 of unsold products on its shelves and in the back room. Where does that appear?',
        options: ['On the balance sheet as an asset', 'On the income statement as an expense', 'As deferred revenue', 'As accounts payable'],
        why: 'Unsold goods are inventory, which is an asset. They become cost of goods sold only when they\u2019re sold.' },
      { term: 'Audit', prompt: 'Your company\u2019s lender requires an outside CPA firm to review the financial statements every year and give an opinion. What is this?',
        options: ['An audit', 'A reconciliation', 'Month-end close', 'A three-way match'],
        why: 'An audit is an independent check that the financial statements are fairly presented.' },
      { term: 'GAAP', prompt: 'To hit a target, a manager wants to record a big sale this year even though the product won\u2019t ship until next year. Why can\u2019t the accountant do that?',
        options: ['GAAP requires revenue to be recorded when it\u2019s earned', 'The trial balance won\u2019t allow it', 'The chart of accounts is full', 'Only auditors can record revenue'],
        why: 'Under GAAP, revenue is recorded when it\u2019s earned, generally when the product is delivered, not when it\u2019s convenient.' },
      { term: 'Internal controls', prompt: 'The same employee creates new vendors, approves invoices, and sends payments. Why does the controller want to split those jobs up?',
        options: ['It\u2019s a weak internal control that makes fraud easier', 'It\u2019s too slow', 'It breaks the chart of accounts', 'It raises cost of goods sold'],
        why: 'Separating duties is a key internal control. One person doing everything could pay a fake vendor without anyone noticing.' },
      { term: 'Petty cash', prompt: 'The office needs $15 of stamps today, and nobody wants to file a full purchase order. What\u2019s the usual way to pay?',
        options: ['Petty cash, with a receipt', 'A purchase order', 'A wire transfer', 'Deferred revenue'],
        why: 'Petty cash covers small, everyday purchases. Keeping the receipt lets you reconcile the fund later.' },
      { term: 'Payroll', prompt: 'An employee earns $2,000 per paycheck, but her bank deposit is $1,550. What explains the difference?',
        options: ['Payroll withheld taxes and deductions', 'The bank charged a fee', 'It\u2019s deferred revenue', 'It\u2019s an accrued expense'],
        why: 'Payroll subtracts taxes, retirement contributions, and benefit costs before paying the net amount.' },
      { term: 'Write-off', prompt: 'A customer who owed $4,000 went out of business, and there\u2019s no chance you\u2019ll be paid. What should you do?',
        options: ['Write off the $4,000 receivable', 'Keep it in accounts receivable forever', 'Record it as revenue again', 'Move it to accounts payable'],
        why: 'When a receivable can\u2019t be collected, it\u2019s written off so the books don\u2019t overstate what you\u2019ll receive.' },
      { term: 'Aging report', prompt: 'Your manager wants to know which customers are more than 90 days late on paying. Which report do you pull?',
        options: ['The accounts receivable aging report', 'The trial balance', 'The chart of accounts', 'The payroll register'],
        why: 'An aging report groups unpaid invoices by how old they are, so collections can focus on the oldest.' },
      { term: 'Fiscal year', prompt: 'A retailer\u2019s books run from February 1 to January 31 so the whole holiday season lands in one reporting year. What is that 12-month period called?',
        options: ['Its fiscal year', 'Its month-end close', 'Its aging period', 'Its audit cycle'],
        why: 'A fiscal year is the company\u2019s own 12-month accounting year, which doesn\u2019t have to be January to December.' }
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
        why: 'Deliverables are the specific outputs you promised the client.' },
      { term: 'Engagement', prompt: 'Your firm signs a 10-week project with a retail client, from kickoff through the final presentation. What do consultants call the whole project?',
        options: ['An engagement', 'A workstream', 'A stakeholder', 'A quick win'],
        why: 'An engagement is one full client project, from kickoff to final delivery.' },
      { term: 'Issue tree', prompt: 'Your manager writes \u201cHow can we grow profits?\u201d at the top of a whiteboard, splits it into \u201craise revenue\u201d and \u201ccut costs,\u201d then splits each of those further. What is she building?',
        options: ['An issue tree', 'A SWOT analysis', 'A statement of work', 'A steering committee'],
        why: 'An issue tree breaks a problem into branches so the team can divide it up and analyze each piece.' },
      { term: 'Statement of work', prompt: 'A client says, \u201cI thought you were also redesigning our website.\u201d Where do you check what was actually agreed?',
        options: ['The statement of work', 'The issue tree', 'The kickoff meeting notes', 'The SWOT analysis'],
        why: 'The statement of work defines exactly what\u2019s in scope. It\u2019s your best defense against scope creep.' },
      { term: 'Kickoff meeting', prompt: 'It\u2019s day one of a new project. You\u2019re meeting the client team to confirm goals, introduce everyone, and walk through the timeline. What meeting is this?',
        options: ['The kickoff meeting', 'The steering committee', 'The final readout', 'An expert interview'],
        why: 'The kickoff meeting gets everyone aligned before the work begins.' },
      { term: 'Workstream', prompt: 'A project is split into three parts — pricing, supply chain, and customer research — each with its own lead. What is each part called?',
        options: ['A workstream', 'A deliverable', 'A stakeholder', 'An engagement'],
        why: 'Large projects are divided into workstreams so small teams can own and move each part forward.' },
      { term: 'Benchmarking', prompt: 'The client takes 5 days to deliver orders. You gather data showing its top three competitors average 2 days. What analysis did you do?',
        options: ['Benchmarking', 'Market sizing', 'Change management', 'A SWOT analysis'],
        why: 'Benchmarking compares the client against its peers to show where it lags or leads.' },
      { term: 'Market sizing', prompt: 'A client asks how many pizzas are sold in the U.S. each year, and there\u2019s no report available. What do you do?',
        options: ['Build an estimate from population and eating habits', 'Tell them it can\u2019t be known', 'Guess a round number', 'Email pizza shops and wait'],
        why: 'Market sizing estimates a number step by step, like people × pizzas per person per year.' },
      { term: '80/20 rule', prompt: 'You find that 20 of a client\u2019s 100 products bring in most of its profit. What should the client focus on first?',
        options: ['Those top 20 products', 'All 100 products equally', 'The 80 weakest products', 'Adding more products'],
        why: 'The 80/20 rule says a small share of inputs drives most of the results, so focus effort there.' },
      { term: 'Pyramid principle', prompt: 'You send a partner a six-paragraph update that walks through your analysis and ends with the recommendation. She says to flip it. What is she asking for?',
        options: ['Lead with the answer, then the reasons', 'Add more data', 'Use more bullet points', 'Send it straight to the client'],
        why: 'The pyramid principle puts the answer first, then the reasons, so busy readers get the point immediately.' },
      { term: 'SWOT analysis', prompt: 'In a planning session, the team lists the client\u2019s loyal customers, its outdated website, a growing overseas market, and a new low-price competitor. What framework is this?',
        options: ['A SWOT analysis', 'An issue tree', 'Market sizing', 'Benchmarking'],
        why: 'Loyal customers (strength), an outdated site (weakness), an overseas market (opportunity), and a new competitor (threat) fill the four SWOT boxes.' },
      { term: 'Steering committee', prompt: 'Every month, the client\u2019s CEO, CFO, and COO meet with your partner to review progress and approve major decisions. What is this group?',
        options: ['The steering committee', 'A workstream', 'The kickoff team', 'The interview panel'],
        why: 'A steering committee is the senior group that guides the project and signs off on key decisions.' },
      { term: 'Change management', prompt: 'A client installed a new sales system, but six months later most reps still track deals in their old spreadsheets. What was underinvested?',
        options: ['Change management', 'Market sizing', 'Benchmarking', 'The statement of work'],
        why: 'A new system only works if people use it. Change management covers the training, communication, and support that make it stick.' },
      { term: 'Billable hours', prompt: 'You spent 3 hours on client research, 1 hour at an internal training, and 2 hours building the client\u2019s model. How many hours can you bill?',
        options: ['5', '6', '3', '1'],
        why: 'Only client work counts: 3 hours of research + 2 hours on the model = 5 billable hours.' },
      { term: 'So what', prompt: 'Your slide says, \u201cCustomer complaints rose 30% last quarter.\u201d Your manager writes \u201cSo what?\u201d in the margin. What should you add?',
        options: ['What it means and what the client should do about it', 'More decimal places', 'A second chart of the same data', 'A different font'],
        why: 'Every finding needs a \u201cso what\u201d: the implication and the action it points to.' },
      { term: 'Implementation roadmap', prompt: 'The client agrees with your recommendation to open 10 new stores but asks, \u201cWhat do we do first, and by when?\u201d What do you deliver next?',
        options: ['An implementation roadmap', 'A new SWOT analysis', 'More benchmarking', 'An issue tree'],
        why: 'An implementation roadmap turns a recommendation into ordered steps with owners and dates.' },
      { term: 'Pain point', prompt: 'In customer interviews, 7 out of 10 people complain that checkout takes too long. What have you found?',
        options: ['A key pain point', 'A quick win', 'A steering committee', 'A deliverable'],
        why: 'A pain point is a real, repeated frustration, and it\u2019s often where the biggest opportunity is.' },
      { term: 'Quick win', prompt: 'In week one, you spot a broken coupon button in the client\u2019s online checkout that\u2019s costing sales. It takes a day to fix. What is this?',
        options: ['A quick win', 'Scope creep', 'Change management', 'An implementation roadmap'],
        why: 'Quick wins are fast, cheap fixes that show value early and build trust for the harder work.' },
      { term: 'Best practice', prompt: 'You recommend the client adopt the same inventory approach used by the top three retailers in its industry. What are you recommending?',
        options: ['A best practice', 'A pain point', 'A hypothesis', 'A SWOT analysis'],
        why: 'Best practices are proven methods that leading organizations already use successfully.' },
      { term: 'Synthesis', prompt: 'You\u2019ve done 20 interviews and built 40 charts. Your manager asks you to boil it all down to three key insights. What skill is she asking for?',
        options: ['Synthesis', 'Market sizing', 'Benchmarking', 'Billable hours'],
        why: 'Synthesis turns a pile of data into a few clear insights. It\u2019s one of the most valued consulting skills.' },
      { term: 'Buy-in', prompt: 'Your recommendation is solid, but the client\u2019s head of operations wasn\u2019t consulted and is now blocking it. What did the team fail to get?',
        options: ['Her buy-in', 'A quick win', 'A bigger market size', 'More billable hours'],
        why: 'Without buy-in from key people, even a strong recommendation can stall. Involve them early.' },
      { term: 'Value chain', prompt: 'To find where costs are too high, you map every step the client takes: buying materials, manufacturing, shipping, selling, and customer service. What are you mapping?',
        options: ['The value chain', 'The issue tree', 'The steering committee', 'The statement of work'],
        why: 'The value chain covers every activity that creates and delivers the product, which helps show where costs or value are lost.' },
      { term: "Porter's Five Forces", prompt: 'A client wants to know whether the airline industry is an attractive one to enter. Which framework fits best?',
        options: ['Porter\u2019s Five Forces', 'The 80/20 rule', 'The pyramid principle', 'A kickoff meeting'],
        why: 'Porter\u2019s Five Forces assesses how competitive, and so how profitable, an industry is likely to be.' },
      { term: 'Interview guide', prompt: 'Tomorrow you\u2019re interviewing five client managers about their biggest challenges. What should you prepare so each conversation covers the same topics?',
        options: ['An interview guide', 'A statement of work', 'A SWOT analysis', 'An implementation roadmap'],
        why: 'An interview guide keeps interviews consistent, so answers can be compared across people.' }
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
        why: 'Headcount is the number of people employed. Adding positions increases it.' },
      { term: 'Performance review', prompt: 'It\u2019s December, and every manager is filling out ratings and written feedback on each person\u2019s work this year. What\u2019s happening?',
        options: ['Performance reviews', 'Open enrollment', 'Onboarding', 'Exit interviews'],
        why: 'A performance review is a formal, scheduled evaluation of someone\u2019s work.' },
      { term: 'Offboarding', prompt: 'An employee\u2019s last day is Friday. What should HR make sure happens?',
        options: ['Collect equipment, remove system access, and process final pay', 'Nothing, since IT will handle it later', 'Start her onboarding again', 'Add her to open enrollment'],
        why: 'Offboarding closes out an employee\u2019s time cleanly and protects company systems.' },
      { term: 'Turnover rate', prompt: 'A company averaged 200 employees this year, and 30 left. What\u2019s its annual turnover rate?',
        options: ['15%', '30%', '6.7%', '85%'],
        why: 'Turnover = people who left ÷ average headcount: 30 ÷ 200 = 15%.' },
      { term: 'Job description', prompt: 'A hiring manager says, \u201cJust post something saying we need help in finance.\u201d What should HR write first?',
        options: ['A clear job description', 'An exit interview', 'Form I-9', 'A benefits guide'],
        why: 'A job description sets expectations for candidates and gives recruiters and interviewers something to evaluate against.' },
      { term: 'Requisition', prompt: 'A manager wants to hire a new analyst. Before HR can post the job, what usually needs to be approved?',
        options: ['A job requisition', 'An exit interview', 'A background check', 'Open enrollment'],
        why: 'A requisition is the approved request to fill a role. It confirms there\u2019s budget and headcount for it.' },
      { term: 'Background check', prompt: 'A candidate accepted a conditional offer for a job handling customer finances. What step usually comes next, with her written consent?',
        options: ['A background check', 'An exit interview', 'Open enrollment', 'A performance review'],
        why: 'Background checks are usually run after a conditional offer, and U.S. law requires the candidate\u2019s written consent first.' },
      { term: 'Form I-9', prompt: 'A new hire starts Monday. Which form must be finished by her third day to verify she\u2019s authorized to work in the U.S.?',
        options: ['Form I-9', 'Form W-4', 'A job requisition', 'A 401(k) enrollment form'],
        why: 'The employee completes her section of the I-9 by day one, and the employer reviews her documents by day three.' },
      { term: 'Form W-4', prompt: 'An employee says too much tax is being taken out of every paycheck. Which form should she update?',
        options: ['Form W-4', 'Form I-9', 'Her job description', 'Her exit interview'],
        why: 'The W-4 tells payroll how much federal income tax to withhold.' },
      { term: 'FMLA', prompt: 'An eligible employee needs 10 weeks off to care for her father after surgery. Which law protects her job during that unpaid leave?',
        options: ['FMLA', 'Open enrollment', 'Form W-4', 'Exempt status'],
        why: 'FMLA gives eligible employees up to 12 weeks of unpaid, job-protected leave for family and medical reasons.' },
      { term: 'PTO', prompt: 'An employee earns 1.5 paid days off per month. How many days will she earn in a full year?',
        options: ['18', '12', '15', '24'],
        why: '1.5 days × 12 months = 18 days of PTO.' },
      { term: '401(k) match', prompt: 'Your company matches 100% of retirement contributions up to 4% of salary. An employee earning $50,000 contributes 4%. How much does the company add?',
        options: ['$2,000', '$4,000', '$1,000', '$0'],
        why: '4% of $50,000 is $2,000, and the company matches it dollar for dollar.' },
      { term: 'Employee handbook', prompt: 'A new hire asks how many sick days she gets and what the dress code is. Where should HR point her?',
        options: ['The employee handbook', 'Her job requisition', 'Her W-4', 'The ATS'],
        why: 'The employee handbook collects company policies in one place.' },
      { term: 'Non-exempt employee', prompt: 'An hourly warehouse associate who earns $20 an hour works 44 hours this week. What is she owed for the extra 4 hours?',
        options: ['$30 an hour, since she\u2019s non-exempt', '$20 an hour', 'Nothing extra', 'A day of PTO instead'],
        why: 'Non-exempt employees must get 1.5 times their regular rate for hours over 40: $20 × 1.5 = $30.' },
      { term: 'Pay band', prompt: 'The analyst role pays $60K–$75K. A strong candidate asks for $90K. What\u2019s the HR problem?',
        options: ['The request is well above the role\u2019s pay band', 'The requisition isn\u2019t approved', 'She isn\u2019t eligible for FMLA', 'The ATS will reject her'],
        why: 'Pay bands keep pay fair and consistent. Going far outside one needs special approval or a different job level.' },
      { term: 'Employee engagement', prompt: 'A survey shows employees feel their work doesn\u2019t matter and they\u2019re rarely recognized. Which HR measure is low?',
        options: ['Employee engagement', 'Headcount', 'Pay band', 'Open enrollment'],
        why: 'Engagement is about motivation and connection. Low engagement often shows up later as low retention.' },
      { term: 'Exit interview', prompt: 'Three people from the same team resigned this quarter. How can HR find out why?',
        options: ['Hold exit interviews', 'Run open enrollment', 'Update their W-4s', 'Increase headcount'],
        why: 'Exit interviews uncover why people leave, like a problem with a manager, so HR can fix it.' },
      { term: 'Structured interview', prompt: 'Two managers interviewing for the same role each ask whatever comes to mind, and their ratings can\u2019t be compared. What should HR introduce?',
        options: ['Structured interviews', 'Longer interviews', 'More background checks', 'A new employee handbook'],
        why: 'Structured interviews make comparisons fairer and reduce bias, because everyone gets the same questions and scoring.' },
      { term: 'DEI', prompt: 'HR notices that every job posting goes to just one university, and nearly all new hires come from the same background. What kind of effort would address this?',
        options: ['A DEI effort to widen recruiting', 'A payroll change', 'A new W-4 policy', 'Offboarding'],
        why: 'Recruiting from a wider range of schools and communities brings in more diverse candidates and perspectives.' },
      { term: 'Employer brand', prompt: 'Online reviews call the company \u201ca burnout factory,\u201d and strong candidates keep turning down offers. What does HR need to work on?',
        options: ['Its employer brand', 'Its pay band paperwork', 'Its I-9 process', 'Its PTO accrual'],
        why: 'Employer brand is your reputation as a workplace. A bad one makes hiring much harder.' },
      { term: 'HRIS', prompt: 'HR tracks employee addresses in one spreadsheet, PTO in another, and benefits on paper. What system would bring it all together?',
        options: ['An HRIS', 'An ATS', 'A requisition', 'An exit interview'],
        why: 'An HRIS stores current employee data in one place. An ATS handles candidates before they\u2019re hired.' },
      { term: 'Probationary period', prompt: 'A new hire\u2019s offer letter says her first 90 days include check-ins every two weeks to review her progress. What is this period called?',
        options: ['A probationary period', 'Open enrollment', 'FMLA leave', 'Offboarding'],
        why: 'A probationary period is an early review window for new hires.' },
      { term: 'Succession planning', prompt: 'The company\u2019s CFO plans to retire in two years, and no one is ready to replace her. What should HR have been doing?',
        options: ['Succession planning', 'Offboarding', 'Open enrollment', 'Background checks'],
        why: 'Succession planning builds a pipeline of people ready to step into key roles.' },
      { term: "Workers' compensation", prompt: 'A warehouse employee hurts her back lifting boxes at work and misses two weeks. What covers her medical bills and part of her lost pay?',
        options: ['Workers\u2019 compensation', 'FMLA', 'Her 401(k) match', 'PTO'],
        why: 'Workers\u2019 compensation insurance covers on-the-job injuries, including medical costs and lost wages.' }
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

  const THEME_KEY = 'firstday:theme';
  let currentTheme = 'light';
  try { currentTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; } catch (_) {}
  document.documentElement.dataset.theme = currentTheme;

  function setColorTheme(theme) {
    currentTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = currentTheme;
    try { localStorage.setItem(THEME_KEY, currentTheme); } catch (_) {}
    $$('[data-theme-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === currentTheme));
    });
  }

  /* ---------------- Saved progress (this browser) ---------------- */
  const LOCAL_KEY = 'firstday:v1';
  const loadLocal = () => { try { const r = localStorage.getItem(LOCAL_KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } };
  const saveLocal = d => { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(d)); return true; } catch (e) { return false; } };

  const normalize = d => ({
    name: d && typeof d.name === 'string' && d.name.trim() ? d.name.trim().slice(0, 40) : 'Intern',
    track: d && TRACKS[d.track] ? d.track : null,
    mastered: d && d.mastered && typeof d.mastered === 'object' ? d.mastered : {},
    quizBest: d && d.quizBest && typeof d.quizBest === 'object' ? d.quizBest : {},
    tasks: d && d.tasks && typeof d.tasks === 'object' ? d.tasks : {},
    interviews: d && d.interviews && typeof d.interviews === 'object' ? d.interviews : {},
    pro: !!(d && d.pro),
    proCode: d && typeof d.proCode === 'string' ? d.proCode : null,
    openTracks: d && Array.isArray(d.openTracks) ? d.openTracks.filter(t => TRACKS[t]) : [],
    email: d && typeof d.email === 'string' ? d.email : '',
    avatarUrl: d && typeof d.avatarUrl === 'string' ? d.avatarUrl : '',
    profilePhoto: d && typeof d.profilePhoto === 'string' ? d.profilePhoto : '',
    tosAcceptedAt: d && typeof d.tosAcceptedAt === 'string' ? d.tosAcceptedAt : null
  });

  /* ---------------- App state ---------------- */
  // True only while a real Supabase session exists (Google or email/password).
  // Signing out clears this, so getting back in always requires re-authenticating —
  // leftover localStorage data alone is never enough to reach the dashboard.
  let authed = false;
  let state = null;          // { name, track, mastered, quizBest, tasks, interviews }
  let currentView = 'dashboard';
  {
    const local = loadLocal();
    if (local && TRACKS[local.track]) state = normalize(local);
  }
  // Tracks kept open. Free: just the current one. Pro: any number.
  const openTracks = () => {
    if (!state.pro) state.openTracks = [state.track];
    else if (!state.openTracks.includes(state.track)) state.openTracks.unshift(state.track);
    return state.openTracks;
  };

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
    const saved = saveLocal(state);
    setSync();
    return saved;
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
  let upgradeWant = null;    // track id someone tried to add (paid)
  let loginLockoutTimer = null;
  const LOGIN_LOCKOUT_KEY = 'firstday:login-lockout';
  const LOGIN_FAILURE_LIMIT = 5;

  function getLoginLockout() {
    try {
      const stored = JSON.parse(localStorage.getItem(LOGIN_LOCKOUT_KEY) || '{}');
      return {
        failures: Number(stored.failures) || 0,
        level: Number(stored.level) || 0,
        until: Number(stored.until) || 0
      };
    } catch (_) {
      return { failures: 0, level: 0, until: 0 };
    }
  }

  function saveLoginLockout(lockout) {
    try { localStorage.setItem(LOGIN_LOCKOUT_KEY, JSON.stringify(lockout)); } catch (_) {}
  }

  function recordLoginFailure() {
    const lockout = getLoginLockout();
    lockout.failures += 1;
    if (lockout.failures >= LOGIN_FAILURE_LIMIT) {
      lockout.level += 1;
      lockout.failures = 0;
      lockout.until = Date.now() + 60000 * (10 ** (lockout.level - 1));
    }
    saveLoginLockout(lockout);
    return lockout;
  }

  function updateLoginLockout() {
    const message = $('#login-lockout', modalBody);
    const button = $('[data-form="emailLogin"] button[type="submit"]', modalBody);
    if (!message || !button) return;
    const remaining = Math.max(0, getLoginLockout().until - Date.now());
    if (remaining > 0) {
      const seconds = Math.ceil(remaining / 1000);
      const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
      const remainder = (seconds % 60).toString().padStart(2, '0');
      message.textContent = `Too many incorrect sign-in attempts. Try again in ${minutes}:${remainder}.`;
      message.hidden = false;
      button.disabled = true;
    } else {
      message.hidden = true;
      button.disabled = false;
      if (loginLockoutTimer) {
        clearInterval(loginLockoutTimer);
        loginLockoutTimer = null;
      }
    }
  }

  function startLoginLockoutTimer() {
    if (loginLockoutTimer) clearInterval(loginLockoutTimer);
    updateLoginLockout();
    if (getLoginLockout().until > Date.now()) {
      loginLockoutTimer = setInterval(updateLoginLockout, 250);
    }
  }

  function clearLoginLockout() {
    try { localStorage.removeItem(LOGIN_LOCKOUT_KEY); } catch (_) {}
    if (loginLockoutTimer) clearInterval(loginLockoutTimer);
    loginLockoutTimer = null;
  }

  /* ---------------- Pricing + checkout ---------------- */
  const PRO_PRICE = 4.99;    // per month, USD
  // Paste a Stripe Payment Link here (stripe.com → Payment Links) to take real card payments.
  // Until then, the pay button stays off and only discount codes can unlock Pro.
  const PAYMENT_LINK = '';
  // Anyone can read this file in their browser, so treat codes as public.
  const DISCOUNTS = { ADMIN26: { pct: 100, label: 'Admin access' } };
  let checkoutCode = null;   // applied discount code
  let pendingCheckout = false; // clicked "Get Pro" before signing up
  const money = n => '$' + n.toFixed(2);
  const checkoutTotal = () => {
    const off = checkoutCode ? DISCOUNTS[checkoutCode].pct : 0;
    return Math.round(PRO_PRICE * (100 - off)) / 100;
  };

  const HELP = [
    ['How do assignments get graded?', 'Each assignment is checked in your browser against the same rules a manager would use: the right numbers, formulas instead of typed values, and complete answers. You get a grade and specific feedback right away, and you can resubmit as many times as you like.'],
    ['I’m stuck on an assignment.', boss => `Click "Need a hint?" on the assignment for a nudge from ${boss.name}. Each click reveals a little more. "Start over" clears your work, but your best grade stays.`],
    ['Where is my progress saved?', 'In this browser on this device. If you switch browsers, use a private window, or clear your browsing data, you’ll start fresh.'],
    ['How do I change my track?', 'Open Settings from the menu under your initials. Switching tracks is free, and progress on each track is saved separately, so you can switch back anytime.'],
    ['Can I have more than one track?', `The free plan includes one track at a time. FirstDay Pro (${money(PRO_PRICE)}/month) lets you keep every track open and jump between them from the menu under your initials.`],
    ['How do I update my resume or cover letter?', 'Go to "Resume & cover letter." You can build one step by step, paste your text, or upload a PDF or Word file, then download the polished version.']
  ];

  function openModal(mode) {
    modalMode = mode;
    modalLocked = mode === 'track-first' || mode === 'terms';
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
    modal.classList.remove('is-photo-editor');
    if (modalMode === 'photo-editor') photoEditor = null;
    modalMode = null;
    modalLocked = false;
    if (loginLockoutTimer) clearInterval(loginLockoutTimer);
    loginLockoutTimer = null;
    document.body.style.overflow = '';
  }

  function renderModal() {
    $('.modal-close', modal).hidden = modalLocked;
    const mode = modalMode;
    modal.classList.toggle('is-photo-editor', mode === 'photo-editor');

    if (mode === 'photo-editor') {
      renderPhotoEditor();
      return;
    }

    if (mode === 'signup' || mode === 'login') {
      const isSignup = mode === 'signup';
      const googleBtn = `
        <button type="button" class="btn btn-ghost btn-block google-btn" id="google-signin-btn">
          <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.92c1.7-1.57 2.68-3.88 2.68-6.64z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.27c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34C2.44 15.98 5.48 18 9 18z"/><path fill="#FBBC05" d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.34z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
          <span>Continue with Google</span>
        </button>
        <div class="auth-divider"><span>or</span></div>`;
      modalBody.innerHTML = isSignup ? `
        <p class="eyebrow">Get started</p>
        <h2 id="modal-title">Let's set up your first day.</h2>
        <p class="page-sub">Your progress is saved in this browser. Only your name and email are used for login.</p>
        ${googleBtn}
        <form class="auth-form" data-form="register" novalidate>
          <label class="field-label" for="r-username">Username</label>
          <input class="input" id="r-username" name="username" maxlength="24" autocomplete="username" required>
          <div class="field-row">
            <div>
              <label class="field-label" for="r-first">First name</label>
              <input class="input" id="r-first" name="first" maxlength="40" autocomplete="given-name" required>
            </div>
            <div>
              <label class="field-label" for="r-last">Last name</label>
              <input class="input" id="r-last" name="last" maxlength="40" autocomplete="family-name" required>
            </div>
          </div>
          <label class="field-label" for="r-email">Email</label>
          <input class="input" id="r-email" type="email" name="email" autocomplete="email" required>
          <label class="field-label" for="r-password">Password</label>
          <input class="input" id="r-password" type="password" name="password" autocomplete="new-password" required minlength="8">
          <label class="field-label" for="r-confirm">Confirm password</label>
          <input class="input" id="r-confirm" type="password" name="confirm" autocomplete="new-password" required minlength="8">
          <p class="form-error" role="alert"></p>
          <button class="btn btn-primary btn-block" type="submit"><span>Create account</span></button>
        </form>
        <p class="form-switch">Already have an account? <button type="button" class="text-btn" data-action="switch-login">Log in</button></p>` : `
        <p class="eyebrow">Welcome back</p>
        <h2 id="modal-title">Log in to FirstDay.</h2>
        <p class="page-sub">Pick up right where you left off.</p>
        ${googleBtn}
        <form class="auth-form" data-form="emailLogin" novalidate>
          <label class="field-label" for="l-email">Email</label>
          <input class="input" id="l-email" type="email" name="email" autocomplete="email" required>
          <label class="field-label" for="l-password">Password</label>
          <input class="input" id="l-password" type="password" name="password" autocomplete="current-password" required>
          <p class="form-error" role="alert"></p>
          <p class="auth-lockout" id="login-lockout" role="status" aria-live="polite" hidden></p>
          <button class="btn btn-primary btn-block" type="submit"><span>Log in</span></button>
        </form>
        <p class="form-switch">New here? <button type="button" class="text-btn" data-action="switch-signup">Create an account</button></p>`;
      if (isSignup) {
        if (loginLockoutTimer) clearInterval(loginLockoutTimer);
        loginLockoutTimer = null;
      } else {
        startLoginLockoutTimer();
      }
      return;
    }

    if (mode === 'terms') {
      modalBody.innerHTML = `
        <p class="eyebrow">One more thing</p>
        <h2 id="modal-title">Terms of Service</h2>
        <p class="page-sub">Read it — it's short — then accept to continue.</p>
        <div class="terms-box" tabindex="0">
          ${TERMS_CONTENT.map(([h, b]) => `<h4>${esc(h)}</h4><p>${esc(b)}</p>`).join('')}
          <p class="terms-updated">Last updated ${esc(TERMS_UPDATED)}.</p>
        </div>
        <label class="check">
          <input type="checkbox" id="terms-check">
          <span>I've read and agree to the Terms of Service.</span>
        </label>
        <div class="modal-foot">
          <span></span>
          <button class="btn btn-primary" data-action="accept-terms" id="terms-continue" disabled>Continue</button>
        </div>`;
      return;
    }

    if (mode === 'help') {
      const boss = BOSSES[state.track];
      modalBody.innerHTML = `
        <p class="eyebrow">Help</p>
        <h2 id="modal-title">How FirstDay works</h2>
        <div class="help-list">
          ${HELP.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(typeof a === 'function' ? a(boss) : a)}</p></details>`).join('')}
        </div>
        <div class="modal-foot">
          <span></span>
          <button class="btn btn-primary btn-small" data-action="close-modal">Got it</button>
        </div>`;
      return;
    }

    if (mode === 'upgrade') {
      const want = TRACKS[upgradeWant];
      modalBody.innerHTML = `
        <p class="eyebrow">FirstDay Pro</p>
        <h2 id="modal-title">${want ? `Add the ${esc(want.name)} track` : 'Add more tracks'}</h2>
        <p class="page-sub">Your free plan includes one track at a time. You can switch it whenever you want. Pro lets you keep several tracks open side by side.</p>
        <ul class="pro-perks">
          <li>Every track's assignments, key terms, and quizzes</li>
          <li>Switch between tracks from the menu without losing your place</li>
          <li>Your ${esc(TRACKS[state.track].name)} progress stays exactly where it is</li>
        </ul>
        <div class="modal-foot">
          <span class="hint">${money(PRO_PRICE)} / month</span>
          <button class="btn btn-primary" data-action="checkout">Continue to checkout</button>
        </div>`;
      return;
    }

    if (mode === 'checkout') {
      const total = checkoutTotal();
      const disc = checkoutCode && DISCOUNTS[checkoutCode];
      const canPay = total === 0 || PAYMENT_LINK;
      modalBody.innerHTML = `
        <p class="eyebrow">Checkout</p>
        <h2 id="modal-title">Upgrade to FirstDay Pro</h2>
        <p class="page-sub">Keep every track open at once and jump between them from the account menu.</p>
        <div class="checkout-summary">
          <div class="co-line"><span>FirstDay Pro, monthly</span><span>${money(PRO_PRICE)}</span></div>
          ${disc ? `<div class="co-line is-discount"><span>${esc(checkoutCode)} (${disc.pct}% off)</span><span>&minus;${money(PRO_PRICE - total)}</span></div>` : ''}
          <div class="co-line is-total"><span>Due today</span><span>${money(total)}</span></div>
        </div>
        <form data-form="code" novalidate>
          <label class="field-label" for="co-code">Discount code</label>
          ${disc ? `
            <p class="code-applied">${esc(disc.label)}: code ${esc(checkoutCode)} applied. <button type="button" class="text-btn text-btn-muted" data-action="remove-code">Remove</button></p>` : `
            <div class="code-row">
              <input class="input" id="co-code" name="code" maxlength="24" autocomplete="off" spellcheck="false" placeholder="Enter code">
              <button class="btn btn-ghost" type="submit"><span>Apply</span></button>
            </div>`}
          <p class="form-error" role="alert"></p>
        </form>
        <div class="modal-foot">
          <span class="hint">${total === 0 ? 'No payment needed.' : PAYMENT_LINK ? 'You\u2019ll pay securely on Stripe.' : 'Card payments aren\u2019t live yet.'}</span>
          <button class="btn btn-primary" data-action="checkout-pay" ${canPay ? '' : 'disabled'}>${total === 0 ? 'Activate Pro' : `Pay ${money(total)}`}</button>
        </div>`;
      return;
    }

    if (mode === 'track' || mode === 'track-first') {
      const first = mode === 'track-first';
      modalBody.innerHTML = `
        <p class="eyebrow">${first ? 'One last step' : 'Change track'}</p>
        <h2 id="modal-title">${first ? `Welcome, ${esc(state.name)}. Pick your track.` : 'Pick your track.'}</h2>
        <p class="page-sub">Your key terms, tasks, and interviews are built around this. Progress on each track is saved separately.${first ? '' : ' Switching is free. <button type="button" class="text-btn" data-action="upgrade">Want more than one track at once?</button>'}</p>
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
  document.addEventListener('submit', async e => {
    const form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();
    clearFormError();
    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString().trim();
    const btn = $('button[type="submit"]', form);
    try {
      if (form.dataset.form === 'register') {
        const username = (fd.get('username') || '').toString().trim();
        const first = (fd.get('first') || '').toString().trim();
        const last = (fd.get('last') || '').toString().trim();
        const email = (fd.get('email') || '').toString().trim();
        const password = (fd.get('password') || '').toString();
        const confirm = (fd.get('confirm') || '').toString();
        if (!username) throw uiErr('Choose a username.');
        if (!first || !last) throw uiErr('Add your first and last name.');
        if (!/^\S+@\S+\.\S+$/.test(email)) throw uiErr('Enter a valid email.');
        if (password.length < 8) throw uiErr('Password needs to be at least 8 characters.');
        if (password !== confirm) throw uiErr('Passwords don\u2019t match.');
        if (!window.FirstDayAuth) throw uiErr('Sign-in isn\u2019t set up on this copy of the site yet.');
        setBusy(btn, true);
        const res = await window.FirstDayAuth.signUp({ email, password, username, first, last });
        setBusy(btn, false);
        if (!res.ok) throw uiErr(res.message);
        if (res.needsConfirmation) { showFormError('Check your email to confirm your account, then log in.'); return; }
        // Success continues via the firstday:auth event fired by auth.js.
      } else if (form.dataset.form === 'emailLogin') {
        const email = (fd.get('email') || '').toString().trim();
        const password = (fd.get('password') || '').toString();
        if (!email || !password) throw uiErr('Enter your email and password.');
        if (getLoginLockout().until > Date.now()) {
          updateLoginLockout();
          throw uiErr('Sign-in is temporarily locked.');
        }
        if (!window.FirstDayAuth) throw uiErr('Sign-in isn\u2019t set up on this copy of the site yet.');
        setBusy(btn, true);
        const res = await window.FirstDayAuth.signInWithPassword({ email, password });
        setBusy(btn, false);
        if (!res.ok) {
          if (res.invalidCredentials) {
            const lockout = recordLoginFailure();
            if (lockout.until > Date.now()) updateLoginLockout();
          }
          throw uiErr(res.message);
        }
        clearLoginLockout();
        // Success continues via the firstday:auth event fired by auth.js.
      } else if (form.dataset.form === 'code') {
        const code = (fd.get('code') || '').toString().trim().toUpperCase();
        if (!code) throw uiErr('Enter a discount code.');
        if (!DISCOUNTS[code]) throw uiErr('That code isn\u2019t valid.');
        checkoutCode = code;
        renderModal();
        const pay = $('[data-action="checkout-pay"]', modalBody);
        if (pay) pay.focus();
      } else if (form.dataset.form === 'profile') {
        if (!name) throw uiErr('Your name can\u2019t be empty.');
        state.name = name.slice(0, 40);
        persist();
        refreshHeader();
        toast('Name updated.');
      }
    } catch (err) {
      setBusy(btn, false);
      if (form.dataset.form === 'emailLogin') updateLoginLockout();
      showFormError(friendly(err));
    }
  });

  /* ---------------- Sign-in (via auth.js / Supabase) ----------------
     auth.js owns the Supabase client, the Google redirect, and the email/
     password calls; it never touches app state directly. It just dispatches
     these two events on window — for Google, email/password login, AND a
     silent session restore on page load (which one it is doesn't matter
     here; the checks below are the same either way). */
  window.addEventListener('firstday:auth', e => {
    const p = e.detail || {};
    authed = true;
    const oauthIntent = sessionStorage.getItem('firstday:oauth-pending') === '1';
    sessionStorage.removeItem('firstday:oauth-pending');
    const prev = state;
    state = normalize(Object.assign({}, prev, {
      name: p.name || (prev && prev.name),
      email: p.email || (prev && prev.email),
      avatarUrl: p.avatarUrl || (prev && prev.avatarUrl),
      track: prev ? prev.track : null,
      tosAcceptedAt: prev ? prev.tosAcceptedAt : null
    }));
    persist();
    updateNavStart();
    const modalWasOpen = !modal.hidden && (modalMode === 'signup' || modalMode === 'login');
    if (!oauthIntent && !modalWasOpen) return; // silent session restore on load — don't interrupt the landing page
    if (!state.tosAcceptedAt) { openModal('terms'); return; }
    if (!state.track) { openModal('track-first'); return; }
    closeModal(true);
    openApp('dashboard');
  });
  window.addEventListener('firstday:signed-out', () => {
    authed = false;
    updateNavStart();
  });

  /* ---------------- App navigation ---------------- */
  const initials = name => name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';

  function updateAvatar(el, fallback) {
    const photo = state.profilePhoto || state.avatarUrl;
    el.textContent = '';
    if (!photo) { el.textContent = fallback; return; }
    const image = document.createElement('img');
    image.src = photo;
    image.alt = '';
    el.append(image);
  }

  const PHOTO_FILTERS = {
    original: { label: 'Original', css: 'none' },
    warm: { label: 'Warm', css: 'sepia(0.3) saturate(1.2)' },
    mono: { label: 'Mono', css: 'grayscale(1)' },
    vivid: { label: 'Vivid', css: 'saturate(1.5) contrast(1.08)' }
  };
  const PHOTO_CROP_SIZE = 280;
  let photoEditor = null;

  function processProfilePhoto(file) {
    return new Promise((resolve, reject) => {
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
        reject(new Error('Choose a JPEG, PNG, or WebP image.'));
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        reject(new Error('Choose an image smaller than 8 MB.'));
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('The image could not be read.'));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error('That image could not be opened.'));
        image.onload = () => resolve(image);
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function photoCropBounds(size) {
    const image = photoEditor.image;
    const scale = Math.max(size / image.naturalWidth, size / image.naturalHeight) * photoEditor.zoom;
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const factor = size / PHOTO_CROP_SIZE;
    return {
      x: (size - width) / 2 + photoEditor.offsetX * factor,
      y: (size - height) / 2 + photoEditor.offsetY * factor,
      width,
      height
    };
  }

  function limitPhotoOffset() {
    const image = photoEditor.image;
    const scale = Math.max(PHOTO_CROP_SIZE / image.naturalWidth, PHOTO_CROP_SIZE / image.naturalHeight) * photoEditor.zoom;
    const maxX = Math.max(0, (image.naturalWidth * scale - PHOTO_CROP_SIZE) / 2);
    const maxY = Math.max(0, (image.naturalHeight * scale - PHOTO_CROP_SIZE) / 2);
    photoEditor.offsetX = Math.max(-maxX, Math.min(maxX, photoEditor.offsetX));
    photoEditor.offsetY = Math.max(-maxY, Math.min(maxY, photoEditor.offsetY));
    return photoCropBounds(PHOTO_CROP_SIZE);
  }

  function drawPhotoEditorPreview() {
    const canvas = $('#photo-editor-canvas');
    if (!canvas || !photoEditor) return;
    const context = canvas.getContext('2d');
    const bounds = limitPhotoOffset();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.filter = PHOTO_FILTERS[photoEditor.filter].css;
    context.drawImage(photoEditor.image, bounds.x, bounds.y, bounds.width, bounds.height);
    context.filter = 'none';
    const zoom = $('#photo-zoom-value');
    if (zoom) zoom.textContent = `${photoEditor.zoom.toFixed(1)}×`;
  }

  function renderPhotoEditor() {
    modalBody.innerHTML = `
      <p class="eyebrow">Profile picture</p>
      <h2 id="modal-title">Adjust your photo</h2>
      <div class="photo-editor">
        <div class="photo-editor-stage">
          <canvas id="photo-editor-canvas" width="${PHOTO_CROP_SIZE}" height="${PHOTO_CROP_SIZE}" tabindex="0" aria-label="Photo crop preview. Drag to reposition, or use the arrow keys."></canvas>
          <p class="hint">Drag to reframe. The circle shows how your avatar will appear.</p>
        </div>
        <div class="photo-editor-tools">
          <div class="photo-editor-zoom">
            <label class="field-label" for="photo-zoom">Zoom <output id="photo-zoom-value">1.0×</output></label>
            <input id="photo-zoom" type="range" min="1" max="3" step="0.05" value="${photoEditor.zoom}" aria-label="Zoom photo">
          </div>
          <div class="photo-filter-group" role="group" aria-label="Photo filters">
            <span class="field-label">Filter</span>
            <div class="photo-filter-options">
              ${Object.entries(PHOTO_FILTERS).map(([id, filter]) => `
                <button class="photo-filter ${photoEditor.filter === id ? 'is-active' : ''}" type="button" data-action="photo-filter" data-filter="${id}" aria-pressed="${photoEditor.filter === id}">${filter.label}</button>`).join('')}
            </div>
          </div>
          <button class="btn btn-ghost btn-small photo-center" type="button" data-action="photo-center">Center image</button>
        </div>
      </div>
      <div class="modal-foot photo-editor-foot">
        <button class="btn btn-ghost" type="button" data-action="cancel-photo-edit">Cancel</button>
        <button class="btn btn-primary" type="button" data-action="save-profile-photo">Save picture</button>
      </div>`;

    const canvas = $('#photo-editor-canvas');
    let drag = null;
    canvas.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      canvas.setPointerCapture(event.pointerId);
      drag = { x: event.clientX, y: event.clientY };
      canvas.classList.add('is-dragging');
    });
    canvas.addEventListener('pointermove', event => {
      if (!drag) return;
      const rect = canvas.getBoundingClientRect();
      const factor = PHOTO_CROP_SIZE / rect.width;
      photoEditor.offsetX += (event.clientX - drag.x) * factor;
      photoEditor.offsetY += (event.clientY - drag.y) * factor;
      drag = { x: event.clientX, y: event.clientY };
      drawPhotoEditorPreview();
    });
    const stopDragging = () => { drag = null; canvas.classList.remove('is-dragging'); };
    canvas.addEventListener('pointerup', stopDragging);
    canvas.addEventListener('pointercancel', stopDragging);
    canvas.addEventListener('keydown', event => {
      const step = event.shiftKey ? 20 : 6;
      if (event.key === 'ArrowLeft') photoEditor.offsetX -= step;
      else if (event.key === 'ArrowRight') photoEditor.offsetX += step;
      else if (event.key === 'ArrowUp') photoEditor.offsetY -= step;
      else if (event.key === 'ArrowDown') photoEditor.offsetY += step;
      else return;
      event.preventDefault();
      drawPhotoEditorPreview();
    });
    drawPhotoEditorPreview();
  }

  function refreshHeader() {
    if (!state || !state.track) return;
    const ini = initials(state.name);
    $('#app-track').textContent = TRACKS[state.track].name;
    updateAvatar($('#app-initials'), ini);
    updateAvatar($('#menu-initials'), ini);
    $('#menu-name').textContent = state.name;
    $('#menu-track').textContent = `${TRACKS[state.track].name} track${state.pro ? ' \u00b7 Pro' : ''}`;
    const list = openTracks();
    $('#menu-tracks').innerHTML = state.pro && list.length > 1 ? `
      <div class="menu-label">Your tracks</div>
      ${list.map(id => `<button type="button" class="menu-item ${id === state.track ? 'is-current' : ''}" role="menuitem" data-action="switch-track" data-to="${id}">${esc(TRACKS[id].name)}</button>`).join('')}
      <div class="menu-sep" role="separator"></div>` : '';
    updateNavStart();
  }

  /* ---------------- Account menu (avatar dropdown) ---------------- */
  const userMenu = () => $('#user-menu');
  function toggleUserMenu(force) {
    const menu = userMenu();
    const open = typeof force === 'boolean' ? force : menu.hidden;
    if (open === !menu.hidden) return;
    menu.hidden = !open;
    $('#avatar-btn').setAttribute('aria-expanded', open);
    if (open) $('.menu-item', menu).focus();
  }
  document.addEventListener('keydown', e => {
    const menu = userMenu();
    if (!menu || menu.hidden) return;
    const items = $$('.menu-item', menu);
    const i = items.indexOf(document.activeElement);
    if (e.key === 'Escape') { toggleUserMenu(false); $('#avatar-btn').focus(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    else if (e.key === 'Tab') toggleUserMenu(false);
  });

  function openApp(view) {
    landing.hidden = true;
    app.hidden = false;
    refreshHeader();
    setSync();
    go(view);
  }

  function go(view) {
    if (view === 'task' && !findTask(currentTaskId)) view = 'job';
    if (view === 'interview-q' && !findInterview(currentInterviewId)) view = 'interview';
    currentView = view;
    const navView = view === 'task' ? 'job' : view === 'interview-q' ? 'interview' : view;
    $$('.side-item[data-view]').forEach(b => b.classList.toggle('is-active', b.dataset.view === navView));
    if (view === 'job') renderJobList();
    else if (view === 'task') renderTask();
    else if (view === 'interview') renderInterviewList();
    else if (view === 'interview-q') renderInterviewQuestion();
    else if (view === 'terms') renderTerms();
    else if (view === 'docs') renderDocs();
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
    const signedIn = Boolean(authed && state && state.track);
    $('#nav-start').textContent = signedIn ? 'Open FirstDay' : 'Get started';
    $$('[data-action="login"]').forEach(a => { a.textContent = signedIn ? 'My account' : 'Log in'; });
  }

  // Shared entry point for "Get started" / "Open FirstDay" — walks through
  // whichever step is still missing: signed in -> terms accepted -> track picked.
  function enterApp() {
    if (!authed) { openModal('signup'); return; }
    if (!state.tosAcceptedAt) { openModal('terms'); return; }
    if (!state.track) { openModal('track-first'); return; }
    openApp('dashboard');
  }

  /* ---------------- Dashboard ---------------- */
  function renderDashboard() {
    const track = TRACKS[state.track];
    const total = trackTerms().length;
    const done = masteredCount();
    const pct = Math.round((done / total) * 100);
    const best = bestQuiz();
    const js = jobStats();
    const iv = interviewStats();

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
        <div class="card module">
          <span class="status status-open">Available</span>
          <h3>Mock interviews</h3>
          <p>Answer real interview questions for the ${esc(track.name)} track from ${esc(BOSSES[state.track].name)}, and get scored like a real interviewer would.</p>
          <button class="btn btn-primary btn-small" data-view="interview">${iv.done ? 'Keep practicing' : 'Practice your first question'}</button>
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
        <p class="eyebrow">Account</p>
        <h1>Settings</h1>
        <p class="page-sub">Your profile and progress are saved in this browser.</p>
      </div>

      <div class="card settings">
        <h3 class="settings-title">Profile</h3>
        <div class="profile-photo-row">
          <span class="avatar profile-avatar" id="profile-avatar" aria-hidden="true"></span>
          <div class="profile-photo-controls">
            <strong>Profile picture</strong>
            <div class="profile-photo-actions">
              <label class="btn btn-ghost btn-small" for="profile-photo">Upload photo</label>
              <input id="profile-photo" class="visually-hidden" type="file" accept="image/jpeg,image/png,image/webp">
              ${state.profilePhoto ? '<button class="btn btn-ghost btn-small" type="button" data-action="remove-profile-photo">Remove photo</button>' : ''}
            </div>
            <p class="hint">JPEG, PNG, or WebP. The image is saved on this device.</p>
          </div>
        </div>
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
        <h3 class="settings-title">Appearance</h3>
        <p class="page-sub">Choose the color theme for FirstDay.</p>
        <div class="theme-switch" role="group" aria-label="Color theme">
          <button class="theme-option" type="button" data-action="set-theme" data-theme-choice="light" aria-pressed="${currentTheme === 'light'}">Light</button>
          <button class="theme-option" type="button" data-action="set-theme" data-theme-choice="dark" aria-pressed="${currentTheme === 'dark'}">Dark</button>
        </div>
      </div>

      <div class="card settings">
        <h3 class="settings-title">Plan</h3>
        <div class="track-row ${state.pro ? 'is-current' : ''}">
          <div>
            <strong>${state.pro ? 'FirstDay Pro' : 'Free'} <span class="plan-badge ${state.pro ? 'is-pro' : ''}">${state.pro ? (state.proCode ? `Code ${esc(state.proCode)}` : `${money(PRO_PRICE)}/mo`) : '$0'}</span></strong>
            <span>${state.pro ? 'Every track can stay open at once.' : 'One track at a time. Switching is free.'}</span>
          </div>
          ${state.pro
            ? '<button class="btn btn-ghost btn-small" data-action="downgrade">Switch to Free</button>'
            : `<button class="btn btn-primary btn-small" data-action="checkout">Upgrade to Pro</button>`}
        </div>
      </div>

      <div class="card settings">
        <h3 class="settings-title">${state.pro ? 'Your tracks' : 'Track'}</h3>
        <p class="page-sub">${state.pro ? 'Jump between your open tracks here or from the menu under your initials. Progress on each track is saved separately.' : 'Your free plan includes one track at a time. Switching is free, and progress on each track is saved separately.'}</p>
        <div class="track-list">
          ${openTracks().map(id => id === state.track ? `
            <div class="track-row is-current">
              <div><strong>${esc(TRACKS[id].name)}</strong><span>Your current track</span></div>
              ${state.pro ? '' : '<button class="btn btn-ghost btn-small" data-action="change-track">Switch track</button>'}
            </div>` : `
            <div class="track-row">
              <div><strong>${esc(TRACKS[id].name)}</strong><span>${esc(TRACKS[id].blurb)}</span></div>
              <button class="btn btn-ghost btn-small" data-action="switch-track" data-to="${id}">Go to track</button>
            </div>`).join('')}
        </div>
      </div>

      ${Object.keys(TRACKS).some(id => !openTracks().includes(id)) ? `
      <div class="card settings">
        <h3 class="settings-title">Add more tracks ${state.pro ? '' : '<span class="pro-tag">Pro</span>'}</h3>
        <p class="page-sub">Keep several tracks open at once and move between them without switching.</p>
        <div class="track-list">
          ${Object.entries(TRACKS).filter(([id]) => !openTracks().includes(id)).map(([id, t]) => `
            <div class="track-row">
              <div><strong>${esc(t.name)}</strong><span>${esc(t.blurb)}</span></div>
              <button class="btn btn-ghost btn-small" data-action="upgrade" data-want="${id}" aria-label="Add the ${esc(t.name)} track">Add track</button>
            </div>`).join('')}
        </div>
      </div>` : ''}

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
    updateAvatar($('#profile-avatar'), initials(state.name));
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

  // Each round draws a fresh random set, so retakes cover different terms
  const QUIZ_LENGTH = { vocab: 15, context: 10 };

  function newQuiz(kind) {
    const pool = trackTerms();
    let qs;
    if (kind === 'context') {
      qs = shuffle(CONTEXT[state.track] || []).slice(0, QUIZ_LENGTH.context).map(c => ({
        prompt: c.prompt, answer: c.options[0], opts: shuffle(c.options), why: c.why, term: c.term
      }));
    } else {
      // Alternate directions so knowing one form isn't enough, and never show a giveaway definition
      qs = shuffle(pool).slice(0, QUIZ_LENGTH.vocab).map((card, k) => {
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
     MOCK INTERVIEWS — track-specific questions, graded in the
     browser against rubric checks. Same pattern as On the Job.
     ========================================================= */
  let currentInterviewId = null;
  const interviewQuestions = () => INTERVIEWS[state.track] || [];
  const findInterview = id => interviewQuestions().find(q => q.id === id);
  const interviewRecord = id => (state.interviews && state.interviews[id]) || null;

  function interviewStats() {
    const qs = interviewQuestions();
    const done = qs.filter(q => { const r = interviewRecord(q.id); return r && r.best >= PASS; });
    const graded = qs.map(q => interviewRecord(q.id)).filter(Boolean);
    const avg = graded.length ? Math.round(graded.reduce((a, r) => a + r.best, 0) / graded.length) : null;
    return { total: qs.length, done: done.length, avg };
  }

  const interviewStatusFor = q => {
    const r = interviewRecord(q.id);
    if (r) return { text: `Best: ${letter(r.best)}`, cls: 'st-' + gradeTone(r.best) };
    if (drafts[q.id] && drafts[q.id].answer) return { text: 'In progress', cls: 'st-progress' };
    return { text: 'New', cls: 'st-new' };
  };

  function gradeInterview(q, answer) {
    const items = q.checks.map(c => {
      let ok = false;
      try { ok = Boolean(c.test(answer)); } catch (e) { ok = false; }
      return { label: c.label, ok, points: ok ? c.weight : 0, max: c.weight, tip: ok ? '' : tipText(c.tip, answer) };
    });
    return finalize(q, items);
  }

  function interviewReply(result) {
    const miss = result.items.find(it => !it.ok);
    const s = result.score;
    if (s >= 90) return "That's a strong, specific answer — exactly the kind of detail I'd want to hear in a real interview." + (miss ? ' One small thing: ' + miss.tip : '');
    if (s >= 80) return 'Good answer — just a bit more and this is interview-ready. ' + (miss ? miss.tip : '');
    if (s >= PASS) return "That's a reasonable start, but I'd want more before I was convinced. " + (miss ? miss.tip : '');
    return "Let's build this out more before you use it in a real interview. " + (miss ? miss.tip : '') + ' Grab a tip if you’re stuck.';
  }

  function renderInterviewList() {
    const boss = BOSSES[state.track];
    const qs = interviewQuestions();
    const st = interviewStats();
    main.innerHTML = `
      <div class="page-head">
        <p class="eyebrow">${esc(TRACKS[state.track].name)} track</p>
        <h1>Mock interviews</h1>
        <p class="page-sub">Practice out loud, then write down your answer and submit it for feedback — same as a real interview, minus the stakes.</p>
      </div>

      <div class="msg msg-intro">
        ${bossHeader(boss, 'Before you start')}
        <p class="msg-body">I ask new hires questions like these before they join the team. Answer in your own words — I'm looking for specifics, not a perfect script.</p>
      </div>

      <div class="job-progress">
        <span><strong>${st.done} of ${st.total}</strong> answered to a strong score</span>
        ${st.avg != null ? `<span>Average grade: <strong>${letter(st.avg)}</strong></span>` : ''}
        <div class="bar" aria-hidden="true"><span style="width:${Math.round(st.done / st.total * 100)}%"></span></div>
      </div>

      <div class="job-list">
        ${qs.map(q => {
          const s = interviewStatusFor(q);
          const r = interviewRecord(q.id);
          const chip = q.category === 'technical' ? 'tool-sort' : 'tool-writing';
          const chipLabel = q.category === 'technical' ? 'Situational' : 'Behavioral';
          return `
            <button class="job-card" data-open-interview="${q.id}">
              <span class="job-card-top">
                <span class="tool-chip ${chip}">${chipLabel}</span>
                <span class="job-status ${s.cls}">${s.text}</span>
              </span>
              <span class="job-card-title">${esc(q.tag)}</span>
              <span class="job-card-sum">${esc(q.prompt)}</span>
              <span class="job-card-foot">
                <span>${esc(TRACKS[state.track].name)} interview</span>
                <span class="job-card-cta">${r ? (r.best >= 90 ? 'Review' : 'Improve your answer') : (drafts[q.id] && drafts[q.id].answer) ? 'Continue' : 'Start'}</span>
              </span>
            </button>`;
        }).join('')}
      </div>`;
  }

  function renderInterviewResult(boss, q, res, nextQ) {
    const tone = gradeTone(res.score);
    return `
      <div class="result-card tone-${tone}" tabindex="-1" id="result-card">
        <div class="result-top">
          <span class="grade-big">${res.grade}</span>
          <div>
            <p class="result-score">${res.score}% &middot; ${res.score >= PASS ? 'Strong answer' : 'Keep refining'}</p>
            <p class="hint">${res.score >= PASS ? 'Your best grade is saved. You can keep improving it.' : `You need ${PASS}% for a strong score. Your answer is saved — revise it and resubmit.`}</p>
          </div>
        </div>
        <div class="msg msg-reply">
          ${bossHeader(boss, 'Just now')}
          <p class="msg-body">${esc(interviewReply(res))}</p>
        </div>
        <ul class="rubric">
          ${res.items.map(it => `
            <li class="${it.ok ? 'ok' : it.points > 0 ? 'part' : 'miss'}">
              <span class="rb-mark" aria-hidden="true">${it.ok ? '&#10003;' : it.points > 0 ? '&frac12;' : '&#10007;'}</span>
              <span class="rb-text">
                <span class="rb-label">${esc(it.label)}</span>
                ${!it.ok && it.tip ? `<span class="rb-tip">${esc(it.tip)}</span>` : ''}
              </span>
              <span class="rb-pts">${Math.round(it.points)}/${Math.round(it.max)}</span>
            </li>`).join('')}
        </ul>
        <details class="example">
          <summary class="deliver-title">See a strong sample answer</summary>
          <p>${esc(q.sample)}</p>
        </details>
        ${res.score >= PASS && nextQ ? `<button class="btn btn-primary btn-small" data-open-interview="${nextQ.id}">Next question: ${esc(nextQ.tag)}</button>` : ''}
        ${res.score >= PASS && !nextQ ? '<button class="btn btn-ghost btn-small" data-view="interview">Back to all interview questions</button>' : ''}
      </div>`;
  }

  function renderInterviewQuestion() {
    const q = findInterview(currentInterviewId);
    if (!q) { go('interview'); return; }
    const boss = BOSSES[state.track];
    const d = getDraft(q.id);
    d.answer = d.answer || '';
    const rec = interviewRecord(q.id);
    const shown = hintsShown[q.id] || 0;
    const idx = interviewQuestions().indexOf(q);
    const nextQ = interviewQuestions()[idx + 1];
    const res = lastResults[q.id];
    const chip = q.category === 'technical' ? 'tool-sort' : 'tool-writing';
    const chipLabel = q.category === 'technical' ? 'Situational' : 'Behavioral';

    main.innerHTML = `
      <button class="back-link" data-view="interview">&larr; All interview questions</button>
      <div class="page-head task-head">
        <h1>${esc(q.tag)}</h1>
        <p class="task-meta">
          <span class="tool-chip ${chip}">${chipLabel}</span>
          ${rec ? `<span>Best grade: <strong>${letter(rec.best)}</strong> (${rec.best}%) after ${rec.attempts} ${rec.attempts === 1 ? 'try' : 'tries'}</span>` : ''}
        </p>
      </div>

      <div class="msg">
        ${bossHeader(boss, 'Interview question')}
        <p class="msg-body">${esc(q.prompt)}</p>
      </div>

      <section class="workspace" aria-label="Your answer">
        <div class="tool-head"><span>Your answer</span><span class="hint">Saves as you type</span></div>
        <div class="writing">
          <div class="w-field">
            <div class="w-label-row">
              <label class="field-label" for="iv-answer">Answer like you're speaking to the interviewer</label>
              <span class="w-count" id="iv-count"></span>
            </div>
            <textarea class="input w-input" id="iv-answer" rows="9" placeholder="Start with the situation, then what you did, then what happened.">${esc(d.answer)}</textarea>
          </div>
        </div>
      </section>

      <div class="hints">
        ${q.hints.slice(0, shown).map((h, k) => `<p class="hint-line"><strong>Tip ${k + 1}.</strong> ${esc(h)}</p>`).join('')}
        ${shown < q.hints.length ? `<button class="text-btn" data-action="interview-hint">${shown ? 'Show another tip' : 'Need a tip?'} (${shown} of ${q.hints.length})</button>` : ''}
      </div>

      <div class="submit-bar">
        <button class="text-btn text-btn-muted" data-action="interview-reset">Start over</button>
        <div class="btn-row">
          <button class="btn btn-primary" data-action="submit-interview"><span>Submit answer</span></button>
        </div>
      </div>

      <div id="result-slot">${res ? renderInterviewResult(boss, q, res, nextQ) : ''}</div>`;

    wireInterview();
  }

  function wireInterview() {
    const ta = $('#iv-answer');
    if (!ta) return;
    const d = getDraft(currentInterviewId);
    const count = () => { $('#iv-count').textContent = `${words(ta.value)} words`; };
    count();
    ta.addEventListener('input', () => { d.answer = ta.value; saveDrafts(); count(); });
  }

  function openInterview(id) { currentInterviewId = id; go('interview-q'); }

  async function submitInterview(btn) {
    const q = findInterview(currentInterviewId);
    const d = getDraft(q.id);
    setBusy(btn, true);
    const res = gradeInterview(q, d.answer || '');
    setBusy(btn, false);
    lastResults[q.id] = res;
    state.interviews = state.interviews || {};
    const prev = state.interviews[q.id] || { best: 0, attempts: 0 };
    state.interviews[q.id] = { best: Math.max(prev.best, res.score), attempts: prev.attempts + 1, last: res.score };
    persist();
    renderInterviewQuestion();
    const card = $('#result-card');
    if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'start' }); card.focus({ preventScroll: true }); }
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

  document.addEventListener('change', async e => {
    const el = e.target;
    if (el.id === 'profile-photo') {
      const file = el.files && el.files[0];
      el.value = '';
      if (!file) return;
      try {
        photoEditor = {
          image: await processProfilePhoto(file),
          zoom: 1,
          offsetX: 0,
          offsetY: 0,
          filter: 'original'
        };
        openModal('photo-editor');
      } catch (err) {
        toast(err.message || 'That image could not be used.');
      }
      return;
    }
    if (el.id === 'terms-check') {
      const btn = $('#terms-continue');
      if (btn) btn.disabled = !el.checked;
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
    if (el.id === 'photo-zoom' && photoEditor) {
      photoEditor.zoom = Number(el.value);
      drawPhotoEditorPreview();
      return;
    }
    if (!el.dataset || !el.dataset.bind || el.type === 'checkbox') return;
    if (el.tagName === 'SELECT') return;
    setPath(docs, el.dataset.bind, el.value);
    saveDocs();
    const wm = el.dataset.bind.match(/^resume\.model\.experience\.(\d+)\./);
    if (wm && docs.resume.source === 'write') updateBulletPreview(+wm[1]);
    const head = el.closest('.entry') && $('.entry-head strong', el.closest('.entry'));
    if (head && /\.(title|school|heading)$/.test(el.dataset.bind)) head.textContent = el.value || head.textContent;
  });

  /* ---------------- Pro: plan + open tracks ---------------- */
  function activatePro(code) {
    state.pro = true;
    state.proCode = code || null;
    if (upgradeWant && !openTracks().includes(upgradeWant)) state.openTracks.push(upgradeWant);
    openTracks();
    persist();
    closeModal(true);
    checkoutCode = null;
    const added = upgradeWant;
    upgradeWant = null;
    refreshHeader();
    toast(added ? `Welcome to Pro. ${TRACKS[added].name} is added to your tracks.` : 'Welcome to FirstDay Pro. Add tracks from Settings.');
    go(currentView);
  }
  function addTrack(id) {
    if (!openTracks().includes(id)) state.openTracks.push(id);
    persist();
    refreshHeader();
    toast(`${TRACKS[id].name} added. Switch to it anytime from the menu under your initials.`);
    go(currentView);
  }
  function switchTrack(id) {
    if (!TRACKS[id] || id === state.track) return;
    state.track = id;
    persist();
    refreshHeader();
    toast(`Switched to ${TRACKS[id].name}.`);
    go(currentView === 'task' || currentView === 'interview-q' ? 'dashboard' : currentView);
  }

  /* ---------------- Landing extras ---------------- */
  function demoRun(btn) {
    if (!btn || btn.disabled) return;
    btn.disabled = true;
    btn.textContent = 'Running…';
    const raw = {
      A2: 'AAPL', B2: 120, C2: 228.5, D2: '=B2*C2', E2: '=VLOOKUP(A2,$G$2:$H$4,2,FALSE)',
      A3: 'JPM',  B3: 85,  C3: 212.4, D3: '=B3*C3', E3: '=VLOOKUP(A3,$G$2:$H$4,2,FALSE)',
      A4: 'XOM',  B4: 150, C4: 118.3, D4: '=B4*C4', E4: '=VLOOKUP(A4,$G$2:$H$4,2,FALSE)',
      D5: '=SUM(D2:D4)',
      G2: 'AAPL', H2: 'Technology', G3: 'JPM', H3: 'Financials', G4: 'XOM', H4: 'Energy'
    };
    const get = computeSheet(raw);
    const order = ['D2', 'E2', 'D3', 'E3', 'D4', 'E4', 'D5'];
    const fref = $('#demo-fbar-ref'), finput = $('#demo-fbar-input');
    order.forEach((ref, i) => {
      setTimeout(() => {
        const el = document.getElementById('demo-' + ref);
        if (el) {
          el.textContent = ref[0] === 'D' ? fmtCell(get(ref), 'money') : String(get(ref));
          el.classList.remove('cell-fill');
          void el.offsetWidth;
          el.classList.add('cell-fill');
        }
        if (fref) fref.textContent = ref;
        if (finput) finput.value = raw[ref];
      }, i * 260);
    });
    setTimeout(() => {
      const hint = $('#demo-hint');
      if (hint) hint.textContent = 'Submitted to Priya — graded instantly.';
      const grade = $('#demo-grade');
      if (grade) grade.classList.add('show');
      btn.textContent = 'Submitted';
    }, order.length * 260 + 350);
  }

  let previewTrack = 'it';
  function renderPreview() {
    const tabs = $('#preview-tabs');
    const panel = $('#preview-panel');
    if (!tabs || !panel) return;
    tabs.innerHTML = Object.entries(TRACKS).map(([id, t]) => `
      <button type="button" class="preview-tab ${id === previewTrack ? 'is-on' : ''}" data-preview-track="${id}" role="tab" aria-selected="${id === previewTrack}">${esc(t.name)}</button>`).join('');
    const t = TRACKS[previewTrack];
    const term = TERMS[previewTrack][0];
    const task = JOBS[previewTrack][0];
    const boss = BOSSES[previewTrack];
    panel.innerHTML = `
      <p class="preview-track-name">${esc(t.name)} &middot; ${esc(t.blurb)}</p>
      <div class="preview-term">
        <span class="preview-label">A term you'd be expected to know</span>
        <p class="preview-term-t">${esc(term.t)}</p>
        <p class="preview-term-d">${esc(term.d)}</p>
      </div>
      <div class="preview-task">
        <span class="preview-label">Your first assignment, from ${esc(boss.name)} (${esc(boss.role)})</span>
        <p class="preview-task-t">${esc(task.title)}</p>
        <p class="preview-task-d">${esc(task.summary)}</p>
      </div>`;
  }

  function renderLandingFaq() {
    const el = $('#faq-list');
    if (!el) return;
    el.innerHTML = LANDING_FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  }

  function initReveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  function initScrollFx() {
    const stage = $('.mascot-stage');
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ticking = false;
    function update() {
      ticking = false;
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
      if (landing.hidden) { bar.style.width = '0%'; return; }
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + '%';
      if (stage && !reduceMotion) {
        const rect = stage.getBoundingClientRect();
        const offset = Math.max(-1, Math.min(1, (rect.top - window.innerHeight / 2) / window.innerHeight));
        stage.style.transform = `translateY(${offset * -26}px)`;
      }
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function toggleNav(force) {
    const open = typeof force === 'boolean' ? force : !nav.classList.contains('nav-open');
    nav.classList.toggle('nav-open', open);
    $('.nav-toggle').setAttribute('aria-expanded', open);
  }

  /* ---------------- Click handling ---------------- */
  document.addEventListener('click', async e => {
    // Close the account menu on any click outside it, or after picking an item
    if (!e.target.closest('.user-menu') || e.target.closest('.menu-item')) toggleUserMenu(false);
    const el = e.target.closest('[data-action], [data-view], [data-tab], [data-track], [data-preview-track], [data-open-task], [data-open-interview], [data-answer], [data-sort]');
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
    if (el.dataset.previewTrack) { previewTrack = el.dataset.previewTrack; renderPreview(); return; }
    if (el.dataset.view) { go(el.dataset.view); return; }
    if (el.dataset.openTask) { openTask(el.dataset.openTask); return; }
    if (el.dataset.openInterview) { openInterview(el.dataset.openInterview); return; }
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
        enterApp();
        break;
      case 'login':
        toggleNav(false);
        if (!authed) { openModal('login'); break; }
        if (!state.tosAcceptedAt) { openModal('terms'); break; }
        if (!state.track) { openModal('track-first'); break; }
        openApp(el.textContent.trim() === 'My account' ? 'account' : 'dashboard');
        break;
      case 'switch-login': openModal('login'); break;
      case 'switch-signup': openModal('signup'); break;
      case 'set-theme': setColorTheme(el.dataset.themeChoice); break;
      case 'remove-profile-photo': {
        const previous = state.profilePhoto;
        state.profilePhoto = '';
        if (!persist()) {
          state.profilePhoto = previous;
          toast('The profile picture could not be removed. Try again.');
          break;
        }
        refreshHeader();
        go(currentView);
        toast('Profile picture removed.');
        break;
      }
      case 'photo-filter':
        if (photoEditor && PHOTO_FILTERS[el.dataset.filter]) {
          photoEditor.filter = el.dataset.filter;
          $$('.photo-filter', modalBody).forEach(button => {
            const selected = button.dataset.filter === photoEditor.filter;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
          });
          drawPhotoEditorPreview();
        }
        break;
      case 'photo-center':
        if (photoEditor) {
          photoEditor.zoom = 1;
          photoEditor.offsetX = 0;
          photoEditor.offsetY = 0;
          $('#photo-zoom').value = '1';
          drawPhotoEditorPreview();
        }
        break;
      case 'cancel-photo-edit': closeModal(); break;
      case 'save-profile-photo': {
        if (!photoEditor) break;
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        const bounds = photoCropBounds(canvas.width);
        context.filter = PHOTO_FILTERS[photoEditor.filter].css;
        context.drawImage(photoEditor.image, bounds.x, bounds.y, bounds.width, bounds.height);
        const previous = state.profilePhoto;
        const photo = canvas.toDataURL('image/jpeg', 0.82);
        if (photo.length > 400000) {
          toast('That image is too detailed to save. Try a different photo.');
          break;
        }
        state.profilePhoto = photo;
        if (!persist()) {
          state.profilePhoto = previous;
          toast('There is not enough browser storage to save this photo.');
          break;
        }
        closeModal(true);
        refreshHeader();
        go(currentView);
        toast('Profile picture updated.');
        break;
      }
      case 'accept-terms': {
        state.tosAcceptedAt = new Date().toISOString();
        persist();
        if (window.FirstDayAuth) window.FirstDayAuth.acceptTerms();
        closeModal(true);
        if (!state.track) { openModal('track-first'); break; }
        openApp('dashboard');
        if (pendingCheckout) { pendingCheckout = false; openModal('checkout'); }
        break;
      }
      case 'close-modal': closeModal(); break;
      case 'track-finish': {
        if (!draftTrack) return;
        const first = modalMode === 'track-first';
        state.track = draftTrack;
        openTracks();
        persist();
        closeModal(true);
        if (first) toast(`You're all set on the ${TRACKS[state.track].name} track.`);
        openApp(first ? 'dashboard' : currentView);
        if (first && pendingCheckout) { pendingCheckout = false; openModal('checkout'); }
        break;
      }
      case 'change-track': openModal('track'); break;
      case 'user-menu': toggleUserMenu(); break;
      case 'help': openModal('help'); break;
      case 'upgrade':
        upgradeWant = el.dataset.want || null;
        if (state.pro && upgradeWant) addTrack(upgradeWant);
        else openModal('upgrade');
        break;
      case 'go-pro':
        toggleNav(false);
        if (!authed) { pendingCheckout = true; openModal('signup'); }
        else if (!state.tosAcceptedAt) { pendingCheckout = true; openModal('terms'); }
        else if (!state.track) { pendingCheckout = true; openModal('track-first'); }
        else if (state.pro) { openApp('account'); toast('You already have FirstDay Pro.'); }
        else { openApp('account'); openModal('checkout'); }
        break;
      case 'checkout': openModal('checkout'); break;
      case 'remove-code': checkoutCode = null; renderModal(); break;
      case 'checkout-pay':
        if (checkoutTotal() === 0) activatePro(checkoutCode);
        else if (PAYMENT_LINK) window.open(PAYMENT_LINK, '_blank', 'noopener');
        break;
      case 'switch-track': switchTrack(el.dataset.to); break;
      case 'downgrade':
        if (confirm('Switch back to the Free plan? You\u2019ll keep your progress on every track, but only your current track stays open.')) {
          state.pro = false;
          state.proCode = null;
          openTracks();
          persist();
          refreshHeader();
          toast('You\u2019re on the Free plan now.');
          go(currentView);
        }
        break;
      case 'signout':
        authed = false;
        if (window.FirstDayAuth) window.FirstDayAuth.signOut();
        closeModal(true);
        showLanding();
        toast('Signed out.');
        break;
      case 'reset-progress':
        if (confirm('Reset all progress on every track? This can’t be undone.')) {
          state.mastered = {};
          state.quizBest = {};
          state.tasks = {};
          state.interviews = {};
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
      case 'demo-submit': demoRun(el); break;
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
      case 'interview-hint': hintsShown[currentInterviewId] = (hintsShown[currentInterviewId] || 0) + 1; { const y = window.scrollY; renderInterviewQuestion(); window.scrollTo({ top: y, behavior: 'instant' }); } break;
      case 'submit-interview': submitInterview(el); break;
      case 'interview-reset':
        if (confirm('Start this question over? Your current answer will be cleared. Your best grade stays.')) {
          clearDraft(currentInterviewId);
          delete lastResults[currentInterviewId];
          renderInterviewQuestion();
        }
        break;
      case 'nav-toggle': toggleNav(); break;
    }
  });

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  $$('[data-price]').forEach(el => { el.textContent = money(PRO_PRICE); });
  renderPreview();
  renderLandingFaq();
  initReveal();
  initScrollFx();
  updateNavStart();
})();
