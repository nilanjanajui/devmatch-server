const User = require("../models/User");
const Project = require("../models/Project");

// GET /api/users/:id — public profile + owned projects
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(
            "name image bio github portfolio skills createdAt"
        );
        if (!user) return res.status(404).json({ message: "User not found" });

        const projects = await Project.find({ ownerId: req.params.id })
            .select("title tagline category difficulty techStack status createdAt")
            .sort({ createdAt: -1 })
            .limit(6);

        res.json({ ...user.toObject(), projects });
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