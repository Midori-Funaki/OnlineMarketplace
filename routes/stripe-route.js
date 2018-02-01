var express = require('express');

var authClass = require('./../auth');
var auth = authClass();

class StripeRoute {
  constructor(stripeService) {
    this.stripeService = stripeService;
  }

  router() {
    let router = express.Router();
    // router.get('/', this.get.bind(this));
    router.post('/register', auth.authenticate(), this.register.bind(this));
    return router;
  }

  register(req, res) {
    return this.stripeService.register(req.body.token, req.user)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err))
  }
}

module.exports = StripeRoute;