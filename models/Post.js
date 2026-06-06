const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        type: { type: String, enum: ["Discussion", "Showcase", "Collab Request", "Project Launch"], default: "Discussion" },
        techStack: [{ type: String }],
        experienceLevel: { type: String, enum: ["Beginner", "Professional", "Expert"], default: "Professional" },
        image: { type: String, default: "" },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        authorName: { type: String, required: true },
        authorAvatar: { type: String, default: "" },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);