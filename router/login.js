//登录注册路由
//导入express 使用路由并暴露
const express = require('express');

const router = express.Router()
//导入login的路由处理模块
const loginHandle = require('../router_handle/login')

module.exports = router