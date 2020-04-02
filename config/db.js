const { Pool } = require('pg');

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: true,
   user: process.env.PGUSER, // PGUSER=eshopadmin
   password: process.env.PGPASS, // PGPASS=admin
   database: process.env.PGDATABASE // PGDATABASE=eshopdb

   // user: process.env.PGUSER,
   // host: process.env.PGHOST,
   // database: process.env.PGDATABASE,
   // password: process.env.PGPASS,
   // port: process.env.PGPORT
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}