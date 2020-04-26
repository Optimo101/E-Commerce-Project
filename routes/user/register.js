const express = require('express'),
      router = express.Router(),
      uuidv4 = require('uuid/v4'),
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS }),
      db = require('../../config/db'),
      authLib = require('../../lib/authentication'),
      queriesLib = require('../../lib/queries');

// REGISTER ROUTE (GET)
router.get('/', authLib.checkNotAuth, (req, res) => {
   res.render('register');
});

// REGISTER ROUTE (POST)
router.post('/', authLib.checkNotAuth, (req, res) => {   
   const { firstName, lastName, newUsername, newPassword, confirmPassword } = req.body;

   // If password field does not match 'confirm password' field
   if (newPassword !== confirmPassword) {
      return res.render('register', { errorMsg: 'Password fields did not match. Please try again.' })
   }

   // Lookup user email in database
   queriesLib.getUserByEmail(newUsername.toLowerCase(), (error, user) => {
      // If error...
      if (error) {
         console.log(error);
         return res.render('register');
      }

      // If user's email already exists in database...
      if (user) {
         return res.render('register', { errorMsg: 'An account with that email address already exists.' });
      // else, create new user
      } else {
         db.query('INSERT INTO users (first_name, last_name, username, password, id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, newUsername.toLowerCase(), sc.encrypt(newPassword), uuidv4()], (error, results) => {

            if (error) {
               console.log(error);
               return res.render('register', {errorMsg: 'An error occurred while attempting to access the server. Please try again later.'});
            }

            return res.redirect('/user/login');
         });
      }
   });
});

module.exports = router;