var express = require('express');
var router = express.Router();
var path = require('path');

/* GET news listing. */
router.get('/', function(req, res, next) {
  news = [
    {'url': 'https://us.cnn.com/2018/12/21/investing/china-stocks-versus-wall-street/index.html',
    'title': "Think Wall Street's had a bad year? China's was even worse",
    'description': "The recent turbulence in US stock markets pales in comparison with China's dismal 2018.",
    'source': 'cnn',
    'urlToImage': "//cdn.cnn.com/cnnnext/dam/assets/181219182135-zuckerberg-hill-exlarge-169.jpg",
    'digest': '',
    'reason': 'Recommend'
    }
  ]
res.json(news);
});

module.exports = router;
