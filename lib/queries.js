const db = require('../config/db');

// DATABASE QUERIES FOR FINDING USER

function getUserByEmail(email, cb) {

   db.query('SELECT * FROM users WHERE username = ?', [email.toLowerCase()], (err, result, fields) => {          
      if (err) {
         return cb(err, null);
      } else if (!result[0]) {
         return cb(null, null);
      } else {
         return cb(null, result[0]);
      }
   });
}

function getUserByID(id, cb) {
   db.query('SELECT * FROM users WHERE id = ?', [id], (err, result, fields) => {
      if (err) {
         console.log(err);
         return cb(err, null);
      }

      if (!result[0]) {
         console.log('The username does not match any existing account.');
         return cb(null, null);
      }
   return cb(null, result[0]);
   });
}

module.exports = {
   getUserByEmail: getUserByEmail,
   getUserByID: getUserByID
};