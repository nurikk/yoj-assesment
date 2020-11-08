const rootDir = process.env.NODE_ENV === "production" ?
    "build" :
    "src"
module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": true,
    "logging": false,
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