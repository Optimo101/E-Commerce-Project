const express = require('express'),
      router = express.Router(),
      authLib = require('../lib/authentication');


// RESULTS PAGE (Product Search)
router.get('/', (req, res) => {
   res.render('results', {user: req.user});
});

// LIKES PAGE
router.get('/likes', authLib.checkAuth, (req, res) => {
   res.render('likes', {user: req.user});
});

module.exports = router;