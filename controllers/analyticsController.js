const Project = require("../models/Project");
const Application = require("../models/Application");
const User = require("../models/User");

// GET /api/analytics/overview — private
const getAnalyticsOverview = async (req, res) => {
    try {
        const userId = req.user.id;

        const [user, myProjects, sentApplications] = await Promise.all([
            User.findById(userId).select("stats"),
            Project.find({ ownerId: userId }).sort({ application_count: -1 }),
            Application.find({ applicantId: userId }).select("status createdAt"),
        ]);

        const myProjectIds = myProjects.map((p) => p._id);

        const receivedApplications = await Application.find({
            projectId: { $in: myProjectIds },
        }).select("status createdAt projectId");

        // ── Status breakdown: applications received on my projects ──
        const receivedStatus = { pending: 0, accepted: 0, rejected: 0 };
        receivedApplications.forEach((a) => {
            receivedStatus[a.status] = (receivedStatus[a.status] || 0) + 1;
        });

        // ── Status breakdown: applications I've sent ──
        const sentStatus = { pending: 0, accepted: 0, rejected: 0 };
        sentApplications.forEach((a) => {
            sentStatus[a.status] = (sentStatus[a.status] || 0) + 1;
        });

        // ── Monthly trend: applications received, last 6 months ──
        const now = new Date();
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push({
                label: d.toLocaleString("en-US", { month: "short" }),
                year: d.getFullYear(),
                month: d.getMonth(),
            });
        }
        const trend = months.map(({ label, year, month }) => ({
            month: label,
            applications: receivedApplications.filter((a) => {
                const d = new Date(a.createdAt);
                return d.getFullYear() === year && d.getMonth() === month;
            }).length,
        }));

        // ── Top 5 projects by application count ──
        const topProjects = myProjects.slice(0, 5).map((p) => ({
            id: p._id,
            title: p.title,
            applicationCount: p.application_count,
            teamSize: p.teamSize,
        }));

        res.json({
            stats: user?.stats ?? {
                projectsCompleted: 0,
                collaborations: 0,
                contributionScore: 0,
                followers: 0,
            },
            totals: {
                projectsOwned: myProjects.length,
                applicationsReceived: receivedApplications.length,
                applicationsSent: sentApplications.length,
            },
            receivedStatus,
            sentStatus,
            trend,
            topProjects,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAnalyticsOverview };