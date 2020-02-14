const express = require('express'),
      router = express.Router(),
      db = require('../../config/db');

// LOGOUT (POST)
router.post('/', checkAuthenticated, (req, res) => {
   console.log('Logout (POST) ROUTE:');

   console.log('Original URL:', req.originalUrl);

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


function checkAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   console.log('Access denied! Please login.');
   res.redirect('/user/login');
}


module.exports = router;