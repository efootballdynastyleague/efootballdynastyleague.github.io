export const SITE_NAME = "Efootball Dynasty League";
export const SITE_TAGLINE = "Official league hub";

export const FORM_LINKS = Object.freeze({
  ballondor: "#ballondor-form-link",
  complaint: "#complaint-form-link",
  registration: "#registration-form-link",
  matchResult: "#match-result-form-link"
});

export const DEMO_SESSION_KEY = "edl-demo-session";

export const ROLE_ROUTES = Object.freeze({
  admin: "admin-dashboard.html",
  manager: "manager-dashboard.html"
});

export const PUBLIC_NAV_ITEMS = Object.freeze([
  { label: "Home", href: "index.html", page: "home" },
  { label: "Rules", href: "rules.html", page: "rules" },
  { label: "News", href: "news.html", page: "news" },
  { label: "Records", href: "records.html", page: "records" },
  { label: "Ballon d'Or", href: "ballondor.html", page: "ballondor" },
  { label: "Managers", href: "managers.html", page: "managers" }
]);

export const UTILITY_LINKS = Object.freeze([
  { label: "Register", href: "register.html" },
  { label: "Complaint", href: "complaint.html" },
  { label: "Match Result", href: "match-result.html" },
  { label: "Login", href: "login.html" }
]);

export const PLACEHOLDER_HELP_FILE = "assets/js/config.js";
