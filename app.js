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
var CartRoutes = require('./routes/cart-routes');

//service files
var UserService = require('./services/user-service');
var ProductService = require('./services/product-service');
var CategoryService = require('./services/category-service');
var TransactionService = require('./services/transaction-service');
var CartService = require('./services/cart-service');

//service instance
var userService = new UserService();
var categoryService = new CategoryService();
var productService = new ProductService();
var transactionService = new TransactionService();
var cartService = new CartService();

//frontend imports
var reload = require('reload');
var watch = require('watch');
var jwt = require('jwt-simple');
var axios = require('axios');
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
app.use(express.static(path.join(__dirname, 'public')));

// Authentication Login - switched to somewhere else later on
app.post("/api/login", function(req, res) {  
    console.log(req.body.username)
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
        var user = users.find((u)=> {
            return u.name === username && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
  
    }
  });
  
app.post("/api/login/facebook", function(req, res) {  
if (req.body.access_token) {
    var accessToken = req.body.access_token;
    
    axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,name`)
    .then((data)=>{
        console.log(data.data);
        if(!data.data.error){
            var payload = {
                id: accessToken
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token
            });
        }else{
            res.sendStatus(401);
        }
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(401);
    });
} else {
    res.sendStatus(401);

}
});

app.post("/api/login/google", function(req, res) {  
if (req.body.access_token) {
    var accessToken = req.body.access_token;
    
    axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
    .then((data)=>{
        if(!data.data.error){
            var payload = {
                id: accessToken
            };
            console.log(data.data);
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token
            });
        }else{
            res.sendStatus(401);
        }
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(401);
    });
} else {
    res.sendStatus(401);

}
});

// Reloading the backend when backend is changed.
let reloadServer = reload(app);

watch.watchTree(__dirname + "/frontend/dist", function (f, curr, prev) {
    // Fire server-side reload event 
    reloadServer.reload();
});

// Routing
//app.use('/', index);
app.use('/api/users/:id/products', new UserProductRoutes(userService).router());
app.use('/api/users',new UserRoutes(userService).router().use('/api/users/:id/products', new UserProductRoutes(userService).router()));
app.use('/api/transactions',new TransactionRoutes(transactionService).router({mergeParams: true}));
app.use('/api/products', new ProductRoutes(productService).router());
app.use('/api/categories', new CategoryRoutes(categoryService).router());
app.use('/api/carts', new CartRoutes(cartService).router());

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
