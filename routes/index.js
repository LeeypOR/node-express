var express = require('express');
var router = express.Router();
var cate = require('../controllers/cateController')

/* GET home page. */
router.get('/', cate.getUser);
router.get('/getPostCate', cate.getPostCate);

module.exports = router;
