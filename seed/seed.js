const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");

const User = require("../models/User");
const Project = require("../models/Project");
const Application = require("../models/Application");

// ─── 30 COMPLETE DEVELOPER PROFILES ──────────────────
const developers = [
    // ── 1. Alex Rivera ────────────────────────────────
    {
        name: "Alex Rivera",
        email: "alex.rivera@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera",
        bio: "Passionate software architect with 8+ years of experience building scalable systems. Specializing in high-performance web applications using React/Next.js and robust backend services in Rust. I bridge the gap between creative UI and performant engineering.",
        github: "https://github.com/alexrivera",
        linkedin: "https://linkedin.com/in/alexrivera",
        portfolio: "https://alexrivera.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Full-Stack Engineer",
        location: "San Francisco",
        stats: { projectsCompleted: 24, collaborations: 12, contributionScore: 98, followers: 1200 },
        skillProficiency: [
            { name: "React / Next.js", proficiency: 95 },
            { name: "Rust", proficiency: 88 },
            { name: "PostgreSQL", proficiency: 90 },
        ],
        skillTags: ["WebAssembly", "Docker", "Kubernetes", "AWS"],
        experience: [
            { role: "Senior Systems Architect", company: "TechFlow Solutions", period: "2021 — Present", description: "Leading the transition from monolithic to microservices architecture, reducing latency by 45% using Rust core services." },
            { role: "Full Stack Developer", company: "CloudScale Systems", period: "2018 — 2021", description: "Developed mission-critical web applications for enterprise clients using React and Node.js." },
            { role: "Junior Software Engineer", company: "StartUp Lab", period: "2016 — 2018", description: "Contributed to the core UI library and implemented responsive designs across multiple platforms." },
        ],
        featuredProjects: [
            { title: "Nexus Protocol", description: "A decentralized communications layer built on Rust, enabling ultra-low latency data transmission across distributed networks.", tags: ["RUST", "P2P"], image: "https://picsum.photos/seed/nexus1/800/400" },
            { title: "Quantum UI", description: "A high-performance monitoring dashboard using Next.js 14 and WebGL for real-time visualization of server clusters.", tags: ["NEXT.JS", "WEBGL"], image: "https://picsum.photos/seed/quantum1/800/400" },
        ],
        testimonials: [
            { quote: "Alex is one of those rare engineers who understands both deep technical constraints and user experience requirements. A force multiplier for any team.", author: "Sarah Miller", role: "CTO, NEXUS PROTOCOL", avatar: "SM" },
            { quote: "The Rust backend Alex built hasn't needed a single patch in 18 months. Absolute precision and reliability in every line of code.", author: "Jason Kang", role: "LEAD DEV, CLOUDSCALE", avatar: "JK" },
        ],
    },

    // ── 2. Sarah Chen ─────────────────────────────────
    {
        name: "Sarah Chen",
        email: "sarah.chen@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
        bio: "AI researcher and full-stack engineer with a deep focus on LLM integration and real-time ML pipelines. Former researcher at DeepMind. I love turning complex machine learning models into production-ready APIs that developers actually enjoy using.",
        github: "https://github.com/sarahchen",
        linkedin: "https://linkedin.com/in/sarahchen",
        portfolio: "https://sarahchen.ai",
        experienceLevel: "Expert",
        isPro: true,
        title: "AI Research Engineer",
        location: "London",
        stats: { projectsCompleted: 19, collaborations: 15, contributionScore: 96, followers: 2100 },
        skillProficiency: [
            { name: "Python", proficiency: 97 },
            { name: "PyTorch", proficiency: 94 },
            { name: "TensorFlow", proficiency: 89 },
        ],
        skillTags: ["FastAPI", "React", "AWS"],
        experience: [
            { role: "Senior ML Researcher", company: "DeepMind", period: "2020 — Present", description: "Built production LLM integration pipelines and real-time ML inference APIs serving millions of requests." },
            { role: "ML Engineer", company: "Hugging Face", period: "2018 — 2020", description: "Contributed to the Transformers library and shipped developer-facing ML APIs used by thousands of engineers." },
            { role: "Research Intern", company: "Google Brain", period: "2017 — 2018", description: "Conducted research on attention mechanisms and co-authored two papers on neural network optimization." },
        ],
        featuredProjects: [
            { title: "Project Aether Intelligence", description: "Decentralized inference network for open-weight LLMs with real-time latency optimization across a peer-to-peer GPU network.", tags: ["PYTHON", "PYTORCH", "CUDA"], image: "https://picsum.photos/seed/aether1/800/400" },
            { title: "NeuroSync AI Interface", description: "Open-source EEG framework enabling Thought-to-Code applications with high-fidelity linguistic token mapping.", tags: ["TENSORFLOW", "PYTHON"], image: "https://picsum.photos/seed/neurosync1/800/400" },
        ],
        testimonials: [
            { quote: "Sarah turns bleeding-edge research into production systems that actually work at scale. The best ML engineer I've ever worked with.", author: "Daniel Roy", role: "RESEARCH LEAD, DEEPMIND", avatar: "DR" },
            { quote: "Her LLM pipeline reduced our inference cost by 60% while improving accuracy. She doesn't just solve problems — she redefines them.", author: "Lucas Park", role: "CTO, AI VENTURES", avatar: "LP" },
        ],
    },

    // ── 3. Marcus Webb ────────────────────────────────
    {
        name: "Marcus Webb",
        email: "marcus.webb@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusWebb",
        bio: "Backend infrastructure engineer obsessed with low-latency distributed systems. 6 years building high-throughput APIs in Go and Kubernetes-native microservices. If it needs to handle a million requests per second, call me.",
        github: "https://github.com/marcuswebb",
        linkedin: "https://linkedin.com/in/marcuswebb",
        portfolio: "https://marcuswebb.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Backend Infrastructure Engineer",
        location: "Berlin",
        stats: { projectsCompleted: 31, collaborations: 18, contributionScore: 97, followers: 980 },
        skillProficiency: [
            { name: "Go", proficiency: 96 },
            { name: "Kubernetes", proficiency: 92 },
            { name: "gRPC", proficiency: 87 },
        ],
        skillTags: ["PostgreSQL", "Redis", "Terraform"],
        experience: [
            { role: "Staff Backend Engineer", company: "Cloudflare", period: "2021 — Present", description: "Architected high-throughput API gateways handling 5M+ requests per second with sub-10ms p99 latency." },
            { role: "Senior Backend Engineer", company: "Stripe", period: "2018 — 2021", description: "Built core payment processing microservices in Go, achieving 99.999% uptime across distributed infrastructure." },
            { role: "Software Engineer", company: "Shopify", period: "2017 — 2018", description: "Developed Kubernetes-native services for the commerce platform serving millions of merchants globally." },
        ],
        featuredProjects: [
            { title: "Micro-Orch Kernel", description: "Custom orchestration agent for low-power IoT clusters with Kubernetes-style scheduling on 64MB RAM devices.", tags: ["GO", "GRPC", "KUBERNETES"], image: "https://picsum.photos/seed/microorch1/800/400" },
            { title: "Nexus Protocol Engine", description: "High-throughput settlement layer for cross-chain liquidity with zero-knowledge proof verification.", tags: ["GO", "RUST"], image: "https://picsum.photos/seed/nexus1/800/400" },
        ],
        testimonials: [
            { quote: "Marcus rewrote our core API in Go and it now handles 10x the load at half the infrastructure cost. Truly exceptional systems thinking.", author: "Tom Reeves", role: "VP ENGINEERING, CLOUDFLARE", avatar: "TR" },
            { quote: "His Kubernetes expertise is unmatched. He built a deployment system our team still uses and hasn't touched in two years.", author: "Priya Desai", role: "INFRA LEAD, STRIPE", avatar: "PD" },
        ],
    },

    // ── 4. Jordan Smoak ───────────────────────────────
    {
        name: "Jordan Smoak",
        email: "jordan.smoak@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JordanSmoak",
        bio: "UI architect and design systems engineer. I build the component libraries that entire startups run on. Figma to pixel-perfect React in record time. Passionate about accessibility, micro-interactions, and making interfaces feel alive.",
        github: "https://github.com/jordansmoak",
        linkedin: "https://linkedin.com/in/jordansmoak",
        portfolio: "https://jordansmoak.design",
        experienceLevel: "Professional",
        isPro: true,
        title: "UI Architect & Design Systems Engineer",
        location: "New York",
        stats: { projectsCompleted: 16, collaborations: 21, contributionScore: 89, followers: 760 },
        skillProficiency: [
            { name: "React", proficiency: 94 },
            { name: "TypeScript", proficiency: 91 },
            { name: "TailwindCSS", proficiency: 88 },
        ],
        skillTags: ["Figma", "Framer Motion", "Storybook"],
        experience: [
            { role: "Design Systems Lead", company: "Airbnb", period: "2022 — Present", description: "Led rebuild of Airbnb's core design system, shipping 80+ accessible components used by 200+ engineers." },
            { role: "Senior Frontend Engineer", company: "Figma", period: "2020 — 2022", description: "Built interactive UI components and animation systems for Figma's plugin ecosystem." },
            { role: "UI Engineer", company: "Linear", period: "2019 — 2020", description: "Contributed to Linear's interface, implementing keyboard navigation and micro-animations." },
        ],
        featuredProjects: [
            { title: "PixelForge Design System", description: "Open-source React design system combining headless UI flexibility with full visual polish and Figma auto-generated specs.", tags: ["REACT", "TYPESCRIPT", "FIGMA"], image: "https://picsum.photos/seed/pixelforge1/800/400" },
            { title: "Quantum Dashboard UI", description: "Next-generation observability UI with WebGL-accelerated canvas rendering thousands of live data points at 60fps.", tags: ["NEXT.JS", "TAILWINDCSS"], image: "https://picsum.photos/seed/quantum1/800/400" },
        ],
        testimonials: [
            { quote: "Jordan's design system became the foundation of our entire product and cut our frontend dev time in half overnight.", author: "Lisa Nakamura", role: "CEO, LAUNCHPAD", avatar: "LN" },
            { quote: "The accessibility work Jordan did was extraordinary. We passed a WCAG 2.1 audit with zero violations on the first attempt.", author: "Mark Osei", role: "HEAD OF PRODUCT, GRIDLOCK", avatar: "MO" },
        ],
    },

    // ── 5. Priya Nair ─────────────────────────────────
    {
        name: "Priya Nair",
        email: "priya.nair@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaNair",
        bio: "Mobile engineer specializing in cross-platform apps with Flutter and React Native. Shipped 12 production apps with a combined 2M+ downloads. I care deeply about performance, offline-first architecture, and delightful mobile UX.",
        github: "https://github.com/priyanair",
        linkedin: "https://linkedin.com/in/priyanair",
        portfolio: "https://priyanair.dev",
        experienceLevel: "Professional",
        isPro: false,
        title: "Senior Mobile Engineer",
        location: "Austin",
        stats: { projectsCompleted: 12, collaborations: 9, contributionScore: 85, followers: 540 },
        skillProficiency: [
            { name: "Flutter", proficiency: 93 },
            { name: "React Native", proficiency: 90 },
            { name: "Dart", proficiency: 88 },
        ],
        skillTags: ["Firebase", "Swift", "Kotlin"],
        experience: [
            { role: "Lead Mobile Engineer", company: "Grab", period: "2021 — Present", description: "Led Flutter migration of the super-app, reducing codebase size by 40% and improving startup time by 35%." },
            { role: "Mobile Developer", company: "Zomato", period: "2019 — 2021", description: "Built offline-first features and performance optimizations for the consumer app at 5M+ daily active users." },
            { role: "iOS Developer", company: "Paytm", period: "2018 — 2019", description: "Developed Swift payment flow components with biometric authentication and real-time transaction tracking." },
        ],
        featuredProjects: [
            { title: "SwiftBridge Mobile SDK", description: "JSI-based React Native bridge SDK with 3x frame consistency improvement and 40% reduction in cold start time.", tags: ["FLUTTER", "REACT NATIVE", "DART"], image: "https://picsum.photos/seed/swiftbridge1/800/400" },
            { title: "NeuroSync AI Interface", description: "Cross-platform Flutter mobile client for EEG-based neural interface interactions on iOS and Android.", tags: ["FLUTTER", "FIREBASE"], image: "https://picsum.photos/seed/neurosync1/800/400" },
        ],
        testimonials: [
            { quote: "Priya rebuilt our Flutter app from scratch and our App Store rating went from 3.8 to 4.7 within the first week of release.", author: "Raj Mehta", role: "CTO, QUICKRIDE", avatar: "RM" },
            { quote: "Her offline-first architecture saved us during a major outage. Users never noticed — that's how good the implementation was.", author: "Ananya Suri", role: "PRODUCT LEAD, BAZAARTECH", avatar: "AS" },
        ],
    },

    // ── 6. Ethan Kovacs ───────────────────────────────
    {
        name: "Ethan Kovacs",
        email: "ethan.kovacs@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=EthanKovacs",
        bio: "Blockchain and Web3 developer with 5 years building DeFi protocols and smart contract systems. Contributed to three top-100 DeFi projects by TVL. Solidity is my second language — Rust is my first.",
        github: "https://github.com/ethankovacs",
        linkedin: "https://linkedin.com/in/ethankovacs",
        portfolio: "https://ethankovacs.xyz",
        experienceLevel: "Expert",
        isPro: true,
        title: "Blockchain & Web3 Engineer",
        location: "Zurich",
        stats: { projectsCompleted: 18, collaborations: 11, contributionScore: 94, followers: 1560 },
        skillProficiency: [
            { name: "Solidity", proficiency: 96 },
            { name: "Rust", proficiency: 93 },
            { name: "Ethereum", proficiency: 90 },
        ],
        skillTags: ["Web3.js", "Hardhat", "TypeScript"],
        experience: [
            { role: "Lead Smart Contract Engineer", company: "Uniswap Labs", period: "2022 — Present", description: "Designed and audited core DeFi protocol contracts handling $2B+ in daily volume with zero critical exploits." },
            { role: "Blockchain Developer", company: "Compound Finance", period: "2020 — 2022", description: "Built the governance module and interest rate model contracts deployed across multiple EVM chains." },
            { role: "Software Engineer", company: "ConsenSys", period: "2019 — 2020", description: "Developed Ethereum developer tooling and contributed to Web3.js used by millions of developers." },
        ],
        featuredProjects: [
            { title: "Nexus Protocol Engine", description: "High-throughput settlement layer with custom recursive SNARK circuits and ZK proof aggregation for cross-chain liquidity.", tags: ["SOLIDITY", "RUST", "ETHEREUM"], image: "https://picsum.photos/seed/nexus1/800/400" },
            { title: "CipherVault Security", description: "Zero-knowledge secrets management with client-side encryption architecture for developer security workflows.", tags: ["RUST", "WEB3", "TYPESCRIPT"], image: "https://picsum.photos/seed/cipher1/800/400" },
        ],
        testimonials: [
            { quote: "Ethan's smart contract code is the cleanest I've reviewed. He anticipates edge cases most engineers don't think of until an exploit happens.", author: "Dana White", role: "SECURITY LEAD, UNISWAP", avatar: "DW" },
            { quote: "He delivered a full DeFi protocol in 8 weeks with a flawless security audit. Ethan is in a different league for Web3 development.", author: "Chloe Meyer", role: "CEO, ZEROCHAIN", avatar: "CM" },
        ],
    },

    // ── 7. Lena Fischer ───────────────────────────────
    {
        name: "Lena Fischer",
        email: "lena.fischer@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=LenaFischer",
        bio: "DevOps and platform engineer who automates everything that can be automated. 7 years designing CI/CD pipelines and multi-cloud infrastructure for fintech companies. I speak Terraform, Helm, and YAML fluently.",
        github: "https://github.com/lenafischer",
        linkedin: "https://linkedin.com/in/lenafischer",
        portfolio: "https://lenafischer.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Platform & DevOps Engineer",
        location: "Frankfurt",
        stats: { projectsCompleted: 27, collaborations: 14, contributionScore: 95, followers: 870 },
        skillProficiency: [
            { name: "Terraform", proficiency: 95 },
            { name: "Kubernetes", proficiency: 92 },
            { name: "AWS", proficiency: 90 },
        ],
        skillTags: ["GCP", "Helm", "GitHub Actions"],
        experience: [
            { role: "Platform Engineering Lead", company: "N26", period: "2021 — Present", description: "Designed multi-cloud infrastructure serving 8M+ banking customers with automated failover and zero-downtime deploys." },
            { role: "Senior DevOps Engineer", company: "Deutsche Bank", period: "2018 — 2021", description: "Built enterprise CI/CD pipelines reducing deployment time from 2 hours to 8 minutes across 50+ microservices." },
            { role: "Cloud Infrastructure Eng", company: "BMW Group", period: "2016 — 2018", description: "Migrated legacy on-premise systems to AWS, cutting infrastructure costs by 40% while improving reliability." },
        ],
        featuredProjects: [
            { title: "FlowState Analytics", description: "Self-hosted analytics platform deployed on multi-cloud Kubernetes with Helm charts and Terraform-managed infrastructure.", tags: ["TERRAFORM", "AWS", "KUBERNETES"], image: "https://picsum.photos/seed/flowstate1/800/400" },
            { title: "Micro-Orch Kernel", description: "Kubernetes-style IoT orchestration system with Helm-based package management and multi-cluster Terraform deployments.", tags: ["KUBERNETES", "HELM", "GCP"], image: "https://picsum.photos/seed/microorch1/800/400" },
        ],
        testimonials: [
            { quote: "Lena redesigned our entire infrastructure and we went from weekly incidents to zero in three months. An absolute rockstar.", author: "Klaus Schreiber", role: "CTO, N26", avatar: "KS" },
            { quote: "Her Terraform modules are so well-architected we've reused them across 12 different projects with zero modification. Incredible attention to reusability.", author: "Hannah Berg", role: "VP ENGINEERING, FINTECHX", avatar: "HB" },
        ],
    },

    // ── 8. Darius Thompson ────────────────────────────
    {
        name: "Darius Thompson",
        email: "darius.thompson@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DariusThompson",
        bio: "Full-stack engineer with a product mindset. I've co-founded two startups and led engineering teams of 10+. Comfortable in any part of the stack but most passionate about building real-time collaborative tools using WebSockets and CRDTs.",
        github: "https://github.com/dariusthompson",
        linkedin: "https://linkedin.com/in/dariusthompson",
        portfolio: "https://dariusthompson.io",
        experienceLevel: "Expert",
        isPro: true,
        title: "Full-Stack Engineer & Tech Lead",
        location: "Toronto",
        stats: { projectsCompleted: 29, collaborations: 23, contributionScore: 97, followers: 1340 },
        skillProficiency: [
            { name: "Node.js", proficiency: 93 },
            { name: "WebSockets", proficiency: 92 },
            { name: "React", proficiency: 90 },
        ],
        skillTags: ["MongoDB", "Redis", "TypeScript"],
        experience: [
            { role: "CTO & Co-Founder", company: "CollabFlow", period: "2021 — Present", description: "Leading all engineering for a real-time collaborative workspace platform with a CRDT sync engine, scaled to 50k users." },
            { role: "Co-Founder & Lead Engineer", company: "Syncify", period: "2019 — 2021", description: "Built and shipped a real-time team communication platform from zero to acquisition in 18 months." },
            { role: "Senior Full-Stack Engineer", company: "Shopify", period: "2016 — 2019", description: "Developed core checkout and merchant tools, leading a team of 8 engineers across the full stack." },
        ],
        featuredProjects: [
            { title: "CipherVault Security", description: "Zero-knowledge secrets management with end-to-end encrypted storage, deep Git and CI/CD pipeline integration.", tags: ["NODE.JS", "REACT", "WEBSOCKETS"], image: "https://picsum.photos/seed/cipher1/800/400" },
            { title: "FlowState Analytics", description: "Privacy-first self-hosted analytics platform with real-time WebSocket event pipeline for developer teams.", tags: ["NODE.JS", "MONGODB", "TYPESCRIPT"], image: "https://picsum.photos/seed/flowstate1/800/400" },
        ],
        testimonials: [
            { quote: "Darius built our entire collaboration engine while I was still writing the PRD. The CRDT implementation was flawless and users can't imagine working without it.", author: "Sandra Wells", role: "CEO, TEAMFLOW", avatar: "SW" },
            { quote: "Having a co-founder who can build, lead, and ship is rare. Darius makes everyone around him better.", author: "Chris Olu", role: "PARTNER, Y COMBINATOR", avatar: "CO" },
        ],
    },

    // ── 9. Yuki Tanaka ────────────────────────────────
    {
        name: "Yuki Tanaka",
        email: "yuki.tanaka@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=YukiTanaka",
        bio: "Computer vision and robotics engineer. PhD dropout who'd rather ship than publish. Building perception systems for autonomous vehicles using CUDA-accelerated pipelines. OpenCV contributor and ROS enthusiast.",
        github: "https://github.com/yukitanaka",
        linkedin: "https://linkedin.com/in/yukitanaka",
        portfolio: "https://yukitanaka.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Computer Vision Engineer",
        location: "San Jose",
        stats: { projectsCompleted: 14, collaborations: 8, contributionScore: 93, followers: 820 },
        skillProficiency: [
            { name: "Python", proficiency: 95 },
            { name: "OpenCV", proficiency: 93 },
            { name: "PyTorch", proficiency: 90 },
        ],
        skillTags: ["C++", "CUDA", "ROS"],
        experience: [
            { role: "Senior Computer Vision Engineer", company: "Waymo", period: "2021 — Present", description: "Building CUDA-accelerated perception pipelines for AV object detection at 200 FPS with sub-10ms latency." },
            { role: "ML Engineer", company: "Sony AI", period: "2019 — 2021", description: "Developed real-time object tracking for robotics and contributed to OpenCV's GPU acceleration modules." },
            { role: "Research Engineer", company: "RIKEN", period: "2017 — 2019", description: "Conducted robotics perception research on stereo depth estimation for manipulation tasks." },
        ],
        featuredProjects: [
            { title: "NeuroSync AI Interface", description: "CUDA-accelerated EEG signal processing pipeline using computer vision techniques for real-time neural pattern recognition.", tags: ["PYTHON", "PYTORCH", "OPENCV"], image: "https://picsum.photos/seed/neurosync1/800/400" },
            { title: "Project Aether Intelligence", description: "GPU-accelerated inference routing system leveraging CUDA pipelines for minimal-latency model execution on edge hardware.", tags: ["PYTHON", "C++", "CUDA"], image: "https://picsum.photos/seed/aether1/800/400" },
        ],
        testimonials: [
            { quote: "Yuki's perception pipeline is the backbone of our AV system. The accuracy and speed improvements were beyond what we thought was physically possible.", author: "Kenji Watanabe", role: "VP AUTONOMY, WAYMO", avatar: "KW" },
            { quote: "He rewrote our object detection system in CUDA and it went from 15 FPS to 200 FPS. Absolutely transformational for our product.", author: "Mei Zhou", role: "CTO, ROBOTECH", avatar: "MZ" },
        ],
    },

    // ── 10. Amara Osei ────────────────────────────────
    {
        name: "Amara Osei",
        email: "amara.osei@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmaraOsei",
        bio: "Security engineer and ethical hacker. 5 years in offensive security and application pentesting. Now building developer-first security tooling that makes secure coding the path of least resistance. Bug bounty hunter in my spare time.",
        github: "https://github.com/amaraosei",
        linkedin: "https://linkedin.com/in/amaraosei",
        portfolio: "https://amaraosei.security",
        experienceLevel: "Professional",
        isPro: false,
        title: "Security Engineer & Ethical Hacker",
        location: "London",
        stats: { projectsCompleted: 11, collaborations: 7, contributionScore: 88, followers: 430 },
        skillProficiency: [
            { name: "Python", proficiency: 93 },
            { name: "Rust", proficiency: 88 },
            { name: "Go", proficiency: 85 },
        ],
        skillTags: ["Docker", "Burp Suite", "Linux"],
        experience: [
            { role: "Security Engineer", company: "Palantir", period: "2022 — Present", description: "Building developer-first security tooling and conducting red team exercises on critical government-adjacent data infrastructure." },
            { role: "Penetration Tester", company: "NCC Group", period: "2020 — 2022", description: "Performed application and network pentesting for FTSE 100 clients, identifying and reporting critical vulnerabilities." },
            { role: "Security Analyst", company: "Jumia", period: "2019 — 2020", description: "Implemented security monitoring infrastructure and conducted internal vulnerability assessments across the platform." },
        ],
        featuredProjects: [
            { title: "CipherVault Security", description: "Zero-knowledge secrets management where all cryptographic operations happen client-side — the server never sees plaintext.", tags: ["RUST", "PYTHON", "GO"], image: "https://picsum.photos/seed/cipher1/800/400" },
            { title: "StellarAuth SDK", description: "Developer-first auth SDK hardened with security best practices, passkey support, and zero-config threat detection.", tags: ["GO", "PYTHON", "DOCKER"], image: "https://picsum.photos/seed/stellar1/800/400" },
        ],
        testimonials: [
            { quote: "Amara found 3 critical vulnerabilities in a 2-day audit that our security team had missed for months. Exceptional skill and instincts.", author: "Daniel Forsyth", role: "CISO, PALANTIR UK", avatar: "DF" },
            { quote: "Her bug bounty mindset changed how our whole team thinks about security. She doesn't just find problems — she builds the culture to prevent them.", author: "Sophie Laurent", role: "HEAD OF SECURITY, FINVAULT", avatar: "SL" },
        ],
    },

    // ── 11. Noah Castillo ─────────────────────────────
    {
        name: "Noah Castillo",
        email: "noah.castillo@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NoahCastillo",
        bio: "Data engineer and analytics platform builder. I design the pipelines that turn raw event streams into business intelligence. Spark, Airflow, and dbt are my daily tools. Passionate about open-source data infrastructure.",
        github: "https://github.com/noahcastillo",
        linkedin: "https://linkedin.com/in/noahcastillo",
        portfolio: "https://noahcastillo.dev",
        experienceLevel: "Professional",
        isPro: false,
        title: "Data Engineer & Analytics Architect",
        location: "Seattle",
        stats: { projectsCompleted: 15, collaborations: 10, contributionScore: 87, followers: 620 },
        skillProficiency: [
            { name: "Python", proficiency: 92 },
            { name: "Apache Spark", proficiency: 89 },
            { name: "Airflow", proficiency: 86 },
        ],
        skillTags: ["dbt", "BigQuery", "Kafka"],
        experience: [
            { role: "Senior Data Engineer", company: "DoorDash", period: "2021 — Present", description: "Built end-to-end data pipelines processing 500M+ daily events using Spark and Airflow, powering real-time delivery analytics." },
            { role: "Data Engineer", company: "MercadoLibre", period: "2019 — 2021", description: "Designed BigQuery warehouse architecture serving 50+ analysts with sub-second query performance." },
            { role: "Analytics Engineer", company: "Rappi", period: "2018 — 2019", description: "Built dbt transformation layer and event tracking infrastructure for the Latin American super-app." },
        ],
        featuredProjects: [
            { title: "FlowState Analytics", description: "Self-hosted, privacy-first analytics platform with a Kafka event pipeline and ClickHouse columnar storage engine.", tags: ["SPARK", "KAFKA", "AIRFLOW"], image: "https://picsum.photos/seed/flowstate1/800/400" },
            { title: "Project Aether Intelligence", description: "Data orchestration and GPU telemetry pipeline for the decentralized LLM inference network.", tags: ["PYTHON", "BIGQUERY", "DBT"], image: "https://picsum.photos/seed/aether1/800/400" },
        ],
        testimonials: [
            { quote: "Noah's pipeline architecture cut our analytics query time from 45 seconds to under 200ms. The business impact has been enormous.", author: "Rachel Kim", role: "HEAD OF DATA, DOORDASH", avatar: "RK" },
            { quote: "He designed a data system that analysts love using — rare for someone so technically deep to also care so much about the end user.", author: "Carlos Vidal", role: "CTO, DATASTACK", avatar: "CV" },
        ],
    },

    // ── 12. Isla Mackenzie ────────────────────────────
    {
        name: "Isla Mackenzie",
        email: "isla.mackenzie@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=IslaMackenzie",
        bio: "Frontend performance engineer. I make websites fast — obsessively fast. Core Web Vitals, bundle optimization, edge rendering — this is my world. Previously at Vercel improving Next.js runtime performance.",
        github: "https://github.com/islamackenzie",
        linkedin: "https://linkedin.com/in/islamackenzie",
        portfolio: "https://islamackenzie.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Frontend Performance Engineer",
        location: "Edinburgh",
        stats: { projectsCompleted: 22, collaborations: 16, contributionScore: 96, followers: 1890 },
        skillProficiency: [
            { name: "React / Next.js", proficiency: 97 },
            { name: "TypeScript", proficiency: 93 },
            { name: "Webpack / Vite", proficiency: 91 },
        ],
        skillTags: ["TailwindCSS", "Edge Runtime", "Web Vitals"],
        experience: [
            { role: "Performance Engineer", company: "Vercel", period: "2021 — Present", description: "Improved Next.js runtime performance, reducing TTFB by 30% and contributing to the App Router's streaming architecture." },
            { role: "Senior Frontend Engineer", company: "Shopify", period: "2019 — 2021", description: "Achieved perfect Lighthouse scores across the storefront platform, reducing LCP by 60% for millions of stores." },
            { role: "Frontend Engineer", company: "Ghost", period: "2017 — 2019", description: "Rebuilt the editor performance infrastructure and introduced ISR patterns before they were mainstream." },
        ],
        featuredProjects: [
            { title: "Quantum Dashboard UI", description: "WebGL-accelerated monitoring dashboard with optimal Core Web Vitals scores and sub-5KB per-route bundle deltas.", tags: ["REACT", "NEXT.JS", "WEBGL"], image: "https://picsum.photos/seed/quantum1/800/400" },
            { title: "PixelForge Design System", description: "High-performance React component library with tree-shaking, zero-runtime CSS, and sub-5KB bundle impact per component.", tags: ["REACT", "TYPESCRIPT", "VITE"], image: "https://picsum.photos/seed/pixelforge1/800/400" },
        ],
        testimonials: [
            { quote: "Isla got our app to 98+ Lighthouse scores across the board. Our conversion rate went up 22% — directly attributable to her performance work.", author: "Tom Langley", role: "CEO, PAGESPEED CO", avatar: "TL" },
            { quote: "Her understanding of Next.js internals is deeper than most people on our own team. She fixed performance bugs we'd had open for two years.", author: "Guillermo Rauch", role: "CEO, VERCEL", avatar: "GR" },
        ],
    },

    // ── 13. Ravi Sharma ───────────────────────────────
    {
        name: "Ravi Sharma",
        email: "ravi.sharma@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RaviSharma",
        bio: "Backend engineer specializing in high-scale API design and database architecture. 6 years at fintech companies handling billions of transactions. PostgreSQL wizard and microservices advocate. Clean code is non-negotiable.",
        github: "https://github.com/ravisharma",
        linkedin: "https://linkedin.com/in/ravisharma",
        portfolio: "https://ravisharma.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Senior Backend Engineer",
        location: "Singapore",
        stats: { projectsCompleted: 25, collaborations: 13, contributionScore: 94, followers: 750 },
        skillProficiency: [
            { name: "Node.js", proficiency: 93 },
            { name: "PostgreSQL", proficiency: 95 },
            { name: "Redis", proficiency: 88 },
        ],
        skillTags: ["Docker", "GraphQL", "TypeScript"],
        experience: [
            { role: "Staff Backend Engineer", company: "Razorpay", period: "2021 — Present", description: "Architected transaction APIs handling 10M+ daily payments with 99.99% uptime and sub-50ms response times." },
            { role: "Senior Backend Engineer", company: "CRED", period: "2019 — 2021", description: "Built PostgreSQL-based financial data models processing billions in credit card transactions monthly." },
            { role: "Software Engineer", company: "Flipkart", period: "2017 — 2019", description: "Developed core order management microservices for India's largest e-commerce platform." },
        ],
        featuredProjects: [
            { title: "StellarAuth SDK", description: "Developer-first auth server with zero-config setup backed by a battle-tested PostgreSQL + Redis session architecture.", tags: ["NODE.JS", "POSTGRESQL", "REDIS"], image: "https://picsum.photos/seed/stellar1/800/400" },
            { title: "FlowState Analytics", description: "High-scale analytics backend with optimized PostgreSQL schemas and multi-layer Redis caching for sub-100ms queries.", tags: ["NODE.JS", "GRAPHQL", "TYPESCRIPT"], image: "https://picsum.photos/seed/flowstate1/800/400" },
        ],
        testimonials: [
            { quote: "Ravi's API architecture handled a 50x Black Friday traffic spike without a single error. That kind of reliability is priceless.", author: "Akash Bansal", role: "CTO, RAZORPAY", avatar: "AB" },
            { quote: "His PostgreSQL optimizations saved us $40k/month in DB costs. He thinks in indexes and execution plans — it's a true superpower.", author: "Neha Joshi", role: "ENGINEERING LEAD, CRED", avatar: "NJ" },
        ],
    },

    // ── 14. Chloe Dupont ──────────────────────────────
    {
        name: "Chloe Dupont",
        email: "chloe.dupont@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChloeDupont",
        bio: "Product designer turned frontend developer. I understand both sides — the pixel and the component. Specializing in design systems, accessibility-first UI, and motion design. I make interfaces that users talk about.",
        github: "https://github.com/chloe.dupont",
        linkedin: "https://linkedin.com/in/chloe.dupont",
        portfolio: "https://chloe.design",
        experienceLevel: "Professional",
        isPro: true,
        title: "Product Designer & Frontend Developer",
        location: "Paris",
        stats: { projectsCompleted: 13, collaborations: 19, contributionScore: 86, followers: 980 },
        skillProficiency: [
            { name: "React", proficiency: 91 },
            { name: "CSS / Animation", proficiency: 94 },
            { name: "Framer Motion", proficiency: 87 },
        ],
        skillTags: ["Figma", "Storybook", "GSAP"],
        experience: [
            { role: "Design Engineer", company: "Notion", period: "2022 — Present", description: "Bridging design and engineering to build accessible UI components and the motion language used across the product." },
            { role: "UI Developer", company: "Dribbble", period: "2020 — 2022", description: "Created interactive showcase components and the motion system that elevated Dribbble's brand identity." },
            { role: "Product Designer", company: "Zenly", period: "2018 — 2020", description: "Designed the core map and social interaction UI for the location-sharing app acquired by Snap." },
        ],
        featuredProjects: [
            { title: "PixelForge Design System", description: "Open-source React component library with dark mode, accessibility-first components, and auto-generated Figma specs.", tags: ["REACT", "FIGMA", "GSAP"], image: "https://picsum.photos/seed/pixelforge1/800/400" },
            { title: "Quantum Dashboard UI", description: "Motion-rich observability dashboard with a cohesive visual language and micro-interactions for live data.", tags: ["CSS", "FRAMER MOTION", "REACT"], image: "https://picsum.photos/seed/quantum1/800/400" },
        ],
        testimonials: [
            { quote: "Chloe designed our onboarding flow and activation jumped from 34% to 61% the week it shipped. Design that directly moves metrics.", author: "Pierre Leblanc", role: "CPO, NOTION FRANCE", avatar: "PL" },
            { quote: "She makes interfaces feel alive in a way that's hard to describe but impossible to miss. Working with her changed how I think about UI.", author: "Emma Blanc", role: "HEAD OF DESIGN, DRIBBBLE", avatar: "EB" },
        ],
    },

    // ── 15. Felix Wagner ──────────────────────────────
    {
        name: "Felix Wagner",
        email: "felix.wagner@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=FelixWagner",
        bio: "Systems programmer and compiler nerd. I work at the intersection of programming languages and runtime performance. Writing parsers, optimizers, and language tooling in Rust. LLVM contributor. Former Mozilla engineer.",
        github: "https://github.com/felixwagner",
        linkedin: "https://linkedin.com/in/felixwagner",
        portfolio: "https://felixwagner.systems",
        experienceLevel: "Expert",
        isPro: true,
        title: "Systems Programmer & Compiler Engineer",
        location: "Munich",
        stats: { projectsCompleted: 20, collaborations: 9, contributionScore: 98, followers: 1120 },
        skillProficiency: [
            { name: "Rust", proficiency: 98 },
            { name: "C++", proficiency: 94 },
            { name: "LLVM", proficiency: 91 },
        ],
        skillTags: ["WebAssembly", "Python", "Linux"],
        experience: [
            { role: "Compiler Engineer", company: "Mozilla", period: "2020 — Present", description: "Core contributor to the Rust compiler and SpiderMonkey JIT, implementing optimization passes that improved runtime performance by 25%." },
            { role: "Systems Engineer", company: "ARM", period: "2018 — 2020", description: "Developed LLVM backend optimizations for ARM architecture targeting embedded and mobile CPU targets." },
            { role: "Software Engineer", company: "SUSE", period: "2016 — 2018", description: "Worked on Linux kernel modules and toolchain development for enterprise Linux distributions." },
        ],
        featuredProjects: [
            { title: "Nexus Protocol Engine", description: "Custom recursive SNARK circuit and ZK proof aggregation system with LLVM-optimized hot paths and WASM-portable verifiers.", tags: ["RUST", "LLVM", "WEBASSEMBLY"], image: "https://picsum.photos/seed/nexus1/800/400" },
            { title: "Micro-Orch Kernel", description: "Compiler-verified memory-safe container runtime in Rust with a custom parser for the declarative configuration language.", tags: ["RUST", "C++", "LINUX"], image: "https://picsum.photos/seed/microorch1/800/400" },
        ],
        testimonials: [
            { quote: "Felix's compiler optimization reduced our WASM binary size by 40% and improved startup 3x. He operates at a level very few engineers reach.", author: "Nicholas Matsakis", role: "COMPILER LEAD, MOZILLA", avatar: "NM" },
            { quote: "He submitted a patch fixing a 5-year-old LLVM performance regression. The breadth and depth of his systems knowledge is extraordinary.", author: "Tobias Klein", role: "PRINCIPAL ENG, ARM", avatar: "TK" },
        ],
    },

    // ── 16. Mei Lin ───────────────────────────────────
    {
        name: "Mei Lin",
        email: "mei.lin@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MeiLin",
        bio: "NLP and conversational AI engineer. Building the next generation of language interfaces — from intent classification to multi-turn dialogue systems. 4 years at a top AI lab before going independent. Hugging Face contributor.",
        github: "https://github.com/meilin",
        linkedin: "https://linkedin.com/in/meilin",
        portfolio: "https://meilin.ai",
        experienceLevel: "Expert",
        isPro: true,
        title: "NLP & Conversational AI Engineer",
        location: "Amsterdam",
        stats: { projectsCompleted: 17, collaborations: 12, contributionScore: 95, followers: 1670 },
        skillProficiency: [
            { name: "Python", proficiency: 96 },
            { name: "PyTorch", proficiency: 94 },
            { name: "HuggingFace", proficiency: 92 },
        ],
        skillTags: ["FastAPI", "LangChain", "Redis"],
        experience: [
            { role: "NLP Research Engineer", company: "AI Safety Lab", period: "2019 — 2023", description: "Built multi-turn dialogue systems and intent classification pipelines with 97% accuracy for 5M+ daily active users." },
            { role: "ML Engineer", company: "ByteDance", period: "2018 — 2019", description: "Developed content recommendation NLP models processing 1B+ social media posts daily for relevance scoring." },
            { role: "Research Scientist", company: "Baidu Research", period: "2017 — 2018", description: "Conducted foundational NLP research on cross-lingual transfer learning, publishing at ACL and EMNLP." },
        ],
        featuredProjects: [
            { title: "Project Aether Intelligence", description: "LLM inference routing system with NLP-optimized prompting and latency-aware model selection for developer APIs.", tags: ["PYTHON", "PYTORCH", "LANGCHAIN"], image: "https://picsum.photos/seed/aether1/800/400" },
            { title: "NeuroSync AI Interface", description: "Natural language intent mapping layer translating EEG neural patterns into linguistic token sequences.", tags: ["PYTHON", "HUGGINGFACE", "FASTAPI"], image: "https://picsum.photos/seed/neurosync1/800/400" },
        ],
        testimonials: [
            { quote: "Mei's intent classification model reduced our support misrouting by 78%. The business ROI was immediate and massive.", author: "James Liu", role: "VP AI, BYTEDANCE", avatar: "JL" },
            { quote: "She built a multi-turn dialogue system in a new language and it outperformed our existing solution. Remarkable depth and adaptability.", author: "Chen Wei", role: "RESEARCH DIRECTOR, BAIDU", avatar: "CW" },
        ],
    },

    // ── 17. Oscar Hernandez ───────────────────────────
    {
        name: "Oscar Hernandez",
        email: "oscar.hernandez@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=OscarHernandez",
        bio: "Cloud architect and FinOps specialist. I design multi-region AWS architectures that scale to millions of users without breaking the bank. Certified AWS Solutions Architect Professional. Cut cloud costs by 60% at my last company.",
        github: "https://github.com/oscarhernandez",
        linkedin: "https://linkedin.com/in/oscarhernandez",
        portfolio: "https://oscarhernandez.cloud",
        experienceLevel: "Expert",
        isPro: true,
        title: "Cloud Architect & FinOps Specialist",
        location: "Miami",
        stats: { projectsCompleted: 28, collaborations: 15, contributionScore: 95, followers: 690 },
        skillProficiency: [
            { name: "AWS", proficiency: 97 },
            { name: "Terraform", proficiency: 93 },
            { name: "Python", proficiency: 88 },
        ],
        skillTags: ["Docker", "CloudFormation", "Lambda"],
        experience: [
            { role: "Principal Cloud Architect", company: "Capital One", period: "2020 — Present", description: "Designed multi-region AWS architecture for core banking systems at 99.999% availability for 75M+ customers." },
            { role: "Solutions Architect", company: "AWS", period: "2017 — 2020", description: "Helped Fortune 500 clients design scalable cloud architectures, specializing in FinOps cost optimization." },
            { role: "Cloud Infrastructure Eng", company: "Nubank", period: "2015 — 2017", description: "Built cloud-native infrastructure for the digital bank from seed stage to Series D, scaling to millions of customers." },
        ],
        featuredProjects: [
            { title: "Micro-Orch Kernel", description: "Multi-region AWS deployment architecture for the IoT orchestration system with automated FinOps cost governance.", tags: ["AWS", "TERRAFORM", "LAMBDA"], image: "https://picsum.photos/seed/microorch1/800/400" },
            { title: "FlowState Analytics", description: "Cloud-native self-hosted analytics on AWS with auto-scaling Lambda processors, S3-backed ClickHouse, and cost budgeting.", tags: ["AWS", "CLOUDFORMATION", "DOCKER"], image: "https://picsum.photos/seed/flowstate1/800/400" },
        ],
        testimonials: [
            { quote: "Oscar cut our AWS bill by 62% without touching performance SLAs. It was like magic — we still don't fully understand how he did it.", author: "Maria Gonzalez", role: "CFO, BANKTECH LATAM", avatar: "MG" },
            { quote: "His multi-region architecture handled a 100x traffic spike during our product launch without a single degraded service. Engineering brilliance.", author: "David Park", role: "CTO, FINFLOW", avatar: "DP" },
        ],
    },

    // ── 18. Zoe Hartmann ──────────────────────────────
    {
        name: "Zoe Hartmann",
        email: "zoe.hartmann@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZoeHartmann",
        bio: "Game developer and real-time graphics engineer. Unity and Unreal are my playgrounds. Building multiplayer game backends and WebGL experiences for the browser. If it renders in real-time, I want to optimize it.",
        github: "https://github.com/zoehartmann",
        linkedin: "https://linkedin.com/in/zoehartmann",
        portfolio: "https://zoehartmann.games",
        experienceLevel: "Professional",
        isPro: false,
        title: "Game Developer & Graphics Engineer",
        location: "Stockholm",
        stats: { projectsCompleted: 10, collaborations: 14, contributionScore: 84, followers: 560 },
        skillProficiency: [
            { name: "C# / Unity", proficiency: 92 },
            { name: "C++ / Unreal", proficiency: 88 },
            { name: "WebGL / Three.js", proficiency: 85 },
        ],
        skillTags: ["HLSL", "Blender", "Godot"],
        experience: [
            { role: "Game Engineer", company: "Mojang Studios", period: "2022 — Present", description: "Developing real-time rendering systems and multiplayer backend architecture for Minecraft features serving 140M+ players." },
            { role: "Graphics Programmer", company: "King", period: "2020 — 2022", description: "Optimized GPU shaders and animation systems for mobile games achieving 60fps on mid-range Android devices." },
            { role: "Game Developer", company: "Paradox Interactive", period: "2019 — 2020", description: "Built procedural map generation and real-time simulation logic for grand strategy game titles." },
        ],
        featuredProjects: [
            { title: "Quantum Dashboard UI", description: "Real-time WebGL rendering engine for the observability dashboard, hitting 60fps with thousands of animated live data nodes.", tags: ["WEBGL", "THREE.JS", "C++"], image: "https://picsum.photos/seed/quantum1/800/400" },
            { title: "NeuroSync AI Interface", description: "3D neural activity visualizer using Three.js to render real-time brain signal mapping directly in the browser.", tags: ["THREE.JS", "WEBGL", "C#"], image: "https://picsum.photos/seed/neurosync1/800/400" },
        ],
        testimonials: [
            { quote: "Zoe's shader work transformed our game's visual quality overnight — and she optimized it so we had budget left for even more effects.", author: "Lars Eriksson", role: "LEAD DEV, MOJANG", avatar: "LE" },
            { quote: "Her WebGL implementation made our dashboards look better than native desktop apps. Incredible work.", author: "Katrin Hofer", role: "CTO, VIZCRAFT", avatar: "KH" },
        ],
    },

    // ── 19. Arjun Mehta ───────────────────────────────
    {
        name: "Arjun Mehta",
        email: "arjun.mehta@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMehta",
        bio: "Distributed systems engineer with a focus on consensus algorithms and event sourcing. Building database engines and message brokers from scratch because existing solutions were never quite right. Apache Kafka committer.",
        github: "https://github.com/arjunmehta",
        linkedin: "https://linkedin.com/in/arjunmehta",
        portfolio: "https://arjunmehta.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Distributed Systems Engineer",
        location: "Amsterdam",
        stats: { projectsCompleted: 23, collaborations: 11, contributionScore: 96, followers: 1030 },
        skillProficiency: [
            { name: "Kafka", proficiency: 97 },
            { name: "Java", proficiency: 94 },
            { name: "Cassandra", proficiency: 88 },
        ],
        skillTags: ["Go", "gRPC", "Kubernetes"],
        experience: [
            { role: "Principal Engineer", company: "Confluent", period: "2020 — Present", description: "Core Apache Kafka committer building consensus protocol improvements used by 10k+ companies worldwide." },
            { role: "Staff Software Engineer", company: "LinkedIn", period: "2017 — 2020", description: "Designed event sourcing infrastructure handling 7 trillion messages per day across distributed systems." },
            { role: "Software Engineer", company: "Oracle", period: "2015 — 2017", description: "Built Java-based distributed database features for Oracle RAC, focusing on consensus and replication protocols." },
        ],
        featuredProjects: [
            { title: "Nexus Protocol Engine", description: "Custom consensus layer for cross-chain settlement using a Kafka-inspired message ordering and exactly-once delivery protocol.", tags: ["JAVA", "KAFKA", "GRPC"], image: "https://picsum.photos/seed/nexus1/800/400" },
            { title: "Micro-Orch Kernel", description: "Gossip-protocol cluster manager for IoT devices modeled on Kafka's partition replication and leader election design.", tags: ["JAVA", "KAFKA", "KUBERNETES"], image: "https://picsum.photos/seed/microorch1/800/400" },
        ],
        testimonials: [
            { quote: "Arjun's Kafka improvements reduced our message processing latency by 40% across the LinkedIn infrastructure. Systemic, brilliant work.", author: "Ben Stopford", role: "VP ENGINEERING, CONFLUENT", avatar: "BS" },
            { quote: "He built an event sourcing system that has run in production for 3 years without a single data loss incident. That reliability speaks for itself.", author: "Ritu Sharma", role: "TECH LEAD, ORACLE SYSTEMS", avatar: "RS" },
        ],
    },

    // ── 20. Sofia Andersen ────────────────────────────
    {
        name: "Sofia Andersen",
        email: "sofia.andersen@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaAndersen",
        bio: "Full-stack developer and startup generalist. Three YC companies in four years. I move fast, break things responsibly, and ship products that users love. Next.js, Supabase, and a strong coffee are my weapons of choice.",
        github: "https://github.com/sofiaandersen",
        linkedin: "https://linkedin.com/in/sofiaandersen",
        portfolio: "https://sofiaandersen.io",
        experienceLevel: "Professional",
        isPro: true,
        title: "Full-Stack Developer & Startup Engineer",
        location: "Copenhagen",
        stats: { projectsCompleted: 18, collaborations: 22, contributionScore: 89, followers: 670 },
        skillProficiency: [
            { name: "Next.js", proficiency: 93 },
            { name: "TypeScript", proficiency: 91 },
            { name: "Supabase", proficiency: 88 },
        ],
        skillTags: ["TailwindCSS", "Prisma", "Vercel"],
        experience: [
            { role: "CTO", company: "FormFlow (YC S23)", period: "2023 — Present", description: "Built the AI-powered form automation platform solo in 3 weeks, reaching $50k MRR in 6 months." },
            { role: "Lead Developer", company: "Taskify (YC W22)", period: "2022 — 2023", description: "First engineer, shipped the entire product with Next.js and Supabase before hiring a team of 5." },
            { role: "Full-Stack Dev", company: "Launchpad (YC S21)", period: "2021 — 2022", description: "Shipped 4 major features per month using a Next.js monorepo that scaled cleanly to Series A." },
        ],
        featuredProjects: [
            { title: "FlowState Analytics", description: "Full-stack privacy-first analytics platform built with Next.js and Supabase — self-hosted and deployable in under 10 minutes.", tags: ["NEXT.JS", "TYPESCRIPT", "SUPABASE"], image: "https://picsum.photos/seed/flowstate1/800/400" },
            { title: "StellarAuth SDK", description: "Developer dashboard and documentation portal for the StellarAuth SDK, built with Next.js and deployed to the Vercel edge.", tags: ["NEXT.JS", "TAILWINDCSS", "VERCEL"], image: "https://picsum.photos/seed/flowstate1/800/400" },
        ],
        testimonials: [
            { quote: "Sofia shipped our entire MVP while I was still writing the PRD. She makes the right decisions fast. Essential co-founder material.", author: "Mikkel Hansen", role: "CEO, FORMFLOW", avatar: "MH" },
            { quote: "She turned our idea into a working product in 3 weeks. The architecture decisions she made on day one have held up perfectly 18 months later.", author: "Anna Kristiansen", role: "PARTNER, YC", avatar: "AK" },
        ],
    },

    // ── 21. Lucas Moreau ──────────────────────────────
    {
        name: "Lucas Moreau",
        email: "lucas.moreau@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=LucasMoreau",
        bio: "Embedded systems and IoT engineer. I write firmware that runs on chips with 8KB of RAM and still manages to be elegant. C and Rust at the hardware boundary. Building the connected infrastructure of the physical world.",
        github: "https://github.com/lucasmoreau",
        linkedin: "https://linkedin.com/in/lucasmoreau",
        portfolio: "https://lucasmoreau.dev",
        experienceLevel: "Professional",
        isPro: false,
        title: "Embedded Systems & IoT Engineer",
        location: "Lyon",
        stats: { projectsCompleted: 14, collaborations: 7, contributionScore: 85, followers: 380 },
        skillProficiency: [
            { name: "C", proficiency: 95 },
            { name: "Rust", proficiency: 89 },
            { name: "C++", proficiency: 86 },
        ],
        skillTags: ["FreeRTOS", "ESP32", "MQTT"],
        experience: [
            { role: "Embedded Engineer", company: "STMicroelectronics", period: "2021 — Present", description: "Developed STM32 firmware for industrial IoT applications achieving sub-1ms interrupt response times." },
            { role: "Firmware Developer", company: "Schneider Electric", period: "2019 — 2021", description: "Built FreeRTOS-based energy management firmware for smart grid edge devices at 200+ industrial sites." },
            { role: "IoT Engineer", company: "Sigfox", period: "2018 — 2019", description: "Designed ultra-low-power LPWAN firmware for IoT sensor nodes targeting 10-year battery life." },
        ],
        featuredProjects: [
            { title: "Micro-Orch Kernel", description: "ARM Cortex-M4 implementation of the Micro-Orch agent running full workload scheduling in 64MB RAM.", tags: ["C", "RUST", "FREERTOS"], image: "https://picsum.photos/seed/microorch1/800/400" },
            { title: "Nexus Protocol Engine", description: "Minimal-footprint Rust client for the Nexus settlement protocol compiled for ESP32-based edge nodes.", tags: ["RUST", "C", "MQTT"], image: "https://picsum.photos/seed/microorch1/800/400" },
        ],
        testimonials: [
            { quote: "Lucas wrote firmware handling 12 concurrent sensor streams in 8KB of RAM. The elegance of that code is something I show every new hire.", author: "Antoine Girard", role: "VP EMBEDDED, STMICRO", avatar: "AG" },
            { quote: "His low-power design extended our sensor battery life from 2 years to 9. That single change transformed our product economics entirely.", author: "Sophie Bernard", role: "CTO, SIGFOX", avatar: "SB" },
        ],
    },

    // ── 22. Nia Okafor ────────────────────────────────
    {
        name: "Nia Okafor",
        email: "nia.okafor@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NiaOkafor",
        bio: "Developer advocate and open-source maintainer. I build SDKs and developer tools that thousands of engineers use daily. Technical writing, API design, and community building are my superpowers. 8 npm packages with 500k+ weekly downloads.",
        github: "https://github.com/niaokafor",
        linkedin: "https://linkedin.com/in/niaokafor",
        portfolio: "https://niaokafor.dev",
        experienceLevel: "Professional",
        isPro: true,
        title: "Developer Advocate & Open-Source Maintainer",
        location: "London",
        stats: { projectsCompleted: 8, collaborations: 28, contributionScore: 87, followers: 3200 },
        skillProficiency: [
            { name: "TypeScript", proficiency: 92 },
            { name: "Node.js", proficiency: 90 },
            { name: "React", proficiency: 87 },
        ],
        skillTags: ["GraphQL", "OpenAPI", "Docusaurus"],
        experience: [
            { role: "Developer Advocate", company: "Stripe", period: "2022 — Present", description: "Building developer SDKs and content that drove 40% growth in Stripe API adoption among indie developers." },
            { role: "Senior Developer Relations", company: "Twilio", period: "2020 — 2022", description: "Maintained 5 official SDKs with 500k+ weekly npm downloads and hosted dev events for 10k+ engineers." },
            { role: "Open Source Engineer", company: "npm / GitHub", period: "2018 — 2020", description: "Built developer tooling and maintained core npm CLI features used by 17M+ JavaScript developers." },
        ],
        featuredProjects: [
            { title: "StellarAuth SDK", description: "SDK architecture, OpenAPI spec, and Docusaurus documentation portal making auth integration a 15-minute task for any developer.", tags: ["TYPESCRIPT", "NODE.JS", "OPENAPI"], image: "https://picsum.photos/seed/stellar1/800/400" },
            { title: "PixelForge Design System", description: "npm package architecture, changelog automation, and documentation site for the open-source React component library.", tags: ["TYPESCRIPT", "DOCUSAURUS", "GRAPHQL"], image: "https://picsum.photos/seed/pixelforge1/800/400" },
        ],
        testimonials: [
            { quote: "Nia's SDK improved our developer onboarding from 3 days to 20 minutes. Her docs make developers feel like the API was built just for them.", author: "Patrick Collison", role: "CEO, STRIPE", avatar: "PC" },
            { quote: "Her technical writing is the clearest I've read. She makes complex systems feel approachable without losing any depth.", author: "Jeff Lawson", role: "CEO, TWILIO", avatar: "JL" },
        ],
    },

    // ── 23. Kai Yamamoto ──────────────────────────────
    {
        name: "Kai Yamamoto",
        email: "kai.yamamoto@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=KaiYamamoto",
        bio: "Quantitative engineer and algorithmic trading system builder. Applying HFT-grade low-latency techniques to open-source financial infrastructure. C++ for the hot path, Python for everything else. Risk systems that actually manage risk.",
        github: "https://github.com/kaiyamamoto",
        linkedin: "https://linkedin.com/in/kaiyamamoto",
        portfolio: "https://kaiyamamoto.finance",
        experienceLevel: "Expert",
        isPro: true,
        title: "Quantitative Engineer",
        location: "Hong Kong",
        stats: { projectsCompleted: 21, collaborations: 10, contributionScore: 97, followers: 890 },
        skillProficiency: [
            { name: "C++", proficiency: 97 },
            { name: "Python", proficiency: 93 },
            { name: "Rust", proficiency: 91 },
        ],
        skillTags: ["PostgreSQL", "Redis", "Docker"],
        experience: [
            { role: "Quantitative Engineer", company: "Jane Street", period: "2020 — Present", description: "Building HFT execution systems in C++ with sub-microsecond order processing across global markets." },
            { role: "Low-Latency Developer", company: "Citadel Securities", period: "2018 — 2020", description: "Developed kernel-bypass networking and FPGA-interface systems achieving 200ns end-to-end order latency." },
            { role: "Systems Engineer", company: "Goldman Sachs", period: "2016 — 2018", description: "Built C++ market data normalization systems processing 50M+ price updates per second globally." },
        ],
        featuredProjects: [
            { title: "Nexus Protocol Engine", description: "Low-latency settlement engine applying HFT-grade C++ hot path techniques to cross-chain transaction processing.", tags: ["C++", "RUST", "REDIS"], image: "https://picsum.photos/seed/nexus1/800/400" },
            { title: "FlowState Analytics", description: "Real-time financial analytics pipeline with microsecond-latency event processing for high-frequency market data.", tags: ["C++", "PYTHON", "POSTGRESQL"], image: "https://picsum.photos/seed/flowstate1/800/400" },
        ],
        testimonials: [
            { quote: "Kai's order matching engine processes 2M orders/second with P99 under 500 nanoseconds. He is in a different dimension of engineering.", author: "David Viniar", role: "CTO, JANE STREET", avatar: "DV" },
            { quote: "He rewrote our risk system and it caught a regime shift 40ms before our old system would have. That speed difference was worth $12M in avoided losses.", author: "Mike Chen", role: "HEAD OF RISK, CITADEL", avatar: "MC" },
        ],
    },

    // ── 24. Elena Volkov ──────────────────────────────
    {
        name: "Elena Volkov",
        email: "elena.volkov@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaVolkov",
        bio: "Site reliability engineer and chaos engineering advocate. I break production systems on purpose so they get stronger. 5 years maintaining 99.999% uptime for platforms serving 50M+ users. Prometheus, Grafana, and PagerDuty are my dashboard.",
        github: "https://github.com/elenavolkov",
        linkedin: "https://linkedin.com/in/elenavolkov",
        portfolio: "https://elenavolkov.sre",
        experienceLevel: "Expert",
        isPro: true,
        title: "Site Reliability Engineer",
        location: "Dublin",
        stats: { projectsCompleted: 26, collaborations: 17, contributionScore: 96, followers: 1150 },
        skillProficiency: [
            { name: "Go", proficiency: 94 },
            { name: "Prometheus", proficiency: 92 },
            { name: "Kubernetes", proficiency: 90 },
        ],
        skillTags: ["Grafana", "Terraform", "Python"],
        experience: [
            { role: "Staff SRE", company: "Google", period: "2020 — Present", description: "Maintaining 99.999% uptime for Google Workspace serving 3B+ users, leading chaos engineering across 20 teams." },
            { role: "Senior SRE", company: "Spotify", period: "2018 — 2020", description: "Built the observability platform for all backend teams, reducing MTTR from 45 minutes to under 8 minutes." },
            { role: "Platform Engineer", company: "Zalando", period: "2016 — 2018", description: "Designed automated incident response for Europe's largest fashion platform, surviving 50x Black Friday spikes." },
        ],
        featuredProjects: [
            { title: "Quantum Dashboard UI", description: "Prometheus-native observability platform with Grafana-inspired dashboards and automated SLO tracking for live services.", tags: ["GO", "PROMETHEUS", "GRAFANA"], image: "https://picsum.photos/seed/quantum1/800/400" },
            { title: "Micro-Orch Kernel", description: "Reliability layer for IoT orchestration with automated self-healing, circuit breakers, and error-budget SLO management.", tags: ["GO", "KUBERNETES", "TERRAFORM"], image: "https://picsum.photos/seed/microorch1/800/400" },
        ],
        testimonials: [
            { quote: "Elena ran a chaos experiment that exposed a failure mode we'd have hit at our next traffic peak. Her foresight prevented a catastrophic outage.", author: "Liz Fong-Jones", role: "PRINCIPAL SRE, GOOGLE", avatar: "LF" },
            { quote: "She redesigned our on-call process so engineer burnout from incidents dropped by 70%. Reliability is a people problem too — Elena gets that.", author: "Johan Berg", role: "VP ENGINEERING, SPOTIFY", avatar: "JB" },
        ],
    },

    // ── 25. Ben Oduya ─────────────────────────────────
    {
        name: "Ben Oduya",
        email: "ben.oduya@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=BenOduya",
        bio: "GraphQL and API platform engineer. Designed federation architectures for enterprise clients with 200+ microservices. If your API layer is a mess, I'm the person you call. Apollo Federation and schema-first development are my religion.",
        github: "https://github.com/benoduya",
        linkedin: "https://linkedin.com/in/benoduya",
        portfolio: "https://benoduya.dev",
        experienceLevel: "Professional",
        isPro: false,
        title: "GraphQL & API Platform Engineer",
        location: "Toronto",
        stats: { projectsCompleted: 16, collaborations: 13, contributionScore: 88, followers: 590 },
        skillProficiency: [
            { name: "GraphQL", proficiency: 95 },
            { name: "TypeScript", proficiency: 91 },
            { name: "Node.js", proficiency: 89 },
        ],
        skillTags: ["Apollo Federation", "PostgreSQL", "Redis"],
        experience: [
            { role: "API Platform Lead", company: "Shopify", period: "2021 — Present", description: "Architecting the GraphQL federation layer unifying 200+ microservices into a single API graph for 1M+ merchants." },
            { role: "Senior GraphQL Engineer", company: "GitHub", period: "2019 — 2021", description: "Built core GraphQL API features and Apollo schema management tools used daily by 100M+ developers." },
            { role: "Backend Engineer", company: "Intercom", period: "2018 — 2019", description: "Migrated REST APIs to GraphQL, reducing mobile data usage by 45% and improving DX scores by 60%." },
        ],
        featuredProjects: [
            { title: "StellarAuth SDK", description: "GraphQL-native authentication API with Apollo Federation subgraph support for seamless integration into any schema.", tags: ["GRAPHQL", "TYPESCRIPT", "APOLLO"], image: "https://picsum.photos/seed/stellar1/800/400" },
            { title: "FlowState Analytics", description: "GraphQL query layer with intelligent DataLoader batching and subscription-based real-time analytics updates.", tags: ["GRAPHQL", "NODE.JS", "REDIS"], image: "https://picsum.photos/seed/flowstate1/800/400" },
        ],
        testimonials: [
            { quote: "Ben untangled an API architecture 4 teams had fought with for 2 years. He shipped a clean federation solution in 6 weeks and it just worked.", author: "Tobi Lutke", role: "CTO, SHOPIFY", avatar: "TL" },
            { quote: "His schema-first approach changed how our entire engineering org thinks about API design. The clarity it brought to our codebase was transformational.", author: "Nat Friedman", role: "CEO, GITHUB", avatar: "NF" },
        ],
    },

    // ── 26. Hana Park ─────────────────────────────────
    {
        name: "Hana Park",
        email: "hana.park@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=HanaPark",
        bio: "React Native engineer and mobile performance specialist. I make apps that feel native on every platform. Deep expertise in animation performance, memory management, and bridging native modules. 5 apps in the App Store top charts.",
        github: "https://github.com/hanapark",
        linkedin: "https://linkedin.com/in/hanapark",
        portfolio: "https://hanapark.dev",
        experienceLevel: "Professional",
        isPro: true,
        title: "React Native & Mobile Performance Specialist",
        location: "Vancouver",
        stats: { projectsCompleted: 15, collaborations: 11, contributionScore: 87, followers: 710 },
        skillProficiency: [
            { name: "React Native", proficiency: 94 },
            { name: "TypeScript", proficiency: 90 },
            { name: "Swift", proficiency: 85 },
        ],
        skillTags: ["Kotlin", "Firebase", "Expo"],
        experience: [
            { role: "Lead Mobile Engineer", company: "Kakao", period: "2022 — Present", description: "Leading the React Native performance initiative for KakaoTalk, reducing jank by 80% and cold start by 50%." },
            { role: "Senior React Native Developer", company: "Line", period: "2020 — 2022", description: "Built JSI-native modules for camera, AR filters, and biometrics with zero performance compromise on both platforms." },
            { role: "Mobile Developer", company: "Naver", period: "2018 — 2020", description: "Developed React Native components with complex gesture systems maintaining 60fps consistency." },
        ],
        featuredProjects: [
            { title: "SwiftBridge Mobile SDK", description: "JSI-based React Native bridge SDK contributing core Swift bindings for native-level animation and gesture performance.", tags: ["REACT NATIVE", "SWIFT", "TYPESCRIPT"], image: "https://picsum.photos/seed/swiftbridge1/800/400" },
            { title: "PixelForge Design System", description: "React Native extension of the PixelForge design system with gesture-driven micro-interactions and Expo compatibility.", tags: ["REACT NATIVE", "TYPESCRIPT", "EXPO"], image: "https://picsum.photos/seed/pixelforge1/800/400" },
        ],
        testimonials: [
            { quote: "Hana rebuilt our animation system and App Store reviews went from 'laggy' to 'butter smooth' overnight. The impact was immediate.", author: "Ji-Yeon Kim", role: "VP MOBILE, KAKAO", avatar: "JK" },
            { quote: "Her native module work gave us access to hardware APIs we thought were off-limits for React Native. She turns limitations into possibilities.", author: "Hyun Lee", role: "CTO, MOBILETECH KR", avatar: "HL" },
        ],
    },

    // ── 27. Viktor Petrov ─────────────────────────────
    {
        name: "Viktor Petrov",
        email: "viktor.petrov@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ViktorPetrov",
        bio: "Database engineer and query optimizer. I make databases go fast — really fast. PostgreSQL internals, query planner behavior, and index strategy are my specialties. Open-source contributor to pgvector and TimescaleDB.",
        github: "https://github.com/viktorpetrov",
        linkedin: "https://linkedin.com/in/viktorpetrov",
        portfolio: "https://viktorpetrov.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Database Engineer & Query Optimizer",
        location: "Lisbon",
        stats: { projectsCompleted: 24, collaborations: 9, contributionScore: 97, followers: 940 },
        skillProficiency: [
            { name: "PostgreSQL", proficiency: 98 },
            { name: "Redis", proficiency: 92 },
            { name: "ClickHouse", proficiency: 89 },
        ],
        skillTags: ["Python", "Go", "TimescaleDB"],
        experience: [
            { role: "Principal Database Engineer", company: "Yandex", period: "2019 — Present", description: "Core ClickHouse and PostgreSQL contributor, optimizing query execution for petabyte-scale analytical workloads." },
            { role: "Database Architect", company: "Mail.ru", period: "2017 — 2019", description: "Designed sharding and read replica architectures for PostgreSQL clusters at 100M+ user scale." },
            { role: "Software Engineer", company: "EPAM", period: "2015 — 2017", description: "Built PostgreSQL performance monitoring tools and delivered query optimization consulting for enterprise clients." },
        ],
        featuredProjects: [
            { title: "FlowState Analytics", description: "ClickHouse columnar storage engine and query optimization layer enabling 1M+ metrics/sec ingestion with sub-second queries.", tags: ["CLICKHOUSE", "POSTGRESQL", "REDIS"], image: "https://picsum.photos/seed/flowstate1/800/400" },
            { title: "Nexus Protocol Engine", description: "High-performance transaction log database with custom WAL indexing for cross-chain settlement audit trails.", tags: ["POSTGRESQL", "GO", "TIMESCALEDB"], image: "https://picsum.photos/seed/nexus1/800/400" },
        ],
        testimonials: [
            { quote: "Viktor diagnosed a query plan regression degrading our P99 latency for months in under 2 hours. His PostgreSQL knowledge is encyclopedic.", author: "Alexei Milogradov", role: "CTO, YANDEX CLOUD", avatar: "AM" },
            { quote: "He redesigned our ClickHouse schema and analytics queries went from 45 seconds to 80 milliseconds. I still can't believe what he achieved.", author: "Olga Smirnova", role: "VP DATA, MAIL.RU", avatar: "OS" },
        ],
    },

    // ── 28. Aisha Rahman ──────────────────────────────
    {
        name: "Aisha Rahman",
        email: "aisha.rahman@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaRahman",
        bio: "EdTech engineer and learning platform architect. Built adaptive learning systems used by 500k+ students worldwide. Passionate about using technology to democratize access to quality education. React, Django, and a lot of empathy.",
        github: "https://github.com/aisharahman",
        linkedin: "https://linkedin.com/in/aisharahman",
        portfolio: "https://aisharahman.dev",
        experienceLevel: "Professional",
        isPro: false,
        title: "EdTech Engineer & Learning Platform Architect",
        location: "London",
        stats: { projectsCompleted: 13, collaborations: 16, contributionScore: 86, followers: 480 },
        skillProficiency: [
            { name: "React", proficiency: 91 },
            { name: "Python / Django", proficiency: 89 },
            { name: "PostgreSQL", proficiency: 87 },
        ],
        skillTags: ["AWS", "TailwindCSS", "Redis"],
        experience: [
            { role: "Lead Engineer", company: "Coursera", period: "2022 — Present", description: "Building adaptive learning algorithms and curriculum engines serving 500k+ active learners across 190 countries." },
            { role: "Full-Stack Developer", company: "Khan Academy", period: "2020 — 2022", description: "Developed interactive exercise frameworks and mastery-based progression systems used by 18M+ students monthly." },
            { role: "Software Engineer", company: "2U / edX", period: "2018 — 2020", description: "Built Django-based course delivery infrastructure and React learning interfaces for top-tier university programs." },
        ],
        featuredProjects: [
            { title: "PixelForge Design System", description: "WCAG 2.1 compliant component library with learning-focused UI patterns purpose-built for educational platform interfaces.", tags: ["REACT", "TAILWINDCSS", "DJANGO"], image: "https://picsum.photos/seed/pixelforge1/800/400" },
            { title: "StellarAuth SDK", description: "Multi-tenant auth solution for educational platforms with LTI 1.3 SSO integration and role-based access control.", tags: ["PYTHON", "REACT", "POSTGRESQL"], image: "https://picsum.photos/seed/stellar1/800/400" },
        ],
        testimonials: [
            { quote: "Aisha built our adaptive learning engine and completion rates jumped from 23% to 61%. Her work has directly changed educational outcomes for hundreds of thousands of students.", author: "Daphne Koller", role: "CO-FOUNDER, COURSERA", avatar: "DK" },
            { quote: "She codes with empathy. Every technical decision is grounded in how it will affect the learner. Incredibly rare in an engineer.", author: "Sal Khan", role: "FOUNDER, KHAN ACADEMY", avatar: "SK" },
        ],
    },

    // ── 29. Tom Eriksson ──────────────────────────────
    {
        name: "Tom Eriksson",
        email: "tom.eriksson@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=TomEriksson",
        bio: "Open-source infrastructure engineer and CLI tool builder. I create the tools that developers use to ship their work. Rust-based CLIs, package managers, and build systems. If developers are wasting time, I write code to fix that.",
        github: "https://github.com/tomeriksson",
        linkedin: "https://linkedin.com/in/tomeriksson",
        portfolio: "https://tomeriksson.dev",
        experienceLevel: "Expert",
        isPro: true,
        title: "Open-Source Infrastructure Engineer",
        location: "Stockholm",
        stats: { projectsCompleted: 19, collaborations: 20, contributionScore: 95, followers: 2400 },
        skillProficiency: [
            { name: "Rust", proficiency: 97 },
            { name: "Go", proficiency: 93 },
            { name: "Python", proficiency: 88 },
        ],
        skillTags: ["Linux", "Docker", "WebAssembly"],
        experience: [
            { role: "Open-Source Engineer", company: "Vercel", period: "2022 — Present", description: "Building Rust-based CLI tools and the core parsing layer of the Turbopack bundler for Next.js." },
            { role: "CLI Tooling Lead", company: "Fastly", period: "2020 — 2022", description: "Designed and shipped the Fastly CLI in Rust, reducing developer setup time from 2 hours to under 5 minutes." },
            { role: "Systems Engineer", company: "Klarna", period: "2018 — 2020", description: "Built internal developer platform tooling and CI/CD infrastructure serving 4,000+ engineers across 30 teams." },
        ],
        featuredProjects: [
            { title: "Micro-Orch Kernel", description: "Rust-based CLI and cross-compilation build toolchain for the Micro-Orch system targeting ARM edge devices.", tags: ["RUST", "GO", "LINUX"], image: "https://picsum.photos/seed/microorch1/800/400" },
            { title: "CipherVault Security", description: "Rust CLI client for CipherVault with shell integration, Git hooks, and CI/CD pipeline secret injection support.", tags: ["RUST", "WEBASSEMBLY", "DOCKER"], image: "https://picsum.photos/seed/cipher1/800/400" },
        ],
        testimonials: [
            { quote: "Tom's CLI became the most-loved internal tool at our company within a week of launch. He has an instinct for developer UX that is extraordinary.", author: "Rasmus Andersen", role: "VP DX, VERCEL", avatar: "RA" },
            { quote: "He built our entire developer platform toolchain in 3 months and reduced engineering toil by 40%. The investment in Tom paid back 10x.", author: "Victoria Lind", role: "CTO, KLARNA", avatar: "VL" },
        ],
    },

    // ── 30. Jasmine Cole ──────────────────────────────
    {
        name: "Jasmine Cole",
        email: "jasmine.cole@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JasmineCole",
        bio: "Healthcare tech engineer and HIPAA compliance specialist. Building secure, compliant medical data platforms that don't sacrifice developer experience. EHR integrations, HL7 FHIR APIs, and zero-trust security are my daily work.",
        github: "https://github.com/jasminecole",
        linkedin: "https://linkedin.com/in/jasminecole",
        portfolio: "https://jasminecole.dev",
        experienceLevel: "Professional",
        isPro: false,
        title: "Healthcare Tech Engineer & HIPAA Specialist",
        location: "Atlanta",
        stats: { projectsCompleted: 11, collaborations: 8, contributionScore: 84, followers: 320 },
        skillProficiency: [
            { name: "Node.js", proficiency: 91 },
            { name: "React", proficiency: 89 },
            { name: "PostgreSQL", proficiency: 86 },
        ],
        skillTags: ["AWS", "Docker", "TypeScript"],
        experience: [
            { role: "Senior Software Engineer", company: "Epic Systems", period: "2022 — Present", description: "Building HL7 FHIR APIs and zero-trust security architecture for EHRs used by 300+ US hospital networks." },
            { role: "Full-Stack Developer", company: "Cerner / Oracle", period: "2020 — 2022", description: "Developed HIPAA-compliant patient data APIs and clinical workflow interfaces for community health systems." },
            { role: "Software Engineer", company: "Athenahealth", period: "2018 — 2020", description: "Built medical billing and insurance claim processing features handling $2B+ in annual healthcare transactions." },
        ],
        featuredProjects: [
            { title: "CipherVault Security", description: "HIPAA-grade PHI encryption and role-based access control module adapted from CipherVault's zero-knowledge architecture.", tags: ["NODE.JS", "POSTGRESQL", "DOCKER"], image: "https://picsum.photos/seed/cipher1/800/400" },
            { title: "StellarAuth SDK", description: "HIPAA-compliant auth flows with immutable audit logging, session management, and clinical role-based access control.", tags: ["NODE.JS", "REACT", "AWS"], image: "https://picsum.photos/seed/stellar1/800/400" },
        ],
        testimonials: [
            { quote: "Jasmine got our platform through a SOC 2 Type II and HIPAA audit on the first attempt. Her compliance architecture was flawless and fully defensible.", author: "Dr. Robert Fazio", role: "CISO, EPIC SYSTEMS", avatar: "RF" },
            { quote: "She built a FHIR integration that our clinical team actually enjoys using. Making something both compliant and usable in healthcare is nearly impossible. She did it.", author: "Sharon Wu", role: "CTO, MEDBRIDGE", avatar: "SW" },
        ],
    },
];

// ─── PROJECT DATA POOLS ───────────────────────────────
const projectPool = [
    {
        title: "Nexus Protocol Engine",
        tagline: "Building the infrastructure of tomorrow.",
        description: "Nexus Protocol is developing a high-throughput settlement layer for cross-chain liquidity. We are focused on zero-knowledge proof verification and trustless bridge architecture. Our goal is to enable sub-second finality across EVM-compatible chains without sacrificing decentralization.\n\nThe core challenge is designing a proof aggregation system that can batch thousands of ZK proofs per block while maintaining verifier efficiency. We are currently prototyping a custom recursive SNARK circuit optimized for our use case.\n\nWe need engineers who understand both the cryptographic primitives and the systems programming required to make this production-ready.",
        category: "Web Systems",
        techStack: ["Rust", "TypeScript", "Solidity", "Go"],
        difficulty: "Expert",
        teamSize: 6,
        rolesNeeded: ["Rust Developer", "ZK Engineer", "Frontend Developer"],
        image: "https://picsum.photos/seed/nexus1/800/400",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        estimatedDuration: "6 months",
    },
    {
        title: "Project Aether Intelligence",
        tagline: "Where performance meets precision.",
        description: "Aether is building a decentralized inference network for open-weight LLMs. We are solving the problem of real-time latency optimization for edge inference — bringing AI computation as close to the user as possible.\n\nOur architecture distributes model weights across a peer-to-peer network of GPU nodes, with a routing layer that selects optimal inference paths based on latency, cost, and availability. We are currently in the prototype phase with a working PoC on a 7B parameter model.\n\nThe next phase involves scaling to 70B+ models and building the developer SDK that will make Aether the easiest way to run open-source AI in production.",
        category: "AI & ML Research",
        techStack: ["Python", "PyTorch", "Go", "CUDA"],
        difficulty: "Expert",
        teamSize: 5,
        rolesNeeded: ["ML Engineer", "Backend Developer", "DevOps Engineer"],
        image: "https://picsum.photos/seed/aether1/800/400",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        estimatedDuration: "1 year",
    },
    {
        title: "Quantum Dashboard UI",
        tagline: "Redefining developer workflows.",
        description: "Quantum is a next-generation observability platform with real-time visualization of container health and traffic flows. We believe existing monitoring tools are too complex and too slow — Quantum is being built from the ground up to be fast, beautiful, and intuitive.\n\nThe frontend is a WebGL-accelerated canvas that renders thousands of live data points at 60fps. The backend is a time-series pipeline built on ClickHouse that can ingest 1M metrics per second. We use WebSockets for the real-time data channel between the server and client.\n\nWe need frontend engineers who can work at the boundary of data visualization and performance engineering.",
        category: "DevOps & Infrastructure",
        techStack: ["Next.js", "TailwindCSS", "PostgreSQL", "WebGL"],
        difficulty: "Hard",
        teamSize: 4,
        rolesNeeded: ["Frontend Developer", "Data Engineer", "UI/UX Designer"],
        image: "https://picsum.photos/seed/quantum1/800/400",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        estimatedDuration: "3 months",
    },
    {
        title: "Micro-Orch Kernel",
        tagline: "Open-source. High-performance. Zero compromise.",
        description: "Micro-Orch is a custom orchestration agent for low-power IoT clusters. Our goal is minimal footprint with maximum reliability — running Kubernetes-style workload scheduling on devices with as little as 64MB of RAM.\n\nWe are building a custom container runtime optimized for ARM-based edge devices, a gossip-protocol cluster manager, and a declarative configuration system inspired by Kubernetes but orders of magnitude lighter.\n\nThe project is fully open-source and already has 800 GitHub stars after 3 months. We are looking for embedded systems engineers and Go developers who want to push the boundaries of what constrained devices can do.",
        category: "DevOps & Infrastructure",
        techStack: ["Go", "gRPC", "Kubernetes", "Rust"],
        difficulty: "Expert",
        teamSize: 4,
        rolesNeeded: ["Go Developer", "Embedded Engineer", "DevOps Engineer"],
        image: "https://picsum.photos/seed/microorch1/800/400",
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        estimatedDuration: "Ongoing",
    },
    {
        title: "NeuroSync AI Interface",
        tagline: "Ship faster. Scale smarter.",
        description: "NeuroSync is developing a breakthrough open-source framework for hardware-agnostic neural interfaces. We believe the next frontier of human-computer interaction is not a screen or a voice, but a direct conceptual pipeline.\n\nOur vision is to empower developers to build Thought-to-Code applications using off-the-shelf EEG hardware. We have successfully mapped basic directional intent to vector commands and are now working on high-fidelity sentiment and linguistic token mapping.\n\nWe need signal processing engineers, ML researchers, and frontend developers who want to work on something genuinely unprecedented.",
        category: "AI & ML Research",
        techStack: ["Python", "C++", "TensorFlow", "WebAssembly"],
        difficulty: "Expert",
        teamSize: 5,
        rolesNeeded: ["ML Engineer", "C++ Developer", "Frontend Developer"],
        image: "https://picsum.photos/seed/neurosync1/800/400",
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        estimatedDuration: "1 year",
    },
    {
        title: "StellarAuth SDK",
        tagline: "The backbone of next-gen applications.",
        description: "StellarAuth is a developer-first authentication SDK that makes secure auth the path of least resistance. We support email/password, social OAuth, passkeys, and magic links out of the box — with a single API that works across web, mobile, and desktop.\n\nOur differentiator is our zero-config approach. Most auth systems require days of integration work. StellarAuth works in 15 minutes and scales to millions of users without changing a line of configuration.\n\nWe are building the SDK in TypeScript, the server in Go, and need frontend engineers to build our documentation site and developer dashboard.",
        category: "Web Systems",
        techStack: ["TypeScript", "Go", "PostgreSQL", "Redis"],
        difficulty: "Hard",
        teamSize: 3,
        rolesNeeded: ["Frontend Developer", "Backend Developer", "Technical Writer"],
        image: "https://picsum.photos/seed/stellar1/800/400",
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        estimatedDuration: "6 months",
    },
    {
        title: "FlowState Analytics",
        tagline: "Engineering for the edge.",
        description: "FlowState is a product analytics platform built for developers who are tired of sending their user data to third-party servers. It is fully self-hosted, open-source, and privacy-first — GDPR compliant by design.\n\nWe are building a real-time event pipeline on Kafka, a columnar storage engine on ClickHouse, and a beautiful dashboard on Next.js. Our goal is to be the PostHog alternative that respects both your users and your infrastructure budget.\n\nWe need data engineers, backend developers, and frontend developers who care deeply about both performance and privacy.",
        category: "Web Systems",
        techStack: ["Next.js", "Kafka", "ClickHouse", "TypeScript"],
        difficulty: "Hard",
        teamSize: 4,
        rolesNeeded: ["Data Engineer", "Frontend Developer", "Backend Developer"],
        image: "https://picsum.photos/seed/flowstate1/800/400",
        deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        estimatedDuration: "6 months",
    },
    {
        title: "CipherVault Security",
        tagline: "Distributed by design.",
        description: "CipherVault is a zero-knowledge secrets management platform for development teams. Store API keys, credentials, and sensitive configuration with end-to-end encryption — the server never sees your plaintext data.\n\nWe use a client-side encryption model where all cryptographic operations happen in the browser or CLI before data leaves the device. Our architecture is inspired by Bitwarden but built specifically for developer workflows with deep Git and CI/CD integration.\n\nWe are looking for security engineers, cryptography enthusiasts, and full-stack developers who believe privacy is a feature, not a setting.",
        category: "Cybersecurity",
        techStack: ["Rust", "React", "PostgreSQL", "WebCrypto"],
        difficulty: "Expert",
        teamSize: 4,
        rolesNeeded: ["Security Engineer", "Rust Developer", "Frontend Developer"],
        image: "https://picsum.photos/seed/cipher1/800/400",
        deadline: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        estimatedDuration: "1 year",
    },
    {
        title: "SwiftBridge Mobile SDK",
        tagline: "Latency is the enemy. We fight it.",
        description: "SwiftBridge is a React Native to native bridge SDK that eliminates the performance penalty of cross-platform mobile development. We have built a new JSI-based architecture that gives React Native apps native-level performance for animations, gestures, and camera operations.\n\nOur benchmark results show 3x improvement in frame consistency and 40% reduction in cold start time compared to the default React Native bridge. We are currently working on Kotlin and Swift bindings for the most commonly used native modules.\n\nWe need mobile engineers with deep React Native and native platform experience who want to fix cross-platform development once and for all.",
        category: "Mobile / Native",
        techStack: ["React Native", "Swift", "Kotlin", "C++"],
        difficulty: "Expert",
        teamSize: 4,
        rolesNeeded: ["React Native Developer", "iOS Developer", "Android Developer"],
        image: "https://picsum.photos/seed/swiftbridge1/800/400",
        deadline: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000),
        estimatedDuration: "6 months",
    },
    {
        title: "PixelForge Design System",
        tagline: "From prototype to production in days.",
        description: "PixelForge is an open-source design system and component library for React that combines the flexibility of headless UI with the beauty of a fully designed system. Think Radix UI with the polish of Linear's interface baked in.\n\nEvery component is built with accessibility first, ships with dark mode out of the box, and is fully customizable through a design token system. We generate Figma component specs automatically from the React source code using our custom compiler.\n\nWe need frontend engineers who obsess over component API design, accessibility, and the details that make interfaces feel premium.",
        category: "UI / UX Tools",
        techStack: ["React", "TypeScript", "TailwindCSS", "Figma"],
        difficulty: "Intermediate",
        teamSize: 5,
        rolesNeeded: ["Frontend Developer", "UI/UX Designer", "Technical Writer"],
        image: "https://picsum.photos/seed/pixelforge1/800/400",
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        estimatedDuration: "Ongoing",
    },
];

// ─── HELPERS ──────────────────────────────────────────
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ─── CONNECT ──────────────────────────────────────────
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

// ─── SEED ─────────────────────────────────────────────
const seed = async () => {
    await connectDB();

    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Project.deleteMany({});
    await Application.deleteMany({});
    console.log("✅ Database cleared");

    // ── INSERT USERS ──────────────────────────────────
    console.log("👤 Creating 30 developers...");
    const createdUsers = await User.insertMany(developers);
    console.log(`✅ ${createdUsers.length} developers created`);

    // ── INSERT PROJECTS ───────────────────────────────
    console.log("📁 Creating projects...");
    const createdProjects = [];

    for (let i = 0; i < projectPool.length; i++) {
        const owner = createdUsers[i % createdUsers.length];
        const project = new Project({
            ...projectPool[i],
            ownerId: owner._id,
            ownerName: owner.name,
            ownerEmail: owner.email,
            application_count: 0,
        });
        const saved = await project.save();
        createdProjects.push(saved);
    }
    console.log(`✅ ${createdProjects.length} projects created`);

    // ── INSERT APPLICATIONS ───────────────────────────
    console.log("📝 Creating applications...");
    let applicationCount = 0;
    const appliedPairs = new Set();

    for (const user of createdUsers) {
        const eligibleProjects = createdProjects.filter(
            (p) => p.ownerId.toString() !== user._id.toString()
        );
        const shuffled = [...eligibleProjects].sort(() => Math.random() - 0.5);
        const targets = shuffled.slice(0, 3);

        for (const project of targets) {
            const key = `${user._id}_${project._id}`;
            if (appliedPairs.has(key)) continue;
            appliedPairs.add(key);

            // ✅ FIX: was user.skills (doesn't exist) — now uses user.skillTags
            const topSkills = (user.skillTags ?? []).slice(0, 2).join(" and ");

            const application = new Application({
                projectId: project._id,
                applicantId: user._id,
                applicantName: user.name,
                applicantEmail: user.email,
                role: getRandom(project.rolesNeeded),
                experience: user.experienceLevel,
                github: user.github,
                portfolio: user.portfolio,
                message: `Hi, I am ${user.name}. I have strong experience in ${topSkills} and I am excited to contribute to ${project.title}. My background in ${user.experienceLevel.toLowerCase()} level development makes me a strong fit for this role. I would love to bring my skills to your team.`,
                status: getRandom(["pending", "pending", "accepted", "rejected"]),
            });

            await application.save();
            await Project.findByIdAndUpdate(project._id, {
                $inc: { application_count: 1 },
            });
            applicationCount++;
        }
    }
    console.log(`✅ ${applicationCount} applications created`);

    // ── SUMMARY ───────────────────────────────────────
    console.log("\n🎉 Seeding complete!");
    console.log("──────────────────────────────────");
    console.log(`👤 Developers:   ${createdUsers.length}`);
    console.log(`📁 Projects:     ${createdProjects.length}`);
    console.log(`📝 Applications: ${applicationCount}`);
    console.log("──────────────────────────────────");
    console.log("✅ Check MongoDB Atlas to verify.");

    process.exit(0);
};

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});