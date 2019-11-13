const    express     = require('express'),
         app         = express(),
         path        = require('path'),
         Search      = require('./models/Search');



// =================================================
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


// =================================================



app.get('/', function(req, res) {
   res.render('home');
});

app.get('/results', async function(req, res) {
   // var searchQuery = new Search(req.query.search);
   // await searchQuery.getResults();
   // console.log(searchQuery.results);

   res.render('index');
});

app.get('*', function(req, res) {
   res.send('Sorry, page not found.')
});



app.listen(3000, 'localhost', function() {
   console.log('Server has started on port 3000...');
});