const { Pool } = require('pg');

let pool;

// Swap environment variables depending upon Node env. (For quick deployment/editing)
if (process.env.NODE_ENV === 'production') {
      pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true
   });
} else {
   pool = new Pool({
      user: process.env.MYSQLUSER,
      host: process.env.MYSQLHOST,
      database: process.env.MYSQLDB,
      password: process.env.MYSQLPASSWORD,
      port: process.env.MYSQLPORT
   });
}

module.exports = {
   query: (text, params, callback) => {
      return pool.query(text, params, callback);
   },
   getPool: () => {
      return pool;
   }
}