module.exports = {
    apps: [{
            cwd: "./packages/frontend",
            name: "frontend",
            script: "npm",
            args: "run start",
            instances: 1
        },
        {
            cwd: "./packages/backend",
            name: "backend",
            script: "npm",
            args: "run start",
            instances: 1
        }
    ]
}