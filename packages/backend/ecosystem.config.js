module.exports = {
    apps: [{
        name: "broker",
        script: "./build/broker.js",
        instances: 1
    }, {
        name: "exchange",
        script: "./build/exchange.js",
        instances: 1
    }]
}