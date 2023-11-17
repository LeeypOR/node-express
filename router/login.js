//登录注册路由
//导入express 使用路由并暴露
const express = require('express');

const router = express.Router()
//导入login的路由处理模块
const loginHandle = require('../controllers/login.js')

//导入expreJoi
const expressJoi = require('@escook/express-joi');
//导入验证规则
const {login_limit} = require('../limit/login')


router.post('/register',expressJoi(login_limit),loginHandle.register);
router.post('/login',expressJoi(login_limit),loginHandle.login);

module.exports = router
