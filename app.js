var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//routes instance
var ProductRoutes = require('./routes/product-routes');
var CategoryRoutes = require('./routes/category-routes');
var UserProductRoutes = require('./routes/user-product-routes');
var UserRoutes = require('./routes/user-routes');
var TransactionRoutes = require('./routes/transaction-routes');
var CartRoutes = require('./routes/cart-routes');
var LoginRoutes = require ('./routes/login-routes')

//service files
var UserService = require('./services/user-service');
var ProductService = require('./services/product-service');
var CategoryService = require('./services/category-service');
var TransactionService = require('./services/transaction-service');
var CartService = require('./services/cart-service');

//service instance
var userService = new UserService(path);
var categoryService = new CategoryService(path);
var productService = new ProductService(path);
var transactionService = new TransactionService(path);
var cartService = new CartService(path);

//frontend imports
var reload = require('reload');
var watch = require('watch');
var authClass = require('./auth');
var config = require('./config');
var users = require('./users');

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
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Reloading the backend when backend is changed.
let reloadServer = reload(app);

watch.watchTree(__dirname + "/frontend/dist", function (f, curr, prev) {
    // Fire server-side reload event 
    reloadServer.reload();
});

// Routing
app.use('/api/users/:id/products', new UserProductRoutes(userService).router());
app.use('/api/users',new UserRoutes(userService).router().use('/api/users/:id/products', new UserProductRoutes(userService).router()));
app.use('/api/transactions',new TransactionRoutes(transactionService).router({mergeParams: true}));
app.use('/api/products', new ProductRoutes(productService).router());
app.use('/api/categories', new CategoryRoutes(categoryService).router());
app.use('/api/carts', new CartRoutes(cartService).router());
app.use('/api/login', new LoginRoutes(userService).router());

//redirect all other route to the SPA
app.use(function(req, res, next) {
    res.sendFile(__dirname + "/frontend/dist/index.html");
})

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

app.listen(8080);

module.exports = app;
