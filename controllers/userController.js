const mongoose = require("mongoose");
const User    = require("../models/User");
const Project = require("../models/Project");

const EMPTY_PROFILE = (id) => ({
    _id: id, name: "", image: "", bio: "",
    title: "", location: "",
    github: "", linkedin: "", portfolio: "",
    collaborations: 0, contributionScore: "", followers: 0,
    skills: [], experienceEntries: [], testimonials: [],
});

// GET /api/users/:id — public profile + owned projects
const getUserProfile = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({ ...EMPTY_PROFILE(req.params.id), projects: [] });
        }

        const user = await User.findById(req.params.id).select(
            "name image bio title location github linkedin portfolio collaborations contributionScore followers skills experienceEntries testimonials createdAt"
        );

        const projects = await Project.find({ ownerId: req.params.id })
            .select("title tagline category difficulty techStack image status createdAt")
            .sort({ createdAt: -1 })
            .limit(6);

        if (!user) {
            return res.json({ ...EMPTY_PROFILE(req.params.id), projects });
        }

        res.json({ ...user.toObject(), projects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/users/profile — update own profile (protected)
const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            "name", "bio", "image",
            "title", "location",
            "github", "linkedin", "portfolio",
            "collaborations", "contributionScore", "followers",
            "skills", "experienceEntries", "testimonials",
            "experienceLevel",
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