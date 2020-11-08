module.exports = {
   "type": "sqlite",
   "database": "database.sqlite",
   "synchronize": true,
   "logging": false,
   "entities": [
       "./entity/*.{js,ts}"
   ],
   "migrations": [
       "./migration/**/*.{js,ts}"
   ],
   "subscribers": [
       "./subscriber/**/*.{js,ts}"
   ],
   "cli": {
      "entitiesDir":  "./entity",
      "migrationsDir":  "./migration",
      "subscribersDir":  "./subscriber"
   }
}