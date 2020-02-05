const LocalStrategy = require('passport-local').Strategy,
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS });

// // Configure the local strategy for use by Passport (username and password are auto detected from res.body after post request.
function initialize(passport, getUserByEmail, getUserByID) {
   const authenticateUser = (email, password, next) => {
      getUserByEmail(email, (error, user) => {
         if (error) {
            return next(error)
         }

         if (user == null) {
            return next(null, false, { message: `The provided email ${email} does not match an existing account.` })
         }

         if (sc.decrypt(user.password) == password) {
            return next(null, user);
         } else {
            return next(null, false, { message: 'The password provided was incorrect.' })
         }
      });
   }

   passport.use(new LocalStrategy(authenticateUser));

   passport.serializeUser((user, cb) => { cb(null, user.id) });

   passport.deserializeUser((id, cb) => {
      getUserByID(id, (err, user) => {
         if (err) { return cb(err); }
         cb(null, user);
      });
   });
}

module.exports = initialize;