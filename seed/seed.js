const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");

const User = require("../models/User");
const Project = require("../models/Project");
const Application = require("../models/Application");

// ─── 30 COMPLETE DEVELOPER PROFILES ──────────────────
const developers = [
    {
        name: "Alex Rivera",
        email: "alex.rivera@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera",
        bio: "Passionate software architect with 8+ years of experience building scalable systems. Specializing in high-performance web applications using React/Next.js and robust backend services in Rust. I bridge the gap between creative UI and performant engineering.",
        github: "https://github.com/alexrivera",
        linkedin: "https://linkedin.com/in/alexrivera",
        portfolio: "https://alexrivera.dev",
        skills: ["React", "Next.js", "Rust", "PostgreSQL", "WebAssembly", "Docker"],
        experienceLevel: "Expert",
    },
    {
        name: "Sarah Chen",
        email: "sarah.chen@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
        bio: "AI researcher and full-stack engineer with a deep focus on LLM integration and real-time ML pipelines. Former researcher at DeepMind. I love turning complex machine learning models into production-ready APIs that developers actually enjoy using.",
        github: "https://github.com/sarahchen",
        linkedin: "https://linkedin.com/in/sarahchen",
        portfolio: "https://sarahchen.ai",
        skills: ["Python", "PyTorch", "TensorFlow", "FastAPI", "React", "AWS"],
        experienceLevel: "Expert",
    },
    {
        name: "Marcus Webb",
        email: "marcus.webb@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusWebb",
        bio: "Backend infrastructure engineer obsessed with low-latency distributed systems. 6 years building high-throughput APIs in Go and Kubernetes-native microservices. If it needs to handle a million requests per second, call me.",
        github: "https://github.com/marcuswebb",
        linkedin: "https://linkedin.com/in/marcuswebb",
        portfolio: "https://marcuswebb.dev",
        skills: ["Go", "Kubernetes", "gRPC", "PostgreSQL", "Redis", "Terraform"],
        experienceLevel: "Expert",
    },
    {
        name: "Jordan Smoak",
        email: "jordan.smoak@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JordanSmoak",
        bio: "UI architect and design systems engineer. I build the component libraries that entire startups run on. Figma to pixel-perfect React in record time. Passionate about accessibility, micro-interactions, and making interfaces feel alive.",
        github: "https://github.com/jordansmoak",
        linkedin: "https://linkedin.com/in/jordansmoak",
        portfolio: "https://jordansmoak.design",
        skills: ["React", "TypeScript", "TailwindCSS", "Figma", "Framer Motion", "Storybook"],
        experienceLevel: "Professional",
    },
    {
        name: "Priya Nair",
        email: "priya.nair@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaNair",
        bio: "Mobile engineer specializing in cross-platform apps with Flutter and React Native. Shipped 12 production apps with a combined 2M+ downloads. I care deeply about performance, offline-first architecture, and delightful mobile UX.",
        github: "https://github.com/priyanair",
        linkedin: "https://linkedin.com/in/priyanair",
        portfolio: "https://priyanair.dev",
        skills: ["Flutter", "React Native", "Dart", "Firebase", "Swift", "Kotlin"],
        experienceLevel: "Professional",
    },
    {
        name: "Ethan Kovacs",
        email: "ethan.kovacs@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=EthanKovacs",
        bio: "Blockchain and Web3 developer with 5 years building DeFi protocols and smart contract systems. Contributed to three top-100 DeFi projects by TVL. Solidity is my second language — Rust is my first.",
        github: "https://github.com/ethankovacs",
        linkedin: "https://linkedin.com/in/ethankovacs",
        portfolio: "https://ethankovacs.xyz",
        skills: ["Solidity", "Rust", "Ethereum", "Web3.js", "Hardhat", "TypeScript"],
        experienceLevel: "Expert",
    },
    {
        name: "Lena Fischer",
        email: "lena.fischer@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=LenaFischer",
        bio: "DevOps and platform engineer who automates everything that can be automated. 7 years designing CI/CD pipelines and multi-cloud infrastructure for fintech companies. I speak Terraform, Helm, and YAML fluently.",
        github: "https://github.com/lenafischer",
        linkedin: "https://linkedin.com/in/lenafischer",
        portfolio: "https://lenafischer.dev",
        skills: ["Terraform", "AWS", "GCP", "Kubernetes", "Helm", "GitHub Actions"],
        experienceLevel: "Expert",
    },
    {
        name: "Darius Thompson",
        email: "darius.thompson@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DariusThompson",
        bio: "Full-stack engineer with a product mindset. I've co-founded two startups and led engineering teams of 10+. Comfortable in any part of the stack but most passionate about building real-time collaborative tools using WebSockets and CRDTs.",
        github: "https://github.com/dariusthompson",
        linkedin: "https://linkedin.com/in/dariusthompson",
        portfolio: "https://dariusthompson.io",
        skills: ["Node.js", "React", "WebSockets", "MongoDB", "Redis", "TypeScript"],
        experienceLevel: "Expert",
    },
    {
        name: "Yuki Tanaka",
        email: "yuki.tanaka@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=YukiTanaka",
        bio: "Computer vision and robotics engineer. PhD dropout who'd rather ship than publish. Building perception systems for autonomous vehicles using CUDA-accelerated pipelines. OpenCV contributor and ROS enthusiast.",
        github: "https://github.com/yukitanaka",
        linkedin: "https://linkedin.com/in/yukitanaka",
        portfolio: "https://yukitanaka.dev",
        skills: ["Python", "C++", "OpenCV", "PyTorch", "CUDA", "ROS"],
        experienceLevel: "Expert",
    },
    {
        name: "Amara Osei",
        email: "amara.osei@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmaraOsei",
        bio: "Security engineer and ethical hacker. 5 years in offensive security and application pentesting. Now building developer-first security tooling that makes secure coding the path of least resistance. Bug bounty hunter in my spare time.",
        github: "https://github.com/amaraosei",
        linkedin: "https://linkedin.com/in/amaraosei",
        portfolio: "https://amaraosei.security",
        skills: ["Python", "Rust", "Go", "Docker", "Burp Suite", "Linux"],
        experienceLevel: "Professional",
    },
    {
        name: "Noah Castillo",
        email: "noah.castillo@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NoahCastillo",
        bio: "Data engineer and analytics platform builder. I design the pipelines that turn raw event streams into business intelligence. Spark, Airflow, and dbt are my daily tools. Passionate about open-source data infrastructure.",
        github: "https://github.com/noahcastillo",
        linkedin: "https://linkedin.com/in/noahcastillo",
        portfolio: "https://noahcastillo.dev",
        skills: ["Python", "Apache Spark", "Airflow", "dbt", "BigQuery", "Kafka"],
        experienceLevel: "Professional",
    },
    {
        name: "Isla Mackenzie",
        email: "isla.mackenzie@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=IslaMackenzie",
        bio: "Frontend performance engineer. I make websites fast — obsessively fast. Core Web Vitals, bundle optimization, edge rendering — this is my world. Previously at Vercel improving Next.js runtime performance.",
        github: "https://github.com/islamackenzie",
        linkedin: "https://linkedin.com/in/islamackenzie",
        portfolio: "https://islamackenzie.dev",
        skills: ["React", "Next.js", "TypeScript", "Webpack", "Vite", "TailwindCSS"],
        experienceLevel: "Expert",
    },
    {
        name: "Ravi Sharma",
        email: "ravi.sharma@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RaviSharma",
        bio: "Backend engineer specializing in high-scale API design and database architecture. 6 years at fintech companies handling billions of transactions. PostgreSQL wizard and microservices advocate. Clean code is non-negotiable.",
        github: "https://github.com/ravisharma",
        linkedin: "https://linkedin.com/in/ravisharma",
        portfolio: "https://ravisharma.dev",
        skills: ["Node.js", "PostgreSQL", "Redis", "Docker", "GraphQL", "TypeScript"],
        experienceLevel: "Expert",
    },
    {
        name: "Chloe Dupont",
        email: "chloe.dupont@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChloeDupont",
        bio: "Product designer turned frontend developer. I understand both sides — the pixel and the component. Specializing in design systems, accessibility-first UI, and motion design. I make interfaces that users talk about.",
        github: "https://github.com/chloe.dupont",
        linkedin: "https://linkedin.com/in/chloe.dupont",
        portfolio: "https://chloe.design",
        skills: ["React", "Figma", "CSS", "Framer Motion", "Storybook", "GSAP"],
        experienceLevel: "Professional",
    },
    {
        name: "Felix Wagner",
        email: "felix.wagner@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=FelixWagner",
        bio: "Systems programmer and compiler nerd. I work at the intersection of programming languages and runtime performance. Writing parsers, optimizers, and language tooling in Rust. LLVM contributor. Former Mozilla engineer.",
        github: "https://github.com/felixwagner",
        linkedin: "https://linkedin.com/in/felixwagner",
        portfolio: "https://felixwagner.systems",
        skills: ["Rust", "C++", "LLVM", "WebAssembly", "Python", "Linux"],
        experienceLevel: "Expert",
    },
    {
        name: "Mei Lin",
        email: "mei.lin@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MeiLin",
        bio: "NLP and conversational AI engineer. Building the next generation of language interfaces — from intent classification to multi-turn dialogue systems. 4 years at a top AI lab before going independent. Hugging Face contributor.",
        github: "https://github.com/meilin",
        linkedin: "https://linkedin.com/in/meilin",
        portfolio: "https://meilin.ai",
        skills: ["Python", "PyTorch", "HuggingFace", "FastAPI", "LangChain", "Redis"],
        experienceLevel: "Expert",
    },
    {
        name: "Oscar Hernandez",
        email: "oscar.hernandez@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=OscarHernandez",
        bio: "Cloud architect and FinOps specialist. I design multi-region AWS architectures that scale to millions of users without breaking the bank. Certified AWS Solutions Architect Professional. Cut cloud costs by 60% at my last company.",
        github: "https://github.com/oscarhernandez",
        linkedin: "https://linkedin.com/in/oscarhernandez",
        portfolio: "https://oscarhernandez.cloud",
        skills: ["AWS", "Terraform", "Python", "Docker", "CloudFormation", "Lambda"],
        experienceLevel: "Expert",
    },
    {
        name: "Zoe Hartmann",
        email: "zoe.hartmann@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZoeHartmann",
        bio: "Game developer and real-time graphics engineer. Unity and Unreal are my playgrounds. Building multiplayer game backends and WebGL experiences for the browser. If it renders in real-time, I want to optimize it.",
        github: "https://github.com/zoehartmann",
        linkedin: "https://linkedin.com/in/zoehartmann",
        portfolio: "https://zoehartmann.games",
        skills: ["C#", "Unity", "Unreal", "C++", "WebGL", "Three.js"],
        experienceLevel: "Professional",
    },
    {
        name: "Arjun Mehta",
        email: "arjun.mehta@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMehta",
        bio: "Distributed systems engineer with a focus on consensus algorithms and event sourcing. Building database engines and message brokers from scratch because existing solutions were never quite right. Apache Kafka committer.",
        github: "https://github.com/arjunmehta",
        linkedin: "https://linkedin.com/in/arjunmehta",
        portfolio: "https://arjunmehta.dev",
        skills: ["Java", "Kafka", "Cassandra", "Go", "gRPC", "Kubernetes"],
        experienceLevel: "Expert",
    },
    {
        name: "Sofia Andersen",
        email: "sofia.andersen@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaAndersen",
        bio: "Full-stack developer and startup generalist. Three YC companies in four years. I move fast, break things responsibly, and ship products that users love. Next.js, Supabase, and a strong coffee are my weapons of choice.",
        github: "https://github.com/sofiaandersen",
        linkedin: "https://linkedin.com/in/sofiaandersen",
        portfolio: "https://sofiaandersen.io",
        skills: ["Next.js", "TypeScript", "Supabase", "TailwindCSS", "Prisma", "Vercel"],
        experienceLevel: "Professional",
    },
    {
        name: "Lucas Moreau",
        email: "lucas.moreau@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=LucasMoreau",
        bio: "Embedded systems and IoT engineer. I write firmware that runs on chips with 8KB of RAM and still manages to be elegant. C and Rust at the hardware boundary. Building the connected infrastructure of the physical world.",
        github: "https://github.com/lucasmoreau",
        linkedin: "https://linkedin.com/in/lucasmoreau",
        portfolio: "https://lucasmoreau.dev",
        skills: ["C", "Rust", "C++", "FreeRTOS", "ESP32", "MQTT"],
        experienceLevel: "Professional",
    },
    {
        name: "Nia Okafor",
        email: "nia.okafor@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NiaOkafor",
        bio: "Developer advocate and open-source maintainer. I build SDKs and developer tools that thousands of engineers use daily. Technical writing, API design, and community building are my superpowers. 8 npm packages with 500k+ weekly downloads.",
        github: "https://github.com/niaokafor",
        linkedin: "https://linkedin.com/in/niaokafor",
        portfolio: "https://niaokafor.dev",
        skills: ["TypeScript", "Node.js", "React", "GraphQL", "OpenAPI", "Docusaurus"],
        experienceLevel: "Professional",
    },
    {
        name: "Kai Yamamoto",
        email: "kai.yamamoto@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=KaiYamamoto",
        bio: "Quantitative engineer and algorithmic trading system builder. Applying HFT-grade low-latency techniques to open-source financial infrastructure. C++ for the hot path, Python for everything else. Risk systems that actually manage risk.",
        github: "https://github.com/kaiyamamoto",
        linkedin: "https://linkedin.com/in/kaiyamamoto",
        portfolio: "https://kaiyamamoto.finance",
        skills: ["C++", "Python", "Rust", "PostgreSQL", "Redis", "Docker"],
        experienceLevel: "Expert",
    },
    {
        name: "Elena Volkov",
        email: "elena.volkov@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaVolkov",
        bio: "Site reliability engineer and chaos engineering advocate. I break production systems on purpose so they get stronger. 5 years maintaining 99.999% uptime for platforms serving 50M+ users. Prometheus, Grafana, and PagerDuty are my dashboard.",
        github: "https://github.com/elenavolkov",
        linkedin: "https://linkedin.com/in/elenavolkov",
        portfolio: "https://elenavolkov.sre",
        skills: ["Go", "Prometheus", "Grafana", "Kubernetes", "Terraform", "Python"],
        experienceLevel: "Expert",
    },
    {
        name: "Ben Oduya",
        email: "ben.oduya@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=BenOduya",
        bio: "GraphQL and API platform engineer. Designed federation architectures for enterprise clients with 200+ microservices. If your API layer is a mess, I'm the person you call. Apollo Federation and schema-first development are my religion.",
        github: "https://github.com/benoduya",
        linkedin: "https://linkedin.com/in/benoduya",
        portfolio: "https://benoduya.dev",
        skills: ["GraphQL", "TypeScript", "Node.js", "Apollo", "PostgreSQL", "Redis"],
        experienceLevel: "Professional",
    },
    {
        name: "Hana Park",
        email: "hana.park@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=HanaPark",
        bio: "React Native engineer and mobile performance specialist. I make apps that feel native on every platform. Deep expertise in animation performance, memory management, and bridging native modules. 5 apps in the App Store top charts.",
        github: "https://github.com/hanapark",
        linkedin: "https://linkedin.com/in/hanapark",
        portfolio: "https://hanapark.dev",
        skills: ["React Native", "TypeScript", "Swift", "Kotlin", "Firebase", "Expo"],
        experienceLevel: "Professional",
    },
    {
        name: "Viktor Petrov",
        email: "viktor.petrov@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ViktorPetrov",
        bio: "Database engineer and query optimizer. I make databases go fast — really fast. PostgreSQL internals, query planner behavior, and index strategy are my specialties. Open-source contributor to pgvector and TimescaleDB.",
        github: "https://github.com/viktorpetrov",
        linkedin: "https://linkedin.com/in/viktorpetrov",
        portfolio: "https://viktorpetrov.dev",
        skills: ["PostgreSQL", "Redis", "ClickHouse", "Python", "Go", "TimescaleDB"],
        experienceLevel: "Expert",
    },
    {
        name: "Aisha Rahman",
        email: "aisha.rahman@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaRahman",
        bio: "EdTech engineer and learning platform architect. Built adaptive learning systems used by 500k+ students worldwide. Passionate about using technology to democratize access to quality education. React, Django, and a lot of empathy.",
        github: "https://github.com/aisharahman",
        linkedin: "https://linkedin.com/in/aisharahman",
        portfolio: "https://aisharahman.dev",
        skills: ["React", "Python", "Django", "PostgreSQL", "AWS", "TailwindCSS"],
        experienceLevel: "Professional",
    },
    {
        name: "Tom Eriksson",
        email: "tom.eriksson@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=TomEriksson",
        bio: "Open-source infrastructure engineer and CLI tool builder. I create the tools that developers use to ship their work. Rust-based CLIs, package managers, and build systems. If developers are wasting time, I write code to fix that.",
        github: "https://github.com/tomeriksson",
        linkedin: "https://linkedin.com/in/tomeriksson",
        portfolio: "https://tomeriksson.dev",
        skills: ["Rust", "Go", "Python", "Linux", "Docker", "WebAssembly"],
        experienceLevel: "Expert",
    },
    {
        name: "Jasmine Cole",
        email: "jasmine.cole@devmatch.io",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JasmineCole",
        bio: "Healthcare tech engineer and HIPAA compliance specialist. Building secure, compliant medical data platforms that don't sacrifice developer experience. EHR integrations, HL7 FHIR APIs, and zero-trust security are my daily work.",
        github: "https://github.com/jasminecole",
        linkedin: "https://linkedin.com/in/jasminecole",
        portfolio: "https://jasminecole.dev",
        skills: ["Node.js", "React", "PostgreSQL", "AWS", "Docker", "TypeScript"],
        experienceLevel: "Professional",
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
        // Assign each project to a different user
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
        // Each user applies to 3 projects they don't own
        const eligibleProjects = createdProjects.filter(
            (p) => p.ownerId.toString() !== user._id.toString()
        );
        const shuffled = [...eligibleProjects].sort(() => Math.random() - 0.5);
        const targets = shuffled.slice(0, 3);

        for (const project of targets) {
            const key = `${user._id}_${project._id}`;
            if (appliedPairs.has(key)) continue;
            appliedPairs.add(key);

            const application = new Application({
                projectId: project._id,
                applicantId: user._id,
                applicantName: user.name,
                applicantEmail: user.email,
                role: getRandom(project.rolesNeeded),
                experience: user.experienceLevel,
                github: user.github,
                portfolio: user.portfolio,
                message: `Hi, I am ${user.name}. I have strong experience in ${user.skills.slice(0, 2).join(" and ")} and I am excited to contribute to ${project.title}. My background in ${user.experienceLevel.toLowerCase()} level development makes me a strong fit for this role. I would love to bring my skills to your team.`,
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