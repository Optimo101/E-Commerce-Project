const LocalStrategy = require('passport-local').Strategy,
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS });

// Configuring local strategy for use by Passport (username and password are auto detected from res.body after post request)
function initialize(passport, getUserByEmail, getUserByID) {
   const authenticateUser = (email, password, done) => {
      
      getUserByEmail(email, (error, user) => {
         // If error
         if (error) {
            return done(error)
         }

         // If unable to find matching user (email address)
         if (user == null) {
            return done(null, false, { message: `The provided email ${email} does not match an existing account.` }
            )
         }

         // If password matches
         if (sc.decrypt(user.password) == password) {
            return done(null, user);
         // If password does not match
         } else {
            console.log('Password does not match account.')
            return done(null, false, { message: 'The password provided was incorrect.' })
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