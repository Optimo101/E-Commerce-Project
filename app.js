var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
   res.render('index');
});

app.get('/campgrounds', function(req, res){
   var campgrounds = [
      {name: 'Salmon Creek', image: 'https://live.staticflickr.com/4567/37514240304_1a744f1fce_z.jpg'},
      {name: 'Mountain View', image: 'https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png'},
      {name: 'Granite Rock', image: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png'}
   ]
   
   res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, 'localhost', function(){
   console.log('Server has started on port 3000...');
});