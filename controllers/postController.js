const Post = require("../models/Post");

// GET /api/posts
const getPosts = async (req, res) => {
    try {
        const { type, stack, level, search, sort = "trending", page = 1 } = req.query;
        const limit = 6;
        const skip = (Number(page) - 1) * limit;

        const query = {};
        if (type && type !== "Trending") query.type = type;
        if (stack) query.techStack = { $in: Array.isArray(stack) ? stack : [stack] };
        if (level) query.experienceLevel = level;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { authorName: { $regex: search, $options: "i" } },
            ];
        }

        const sortMap = {
            trending: { likes: -1, comments: -1 },
            recent: { createdAt: -1 },
            most_liked: { likes: -1 },
        };

        const [posts, total] = await Promise.all([
            Post.find(query).sort(sortMap[sort] ?? sortMap.trending).skip(skip).limit(limit).lean(),
            Post.countDocuments(query),
        ]);

        res.json({ posts, total, page: Number(page), totalPages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/posts/:id
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/posts  (protected)
const createPost = async (req, res) => {
    try {
        const { title, content, type, techStack, experienceLevel, image } = req.body;
        const post = await Post.create({
            title, content, type, techStack, experienceLevel, image,
            authorId: req.user.id,
            authorName: req.body.authorName ?? "Anonymous",
            authorAvatar: req.body.authorAvatar ?? "",
        });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PATCH /api/posts/:id/like  (public — optimistic)
const likePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json({ likes: post.likes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getPosts, getPostById, createPost, likePost };