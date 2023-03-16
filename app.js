var createError = require('http-errors');
var express = require('express');
var bodyParse = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
console.log(12)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {APP_PORT} = require('./util/dbconfig')
require("./util/database")

var app = express();
var server = http.createServer(app);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json()); //解析json格式
app.use(express.urlencoded({ extended: false })); //解析form表单格式
app.use(cookieParser());
//静态资源
app.use(express.static(path.join(__dirname, 'public')));
//post请求  extended true 允许请求post
app.use(bodyParse.urlencoded({extended:true}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// server.listen(3000);
server.listen(APP_PORT,()=>{
    console.log(`服务器启动成功 ${APP_PORT}`)
});

// module.exports = app;
