module.exports = {
    apps: [{
        name: "broker",
        script: "node_modules/.bin/ts-node"
        args: "./src/broker.ts",
        instances: 1
    }, {
        name: "exchange",
        script: "node_modules/.bin/ts-node"
        args: "./src/exchange.ts",
        instances: 1
    }]
}