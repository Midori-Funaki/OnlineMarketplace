var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//routes instance
var index = require('./routes/index');
var ProductRoutes = require('./routes/product-routes');
var CategoryRoutes = require('./routes/category-routes');
var UserProductRoutes = require('./routes/user-product-routes');
var UserRoutes = require('./routes/user-routes');
var TransactionRoutes = require('./routes/transaction-routes');

//service files
var UserService = require('./services/user-service');
var ProductService = require('./services/product-service');
var CategoryService = require('./services/category-service');
var UserProductService = require('./services/user-product-service');
var TransactionService = require('./services/transaction-service');

//service instance
var userService = new UserService(path);
var categoryService = new CategoryService(path);
var productService = new ProductService(path);
var userProductService = new UserProductService(path);
var transactionService = new TransactionService(path);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', index);
app.use('/api/users',new UserRoutes(userService).router());
app.use('/api/transactions',new TransactionRoutes(transactionService).router());
app.use('/api/users/:userId/products', new UserProductRoutes(userProductService).router());
app.use('/api/products', new ProductRoutes(productService).router());
app.use('/api/categories', new CategoryRoutes(categoryService).router());

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
