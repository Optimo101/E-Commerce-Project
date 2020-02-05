const express = require('express'),
      router = express.Router(),
      passport = require('passport');


// LOGIN (GET)
router.get('/', checkNotAuthenticated, (req, res) => {
   res.render('login');
});

// LOGIN (POST)
router.post('/', checkNotAuthenticated, passport.authenticate('local', {failureRedirect: '/user/login', failureFlash:true }), (req, res, next) => {
   res.redirect('/');
});


function checkNotAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return res.redirect('/');
   }
   next();
}


module.exports = router;