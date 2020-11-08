module.exports = {
    apps: [{
        name: "broker",
        script: "./src/broker.ts",
        instances: 1,
        interpreter: 'node',
        interpreter_args: '--require ts-node/register'
    }, {
        name: "exchange",
        script: "./src/exchange.ts",
        instances: 1,
        interpreter: 'node',
        interpreter_args: '--require ts-node/register'
    }]
}