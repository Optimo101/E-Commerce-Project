const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      authLib = require('../../lib/authentication');


// LOGIN (GET)
router.get('/', authLib.checkNotAuth, (req, res) => {
   console.log('Login (GET) Route:')
   res.render('login');
});

// LOGIN (POST)
router.post('/', authLib.checkNotAuth, (req, res, next) => {
   console.log('Login (POST) Route:')

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
})

module.exports = router;