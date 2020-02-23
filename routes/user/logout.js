const express = require('express'),
      router = express.Router(),
      db = require('../../config/db'),
      authLib = require('../../lib/authentication');

// LOGOUT (POST)
router.post('/', authLib.checkAuth, (req, res) => {
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

module.exports = router;