// ======================= DEPENDENCIES =======================
// ============================================================

require('dotenv').config();

const express = require('express'),
      app = express(),
      passport = require('passport'),
      request = require('request'),
      path = require('path'),
      // routes = require('./lib/routes'),
      PORT = process.env.PORT || 3000;

const simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS }),
      { Pool } = require('pg'),
      uuidv4 = require('uuid/v4'),
      Strategy = require('passport-local').Strategy;

const db = require('./db/index');

// ======================= SETTINGS =======================
// ========================================================

app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(express.json()); //Used to parse JSON bodies
app.use(require('express-session')({
   secret: 'super secret',
   resave: false,
   saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('view options', { layout: false });


// ======================= FUNC EXPRESSIONS =======================
// ================================================================

const findByUsername = (username, cb) =>  {
   db.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {      
      if (err) {
         return cb(err, null);

      } else if (!result.rows[0]) {
         return cb(null, null);

      } else {
         return cb(null, result.rows[0]);
      }
   });
}

const findById = (id, cb) => {
   db.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {      
      if (err) {
         console.log(err);
         return cb(err, null);
      }

      if (!result.rows[0]) {
         console.log('The username does not match any existing account.');
         return cb(null, null);
      }
      
   return cb(null, result.rows[0]);
   });
}

// Configure the local strategy for use by Passport (username and password are auto detected from res.body after post request).
passport.use(new Strategy((username, password, cb) => {
      findByUsername(username, function(err, user) {
         if (err) {
            console.log('Error', err);
            return cb(err); 
         }
         if (!user) {
            console.log(`The provided username ${username} does not match any existing account.`)
            return cb(null, false); 
         }
         if (sc.decrypt(user.password) != password) {
            console.log('The password provided does not match the account.')
            return cb(null, false);
         }
      return cb(null, user);
     });
   }
));

passport.serializeUser(function(user, cb) {
   cb(null, user.id);
 });
 
 passport.deserializeUser(function(id, cb) {
   findById(id, function (err, user) {
     if (err) { return cb(err); }
     cb(null, user);
   });
 });


// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// ======================= ROUTES =======================
// ======================================================
// HOME PAGE
app.get('/', (req, res, next) => {
   

   res.render('home', {user: req.user});
});

// RESULTS PAGE
app.get('/results', (req, res) => {
   res.render('results', {user: req.user});
});

// PRODUCT PAGE
app.get('/product', (req, res) => {
   res.render('product', {user: req.user});
});

// CART PAGE
app.get('/cart', (req, res) => {
   res.render('cart', {user: req.user});
});

// ======================= REGISTER =======================
// ========================================================
// REGISTER PAGE (FORM)
app.get('/register', (req, res) => {
   res.render('register');
});

// REGISTER (POST)
app.post('/register', (req, res) => {
   const userInfo = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         username: req.body.username,
         password: req.body.password,
         checkPassword: req.body.checkPassword
   };

});

// ======================= LOGIN =======================
// =====================================================
// LOGIN PAGE (FORM)
app.get('/login', (req, res) => {
   res.render('login');
});

// LOGIN (POST)
app.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), (req, res, next) => {
   res.redirect('/');
   
   //==========================================
   // const userInfo = {
   //    username: req.body.username,
   //    password: req.body.password
   // }; console.log(userInfo);

   // db.query('SELECT * FROM users WHERE username = $1', [userInfo.username], (err, result) => {
   //    if (err) {
   //       console.log(err);
   //       return next(err);

   //    } else if (!result.rows[0]) {
   //       console.log('The username does not match any existing account.');
   //       res.redirect('/login');

   //    } else {
   //       if (validatePassword(userInfo.password, result.rows[0].password)) {
   //          console.log('Password match!')
   //       } else {
   //          console.log('Password mismatch!')
   //       }
   //       res.send(result.rows[0]);
   //    }
   // });
   //==========================================


});


// CATCH ALL
app.get('/*', (req, res) => {
   res.send('Unable to find the requested route.')
})



// ======================= SERVER =======================
// ======================================================
app.listen(PORT, () => {
   console.log(`Server has started on port ${PORT}...`);
});