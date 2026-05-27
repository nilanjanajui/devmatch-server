const User = require("../models/User");

// GET /api/users/:id — public profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-email");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/users/profile — update own profile
const updateProfile = async (req, res) => {
    try {
        const allowedFields = ["name", "bio", "image", "github", "linkedin", "portfolio", "skills", "experienceLevel"];
        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        const updated = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserProfile, updateProfile };