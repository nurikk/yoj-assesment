module.exports = {
    apps: [{
            cwd: "./packages/frontend",
            name: "frontend",
            script: './build/server.js',
            instances: 1
        },
        {
            cwd: "./packages/backend",
            name: "broker",
            script: "./src/broker.ts",
            instances: 1
        }, {
            cwd: "./packages/backend",
            name: "exchange",
            args: "./src/exchange.ts",
            instances: 1
        }
    ]
}