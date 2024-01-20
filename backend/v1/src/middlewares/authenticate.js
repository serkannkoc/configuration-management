const httpStatus = require("http-status");
const admin = require("firebase-admin");

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).send({ error: "You must be logged in!" });
    }
    try {
        req.user = await admin.auth().verifyIdToken(token);
        next();
    } catch (error) {
        console.error("Error verifying Firebase ID token:", error);
        return res.status(httpStatus.FORBIDDEN).send({ error: "Invalid Firebase ID token" });
    }
};

module.exports = authenticateToken;
