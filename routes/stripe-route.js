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
    router.post('/charge', auth.authenticate(), this.charge.bind(this));
    router.post('/transfers/:id', auth.authenticate(), this.transfer.bind(this));
    return router;
  }

  register(req, res) {
    return this.stripeService.register(req.body.token, req.user)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err))
  }

  charge(req, res) {
    // console.log("charging...")
    // console.log(req.body);
    return this.stripeService.charge(req.body.totalAmount, req.body.token, req.body.orderId, req.body.transferObject)
      .then(charges => res.json(charges))
      .catch(err => res.status(500).json(err))
  }

  transfer(req, res) {
    return this.stripeService.transfer(req.params.id)
      .then(transfer => res.json(transfer))
      .catch(err => res.status(500).json(err))
  }



}

module.exports = StripeRoute;