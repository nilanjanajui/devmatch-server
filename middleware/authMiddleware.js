const auth = require("../config/auth");

const protect = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });

        if (!session || !session.user) {
            return res.status(401).json({ message: "Not authorized. Please log in." });
        }

        req.user = session.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Session verification failed." });
    }
};

module.exports = { protect };