const express = require('express'),
      router = express.Router();

// HOME ROUTE
router.get('/', (req, res) => {
   res.render('home', {user: req.user});
});

// PRODUCT ROUTE
router.get('/product', (req, res) => {
   res.render('product', {user: req.user});
});

// CART ROUTE
router.get('/cart', (req, res) => {
   res.render('cart', {user: req.user});
});

// GET API KEY
router.get('/apikey', (req, res) => {
   res.send(process.env.API_KEY);
})

// CATCH ALL ROUTE
router.get('/*', (req, res) => {
   res.send('Unable to find the requested page.')
});

module.exports = router;