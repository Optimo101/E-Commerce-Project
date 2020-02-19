const express = require('express'),
      router = express.Router();


// HOME PAGE
router.get('/', (req, res) => {
   res.render('home', {user: req.user});
});

// PRODUCT PAGE
router.get('/product', (req, res) => {
   res.render('product', {user: req.user});
});

// CART PAGE
router.get('/cart', (req, res) => {
   res.render('cart', {user: req.user});
});

// CATCH ALL
router.get('/*', (req, res) => {
   res.send('Unable to find the requested page.')
});

module.exports = router;