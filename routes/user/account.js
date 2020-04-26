const express = require('express'),
      router = express.Router(),
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS }),
      db = require('../../config/db'),
      authLib = require('../../lib/authentication'),
      queriesLib = require('../../lib/queries');

// ACCOUNT ROUTE (GET)
router.get('/:id', authLib.checkAuth, (req, res) => {
   res.render('account', {user: req.user});
});

// ACCOUNT ROUTE (PUT)
router.put('/:id', authLib.checkAuth, (req, res) => {
   const { password, newPassword, confirmPassword } = req.body;

   if (newPassword !== confirmPassword) {
      return res.render('account', { user: req.user, errorMsg: 'New password fields did not match. Please try again.' })
   }

   queriesLib.getUserByID(req.params.id, (error, user) => {
      if (error) {
         return res.render('account', { user: req.user, errorMsg: 'We are currently experiencing issues with the server. Please try again later.' });
      }
      
      if (password != sc.decrypt(user.password)) {
         return res.render('account', { user: req.user, errorMsg: 'The current password provided did not match your account.' });
      }

      db.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [sc.encrypt(newPassword), user.id], (error, results) => {
         if (error) {
            return res.render('account', { user: req.user, errorMsg: 'We are currently experiencing problems with the server. Please try again later.' });
         }
         return res.render('account', { user: req.user, successMsg: 'Your password has been updated successfully.' })
      });
   })
});

module.exports = router;