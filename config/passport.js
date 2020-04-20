const LocalStrategy = require('passport-local').Strategy,
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS });

// Configure the local strategy for use by Passport (username and password are auto detected from res.body after post request
function initialize(passport, getUserByEmail, getUserByID) {
   
   const authenticateUser = (email, password, done) => {
      
      getUserByEmail(email, (error, user) => {
         if (error) {
            return done(error)
         }

         if (user == null) {
            return done(null, false, { message: `The provided email ${email} does not match an existing account.` }
            )
         }

         if (sc.decrypt(user.password) == password) {
            console.log('Authentication successful!');
            return done(null, user);
         } else {
            console.log('Password does match account.')
            return done(null, false, { message: 'The password provided was incorrect.' }
            )
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