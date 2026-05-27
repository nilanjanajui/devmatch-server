const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
        applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        applicantName: { type: String, required: true },
        applicantEmail: { type: String, required: true },
        role: { type: String, required: true },
        experience: { type: String, default: "" },
        github: { type: String, default: "" },
        portfolio: { type: String, default: "" },
        message: { type: String, default: "" },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);