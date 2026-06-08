const mongoose = require("mongoose");
const User    = require("../models/User");
const Project = require("../models/Project");

const EMPTY = (id) => ({
    _id: id, name: "", image: "", bio: "", title: "", location: "",
    github: "", linkedin: "", portfolio: "", isPro: false,
    stats: { projectsCompleted: 0, collaborations: 0, contributionScore: 0, followers: 0 },
    skillProficiency: [], skillTags: [],
    experience: [], featuredProjects: [], testimonials: [],
});

// GET /api/users/:id
const getUserProfile = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json(EMPTY(req.params.id));
        }

        const user = await User.findById(req.params.id).select(
            "name image bio title location github linkedin portfolio isPro experienceLevel stats skillProficiency skillTags experience featuredProjects testimonials createdAt"
        );

        if (!user) return res.json(EMPTY(req.params.id));

        res.json(user.toObject());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/users/profile
const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            "name", "bio", "image", "title", "location",
            "github", "linkedin", "portfolio", "isPro", "experienceLevel",
            "stats", "skillProficiency", "skillTags",
            "experience", "featuredProjects", "testimonials",
        ];

        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        const setOnInsert = { email: req.user.email ?? "" };
        if (!updates.name) setOnInsert.name = req.user.name ?? "Developer";

        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates, $setOnInsert: setOnInsert },
            { new: true, upsert: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserProfile, updateProfile };