require('dotenv').config();
const express = require('express'),
      app = express(),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS }),
      flash = require('express-flash'),
      uuidv4 = require('uuid/v4'),
      db = require('./db/index'),
      session = require('express-session');

// const initializePassport = require('./passport-config');

// initializePassport(passport, getUserByEmail, getUserByID);



// ===============================================================
app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(express.json()); //Used to parse JSON bodies
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('view options', { layout: false });

// function initializePassport(passport, getUserByEmail, getUserByID) {
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
            return next(null, false, { message: 'The password provided is incorrect' })
         }
      });
   }
// }

passport.use(new LocalStrategy(authenticateUser));

passport.serializeUser((user, cb) => { cb(null, user.id) });
   
passport.deserializeUser((id, cb) => {
   getUserByID(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
   });
});

// ===============================================================


function getUserByEmail(email, cb) {
   db.query('SELECT * FROM users WHERE username = $1', [email], (err, result) => {      
      if (err) {
         return cb(err, null);

      } else if (!result.rows[0]) {
         return cb(null, null);

      } else {
         return cb(null, result.rows[0]);
      }
   });
}

function getUserByID(id, cb) {
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


// ===============================================================
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
app.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash:true }), (req, res, next) => {
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