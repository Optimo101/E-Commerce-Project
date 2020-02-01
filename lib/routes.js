const express = require('express'),
      app = express(),
      passport = require('passport'),
      request = require('request'),
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({password: 'newpass'}),
      { Client } = require('pg'),
      uuidv4 = require('uuid/v4'),
      LocalStrategy = require('passport-local').Strategy;

app.use(express.static('public'));

const client = new Client({
   user: 'eshopadmin',
   host: 'localhost',
   database: 'eshopdb',
   password: 'admin',
   port: 5432
});


// passport.use(new LocalStrategy(
//    function(username, password, cb) {
//       // await client.connect('');
//       client.query('SELECT id, "first_name", "email", "password" FROM "users" WHERE "email"=$1', [username], function(error, result) {
//          if (error) {
//             console.log(error);
//          } else if (!result) {
//             console.log('No db info was found with that username.');
//          } else {
//             console.log(result);
//          }
         
//       });

      // User.findOne({ username: username}, function (err, user) {
      //    if (err) { return done(err);}
      //    if (!user) {return done(null, false);}
      //    if (!user.verifyPassword(password)) { return done(null, false); }
      //    return cb(null, user);
      // });
//    }
// ));





// ========= ALL ROUTES ===================
// ========================================
module.exports = function (app) {
   // HOME PAGE
   app.get('/', function (req, res, next) {
      res.render('home', {title: 'Home', userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
   });

   // RESULTS PAGE
   app.get('/results', (req, res) => {
      res.render('results');
   });

   // PRODUCT PAGE
   app.get('/product', (req, res) => {
      res.render('product');
   });

   // CART PAGE
   app.get('/cart', (req, res) => {
      res.render('cart');
   });


   // REGISTER PAGE (FORM)
   app.get('/register', function (req, res, next) {
      res.render('register', {title: "Register", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
   });

   // REGISTER (POST)
   app.post('/register', async function (req, res) {
      try {
         const client = await pool.connect();
         await client.query('BEGIN');
         var encryptedPassword = sc.encrypt(req.body.password); // removed bcrypt here

         await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email"=$1', [req.body.username], function(err, result) {
            if(result.rows[0]) {
               req.flash('warning', "This email address is already registered. <a href='/login'>Log in!</a>");
               res.redirect('/register');

            } else {
               client.query('INSERT INTO users (id, "first_name", "last_name", email, password) VALUES ($1, $2, $3, $4, $5)', [uuidv4(), req.body.firstName, req.body.lastName, req.body.username, encryptedPassword], function(err, result) {
                  if (err) {
                     console.log(err);

                  } else {
                     client.query('COMMIT')
                     console.log(result)
                     req.flash('success','User created.')
                     res.redirect('/login');
                     return;
                  }
               });
            }
         }));
         client.release();

      } catch(e) {
         throw(e)}
   });

   // RENDERS ACCOUNT PAGE IF USER IS LOGGED IN, OTHERWISE, USER IS REDIRECTED TO LOGIN PAGE
   app.get('/account', function (req, res, next) {
      if (req.isAuthenticated()) {
         res.render('account', {title: "Account", userData: req.user, userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
   
      } else {
      res.redirect('/login');
      }
   });


   // LOGIN PAGE (FORM)
   app.get('/login', function (req, res, next) {
      if (req.isAuthenticated()) {
         console.log('Attempted to redirect to Account page...');
         res.redirect('/account'); // THIS PAGE HAS NOT BEEN MADE

      } else {
         res.render('login', {title: "Log in", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
      }
   });

   // LOGIN (POST)
   app.post('/login', 
      // passport.authenticate('local', {
      // successRedirect: '/account', 
      // failureRedirect: '/login', 
      // failureFlash: true}), 
      (req, res) => {
         client.query('SELECT id, "first_name", "email", "password" FROM "users" WHERE "email"=$1', [req.body.username], function(error, result) {
            if (error) {
               console.log('Error:', error);
            } else if (!result) {
               console.log('No db info was found with that username.');
            } else {
               console.log('Result', result);
            }
         });
      res.redirect('/');
   });

   // LOGOUT
   // app.get('/logout', function(req, res) {
   //    console.log(req.isAuthenticated());
   //    req.logout();
   //    console.log(req.isAuthenticated());
   //    req.flash('success', 'Logged out. See you soon!');
   //    res.redirect('/');
   // });
}

// const passwordCompare = (password, dbPassword, callback) => {
   
//    let same;
//    console.log(sc.decrypt(dbPassword));

//    sc.decrypt(dbPassword) === password ? same = true : same = false;

//    callback(same);
// };

// =============================================================
// =============================================================





// passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
//    loginAttempt();

//    async function loginAttempt() {
//       const client = await pool.connect()

//       try {
//          await client.query('BEGIN')
//          var currentAccountsData = await JSON.stringify(client.query('SELECT id, "first_name", "email", "password" FROM "users" WHERE "email"=$1', [username], function(err, result) {
   
//             if (err) {
//                console.log(err);
//                return done(err)
//             } 
//             if (result.rows[0] == null) {
//                console.log('Oops. Incorrect login details.');
//                return done(null, false);
//             } else {
//                passwordCompare(password, result.rows[0].password, function(same) {
//                   if (same) {
//                      console.log('Authentication successsful!')
//                      return done(null, [{email: result.rows[0].email, firstName: result.rows[0].firstName}]);

//                   } else {
//                      console.log('Oops. Incorrect login details.')
//                      return done(null, false);
//                   }
//                });
//             }
//          }))
//       }
//       catch(e){throw (e);}
//    };
// }));

// passport.serializeUser(function(user, done) {
// done(null, user);
// });

// passport.deserializeUser(function(user, done) {
// done(null, user);
// });