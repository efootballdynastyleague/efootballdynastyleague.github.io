import { DEMO_SESSION_KEY } from "./config.js";

function readSession() {
  const raw = sessionStorage.getItem(DEMO_SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    sessionStorage.removeItem(DEMO_SESSION_KEY);
    return null;
  }
}

export const authService = {
  signIn(role, formData) {
    const session = {
      role,
      name: formData.get("name") || "Demo User",
      email: formData.get("email") || "",
      club: formData.get("club") || "",
      signedInAt: new Date().toISOString()
    };

    // TODO: Replace this demo-only browser session with Firebase Auth or Supabase Auth.
    // Keep the public methods stable so the page UI can stay the same when real auth is added.
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
    return session;
  },

  signOut() {
    sessionStorage.removeItem(DEMO_SESSION_KEY);
  },

  getSession() {
    return readSession();
  },

  getCurrentRole() {
    return readSession()?.role ?? null;
  }
};
