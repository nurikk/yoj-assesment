const path = require('path');
let rootDir = process.env.NODE_ENV === "production" ?
    "build" :
    "src"
rootDir = path.join(__dirname, rootDir);
console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('rootDir', rootDir);
module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": true,
    "logging": false,
    "extra": {
        "ssl": {
            "rejectUnauthorized": false,
        }
    },
    "entities": [
        rootDir + "/entity/**/*.{js,ts}",
    ],
    "migrations": [
        rootDir + "/migration/**/*.{js,ts}",
    ],
    "subscribers": [
        rootDir + "/subscriber/**/*.{js,ts}",
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}