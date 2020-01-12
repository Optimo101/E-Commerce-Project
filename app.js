const    express     = require('express'),
         app         = express(),
         path        = require('path');



// =================================================
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


const users = [
   {id: 1, name: 'Justin'},
   {id: 2, name: 'Sam'}
];

// =================================================
app.get('/', (req, res) => {
   res.render('home');
});

app.get('/results', (req, res) => {
   res.render('results');
});

app.get('/product', (req, res) => {
   res.render('product');
});

app.get('/cart', (req, res) => {
   res.render('cart');
});

app.get('/account', (req, res) => {
   res.render('account');
});

app.post('/account', (req, res) => {
   if (!req.body.name || req.body.name.length < 5) {
      // 400 Bad Request
      res.status(400).send('Name is required and should be minimum of 5 characters');
      return;
   }

   const newUser = {
      id: users.length + 1,
      name: req.body.name
   };

   users.push(newUser);
   res.send(newUser);
   res.send(users);


});

app.get('*', (req, res) => {
   res.send('Sorry, page not found.')
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server has started on port ${port}...`);
});