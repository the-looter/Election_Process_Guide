// ─────────────────────────────────────────────
// Election Process Guide — main.js
// ─────────────────────────────────────────────

// ---------- Topic definitions ----------
const topics = {
  overview: {
    icon: "ti-home",
    title: "Election overview",
    render: renderOverview,
  },
  steps: {
    icon: "ti-list-numbers",
    title: "Election steps",
    render: renderSteps,
  },
  timeline: {
    icon: "ti-calendar-event",
    title: "Typical election timeline",
    render: renderTimeline,
  },
  voter: {
    icon: "ti-user-check",
    title: "Voter guide",
    render: renderVoter,
  },
  faq: {
    icon: "ti-help-circle",
    title: "Frequently asked questions",
    render: renderFaq,
  },
  glossary: {
    icon: "ti-book",
    title: "Election glossary",
    render: renderGlossary,
  },
};

// ---------- Data ----------
const overviewPhases = [
  ["ti-flag",        "Writ of election", "Official announcement that an election will be held"],
  ["ti-users",       "Candidate nomination", "Parties and independents register to run"],
  ["ti-speakerphone","Campaign period", "Candidates campaign for votes"],
  ["ti-square-check","Voting day", "Citizens cast their ballots"],
  ["ti-calculator",  "Vote counting", "Ballots are tallied and verified"],
  ["ti-certificate", "Results certified", "Winner is officially declared"],
];

const electionSteps = [
  { n: 1,  title: "Election announced",               time: "Months before",        detail: "The government or election authority officially announces an upcoming election, setting the date and issuing legal notices (often called a \"writ of election\" or \"election notification\"). This triggers all subsequent processes.",                       tips: ["Legal requirement", "Triggers voter rolls freeze", "Sets campaign start date"] },
  { n: 2,  title: "Voter registration opens/updates", time: "Several weeks before",  detail: "Citizens who are eligible to vote must be registered. Registration deadlines vary — some places allow same-day registration, others require weeks of advance notice. Voter rolls are updated and verified.",                                                   tips: ["Check your eligibility", "Register early", "Update your address if moved"] },
  { n: 3,  title: "Candidate nomination",             time: "Weeks before",          detail: "Political parties and independent candidates formally file to run for office. They must meet requirements: citizenship, age, residency, and often collect a minimum number of signatures or pay a filing fee.",                                              tips: ["Parties select nominees", "Independents can run too", "Deadlines are strict"] },
  { n: 4,  title: "Campaign period",                  time: "Weeks to months",       detail: "Candidates and parties campaign to persuade voters. This includes rallies, advertisements, debates, and canvassing. Campaign finance rules govern how much can be raised and spent, and by whom.",                                                         tips: ["Debates are held", "Media coverage intensifies", "Finance rules apply"] },
  { n: 5,  title: "Early voting & absentee ballots",  time: "1–2 weeks before",      detail: "Many jurisdictions allow voting before election day via early in-person voting or mail-in/absentee ballots. This improves access for people who cannot vote on the official election day.",                                                                    tips: ["Request ballots early", "Check local deadlines", "Track your mail ballot"] },
  { n: 6,  title: "Election day",                     time: "Official date",         detail: "Polling stations open for a set number of hours (commonly 7am–8pm). Voters present identification (requirements vary), receive a ballot, mark their choices privately, and submit it. Poll workers manage the process.",                                    tips: ["Bring required ID", "Polls open early", "You can stay in line if queuing at close"] },
  { n: 7,  title: "Vote counting",                    time: "Night of / days after", detail: "Ballots are counted by election officials, often with observers from multiple parties present. Electronic machines and/or hand counts are used. Results may take hours to days depending on volume and rules.",                                              tips: ["Results may not be instant", "Absentee ballots counted last in some places", "Observers ensure fairness"] },
  { n: 8,  title: "Results declared",                 time: "Hours to weeks after",  detail: "Once counting is complete, election authorities officially declare the results. In close races, recounts or audits may be triggered automatically or by request. Courts may hear challenges.",                                                              tips: ["Recount thresholds vary", "Candidates can concede", "Legal challenges are possible"] },
  { n: 9,  title: "Certification",                    time: "Weeks after",           detail: "Official bodies certify the results as final, verifying that all ballots were properly counted and all procedures were followed. This is the last legal step before the winner takes office.",                                                             tips: ["Official legal finality", "Bipartisan certification boards", "Sets inauguration timeline"] },
  { n: 10, title: "Inauguration / swearing in",       time: "Set by law",            detail: "The winner is officially sworn in to their new office, completing the election cycle. A peaceful transfer of power is the cornerstone of democratic governance.",                                                                                         tips: ["Ceremony marks the transition", "Outgoing official steps down", "New term begins"] },
];

const timelineEvents = [
  { time: "6–12 months before", label: "Election date set",        desc: "Government announces election; writ or notification issued. Voter rolls begin updating.",                                       status: "done" },
  { time: "4–6 months before",  label: "Candidate filing opens",   desc: "Parties announce candidates; independents file. Campaign finance reporting begins.",                                            status: "done" },
  { time: "3–4 months before",  label: "Campaign period starts",   desc: "Active campaigning, rallies, and advertising begin. Media coverage intensifies.",                                               status: "done" },
  { time: "6–8 weeks before",   label: "Voter registration deadline", desc: "Last day to register in many jurisdictions. Rolls are finalized and verified.",                                              status: "current" },
  { time: "2–4 weeks before",   label: "Early voting opens",       desc: "In-person early voting and mail ballot distribution begins for eligible voters.",                                                status: "future" },
  { time: "Election day",       label: "Polls open",               desc: "Official voting day. Polling stations open. Final votes cast by end of day.",                                                   status: "future" },
  { time: "Same night",         label: "Vote counting begins",     desc: "Counting starts as polls close. Unofficial results reported throughout the night.",                                             status: "future" },
  { time: "Days to weeks after",label: "Official results declared", desc: "All ballots counted; recounts or audits if needed. Winner officially announced.",                                              status: "future" },
  { time: "2–6 weeks after",    label: "Certification",            desc: "Results legally certified by election authority. Legal challenges resolved.",                                                   status: "future" },
  { time: "Set by law",         label: "Inauguration",             desc: "Winner sworn in; new term begins. Democratic transition complete.",                                                              status: "future" },
];

const voterSections = [
  {
    icon: "ti-id", color: "#534AB7", bg: "#EEEDFE",
    title: "Am I eligible?",
    items: [
      "Must be a citizen (in most countries)",
      "Must meet minimum age (commonly 18)",
      "Must not be serving certain criminal sentences",
      "Must be a resident of the jurisdiction",
    ],
  },
  {
    icon: "ti-clipboard-list", color: "#0F6E56", bg: "#E1F5EE",
    title: "How to register",
    items: [
      "Check your country/state's official election website",
      "Register online, by mail, or in person",
      "Provide proof of identity and address",
      "Update your registration if you move",
    ],
  },
  {
    icon: "ti-map-pin", color: "#185FA5", bg: "#E6F1FB",
    title: "Finding your polling place",
    items: [
      "Search your address on the official election site",
      "Polling place is usually near your home address",
      "Early voting sites may differ from election-day sites",
      "Accessibility accommodations are available",
    ],
  },
  {
    icon: "ti-square-check", color: "#854F0B", bg: "#FAEEDA",
    title: "On voting day",
    items: [
      "Bring required ID (varies by location)",
      "Go to your assigned polling place",
      "Receive and mark your ballot privately",
      "Submit ballot to the poll worker or scanner",
    ],
  },
];

const faqs = [
  {
    q: "What is the difference between a primary and a general election?",
    a: "A primary election is held within a political party to select which candidate will represent that party in the general election. The general election is the main, final election where voters from all parties choose between the various party nominees (and any independent candidates) for a given office.",
  },
  {
    q: "How does an electoral college or preferential voting work?",
    a: "Some countries use systems beyond simple majority. An electoral college (like in the US) assigns \"electors\" to states, and candidates need a majority of electors to win. Preferential (ranked-choice) voting lets voters rank candidates 1st, 2nd, 3rd, etc., redistributing votes until one candidate gets a majority.",
  },
  {
    q: "Can I vote if I'm registered but moved recently?",
    a: "It depends on your jurisdiction. Many places allow you to update your registration online or at the polls (same-day registration). If you moved within the same voting district, you may still be able to vote at your original polling place. Check your local election authority's rules.",
  },
  {
    q: "What is a recount, and when does it happen?",
    a: "A recount is a retallying of election votes. It's triggered automatically when the margin of victory falls below a certain threshold (e.g., 0.5%), or can be requested by a candidate who believes there was an error. Recounts can be done by machine or by hand.",
  },
  {
    q: "How long after election day are results official?",
    a: "Unofficial results are often known on election night for major races. However, official certification typically takes 2–6 weeks, as authorities must count all mail and provisional ballots, perform audits, and address any legal challenges before formally certifying the results.",
  },
  {
    q: "What is voter suppression?",
    a: "Voter suppression refers to strategies or policies that make it harder for eligible citizens to vote, often disproportionately affecting minority groups. Examples include strict ID requirements, reduced polling locations, limited early voting hours, and purging of voter rolls. It is widely condemned and in many cases illegal.",
  },
  {
    q: "Who runs elections — the government or an independent body?",
    a: "It varies by country. Many democracies have independent election commissions that administer elections to avoid conflicts of interest (e.g., the UK's Electoral Commission, India's Election Commission). In the US, elections are largely administered at the state and local level, with oversight from federal agencies.",
  },
];

const glossaryTerms = [
  ["Ballot",                   "The paper or digital form on which a voter marks their choices"],
  ["Caucus",                   "A meeting of party members to choose a candidate or policy"],
  ["Constituency",             "A geographic area represented by an elected official"],
  ["Electorate",               "All eligible voters in a jurisdiction"],
  ["Gerrymandering",           "Manipulating district boundaries to favor one party"],
  ["Incumbent",                "The current holder of an elected office running for re-election"],
  ["Mandate",                  "The authority granted to a winner to carry out their agenda"],
  ["Plurality",                "Winning more votes than any other candidate, but not a majority"],
  ["Polling station",          "The physical location where voters cast their ballots"],
  ["Proportional representation", "Seats allocated based on share of total votes received"],
  ["Provisional ballot",       "A ballot cast when voter eligibility is uncertain; verified later"],
  ["Quorum",                   "Minimum number of members needed to conduct official business"],
  ["Runoff",                   "A second election held when no candidate wins a required majority"],
  ["Suffrage",                 "The right to vote in public elections"],
  ["Swing state/seat",         "A district that can reasonably be won by either major party"],
  ["Voter roll",               "The official list of registered voters in a jurisdiction"],
];

// ---------- Render helpers ----------
function askBtnRow(buttons) {
  return `<div class="ask-btn-row">
    ${buttons
      .map(
        ([label, prompt]) =>
          `<button class="ask-btn" onclick="sendPrompt('${prompt}')">
            <i class="ti ti-arrow-up-right" aria-hidden="true"></i>${label} ↗
           </button>`
      )
      .join("")}
  </div>`;
}

// ---------- Render functions ----------
function renderOverview() {
  const cards = overviewPhases
    .map(
      ([icon, title, desc]) => `
      <div class="overview-card">
        <i class="ti ${icon}" aria-hidden="true"></i>
        <div class="overview-card-title">${title}</div>
        <div class="overview-card-desc">${desc}</div>
      </div>`
    )
    .join("");

  return `
    <p style="font-size:14px;color:var(--color-text-secondary);line-height:1.7;margin-bottom:1.25rem;">
      An election is a formal process by which citizens choose representatives or decide on policy
      questions. Elections have several key phases — from nomination of candidates all the way to
      certification of results.
    </p>
    <div class="overview-grid">${cards}</div>
    ${askBtnRow([
      ["What is a writ of election?",  "What is a writ of election and who issues it?"],
      ["How does nomination work?",    "How does the candidate nomination process work?"],
      ["How are votes counted?",       "Explain how votes are counted and verified"],
    ])}`;
}

function renderSteps() {
  const items = electionSteps
    .map(
      (s, i) => `
      <div class="step-item" onclick="toggleStep(${i})">
        <div class="step-left">
          <div class="step-number" id="sn${i}">${s.n}</div>
          ${i < electionSteps.length - 1 ? '<div class="step-connector"></div>' : ""}
        </div>
        <div class="step-content">
          <div class="step-title">${s.title}</div>
          <div class="step-time">
            <i class="ti ti-clock" aria-hidden="true"></i>${s.time}
          </div>
          <div class="step-detail" id="sd${i}">
            ${s.detail}
            <div class="step-tips">
              ${s.tips.map((t) => `<span class="tip-tag">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>`
    )
    .join("");

  return `
    <div class="step-list">${items}</div>
    ${askBtnRow([
      ["Disputed results",       "What happens if an election result is disputed?"],
      ["How long does it take?", "How long does the full election process take?"],
    ])}`;
}

function renderTimeline() {
  const items = timelineEvents
    .map(
      (e, i) => `
      <div class="tl-item">
        <div class="tl-left"><div class="tl-time">${e.time}</div></div>
        <div class="tl-mid">
          <div class="tl-dot ${e.status}"></div>
          ${i < timelineEvents.length - 1 ? '<div class="tl-line"></div>' : ""}
        </div>
        <div class="tl-right">
          <div class="tl-label">${e.label}</div>
          <div class="tl-desc">${e.desc}</div>
        </div>
      </div>`
    )
    .join("");

  return `
    <div class="timeline-view">${items}</div>
    <div class="tl-legend">
      <span><span class="legend-dot done"></span>Completed phase</span>
      <span><span class="legend-dot current"></span>Upcoming</span>
      <span><span class="legend-dot future"></span>Future</span>
    </div>
    ${askBtnRow([
      ["Presidential vs local", "How does the timeline differ between presidential and local elections?"],
    ])}`;
}

function renderVoter() {
  const cards = voterSections
    .map(
      (s) => `
      <div class="voter-card">
        <div class="voter-card-header">
          <div class="voter-icon-wrap" style="background:${s.bg};">
            <i class="ti ${s.icon}" aria-hidden="true" style="color:${s.color};"></i>
          </div>
          <span class="voter-card-title">${s.title}</span>
        </div>
        <ul class="voter-list">
          ${s.items
            .map(
              (item) => `
            <li>
              <i class="ti ti-point-filled" aria-hidden="true" style="color:${s.color};"></i>
              ${item}
            </li>`
            )
            .join("")}
        </ul>
      </div>`
    )
    .join("");

  return `
    <p style="font-size:13px;color:var(--color-text-secondary);margin-bottom:1.25rem;line-height:1.6;">
      Everything you need to know to participate in an election as a voter.
    </p>
    ${cards}
    ${askBtnRow([
      ["What ID is needed?",  "What ID do I need to bring to vote?"],
      ["Voting by mail",      "How do I vote by mail or absentee?"],
      ["Ballot mistakes",     "What if I make a mistake on my ballot?"],
    ])}`;
}

function renderFaq() {
  const items = faqs
    .map(
      (f, i) => `
      <div class="faq-item" onclick="toggleFaq(${i})">
        <div class="faq-q" id="fq${i}">
          <span>${f.q}</span>
          <i class="ti ti-chevron-down" aria-hidden="true"></i>
        </div>
        <div class="faq-a" id="fa${i}">${f.a}</div>
      </div>`
    )
    .join("");

  return `
    <div>${items}</div>
    ${askBtnRow([
      ["Check if vote counted",   "How can I check if my vote was counted?"],
      ["Voting systems globally", "What are the different types of voting systems around the world?"],
    ])}`;
}

function renderGlossary() {
  const cards = glossaryTerms
    .map(
      ([term, def]) => `
      <div class="gloss-card">
        <div class="gloss-term">${term}</div>
        <div class="gloss-def">${def}</div>
      </div>`
    )
    .join("");

  return `
    <div class="glossary-grid">${cards}</div>
    ${askBtnRow([
      ["Plurality vs PR systems", "Explain the difference between plurality and proportional representation voting systems"],
    ])}`;
}

// ---------- Topic switcher ----------
function showTopic(key) {
  const t = topics[key];

  // Update active button state
  const buttons = document.querySelectorAll(".topic-btn");
  const keys = Object.keys(topics);
  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", keys[i] === key);
  });

  // Render content
  const area = document.getElementById("contentArea");
  area.innerHTML = `
    <div class="content-header">
      <i class="ti ${t.icon}" aria-hidden="true"></i>
      <h2>${t.title}</h2>
    </div>
    <div class="content-body">${t.render()}</div>`;
}

// ---------- Toggle helpers ----------
function toggleStep(i) {
  document.getElementById("sd" + i).classList.toggle("open");
}

function toggleFaq(i) {
  document.getElementById("fa" + i).classList.toggle("open");
  document.getElementById("fq" + i).classList.toggle("open");
}

// ---------- sendPrompt stub (works inside claude.ai widget) ----------
// In a standalone deployment replace this with your own chat integration.
if (typeof sendPrompt === "undefined") {
  window.sendPrompt = function (text) {
    alert("Ask: " + text);
  };
}
