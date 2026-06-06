const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const Post = require("../models/Post");

const posts = [
    {
        title: "NeonFlow v2.0: High-performance state management",
        content: "Just dropped NeonFlow v2.0. It's optimized for real-time visualization with a Rust core. Playground is live! We benchmarked it against Zustand and Jotai — 3x faster reconciliation on large trees. The secret is a lock-free arena allocator on the Wasm side.",
        type: "Project Launch",
        techStack: ["React", "Rust", "Wasm"],
        experienceLevel: "Expert",
        image: "https://picsum.photos/seed/neonflow2/800/400",
        authorName: "Alex Rivera",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera",
        likes: 124,
        comments: 18,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
        title: "Building a decentralized AI IDE. Looking for Go experts!",
        content: "Seeking backend architects to help build Nova IDE's decentralized coordination layer. DM for repo access. We've already shipped the P2P sync layer using libp2p and need help wiring up the gRPC control plane. Equity available for serious contributors.",
        type: "Collab Request",
        techStack: ["Go", "gRPC", "AI"],
        experienceLevel: "Professional",
        image: "https://picsum.photos/seed/novaide/800/400",
        authorName: "Elena Chen",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaChenn",
        likes: 86,
        comments: 31,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
        title: "Is Bun actually ready for enterprise production?",
        content: "Let's discuss the reliability and ecosystem support of Bun vs Node for large-scale enterprise apps in 2024. We migrated a 200k req/min API last quarter. Cold starts dropped 40%, but we hit 3 obscure stdlib bugs that cost us a weekend. Worth it?",
        type: "Discussion",
        techStack: ["Node.js", "Bun", "DevOps"],
        experienceLevel: "Professional",
        image: "https://picsum.photos/seed/bunvnode/800/400",
        authorName: "Marcus Void",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusVoid",
        likes: 312,
        comments: 156,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
        title: "Optimizing LLM inference on edge devices",
        content: "A deep dive into quantization techniques for running complex models on low-power hardware. We got Mistral 7B running at 12 tok/s on a Raspberry Pi 5 using 4-bit GPTQ + Flash Attention 2. Full writeup with benchmarks attached.",
        type: "Showcase",
        techStack: ["Python", "LLM", "API"],
        experienceLevel: "Expert",
        image: "https://picsum.photos/seed/llmedge/800/400",
        authorName: "Sarah Script",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahScript",
        likes: 245,
        comments: 42,
        createdAt: new Date(Date.now() - 13 * 60 * 60 * 1000),
    },
    {
        title: "Rust async runtimes: Tokio vs async-std in 2025",
        content: "After running both in production for 18 months I have some strong opinions. Tokio wins on ecosystem depth and community support, but async-std has a cleaner API surface. Here's our benchmark suite and migration notes for anyone considering switching.",
        type: "Discussion",
        techStack: ["Rust", "DevOps"],
        experienceLevel: "Expert",
        image: "https://picsum.photos/seed/rustasync/800/400",
        authorName: "Jordan Smoak",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JordanSmoak",
        likes: 198,
        comments: 67,
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    },
    {
        title: "I shipped a full SaaS in 72 hours — here's the stack",
        content: "Solo founder. No co-founder. No funding. Next.js 15, Supabase, Stripe, and Vercel. The secret wasn't the stack — it was ruthlessly scoping the MVP. Launched to 200 users on day one. Here's the full breakdown of what I cut and what I kept.",
        type: "Showcase",
        techStack: ["React", "TypeScript", "API"],
        experienceLevel: "Professional",
        image: "https://picsum.photos/seed/saas72hr/800/400",
        authorName: "Priya Nair",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaNair",
        likes: 431,
        comments: 89,
        createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
    },
    {
        title: "Looking for a TypeScript wizard — stealth AI startup",
        content: "We're 3 engineers building a code review agent that understands business context, not just syntax. Our first enterprise pilot starts in 6 weeks. Need a senior TS engineer who's worked on AST tooling or compiler internals. Remote-first, competitive salary + equity.",
        type: "Collab Request",
        techStack: ["TypeScript", "AI", "Node.js"],
        experienceLevel: "Expert",
        image: "https://picsum.photos/seed/tsstealth/800/400",
        authorName: "Marcus Webb",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusWebb",
        likes: 74,
        comments: 22,
        createdAt: new Date(Date.now() - 32 * 60 * 60 * 1000),
    },
    {
        title: "We rebuilt our Go monolith into microservices — was it worth it?",
        content: "Honest post-mortem: 8 months in, here's what actually changed. Deployment complexity tripled. Latency improved 22%. On-call got harder before it got easier. If you're considering this migration, read this before you start. Real numbers, real pain points.",
        type: "Discussion",
        techStack: ["Go", "gRPC", "DevOps"],
        experienceLevel: "Professional",
        image: "https://picsum.photos/seed/gomonolith/800/400",
        authorName: "Dev Karim",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevKarim",
        likes: 289,
        comments: 104,
        createdAt: new Date(Date.now() - 40 * 60 * 60 * 1000),
    },
    {
        title: "OpenGraph: A WebAssembly graph analytics engine",
        content: "Shipped v0.3 today. It can process 50M edge traversals per second in the browser — no server required. Built with Rust compiled to Wasm, with a TypeScript API layer. Open source on GitHub. Looking for contributors who know graph algorithms.",
        type: "Project Launch",
        techStack: ["Rust", "Wasm", "TypeScript"],
        experienceLevel: "Expert",
        image: "https://picsum.photos/seed/opengraph/800/400",
        authorName: "Alex Rivera",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera",
        likes: 167,
        comments: 38,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    },
    {
        title: "My RAG pipeline architecture after 6 production deployments",
        content: "I've shipped RAG systems for healthcare, legal, and fintech clients. Each one taught me something the papers don't tell you. Chunking strategy matters more than the model. Re-ranking is not optional at scale. Here's my current reference architecture.",
        type: "Showcase",
        techStack: ["Python", "LLM", "AI"],
        experienceLevel: "Expert",
        image: "https://picsum.photos/seed/ragpipeline/800/400",
        authorName: "Sarah Chen",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
        likes: 356,
        comments: 91,
        createdAt: new Date(Date.now() - 55 * 60 * 60 * 1000),
    },
    {
        title: "Co-founder wanted: Distributed database for time-series IoT data",
        content: "We have a working prototype, 2 letters of intent from manufacturing clients, and a clear go-to-market. Looking for a strong backend engineer who wants to be CTO. Must have experience with storage engines, consensus protocols, or embedded systems.",
        type: "Collab Request",
        techStack: ["Rust", "Go", "DevOps"],
        experienceLevel: "Expert",
        image: "https://picsum.photos/seed/iotdb/800/400",
        authorName: "Felix Okafor",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FelixOkafor",
        likes: 112,
        comments: 47,
        createdAt: new Date(Date.now() - 62 * 60 * 60 * 1000),
    },
    {
        title: "Should you use tRPC or GraphQL in 2025?",
        content: "Strong takes incoming. tRPC wins for internal TypeScript monorepos — type safety end-to-end with zero codegen. GraphQL wins when you have multiple clients or third-party consumers. The 'use whatever' crowd is wrong — context matters. Here's my decision framework.",
        type: "Discussion",
        techStack: ["TypeScript", "Node.js", "API"],
        experienceLevel: "Professional",
        image: "https://picsum.photos/seed/trpcgql/800/400",
        authorName: "Lena Park",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LenaPark",
        likes: 203,
        comments: 78,
        createdAt: new Date(Date.now() - 70 * 60 * 60 * 1000),
    },
];

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Post.deleteMany({});
    console.log("🗑️  Cleared existing posts");

    await Post.insertMany(posts);
    console.log(`✅ Inserted ${posts.length} posts`);

    process.exit(0);
};

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});