const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:             { type: String, required: true },
        email:            { type: String, required: true, unique: true },
        image:            { type: String, default: "" },
        bio:              { type: String, default: "" },
        title:            { type: String, default: "" },
        location:         { type: String, default: "" },
        github:           { type: String, default: "" },
        linkedin:         { type: String, default: "" },
        portfolio:        { type: String, default: "" },
        collaborations:   { type: Number, default: 0 },
        contributionScore:{ type: String, default: "" },
        followers:        { type: Number, default: 0 },
        skills: [
            {
                name:       { type: String, required: true },
                level:      { type: String, default: "Intermediate" },
                percentage: { type: Number, default: 0 },  // ← for progress bars
            }
        ],
        experienceEntries: [
            {
                role:        { type: String, default: "" },
                company:     { type: String, default: "" },
                period:      { type: String, default: "" },
                description: { type: String, default: "" },
            }
        ],
        testimonials: [
            {
                quote:      { type: String, default: "" },
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