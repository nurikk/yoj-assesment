module.exports = {
    apps: [{
            cwd: "./packages/backend",
            name: "exchange",
            script: "build/exchange.js",
            instances: 1,
            env: {
                NODE_ENV: "production"
            }
        },
        {
            cwd: "./packages/backend",
            name: "broker",
            script: "build/broker.js",
            instances: 1,
            env: {
                NODE_ENV: "production"
            }
        },
        {
            cwd: "./packages/frontend",
            name: "frontend",
            script: './build/server.js',
            instances: 1
        }
    ]
}