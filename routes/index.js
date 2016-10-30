const path      = require('path');
const express   = require('express');
const router    = express.Router();
const pages     = path.join(__dirname, '..', 'pages');

/* GET home page. */
router.get('/', function(request, response, next) {
  response.sendFile(path.join(pages, 'index.html'));
});

router.get('/index', function(request, response, next) {
  response.redirect('/');
});

router.get('/home', function(request, response, next) {
  response.redirect('/');
});

module.exports = router;
