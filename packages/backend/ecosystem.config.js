module.exports = {
    apps: [{
        name: "broker",
        script: "./src/broker.ts",
        instances: 1
    }, {
        name: "exchange",
        args: "./src/exchange.ts",
        instances: 1
    }]
}