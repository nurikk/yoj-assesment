module.exports = {
    apps: [{
            name: "frontent",
            script: "./build/frontent.js",
            instances: 1
        },
        {
            name: "broker",
            script: "./build/broker.js",
            instances: 1
        },
        {
            name: "exchange",
            script: "./build/exchange.js",
            instances: 1
        }
    ]
}