const { signToken, verifyToken, COOKIE_OPTIONS } = require("../config/jwt");
const auth = require("../config/auth");

const protect = async (req, res, next) => {
    try {
        const jwtToken = req.cookies?.jwt;

        if (jwtToken) {
            // ✅ Fast path — verify JWT, no DB lookup
            const decoded = verifyToken(jwtToken);          // throws if invalid/expired
            req.user = { id: decoded.id };
            return next();
        }

        // 🔄 Slow path — no JWT cookie yet, check Better Auth session
        // This runs only on the FIRST protected request after login
        const session = await auth.api.getSession({ headers: req.headers });

        if (!session?.user) {
            return res.status(401).json({ message: "Not authorized. Please log in." });
        }

        // Generate JWT and set cookie — all future requests use fast path
        const token = signToken(session.user.id);
        res.cookie("jwt", token, COOKIE_OPTIONS);

        req.user = { id: session.user.id };
        next();

    } catch (error) {
        // JWT expired or invalid
        res.clearCookie("jwt");
        return res.status(401).json({ message: "Session expired. Please log in again." });
    }
};

module.exports = { protect };