const express = require('express');
const router = express.Router();

// ACCOUNT
router.get('/account', checkAuthenticated, (req, res) => {
   res.render('account', {user: req.user});
});

// ======================= REGISTER USER =======================
// =============================================================

// REGISTER USER (POST)
router.post('/register', (req, res) => {
   const { firstName, lastName, newUsername, newPassword, confirmPassword } = req.body;

   if (newPassword !== confirmPassword) {
      const errorMsg = 'The password fields did not match. Please try again.'
      return res.render('login', { errorMsg: errorMsg})
   }

   db.query('INSERT INTO users (first_name, last_name, username, password, id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, newUsername.toLowerCase(), sc.encrypt(newPassword), uuidv4()], (error, results) => {

      if (error) {
         return res.render('login');
      }

      const successMsg = 'Account created. Please login.';
      return res.render('login', { successMsg: successMsg })
   });

});

// ======================= LOGIN/OUT ===========================
// =============================================================

// LOGIN PAGE (FORM)
router.get('/login', checkNotAuthenticated, (req, res) => {
   res.render('login');
});

// LOGIN (POST)
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {failureRedirect: '/login', failureFlash:true }), (req, res, next) => {
   res.redirect('/');
});

// LOGOUT
router.get('/logout', checkAuthenticated, (req, res) => {
   req.logout();
   res.redirect('/');
});


module.exports = router;