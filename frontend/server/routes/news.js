var express = require('express');
var router = express.Router();
var path = require('path');
var rpc_client = require('../rpc_client/rpc_client')

/* GET news listing. */
router.get('/userId/:userId/pageNum/:pageNum', function(req, res, next) {
  console.log('fetching news...')
  user_id = req.params['userId'];
  page_num = req.params['pageNum'];

  rpc_client.getNewsSummariesForUser(user_id, page_num, function(response){
    res.json(response)
  })
  
});

router.post('/userId/:userId/newsId/:newsId', function(req, res, next) {
  console.log('logging news click...');
  user_id = req.params['userId'];
  page_num = req.params['newsId'];

  rpc_client.logNewsClickForUser(user_id, newsId);
  res.status(200);
});


module.exports = router;
