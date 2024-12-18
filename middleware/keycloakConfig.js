const session = require('express-session');
const Keycloak = require('keycloak-connect');

// Session setup
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

module.exports = {
  keycloak,
  memoryStore,
};
