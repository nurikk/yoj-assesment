console.log('ormconfig', process.env.DATABASE_URL);
module.exports = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
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