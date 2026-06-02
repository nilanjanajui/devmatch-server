const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { MongoClient } = require("mongodb");

// Create a separate MongoDB client for Better Auth
// (Better Auth needs the native driver, not mongoose)
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db();

const auth = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
    },
    trustedOrigins: [
        process.env.CLIENT_URL,
        "http://localhost:3000",
    ].filter(Boolean),
    // Required for cross-domain cookies (Vercel frontend ↔ Render backend)
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
        },
    },
});

module.exports = auth;