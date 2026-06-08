const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:     { type: String, required: true },
        email:    { type: String, required: true, unique: true },
        image:    { type: String, default: "" },
        bio:      { type: String, default: "" },
        title:    { type: String, default: "" },
        location: { type: String, default: "" },
        github:   { type: String, default: "" },
        linkedin: { type: String, default: "" },
        portfolio:{ type: String, default: "" },
        isPro:    { type: Boolean, default: false },

        experienceLevel: {
            type: String,
            enum: ["Beginner", "Intermediate", "Professional", "Expert"],
            default: "Beginner",
        },

        stats: {
            projectsCompleted: { type: Number, default: 0 },
            collaborations:    { type: Number, default: 0 },
            contributionScore: { type: Number, default: 0 },
            followers:         { type: Number, default: 0 },
        },

        skillProficiency: [
            {
                name:        { type: String, required: true },
                proficiency: { type: Number, default: 0 },   // 0–100
            }
        ],

        skillTags: [{ type: String }],

        experience: [
            {
                role:        { type: String, default: "" },
                company:     { type: String, default: "" },
                period:      { type: String, default: "" },
                description: { type: String, default: "" },
            }
        ],

        featuredProjects: [
            {
                title:       { type: String, default: "" },
                description: { type: String, default: "" },
                tags:        [{ type: String }],
                image:       { type: String, default: "" },
            }
        ],

        testimonials: [
            {
                quote:  { type: String, default: "" },
                author: { type: String, default: "" },
                role:   { type: String, default: "" },
                avatar: { type: String, default: "" },
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);