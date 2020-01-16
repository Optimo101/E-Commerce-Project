// const    express     = require('express'),
//          path        = require('path'),
//          // bodyParser  = require('body-parser'),
//          // db          = require('./queries'),
//          app         = express();
//          Pool        = require('pg').Pool;

const    express = require('express'),
         flash = require('connect-flash-plus'),
         passport = require('passport'),
         request = require('request'),
         app = express(),
         path = require('path'),
         PORT = process.env.PORT || 3000,
         routes = require('./lib/routes');

         require('dotenv').config();


// =================================================
// app.use(express.static(__dirname + '/public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended:true,}));

// app.set('view engine', 'ejs');

app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));
// const expressSession = require('express-session'); // REMOVED
// app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(flash());
// app.use(session({secret: 'super secret'}))
app.use(express.json()); //Used to parse JSON bodies
app.use(require('express-session')({
   secret: 'super secret',
   resave: false,
   saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('view options', { layout: false });



routes(app);




// =================================================
// app.get('/', (req, res) => {
//    res.render('home');
// });

// app.get('/results', (req, res) => {
//    res.render('results');
// });

// app.get('/product', (req, res) => {
//    res.render('product');
// });

// app.get('/cart', (req, res) => {
//    res.render('cart');
// });


// // SIGN IN FORM
// app.get('/login', (req, res) => {
//    res.render('login');
// });

// // NEW USER FORM
// app.get('/register', (req, res) => {
//    res.render('register');

// });



// const pool = new Pool({
//    user: 'eshopadmin',
//    host: 'localhost',
//    database: 'eshopdb',
//    password: 'admin',
//    port: 5432
// });

// // LOGIN USER
// app.post('/login', (req, res) => {
//    console.log(req.body);
//    const email = req.body.email;
//    const password = req.body.password;
   
//    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, result) => {
//       if (error) {
//          console.log(error);
//          throw error;
//       }
//       res.status(200).json(result.rows);
//    });
// });





// // // CREATE USER
// // app.post('/account', db.createUser);

// // // DELETE USER
// // app.delete('/account/:id', db.deleteUser);




// app.get('*', (req, res) => {
//    res.send('Sorry, page not found.')
// });




app.listen(PORT, () => {
   console.log(`Server has started on port ${PORT}...`);
});