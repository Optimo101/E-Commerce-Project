var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
   res.render('index');
});

app.get('/campgrounds', function(req, res){
   res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, 'localhost', function(){
   console.log('Server has started on port 3000...');
});