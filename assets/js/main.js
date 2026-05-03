import {
  FORM_LINKS,
  PLACEHOLDER_HELP_FILE,
  PUBLIC_NAV_ITEMS,
  ROLE_ROUTES,
  SITE_NAME,
  SITE_TAGLINE,
  UTILITY_LINKS
} from "./config.js";
import { authService } from "./auth-service.js";
import { dataService } from "./data-service.js";

const page = document.body.dataset.page;
let demoVotingOpen = true;

document.addEventListener("DOMContentLoaded", () => {
  renderSharedLayout();
  decorateFormLinks();
  routePage();
  bindSharedEvents();
});

function renderSharedLayout() {
  const currentRole = authService.getCurrentRole();
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="container site-header-inner">
          <a class="site-brand" href="index.html" aria-label="${SITE_NAME} home">
            <strong>${SITE_NAME}</strong>
            <span>${SITE_TAGLINE}</span>
          </a>
          <button class="nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation">Menu</button>
          <div class="site-nav-wrap" id="site-nav-wrap">
            <nav class="site-nav" aria-label="Primary navigation">
              ${PUBLIC_NAV_ITEMS.map((item) => {
                const activeClass = item.page === page ? "is-active" : "";
                return `<a class="${activeClass}" href="${item.href}">${item.label}</a>`;
              }).join("")}
            </nav>
            <div class="site-actions">
              ${UTILITY_LINKS.map((item) => `<a class="button button-secondary" href="${item.href}">${item.label}</a>`).join("")}
              ${currentRole ? `<span class="header-role-chip">${titleCase(currentRole)} demo role</span>` : ""}
              ${currentRole ? `<button class="button button-ghost" id="sign-out-button" type="button">Demo Sign Out</button>` : ""}
            </div>
          </div>
        </div>
      </header>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer-inner">
          <p>&copy; <span id="footer-year"></span> ${SITE_NAME}. Built as a GitHub Pages-first league website.</p>
          <p>Replace Google Form placeholders in <code>${PLACEHOLDER_HELP_FILE}</code>.</p>
        </div>
      </footer>
    `;
  }

  const year = document.getElementById("footer-year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function bindSharedEvents() {
  const navToggle = document.getElementById("nav-toggle");
  const navWrap = document.getElementById("site-nav-wrap");
  const signOutButton = document.getElementById("sign-out-button");

  if (navToggle && navWrap) {
    navToggle.addEventListener("click", () => {
      const isOpen = navWrap.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener("click", () => {
      authService.signOut();
      showToast("Demo session cleared. This site still remains publicly viewable because no real auth is connected yet.");

      if (page === "admin-dashboard" || page === "manager-dashboard") {
        window.setTimeout(() => {
          window.location.href = "login.html";
        }, 500);
      } else {
        window.location.reload();
      }
    });
  }
}

function decorateFormLinks() {
  document.querySelectorAll("[data-form-link]").forEach((link) => {
    const formKey = link.dataset.formLink;
    const target = dataService.getFormLink(formKey);

    link.setAttribute("href", target);

    if (!target.startsWith("#")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }

    link.addEventListener("click", (event) => {
      if (target.startsWith("#")) {
        event.preventDefault();
        showToast(dataService.createPlaceholderMessage(formKey));
      }
    });
  });

  setText("ballondor-link-display", FORM_LINKS.ballondor);
  setText("registration-link-display", FORM_LINKS.registration);
  setText("register-page-link-display", FORM_LINKS.registration);
  setText("complaint-link-display", FORM_LINKS.complaint);
  setText("match-result-link-display", FORM_LINKS.matchResult);
}

function routePage() {
  switch (page) {
    case "home":
      renderHomePage();
      break;
    case "rules":
      renderRulesPage();
      break;
    case "news":
      renderNewsPage();
      break;
    case "records":
      renderRecordsPage();
      break;
    case "ballondor":
      renderBallonDorPage();
      break;
    case "managers":
      renderManagersPage();
      break;
    case "login":
      renderLoginPage();
      break;
    case "admin-dashboard":
      renderAdminDashboard();
      break;
    case "manager-dashboard":
      renderManagerDashboard();
      break;
    default:
      break;
  }
}

function renderHomePage() {
  const managerCount = dataService.getManagers().length;
  const recordCount = dataService.getTournamentRecords().length;
  const news = dataService.getNewsPosts().slice(0, 3);
  const grid = document.getElementById("home-news-grid");

  setText("home-manager-count", String(managerCount));
  setText("home-record-count", String(recordCount));

  if (grid) {
    grid.innerHTML = news.map((post) => `
      <article class="surface-card feature-card">
        <div class="pill">${post.category}</div>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <p class="small-note">${post.date} - ${post.status}</p>
      </article>
    `).join("");
  }
}

function renderRulesPage() {
  const container = document.getElementById("rules-grid");
  const rules = dataService.getLeagueRules();

  if (container) {
    container.innerHTML = rules.map((rule) => `
      <article class="surface-card feature-card">
        <h3>${rule.title}</h3>
        <p>${rule.description}</p>
        <ul class="hero-points compact-list">
          ${rule.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    `).join("");
  }
}

function renderNewsPage() {
  const container = document.getElementById("news-grid");
  const news = dataService.getNewsPosts();

  if (container) {
    container.innerHTML = news.map((post) => `
      <article class="surface-card feature-card">
        <div class="pill">${post.category}</div>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <p class="small-note">${post.date} - ${post.status}</p>
      </article>
    `).join("");
  }
}

function renderRecordsPage() {
  const records = dataService.getTournamentRecords();
  const statGrid = document.getElementById("records-stat-grid");
  const tableBody = document.getElementById("records-table-body");
  const uniqueWinners = new Set(records.map((record) => record.winner)).size;

  if (statGrid) {
    statGrid.innerHTML = `
      <article class="metric-card">
        <span class="metric-value">${records.length}</span>
        <span class="metric-label">Recorded competitions</span>
      </article>
      <article class="metric-card">
        <span class="metric-value">${uniqueWinners}</span>
        <span class="metric-label">Different winners</span>
      </article>
      <article class="metric-card">
        <span class="metric-value">1</span>
        <span class="metric-label">Season archived so far</span>
      </article>
    `;
  }

  if (tableBody) {
    tableBody.innerHTML = records.map((record) => `
      <tr>
        <td>${record.tournament}</td>
        <td>${record.season}</td>
        <td>${record.winner}</td>
        <td>${record.runnerUp}</td>
        <td>${record.topScorer}</td>
        <td>${record.notes}</td>
      </tr>
    `).join("");
  }
}

function renderBallonDorPage() {
  const container = document.getElementById("nominee-grid");
  const nominees = dataService.getBallonDorNominees();

  if (container) {
    container.innerHTML = nominees.map((nominee) => `
      <article class="surface-card feature-card">
        <div class="pill">Nominee</div>
        <h3>${nominee.player}</h3>
        <p>${nominee.club}</p>
        <p>${nominee.description}</p>
      </article>
    `).join("");
  }
}

function renderManagersPage() {
  const tableBody = document.getElementById("managers-table-body");
  const managers = dataService.getManagers();

  if (tableBody) {
    tableBody.innerHTML = managers.map((manager) => `
      <tr>
        <td>${manager.name}</td>
        <td>${manager.club}</td>
        <td>${manager.division}</td>
        <td>${manager.status}</td>
      </tr>
    `).join("");
  }
}

function renderLoginPage() {
  const roleButtons = document.querySelectorAll("[data-role-target]");
  const rolePanels = document.querySelectorAll("[data-role-panel]");
  const adminForm = document.getElementById("admin-login-form");
  const managerForm = document.getElementById("manager-login-form");

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetRole = button.dataset.roleTarget;

      roleButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      rolePanels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.rolePanel === targetRole);
      });
    });
  });

  if (adminForm) {
    adminForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const session = authService.signIn("admin", new FormData(adminForm));
      showToast(`Demo admin session created for ${session.name}. Redirecting to the admin dashboard preview.`);
      window.setTimeout(() => {
        window.location.href = ROLE_ROUTES.admin;
      }, 350);
    });
  }

  if (managerForm) {
    managerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const session = authService.signIn("manager", new FormData(managerForm));
      showToast(`Demo manager session created for ${session.name}. Redirecting to the manager dashboard preview.`);
      window.setTimeout(() => {
        window.location.href = ROLE_ROUTES.manager;
      }, 350);
    });
  }
}

function renderAdminDashboard() {
  renderDashboardAccessMessage("admin");
  renderAdminMetrics();
  renderAdminTables();
  bindDemoForms();
  bindManagerActionButtons();
  bindVotingToggle();
}

function renderManagerDashboard() {
  renderDashboardAccessMessage("manager");
  renderManagerMetrics();
  renderManagerPanels();
}

function renderDashboardAccessMessage(requiredRole) {
  const container = document.getElementById("dashboard-access-message");

  if (!container) {
    return;
  }

  const session = authService.getSession();
  let message = "You are viewing this dashboard directly by URL. That is intentional for the demo, because no real protection is connected yet.";

  if (session && session.role === requiredRole) {
    message = `Demo session active: ${session.name} is viewing the ${titleCase(requiredRole)} dashboard layout. This still does not provide real permissions yet.`;
  } else if (session && session.role !== requiredRole) {
    message = `Demo session role mismatch: you are signed in as ${titleCase(session.role)} but viewing the ${titleCase(requiredRole)} dashboard page. The page remains visible because this is a public front-end preview.`;
  }

  container.innerHTML = `<div class="banner banner-info">${message}</div>`;
}

function renderAdminMetrics() {
  const container = document.getElementById("admin-metrics");

  if (container) {
    container.innerHTML = `
      <article class="metric-card">
        <span class="metric-value">${dataService.getNewsPosts().length}</span>
        <span class="metric-label">News items visible</span>
      </article>
      <article class="metric-card">
        <span class="metric-value">${dataService.getComplaints().length}</span>
        <span class="metric-label">Complaint placeholders</span>
      </article>
      <article class="metric-card">
        <span class="metric-value">${dataService.getMatchResults().length}</span>
        <span class="metric-label">Match result previews</span>
      </article>
      <article class="metric-card">
        <span class="metric-value">${dataService.getManagers().length}</span>
        <span class="metric-label">Managers listed</span>
      </article>
    `;
  }
}

function renderAdminTables() {
  const managerTable = document.getElementById("admin-managers-table-body");
  const complaintsTable = document.getElementById("complaints-table-body");
  const resultsTable = document.getElementById("match-results-table-body");

  if (managerTable) {
    managerTable.innerHTML = dataService.getManagers().map((manager) => `
      <tr>
        <td>${manager.name}</td>
        <td>${manager.club}</td>
        <td>${manager.status}</td>
        <td><button class="button button-ghost" type="button" data-manager-action="${manager.name}">Demo Update</button></td>
      </tr>
    `).join("");
  }

  if (complaintsTable) {
    complaintsTable.innerHTML = dataService.getComplaints().map((complaint) => `
      <tr>
        <td>${complaint.caseId}</td>
        <td>${complaint.manager}</td>
        <td>${complaint.issue}</td>
        <td>${complaint.status}</td>
        <td>${complaint.action}</td>
      </tr>
    `).join("");
  }

  if (resultsTable) {
    resultsTable.innerHTML = dataService.getMatchResults().map((result) => `
      <tr>
        <td>${result.fixture}</td>
        <td>${result.score}</td>
        <td>${result.submittedBy}</td>
        <td>${result.status}</td>
      </tr>
    `).join("");
  }
}

function renderManagerMetrics() {
  const container = document.getElementById("manager-metrics");

  if (container) {
    container.innerHTML = `
      <article class="metric-card">
        <span class="metric-value">${dataService.getBallonDorNominees().length}</span>
        <span class="metric-label">Ballon d'Or nominees</span>
      </article>
      <article class="metric-card">
        <span class="metric-value">${dataService.getFixtures().length}</span>
        <span class="metric-label">Fixture entries</span>
      </article>
      <article class="metric-card">
        <span class="metric-value">${dataService.getComplaintStatuses().length}</span>
        <span class="metric-label">Complaint status placeholders</span>
      </article>
      <article class="metric-card">
        <span class="metric-value">${dataService.getNewsPosts().length}</span>
        <span class="metric-label">News updates visible</span>
      </article>
    `;
  }
}

function renderManagerPanels() {
  const newsPreview = document.getElementById("manager-news-preview");
  const complaintStatusGrid = document.getElementById("complaint-status-grid");
  const fixturesTable = document.getElementById("fixtures-table-body");
  const rulesPreview = document.getElementById("manager-rules-preview");

  if (newsPreview) {
    newsPreview.innerHTML = dataService.getNewsPosts().slice(0, 2).map((post) => `
      <article class="mini-feed-card">
        <h3>${post.title}</h3>
        <p>${post.date} - ${post.category}</p>
      </article>
    `).join("");
  }

  if (complaintStatusGrid) {
    complaintStatusGrid.innerHTML = dataService.getComplaintStatuses().map((item) => `
      <article class="status-item">
        <h3>${item.title} - ${item.state}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  if (fixturesTable) {
    fixturesTable.innerHTML = dataService.getFixtures().map((fixture) => `
      <tr>
        <td>${fixture.fixture}</td>
        <td>${fixture.week}</td>
        <td>${fixture.status}</td>
        <td>${fixture.score}</td>
      </tr>
    `).join("");
  }

  if (rulesPreview) {
    rulesPreview.innerHTML = dataService.getLeagueRules().slice(0, 3).map((rule) => `
      <article class="rule-preview-card">
        <h3>${rule.title}</h3>
        <p>${rule.items[0]}</p>
      </article>
    `).join("");
  }
}

function bindDemoForms() {
  document.querySelectorAll("[data-demo-submit]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const action = form.dataset.demoSubmit;
      let result;

      switch (action) {
        case "news":
          result = dataService.saveNewsDraft();
          break;
        case "rules":
          result = dataService.saveRulesUpdate();
          break;
        case "record":
          result = dataService.addTournamentRecord();
          break;
        case "nominee":
          result = dataService.addBallonDorNominee();
          break;
        default:
          result = { message: "Demo action completed." };
          break;
      }

      showToast(result.message);
      form.reset();
    });
  });
}

function bindManagerActionButtons() {
  document.querySelectorAll("[data-manager-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const result = dataService.manageManagerAction();
      showToast(`${button.dataset.managerAction}: ${result.message}`);
    });
  });
}

function bindVotingToggle() {
  const button = document.getElementById("toggle-voting-button");
  const label = document.getElementById("voting-status-label");

  if (!button || !label) {
    return;
  }

  button.addEventListener("click", () => {
    demoVotingOpen = !demoVotingOpen;
    label.textContent = demoVotingOpen ? "Voting open" : "Voting closed";
    showToast(dataService.toggleVotingState(demoVotingOpen).message);
  });
}

function showToast(message) {
  const existing = document.querySelector(".toast");

  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 4200);
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
