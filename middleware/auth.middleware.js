const admin = require('firebase-admin');
const { applicationDefault } = require('firebase-admin/app');

admin.initializeApp({
    credential: applicationDefault(), // is this correct?
    databaseURL: "https://missionsafe-b864f.firebaseio.com" // is this correct?
});

const authRequired = async (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) {
        return res.status(401).send(); // not sure what error msg to send here
    }

    try {
        const accessToken = match[1];
        if(!accessToken) {
            return res.status(401, "Not Authorized").send();
        }
        req.jwt = await admin.auth().verifyIdToken(accessToken);
        next();
    } catch (err) {
        return res.status(401, "Not Authorized").send(err.message);
    }
};

module.exports = { authRequired };