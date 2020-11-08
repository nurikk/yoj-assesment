module.exports = {
    apps: [{
            cwd: "./packages/frontend",
            name: "frontend",
            script: './build/server.js',
            instances: 1
        },
        {
            cwd: "./packages/backend/build",
            name: "broker",
            script: "broker.js",
            instances: 1,
            interpreter: 'node',
            interpreter_args: '--require ts-node/register'
        }, {
            cwd: "./packages/backend/build",
            name: "exchange",
            script: "exchange.js",
            instances: 1,
            interpreter: 'node',
            interpreter_args: '--require ts-node/register'
        }
    ]
}