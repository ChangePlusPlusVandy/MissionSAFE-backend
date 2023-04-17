//firebase-config.js
// Description: Imports the Firebase configurations and uses it to initialize the Firebase SDK.
// Exports auth to be used in other files.

const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccountKey = require("./serviceAccountKey.json");

const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);

module.exports = auth;