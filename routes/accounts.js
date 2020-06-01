const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      uuidv4 = require('uuid/v4'),
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS }),
      db = require('../config/db'),
      authLib = require('../lib/authentication'),
      queriesLib = require('../lib/queries');


// =============== LOGIN ROUTE ==============
// ==========================================

// (GET)
router.get('/login', authLib.checkNotAuth, (req, res) => {
   res.render('accounts/accounts-login');
});

// (POST)
router.post('/login', authLib.checkNotAuth, (req, res, next) => {
   passport.authenticate('local', function(err, user, info) {
      if (err) { 
         console.log(err)
         return next(err); 
      }
      if (!user) {
         return res.send({ error: info.message}); 
      }

      req.logIn(user, function(err) {
         if (err) {
            console.log(err)
            return next(err); 
         }

         return res.send(req.user);
      });
    })(req, res, next);
});


// ============== LOGOUT ROUTE ==============
// ==========================================

// (POST)
router.post('/logout', authLib.checkAuth, (req, res) => {
   const cart = JSON.stringify(req.body.cart);
   const likes = JSON.stringify(req.body.likes);

   db.query('UPDATE users SET cart = $1, likes = $2 WHERE id = $3', [cart, likes, req.user.id], (error, results) => {
      if (error) {
         return console.log(error)
      } else {
         req.logout();
         res.send(req.originalUrl);
      }
   });
});


// =============== NEW ROUTE ================
// ==========================================

// (GET)
router.get('/new', authLib.checkNotAuth, (req, res) => {   
   res.render('accounts/accounts-new');
});

// (POST)
router.post('/', authLib.checkNotAuth, (req, res) => {

   const { firstName, lastName, newUsername, newPassword, confirmPassword } = req.body;

   // If password field does not match 'confirm password' field
   if (newPassword !== confirmPassword) {
      return res.render('accounts/accounts-new', { errorMsg: 'Password fields did not match. Please try again.' })
   }

   // Lookup user email in database
   queriesLib.getUserByEmail(newUsername.toLowerCase(), (error, user) => {
      // If error...
      if (error) {
         console.log(error);
         return res.render('accounts/accounts-new');
      }

      // If user's email already exists in database...
      if (user) {
         return res.render('accounts/accounts-new', { errorMsg: 'An account with that email address already exists.' });
      // else, create new user
      } else {
         db.query('INSERT INTO users (first_name, last_name, username, password, id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, newUsername.toLowerCase(), sc.encrypt(newPassword), uuidv4()], (error, results) => {

            if (error) {
               console.log(error);
               return res.render('register', {errorMsg: 'An error occurred while attempting to access the server. Please try again later.'});
            }

            return res.redirect('/accounts/login');
         });
      }
   });
});



// =============== SHOW ROUTE ===============
// ==========================================

// (GET)
router.get('/:id', authLib.checkAuth, (req, res) => {
   res.render('accounts/accounts-show', {user: req.user});
});
      
// =============== EDIT ROUTE ===============
// ==========================================

// (GET)
router.get('/:id/edit', authLib.checkAuth, (req, res) => {
   res.render('accounts/accounts-edit', {user: req.user});
});

// (PUT)
router.put('/:id', authLib.checkAuth, (req, res) => {
   const { password, newPassword, confirmPassword } = req.body;

   if (newPassword !== confirmPassword) {
      return res.render('accounts/accounts-edit', { user: req.user, errorMsg: 'New password fields did not match. Please try again.' })
   }

   queriesLib.getUserByID(req.params.id, (error, user) => {
      if (error) {
         return res.render('accounts/accounts-edit', { user: req.user, errorMsg: 'We are currently experiencing issues with the server. Please try again later.' });
      }
      
      if (password != sc.decrypt(user.password)) {
         return res.render('accounts/accounts-edit', { user: req.user, errorMsg: 'The current password provided did not match your account.' });
      }

      db.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [sc.encrypt(newPassword), user.id], (error, results) => {
         if (error) {
            return res.render('accounts/accounts-edit', { user: req.user, errorMsg: 'We are currently experiencing problems with the server. Please try again later.' });
         }
         return res.render('accounts/accounts-show', { user: req.user, successMsg: 'Your password has been updated successfully.' })
      });
   })
});

// (DELETE)
router.delete('/:id', authLib.checkAuth, (req, res) => {
   const { password } = req.body;

   queriesLib.getUserByID(req.params.id, (error, user) => {
      if (error) {
         return res.render('accounts/accounts-edit', { user: req.user, errorMsg: 'We are currently experiencing issues with the server. Please try again later.' });
      }
      
      if (password != sc.decrypt(user.password)) {
         return res.render('accounts/accounts-edit', { user: req.user, errorMsg: 'The current password provided did not match your account.' });
      }

      db.query('DELETE FROM users WHERE id = $1', [user.id], (error, results) => {
         if (error) {
            return res.render('accounts/accounts-edit', { errorMsg: 'We are currently experiencing problems with the server. Please try again later.' });
         }
         return res.render('accounts/accounts-login', { successMsg: 'Your account has been deleted' })
      });
   });

   

});







module.exports = router;


