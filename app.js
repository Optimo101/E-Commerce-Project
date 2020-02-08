require('dotenv').config();
const express = require('express'),
      app = express(),
      methodOverride = require('method-override'),
      passport = require('passport'),
      flash = require('express-flash'),
      session = require('express-session'),
      db = require('./config/db'),
      initializePassport = require('./config/passport');

const register = require('./routes/user/register'),
      login = require('./routes/user/login'),
      logout = require('./routes/user/logout'),
      account = require('./routes/user/account');


initializePassport(passport, getUserByEmail, getUserByID);

// ===============================================================
app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/user/register', register);
app.use('/user/login', login);
app.use('/user/logout', logout);
app.use('/user/account', account);

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

// ===============================================================

const testObj = {
   test: 'This is a test!'
}

// app.get('/test', (req, res) => {
//    // If user is logged in
//    if (req.isAuthenticated()) {
//       // 
      
//       console.log('Request was authenticated!', req.user);

//    } else {
//       return console.log('Request was NOT authenticated. You get nothing!');
//    }
   
//    res.send(testObj);
// });

app.post('/db/cart', (req, res) => {
   // If user is logged in
   if (req.isAuthenticated()) {
      console.log('Backend cart console.log:');
      console.log(req.user.id);
      const cartItems = JSON.stringify(req.body);

      db.query("UPDATE users SET cart = $1 WHERE id = $2 RETURNING *", [cartItems, req.user.id], (error, results) => {
         if (error) {
            return console.log(error)
         } else {
            return res.send('Cart successfully saved to account.');
         }
      });

   } else {
      return console.log('Request is NOT authenticated. You get nothing.');
   }
});

app.post('/db/likes', (req, res) => {
   // If user is logged in
   if (req.isAuthenticated()) {
      console.log('Backend likes console.log:');
      console.log(req.body);
      console.log(JSON.stringify(req.body));

      return res.send(req.body)
   } else {
      return console.log('Request is NOT authenticated. You get nothing.')
   }
});



// HOME PAGE
app.get('/', (req, res) => {
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


// CATCH ALL
app.get('/*', (req, res) => {
   res.send('Unable to find the requested page.')
});


// ======================= SERVER ================================
// ===============================================================
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server has started on port ${port}...`);
});