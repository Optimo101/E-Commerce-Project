require('dotenv').config();

const express = require('express'),
      app = express(),
      passport = require('passport'),
      request = require('request'),
      path = require('path');

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


// ======================= FUNCTION EXPRESSIONS =======================
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

// Configure the local strategy for use by Passport (username and password are auto detected from res.body after post request.
passport.use(new Strategy((username, password, cb) => {
      findByUsername(username, function(err, user) {
         if (err) {
            console.log('Error', err);
            return cb(err); 
         }
         if (!user) {
            console.log(`The provided username ${username} does not match any existing account.`)
            return cb(null, false, { message: `The provided username ${username} does not match any existing account.`}); 
         }
         if (sc.decrypt(user.password) != password) {
            console.log('The password provided is incorrect')
            return cb(null, false, { message: 'The password provided is incorrect'});
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

// ACCOUNT
app.get('/account', (req, res) => {
   res.render('account', {user: req.user});
});

// ======================= REGISTER USER =======================
// ========================================================
// REGISTER PAGE (GET)
app.get('/register', (req, res) => {
   res.render('register');
});

// REGISTER USER (POST)
app.post('/register', (req, res) => {
   const { firstName, lastName, newUsername, newPassword, confirmPassword } = req.body;

   db.query('INSERT INTO users (first_name, last_name, username, password, id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, newUsername, sc.encrypt(newPassword), uuidv4()], (error, results) => {

      if (error) {
         return res.render('login');
      } 
      const message = 'Your account was successfully created. Please login.';
      res.render('login', { message: message })

   });

});

// ======================= LOGIN/OUT =======================
// =========================================================
// LOGIN PAGE (FORM)
app.get('/login', (req, res) => {
   res.render('login');
});

// LOGIN (POST)
app.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), (req, res, next) => {
   res.redirect('/');
});

// LOGOUT
app.get('/logout', (req, res) => {
   req.logout();
   res.redirect('/');
});

// CATCH ALL
app.get('/*', (req, res) => {
   res.send('Unable to find the requested page.')
});



// ======================= SERVER =======================
// ======================================================
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server has started on port ${port}...`);
});