var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// 连接数据库
var mongoose = require("mongoose");
var db=mongoose.connect('mongodb://localhost:27017/app');
db.connection.on("error", function (error) {  
  console.log("数据库连接失败：" + error); 
});
db.connection.on("open", function () {  
  console.log("数据库连接成功"); 
});

//设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("X-Powered-By", ' 3.2.1');
	if(req.method === "OPTIONS") {
		res.sendStatus(200);
	} else {
		next();
	}
});

// 路由
app.use('/theme', require('./routes/theme'));
app.use('/latest', require('./routes/latest'));
app.use('/stories', require('./routes/stories'));
app.use('/top', require('./routes/top'));
app.use('/article', require('./routes/article'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
