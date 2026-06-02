const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { verifyToken } = require("../config/jwt");
const auth = require("../config/auth");
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = require("../controllers/projectController");

// Sets req.user if a valid session exists, but never rejects unauthenticated requests.
// This lets GET / serve both the public Explore page AND the private My Projects page.
async function optionalAuth(req, res, next) {
    try {
        const jwtToken = req.cookies?.jwt;
        if (jwtToken) {
            const decoded = verifyToken(jwtToken);
            req.user = { id: decoded.id };
        } else {
            const session = await auth.api.getSession({ headers: req.headers });
            if (session?.user) req.user = { id: session.user.id };
        }
    } catch {
        // expired or invalid token — treat as unauthenticated, don't block
    }
    next();
}

router.get("/", optionalAuth, getAllProjects);
router.get("/:id", getProjectById);
router.post("/", protect, createProject);
router.patch("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;