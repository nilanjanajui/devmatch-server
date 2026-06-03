const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");

// GET /api/users/:id — public profile + owned projects
const getUserProfile = async (req, res) => {
    try {
        // Guard against invalid ObjectId (e.g. malformed URL, Better Auth string IDs)
        // Without this, findById() throws a CastError and hits the 500 catch block
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({
                _id: req.params.id,
                name: "", image: "", bio: "",
                github: "", linkedin: "", portfolio: "",
                skills: [], projects: [],
            });
        }

        const user = await User.findById(req.params.id).select(
            "name image bio github linkedin portfolio skills createdAt"
        );

        // User exists in Better Auth but hasn't saved a custom profile yet.
        // Return empty defaults instead of 404 so the dashboard doesn't crash.
        if (!user) {
            const projects = await Project.find({ ownerId: req.params.id })
                .select("title tagline category difficulty techStack status createdAt")
                .sort({ createdAt: -1 })
                .limit(6);

            return res.json({
                _id: req.params.id,
                name: "", image: "", bio: "",
                github: "", linkedin: "", portfolio: "",
                skills: [], projects,
            });
        }

        const projects = await Project.find({ ownerId: req.params.id })
            .select("title tagline category difficulty techStack status createdAt")
            .sort({ createdAt: -1 })
            .limit(6);

        res.json({ ...user.toObject(), projects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/users/profile — update own profile (protected route)
const updateProfile = async (req, res) => {
    try {
        const allowedFields = ["name", "bio", "image", "github", "linkedin", "portfolio", "skills", "experienceLevel"];
        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        // $setOnInsert only runs when upsert creates a NEW document.
        // It seeds name + email from the auth session so the document is never
        // missing required fields on first save.
        //
        // Important: only add name to $setOnInsert when it's NOT already in
        // $set (updates), otherwise MongoDB throws a path conflict error.
        const setOnInsert = {
            email: req.user.email ?? "",
        };
        if (!updates.name) {
            setOnInsert.name = req.user.name ?? "Developer";
        }

        const updated = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: updates,
                $setOnInsert: setOnInsert,
            },
            { new: true, upsert: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserProfile, updateProfile };