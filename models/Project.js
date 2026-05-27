const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        tagline: { type: String, default: "" },
        description: { type: String, required: true },
        category: { type: String, default: "Web Systems" },
        techStack: [{ type: String }],
        difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Hard", "Expert"],
            default: "Intermediate",
        },
        teamSize: { type: Number, default: 3 },
        rolesNeeded: [{ type: String }],
        image: { type: String, default: "" },
        deadline: { type: Date },
        estimatedDuration: { type: String, default: "" },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        ownerName: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        application_count: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);