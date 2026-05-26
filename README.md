# Election_Process_Guide
An interactive, client-side web app that helps users understand the election process, timelines, and steps in a clean, easy-to-follow interface.
Features
SectionWhat it coversOverviewSix key election phases at a glanceElection stepsAll 10 steps from announcement to inauguration, each expandableTimelineChronological view of when each phase happensVoter guideEligibility, registration, finding your polling place, voting dayFAQsSeven common questions with expandable answersGlossarySixteen key election terms defined clearly
File structure
election-guide/
├── index.html   ← markup & page structure
├── styles.css   ← all styling (CSS variables, layout, components)
├── main.js      ← data, render functions, interactivity
└── README.md
Getting started
No build step or dependencies required — just open index.html in a browser.
bashgit clone https://github.com/your-username/election-guide.git
cd election-guide
open index.html        # macOS
# or
start index.html       # Windows
# or
xdg-open index.html    # Linux
For a live-reload dev experience you can use any static server:
bashnpx serve .
# → http://localhost:3000
Customisation
Swap in your own data
All content lives in plain JavaScript arrays and objects at the top of main.js:

overviewPhases — the six overview cards
electionSteps — the 10-step accordion
timelineEvents — the vertical timeline
voterSections — the voter guide cards
faqs — FAQ list
glossaryTerms — glossary grid

Theming
styles.css uses CSS custom properties (--color-text-primary, --color-background-secondary, etc.) that automatically adapt to light and dark mode when hosted inside environments that define them (e.g. claude.ai). For standalone use, override them in a :root {} block at the top of styles.css.
sendPrompt integration
main.js exposes a sendPrompt(text) stub at the bottom of the file. Replace it with your own chat or AI integration to make the "ask" buttons functional in your deployment.
Browser support
Works in all modern browsers (Chrome, Firefox, Safari, Edge). No polyfills needed.
License
MIT
