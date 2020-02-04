require('dotenv').config();
const express = require('express'),
      app = express(),
      methodOverride = require('method-override'),
      // users = require('./routes/users'),
      passport = require('passport'),
      flash = require('express-flash'),
      uuidv4 = require('uuid/v4'),
      simplecrypt = require('simplecrypt'),
      sc = simplecrypt({ password: process.env.SCPASS }),
      db = require('./db/index'),
      session = require('express-session'),
      initializePassport = require('./passport-config');

initializePassport(passport, getUserByEmail, getUserByID);


// ===============================================================
app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(express.json()); //Used to parse JSON bodies
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));
// app.use('/user', users);
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('view options', { layout: false });


// ===============================================================
function getUserByEmail(email, cb) {
   db.query('SELECT * FROM users WHERE username = $1', [email.toLowerCase()], (err, result) => {      
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

function checkAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   console.log('Access denied! Please login.');
   res.redirect('/user/login');
}

function checkNotAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return res.redirect('/');
   }
   next();
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
app.get('/user/account/:id', checkAuthenticated, (req, res) => {
   res.render('account', {user: req.user});
});

app.put('/user/account/:id', (req, res) => {
   console.log('Anything going on???')
   console.log(req.params);
   console.log(req.body);

   // const { username, password, newPassword, confirmNewPassword } = req.body;

   // getUserByEmail(accountUsername.toLowerCase(), (error, user) => {
   //    if (error) {
   //       console.log(error)
   //       return;
   //    }
      
   //    if (currentPassword != user.password) {
   //       res.render('account', {user: req.user, errorMsg: 'The current password provided did not match your account\'s'});
   //    }
   // })
});

// ======================= REGISTER USER =======================
// =============================================================

// REGISTER USER (POST)
app.post('/user/register', (req, res) => {
   const { firstName, lastName, newUsername, newPassword, confirmPassword } = req.params;

   if (newPassword !== confirmPassword) {
      const errorMsg = 'The password fields did not match. Please try again.'
      return res.render('login', { errorMsg: errorMsg})
   }

   getUserByEmail(newUsername.toLowerCase(), (error, user) => {
      if (error) {
         console.log(error);
         return res.render('login');
      }

      if (user) {
         return res.render('login', { errorMsg: 'An account with that email address already exists.' });

      } else {
         db.query('INSERT INTO users (first_name, last_name, username, password, id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, newUsername.toLowerCase(), sc.encrypt(newPassword), uuidv4()], (error, results) => {

            if (error) {
               console.log(error);
               return res.render('login');
            }
      
            const successMsg = 'Account created. Please login.';
            return res.render('login', { successMsg: successMsg })
         });
      }
   });
});



// ======================= LOGIN/OUT ===========================
// =============================================================

// LOGIN PAGE (FORM)
app.get('/user/login', checkNotAuthenticated, (req, res) => {
   res.render('login');
});

// LOGIN (POST)
app.post('/user/login', checkNotAuthenticated, passport.authenticate('local', {failureRedirect: '/user/login', failureFlash:true }), (req, res, next) => {
   res.redirect('/');
});

// LOGOUT
app.get('/user/logout', checkAuthenticated, (req, res) => {
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