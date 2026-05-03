import { FORM_LINKS } from "./config.js";
import {
  ballonDorNominees,
  complaints,
  complaintStatuses,
  fixtures,
  leagueRules,
  managers,
  matchResults,
  newsPosts,
  tournamentRecords
} from "./mock-data.js";

function cloneArray(items) {
  return items.map((item) => ({
    ...item,
    ...(Array.isArray(item.items) ? { items: [...item.items] } : {})
  }));
}

function demoResponse(message) {
  return { ok: true, message };
}

export const dataService = {
  getLeagueRules() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(leagueRules);
  },

  getNewsPosts() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(newsPosts);
  },

  getTournamentRecords() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(tournamentRecords);
  },

  getBallonDorNominees() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(ballonDorNominees);
  },

  getManagers() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(managers);
  },

  getComplaints() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(complaints);
  },

  getComplaintStatuses() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(complaintStatuses);
  },

  getFixtures() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(fixtures);
  },

  getMatchResults() {
    // TODO: Replace this shared mock-data read with Firebase or Supabase database reads.
    return cloneArray(matchResults);
  },

  getFormLink(formKey) {
    return FORM_LINKS[formKey] ?? "#";
  },

  createPlaceholderMessage(formKey) {
    return `This button still points to the placeholder link "${this.getFormLink(formKey)}". Replace it in assets/js/config.js when your Google Form is ready.`;
  },

  saveNewsDraft() {
    // TODO: Replace this demo-only action with a real database write via Firebase or Supabase.
    return demoResponse("Demo only: the news draft was not saved. Connect a real database to publish league news.");
  },

  saveRulesUpdate() {
    // TODO: Replace this demo-only action with a real database write via Firebase or Supabase.
    return demoResponse("Demo only: the rules update was not saved. Connect Firebase or Supabase to edit published rules.");
  },

  addTournamentRecord() {
    // TODO: Replace this demo-only action with a real database write via Firebase or Supabase.
    return demoResponse("Demo only: the tournament record was not saved. Real results need a connected database later.");
  },

  addBallonDorNominee() {
    // TODO: Replace this demo-only action with a real database write via Firebase or Supabase.
    return demoResponse("Demo only: the nominee was not saved. Real nominee management should write to a database later.");
  },

  toggleVotingState(nextState) {
    // TODO: Replace this demo-only toggle with a real database write via Firebase or Supabase.
    return demoResponse(`Demo only: voting is now shown as ${nextState ? "open" : "closed"} in this browser session only.`);
  },

  manageManagerAction() {
    // TODO: Replace this demo-only action with a real database write via Firebase or Supabase.
    return demoResponse("Demo only: manager status was not changed. Real permissions and profile updates need a database later.");
  }
};
