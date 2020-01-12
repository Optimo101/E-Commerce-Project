const    express     = require('express'),
         app         = express(),
         path        = require('path');



// =================================================
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


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

app.get('*', (req, res) => {
   res.send('Sorry, page not found.')
});



app.listen(3000, 'localhost', () => {
   console.log('Server has started on port 3000...');
});