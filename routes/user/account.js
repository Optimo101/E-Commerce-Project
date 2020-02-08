const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS }),
      db = require('../../config/db');

      
// ACCOUNT (GET)
router.get('/:id', checkAuthenticated, (req, res) => {
   res.render('account', {user: req.user});
});

// ACCOUNT (PUT)
router.put('/:id', (req, res) => {
   const { password, newPassword, confirmPassword } = req.body;

   if (newPassword !== confirmPassword) {
      return res.render('account', { user: req.user, errorMsg: 'New password fields did not match. Please try again.' })
   }

   getUserByID(req.params.id, (error, user) => {
      if (error) {
         return res.render('account', { user: req.user, errorMsg: 'We are currently experiencing issues with the server. Please try again later.' });
      }
      
      if (password != sc.decrypt(user.password)) {
         return res.render('account', { user: req.user, errorMsg: 'The current password provided did not match your account.' });
      }

      db.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [sc.encrypt(newPassword), user.id], (error, results) => {
         if (error) {
            return res.render('account', { user: req.user, errorMsg: 'We are currently experiencing issues with the server. Please try again later.' });
         }
         return res.render('account', { user: req.user, successMsg: 'Your password has been updated successfully.' })
      });
   })
});


function checkAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   console.log('Access denied! Please login.');
   res.redirect('/user/login');
}

function getUserByID(id, cb) {
   db.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {      
      if (err) {
         console.log(err);
         return cb(err, null);
      }

      if (!result.rows[0]) {
         console.log('The username does not match any existing account.');
         return cb(null, null);
      }
   return cb(null, result.rows[0]);
   });
}

module.exports = router;