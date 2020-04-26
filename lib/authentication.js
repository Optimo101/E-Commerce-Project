// ===================== ROUTE MIDDLEWARE  =======================
// ===============================================================

// Check if user is authenticated for routes that should only be viewed if user is logged in
function checkAuth(req, res, next) {
   // If authenticated
   if (req.isAuthenticated()) {
      return next();
   }
   // If not, redirect user to login
   res.redirect('/user/login');
}

// Check if user is not authenticated for routes that should only be viewed if user is NOT logged in (Login page)
function checkNotAuth(req, res, next) {
   // If authenticated, redirect to Home page
   if (req.isAuthenticated()) {
      return res.redirect('/');
   }
   // If not authenticated, proceed to requested route
   next();
}

module.exports = {
   checkAuth: checkAuth,
   checkNotAuth: checkNotAuth
};