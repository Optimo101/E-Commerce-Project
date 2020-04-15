const { Pool } = require('pg');

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: true
   
   // user: process.env.PGUSER,
   // host: process.env.PGHOST,
   // database: process.env.PGDATABASE,
   // password: process.env.PGPASS,
   // port: process.env.PGPORT
});

console.log('process.env.DATABASE_URL output:', process.env.DATABASE_URL);

module.exports = {
   query: (text, params, callback) => {
      return pool.query(text, params, callback)
   },
   getPool: () => {
      return pool
   }
}