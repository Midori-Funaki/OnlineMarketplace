var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var cors = require('cors');

//routes instance
var ProductRoutes = require('./routes/product-routes');
var CategoryRoutes = require('./routes/category-routes');
var UserProductRoutes = require('./routes/user-product-routes');
var UserRoutes = require('./routes/user-routes');
var TransactionRoutes = require('./routes/transaction-routes');
var CartRoutes = require('./routes/cart-routes');
var LoginRoutes = require ('./routes/login-routes');
var CloudinaryRoutes = require('./routes/cloudinary-routes');
var StripeRoutes = require('./routes/stripe-route');
var PhotoRoutes = require('./routes/photo-routes');

//service files
var UserService = require('./services/user-service');
var ProductService = require('./services/product-service');
var CategoryService = require('./services/category-service');
var TransactionService = require('./services/transaction-service');
var CartService = require('./services/cart-service');
var CloudinaryService = require('./services/cloudinary-service');
var PhotoService = require('./services/photo-service');
var StripeService = require('./services/stripe-service');

//service instance
var userService = new UserService();
var categoryService = new CategoryService();
var productService = new ProductService();
var transactionService = new TransactionService();
var cartService = new CartService();
var cloudinaryService = new CloudinaryService();
var photoService = new PhotoService();
var stripeService = new StripeService();

//frontend imports
var reload = require('reload');
var watch = require('watch');
var authClass = require('./auth');
var config = require('./config');
// var users = require('./users');

var tagCreator = require('./tag-creator');

var app = express();


tagCreator.registerTags();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Reloading the backend when backend is changed.
let reloadServer = reload(app);

watch.watchTree(__dirname + "/frontend/dist", function (f, curr, prev) {
    // Fire server-side reload event 
    reloadServer.reload();
});

// Coloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

// Routing
app.use('/api/users/:id/products', new UserProductRoutes(userService).router());
app.use('/api/users',new UserRoutes(userService).router().use('/api/users/:id/products', new UserProductRoutes(userService).router()));
app.use('/api/transactions',new TransactionRoutes(transactionService).router());
app.use('/api/images',new CloudinaryRoutes(cloudinaryService).router());
app.use('/api/products', new ProductRoutes(productService).router());
app.use('/api/categories', new CategoryRoutes(categoryService).router());
app.use('/api/carts', new CartRoutes(cartService).router());
app.use('/api/login', new LoginRoutes(userService).router());
app.use('/api/checkout', new StripeRoutes().router());
app.use('/api/photos', new PhotoRoutes(photoService).router());
app.use('/api/stripe', new StripeRoutes(stripeService).router());

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
