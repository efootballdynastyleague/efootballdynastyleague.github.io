# Efootball Dynasty League GitHub Pages Site

This repository now contains a beginner-friendly, multi-page static website for **Efootball Dynasty League**.
It is built with plain **HTML**, **CSS**, and **JavaScript** so it works on **GitHub Pages** without a backend.

The site currently includes:

- Public pages for home, rules, news, tournament records, Ballon d'Or voting, managers, registration, complaints, match result submission, and login
- Separate **admin** and **manager** dashboard demos
- Temporary **Google Form placeholder links** for Ballon d'Or voting, complaints, manager registration, and match result submission
- Clear comments and service files showing where **Firebase** or **Supabase** can be connected later

## Important current limitations

- The login is **demo-only** and **not secure**
- The admin and manager dashboards do **not** provide real permissions yet
- Complaint status cards are placeholders only
- Votes, complaints, manager registrations, and match results are **not** saved inside the site yet
- There are **no secrets**, **no API keys**, **no Firebase config**, and **no Supabase config** in this repo

## Where to replace the Google Form links later

Edit this file:

- `assets/js/config.js`

Replace these placeholder values:

- `ballondor: "#ballondor-form-link"`
- `complaint: "#complaint-form-link"`
- `registration: "#registration-form-link"`
- `matchResult: "#match-result-form-link"`

Example:

```js
export const FORM_LINKS = Object.freeze({
  ballondor: "https://forms.gle/your-ballondor-form",
  complaint: "https://forms.gle/your-complaint-form",
  registration: "https://forms.gle/your-registration-form",
  matchResult: "https://forms.gle/your-match-result-form"
});
```

Once you replace those values, every public page and dashboard button using those links will update automatically.

## File guide

### Root HTML pages

- `index.html`
  - Home page with overview, quick access cards, and latest news preview
- `rules.html`
  - Public league rules page
- `news.html`
  - Public league news page
- `records.html`
  - Public tournament records page
- `ballondor.html`
  - Public Ballon d'Or nominees page with temporary voting button
- `managers.html`
  - Public manager list plus registration call to action
- `register.html`
  - Temporary manager registration page
- `complaint.html`
  - Temporary complaint submission page
- `match-result.html`
  - Temporary match result submission page
- `login.html`
  - Demo-only login page for admin and manager dashboard previews
- `admin-dashboard.html`
  - Demo-only admin dashboard layout
- `manager-dashboard.html`
  - Demo-only manager dashboard layout

### Shared styling

- `assets/css/styles.css`
  - Main shared stylesheet for all pages, layouts, cards, tables, forms, banners, and mobile navigation

### Shared JavaScript

- `assets/js/config.js`
  - Shared site settings, navigation items, demo role routes, and Google Form placeholder links
- `assets/js/mock-data.js`
  - Starter public content and dashboard preview data such as rules, news, records, managers, fixtures, and complaints
- `assets/js/data-service.js`
  - Provider-neutral data helper layer
  - Reads shared mock data now
  - Marks where future Firebase or Supabase reads and writes should go later
- `assets/js/auth-service.js`
  - Demo-only browser session helper
  - Uses `sessionStorage` now
  - Marks where future Firebase Auth or Supabase Auth should replace the demo flow
- `assets/js/main.js`
  - Shared page bootstrap file
  - Renders common header and footer
  - Populates page content from shared data
  - Wires demo login, dashboard notices, temporary form links, and demo-only actions

## How the future Firebase or Supabase upgrade is prepared

The code is structured so the public pages do not need to be redesigned later.

### Authentication later

When you are ready for real login:

- Replace the demo session logic in `assets/js/auth-service.js`
- Keep the same public methods if possible:
  - `signIn(role, formData)`
  - `signOut()`
  - `getSession()`
  - `getCurrentRole()`

This makes it easier to swap in:

- **Firebase Auth**
- or **Supabase Auth**

### Database reads later

When you are ready for live content:

- Replace the mock reads in `assets/js/data-service.js`
- Pull rules, news, records, nominees, managers, fixtures, results, and complaint status from your chosen database

### Database writes later

When you are ready for real app features:

- Replace the demo admin actions in `assets/js/data-service.js`
- Replace the Google Form placeholder flows with real writes for:
  - Ballon d'Or votes
  - Complaints
  - Manager registration
  - Match result submission

## GitHub Pages compatibility notes

- All pages are normal `.html` files at the repo root
- All links are direct file links, so pages can be opened directly by URL
- No backend server is required
- No paid services are required
- No build step is required

## Recommended next upgrade stages

1. Replace the four Google Form placeholder links with real forms
2. Add real Firebase Auth or Supabase Auth
3. Move mock data in `assets/js/mock-data.js` into a database
4. Replace demo dashboard actions with real admin and manager writes
5. Add protected complaint tracking, voting history, and manager profile data
