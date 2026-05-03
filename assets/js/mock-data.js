export const leagueRules = [
  {
    title: "Fixture Windows",
    description: "Managers should complete league matches inside the agreed schedule.",
    items: [
      "Play fixtures within the official match window whenever possible.",
      "Request an extension early if availability issues appear.",
      "Repeated no-shows can lead to admin review or awarded results."
    ]
  },
  {
    title: "Result Submission",
    description: "Every played match needs a clear result trail while the process remains manual.",
    items: [
      "Submit the scoreline after each match using the temporary result form.",
      "Include screenshots or brief notes when admins request proof.",
      "Do not submit altered or duplicated results."
    ]
  },
  {
    title: "Manager Conduct",
    description: "Respectful competition keeps the league healthy and credible.",
    items: [
      "Treat other managers and admins respectfully during disputes and match scheduling.",
      "Cheating, abusive language, or fake reports can trigger penalties.",
      "Use the official complaint route instead of public arguments."
    ]
  },
  {
    title: "Admin Decisions",
    description: "Admins need a consistent framework for decisions until full tooling exists.",
    items: [
      "Admins can review evidence and request clarification from both sides.",
      "Possible outcomes include replay orders, awarded wins, or warnings.",
      "Key decisions should be summarized publicly for transparency."
    ]
  }
];

export const newsPosts = [
  {
    title: "Season 2 registration window is open",
    category: "Registration",
    summary: "New and returning managers can now join the next campaign through the temporary registration workflow.",
    date: "May 2026",
    status: "Open"
  },
  {
    title: "Ballon d'Or shortlist preview published",
    category: "Awards",
    summary: "The initial nominee preview is live so managers can see how the voting flow will look before the real form is added.",
    date: "May 2026",
    status: "Preview"
  },
  {
    title: "Complaint intake now has a public landing page",
    category: "Operations",
    summary: "Complaints still route through a temporary form, but the policy and expectations are now visible on the website.",
    date: "May 2026",
    status: "Active"
  },
  {
    title: "Tournament archive is ready for historical updates",
    category: "Records",
    summary: "Admins can now use the demo dashboard as a guide for publishing winners, runners-up, and scoring leaders.",
    date: "May 2026",
    status: "Ready"
  }
];

export const tournamentRecords = [
  {
    tournament: "Dynasty League Cup",
    season: "Season 1",
    winner: "Manager Prime",
    runnerUp: "Goal Architect",
    topScorer: "Luis Victory",
    notes: "First official cup final."
  },
  {
    tournament: "Super Cup",
    season: "Season 1",
    winner: "Northbank FC",
    runnerUp: "Blue Dynasty",
    topScorer: "K. Falcon",
    notes: "Decided in extra time."
  },
  {
    tournament: "Champions Tournament",
    season: "Season 1",
    winner: "Goal Architect",
    runnerUp: "Dynasty XI",
    topScorer: "M. Sterling",
    notes: "Highest goal average so far."
  },
  {
    tournament: "Invitational Shield",
    season: "Season 1",
    winner: "Royal Tactics",
    runnerUp: "Manager Prime",
    topScorer: "A. Nova",
    notes: "Best defensive record."
  }
];

export const ballonDorNominees = [
  {
    player: "Luis Victory",
    club: "Manager Prime",
    description: "League Golden Boot leader with consistent match-winning performances."
  },
  {
    player: "M. Sterling",
    club: "Goal Architect",
    description: "Creative engine behind a title challenge and multiple clutch assists."
  },
  {
    player: "A. Nova",
    club: "Royal Tactics",
    description: "Two-way standout with elite pressing and big-match finishing."
  },
  {
    player: "K. Falcon",
    club: "Blue Dynasty",
    description: "Reliable goal source across league play and knockout tournaments."
  }
];

export const managers = [
  { name: "Manager Prime", club: "Prime United", division: "Premier", status: "Active" },
  { name: "Goal Architect", club: "Architect FC", division: "Premier", status: "Active" },
  { name: "Royal Tactics", club: "Royal Tactics", division: "Premier", status: "Active" },
  { name: "Blue Dynasty", club: "Blue Dynasty", division: "Championship", status: "Active" },
  { name: "Northbank FC", club: "Northbank", division: "Championship", status: "Pending Review" }
];

export const complaints = [
  {
    caseId: "CMP-001",
    manager: "Blue Dynasty",
    issue: "Disconnected match replay dispute",
    status: "Pending",
    action: "Awaiting evidence"
  },
  {
    caseId: "CMP-002",
    manager: "Goal Architect",
    issue: "Late fixture claim",
    status: "Reviewed",
    action: "Admin note issued"
  },
  {
    caseId: "CMP-003",
    manager: "Northbank FC",
    issue: "Incorrect score submission",
    status: "Resolved",
    action: "Score corrected"
  }
];

export const complaintStatuses = [
  {
    title: "CMP-001",
    state: "Pending",
    text: "Awaiting evidence upload and both manager statements."
  },
  {
    title: "CMP-002",
    state: "Reviewed",
    text: "Admin has reviewed the match context and added a note."
  },
  {
    title: "CMP-003",
    state: "Resolved",
    text: "Case closed after a corrected result was accepted."
  }
];

export const fixtures = [
  {
    fixture: "Prime United vs Architect FC",
    week: "Week 5",
    status: "Scheduled",
    score: "TBD"
  },
  {
    fixture: "Royal Tactics vs Blue Dynasty",
    week: "Week 5",
    status: "Played",
    score: "3 - 1"
  },
  {
    fixture: "Northbank vs Prime United",
    week: "Week 6",
    status: "Pending",
    score: "TBD"
  },
  {
    fixture: "Architect FC vs Royal Tactics",
    week: "Week 6",
    status: "Played",
    score: "2 - 2"
  }
];

export const matchResults = [
  {
    fixture: "Royal Tactics vs Blue Dynasty",
    score: "3 - 1",
    submittedBy: "Royal Tactics",
    status: "Approved"
  },
  {
    fixture: "Architect FC vs Royal Tactics",
    score: "2 - 2",
    submittedBy: "Architect FC",
    status: "Awaiting admin check"
  },
  {
    fixture: "Prime United vs Northbank",
    score: "1 - 0",
    submittedBy: "Prime United",
    status: "Approved"
  }
];
