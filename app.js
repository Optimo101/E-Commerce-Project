const    express     = require('express'),
         app         = express(),
         path        = require('path');



// =================================================
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


// =================================================
app.get('/', function(req, res) {
   res.render('home');
});

app.get('/results', function(req, res) {
   res.render('results');
});

app.get('/product', function(req, res) {
   res.render('product');
});

app.get('*', function(req, res) {
   res.send('Sorry, page not found.')
});



app.listen(3000, 'localhost', function() {
   console.log('Server has started on port 3000...');
});