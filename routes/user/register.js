const express = require('express'),
      router = express.Router(),
      uuidv4 = require('uuid/v4'),
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS }),
      db = require('../../config/index');


// REGISTER (POST)
router.post('/', (req, res) => {   
   const { firstName, lastName, newUsername, newPassword, confirmPassword } = req.body;

   if (newPassword !== confirmPassword) {
      return res.render('login', { errorMsg: 'Password fields did not match. Please try again.' })
   }

   getUserByEmail(newUsername.toLowerCase(), (error, user) => {
      if (error) {
         console.log(error);
         return res.render('login');
      }

      if (user) {
         return res.render('login', { errorMsg: 'An account with that email address already exists.' });

      } else {
         db.query('INSERT INTO users (first_name, last_name, username, password, id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, newUsername.toLowerCase(), sc.encrypt(newPassword), uuidv4()], (error, results) => {

            if (error) {
               console.log(error);
               return res.render('login');
            }
      
            return res.render('login', { successMsg: 'Account created. Please login.' })
         });
      }
   });
});


function getUserByEmail(email, cb) {
   db.query('SELECT * FROM users WHERE username = $1', [email.toLowerCase()], (err, result) => {      
      if (err) {
         return cb(err, null);

      } else if (!result.rows[0]) {
         return cb(null, null);

      } else {
         return cb(null, result.rows[0]);
      }
   });
}


module.exports = router;