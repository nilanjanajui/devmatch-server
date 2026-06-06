const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String, default: "" },
        bio: { type: String, default: "" },
        title: { type: String, default: "" },
        location: { type: String, default: "" },
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        portfolio: { type: String, default: "" },
        skills: [
            {
                name: { type: String, required: true },
                level: { type: String, default: "Intermediate" },
            }
        ],
        experienceEntries: [
            {
                role: { type: String, default: "" },
                company: { type: String, default: "" },
                period: { type: String, default: "" },
                description: { type: String, default: "" },
            }
        ],
        testimonials: [
            {
                quote: { type: String, default: "" },
                authorName: { type: String, default: "" },
                authorRole: { type: String, default: "" },
            }
        ],
        experienceLevel: {
            type: String,
            enum: ["Beginner", "Intermediate", "Professional", "Expert"],
            default: "Beginner",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);