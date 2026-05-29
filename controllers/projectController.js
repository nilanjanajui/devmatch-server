const Project = require("../models/Project");

// GET /api/projects — public with filters
const getAllProjects = async (req, res) => {
    try {
        const { search, category, difficulty, teamSize, page = 1, limit = 10 } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { techStack: { $regex: search, $options: "i" } },
            ];
        }
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (teamSize) query.teamSize = { $lte: parseInt(teamSize) };
        if (req.query.mine === "true" && req.user) {
            query.ownerId = req.user.id;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Project.countDocuments(query);
        const projects = await Project.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({ projects, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/projects/:id — public
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/projects — private
const createProject = async (req, res) => {
    try {
        const project = new Project({
            ...req.body,
            ownerId: req.user.id,
            ownerName: req.user.name,
            ownerEmail: req.user.email,
        });
        const saved = await project.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/projects/:id — private, owner only
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        if (project.ownerId.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/projects/:id — private, owner only
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        if (project.ownerId.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };