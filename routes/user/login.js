const express = require('express'),
      router = express.Router(),
      passport = require('passport');


// LOGIN (GET)
router.get('/', checkNotAuthenticated, (req, res) => {
   console.log('Login (GET) Route:')

   // const registered = req.query.registered;
   // console.log('New account Registration?', registered);

   // if (registered === 'yes') {
   //    res.render('login', {successMsg: 'Your account has been created. Please login.'});
   // } else {
      res.render('login');
   // }
});


// LOGIN (POST)
router.post('/', (req, res, next) => {
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





// LOGIN (POST)
// router.post('/', passport.authenticate('local', function (err, user, info) {
//    if (err) {
//       console.log('ERROR', err);
//    }
//    if (user) {
//       console.log('USER', user);
//    }
//    if (info) {
//       console.log('MESSAGE', info.message);
//    }

//    next();

   
// }), (req, res, next) => {
//    console.log('Login (POST) Route:')
//    console.log(req.user);
//    res.send(req.user);
// });



function checkNotAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return res.redirect('/');
   }
   next();
}


module.exports = router;