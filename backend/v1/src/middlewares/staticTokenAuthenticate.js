const httpStatus = require("http-status");
const admin = require("firebase-admin");

const staticTokenAuthenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    try {
        if (!token) {
            throw new Error("You must be logged in!");
        }
        if (process.env.STATIC_TOKEN !== token) {
            throw new Error("Invalid token");
        }
        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send({ error: error.message });
    }
};

module.exports = staticTokenAuthenticate;
