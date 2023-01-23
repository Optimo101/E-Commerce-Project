const mysql = require ('mysql2');

const pool = mysql.createPool({
   host                 : process.env.DBHOST,
   database             : process.env.DBNAME,
   port                 : process.env.DB_PORT,
   user                 : process.env.DBUSER,
   password             : process.env.DBPASSWORD
 });


module.exports = {
   query: (text, params, callback) => {
     
      return pool.query(text, params, callback);
      
   },
   getPool: () => {
      return pool;
   }
}