const Application = require("../models/Application");
const Project = require("../models/Project");

// POST /api/applications
const submitApplication = async (req, res) => {
    try {
        const { projectId, role, experience, github, portfolio, message } = req.body;

        // Prevent duplicate applications
        const existing = await Application.findOne({
            projectId,
            applicantId: req.user.id,
        });
        if (existing) return res.status(400).json({ message: "You already applied to this project" });

        // Prevent applying to own project
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });
        if (project.ownerId.toString() === req.user.id)
            return res.status(400).json({ message: "You cannot apply to your own project" });

        const application = new Application({
            projectId,
            applicantId: req.user.id,
            applicantName: req.user.name,
            applicantEmail: req.user.email,
            role,
            experience,
            github,
            portfolio,
            message,
        });

        await application.save();

        // Increment application_count on the project
        await Project.findByIdAndUpdate(projectId, { $inc: { application_count: 1 } });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/applications — my own applications
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicantId: req.user.id })
            .populate("projectId", "title image ownerName")
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/applications/project/:id — owner views applicants
const getProjectApplicants = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        if (project.ownerId.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        const applications = await Application.find({ projectId: req.params.id }).sort({
            createdAt: -1,
        });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/applications/:id — accept or reject
const updateApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate("projectId");
        if (!application) return res.status(404).json({ message: "Application not found" });

        if (application.projectId.ownerId.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        application.status = req.body.status;
        await application.save();
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    submitApplication,
    getMyApplications,
    getProjectApplicants,
    updateApplicationStatus,
};