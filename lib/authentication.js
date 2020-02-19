
function checkAuth(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   console.log('Access denied! Please login.');
   res.redirect('/user/login');
}

function checkNotAuth(req, res, next) {
   if (req.isAuthenticated()) {
      return res.redirect('/');
   }
   next();
}

module.exports = {
   checkAuth: checkAuth,
   checkNotAuth: checkNotAuth
};