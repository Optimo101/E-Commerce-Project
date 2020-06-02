// =================== NPM PACKAGE REQUIREMENTS ==================
// ===============================================================
// Parser for environment variables
require('dotenv').config();

// Packages/Libraries
const express = require('express'),
      app = express(),
      compression = require('compression'),
      methodOverride = require('method-override'),
      passport = require('passport'),
      flash = require('express-flash'),
      session = require('express-session'),
      PostgreSqlStore = require('connect-pg-simple')(session),
      cookieParser = require('cookie-parser'),
      queriesLib = require('./lib/queries'),
      db = require('./config/db');

// Passport configuration
const initializePassport = require('./config/passport');


// ======================= ROUTE IMPORTS =========================
// ===============================================================
const accounts = require('./routes/accounts'),
      results = require('./routes/results'),
      misc = require('./routes/misc');


// ========================== MIDDLEWARE =========================
// ===============================================================
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
   store: new PostgreSqlStore({
      pool: db.getPool()
   })
}));

app.use(passport.initialize());
app.use(passport.session());

// Router
app.use('/accounts', accounts);
app.use('/results', results);
app.use('/', misc);

// Express settings
app.set('view engine', 'ejs');
app.set('view options', { layout: false });


// ===================== INITIALIZE PASSPORT =====================
// ===============================================================
initializePassport(passport, queriesLib.getUserByEmail, queriesLib.getUserByID);


// ========================== SERVER =============================
// ===============================================================
// If PORT is set (deployment); otherwise, use port 3000 (localhost)
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Node app is running on port ${port}`);
});