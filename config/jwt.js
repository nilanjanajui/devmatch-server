const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const COOKIE_OPTIONS = {
    httpOnly: true,                                         // JS cannot read it
    secure: process.env.NODE_ENV === "production",          // HTTPS only in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,                      // 7 days
    path: "/",
};

function signToken(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET); // throws if expired or invalid
}

module.exports = { signToken, verifyToken, COOKIE_OPTIONS };