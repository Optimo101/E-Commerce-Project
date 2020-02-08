const express = require('express'),
      router = express.Router();



// LOGOUT
router.get('/', checkAuthenticated, (req, res) => {
   console.log(`${req.user.first_name} was logged out.`)
   req.logout();
   res.redirect('/');
});

function checkAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   console.log('Access denied! Please login.');
   res.redirect('/user/login');
}


module.exports = router;