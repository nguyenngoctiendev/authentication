const jwt = require("jsonwebtoken");
const userSchema = require("../controler/UserSchema");

async function isAuthentication(req, res, next) {
    try {
        const bearerHeader = req.headers["authorization"];
        if (!bearerHeader) {
            return res.status(401).send("Missing authorization token");
        }
        const accessToken = bearerHeader.split(" ")[1];
        const decodeJwt = jwt.verify(accessToken, "myjwt");
        req.userId = decodeJwt._id;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).send("Token expired");
        }
        return res.status(401).send("Token is not valid");
    }
}

async function isAdmin(req, res, next) {
    try {
        const userId = req.userId;
        const findUser = await userSchema.findById(userId);
        if (findUser.role === "admin") {
            next();
        } else {
            return res.status(403).send("Access denied. User is not an admin");
        }
    } catch (err) {
        return res.status(401).send("Authentication is not valid");
    }
}

module.exports = { isAuthentication: isAuthentication, isAdmin: isAdmin };
