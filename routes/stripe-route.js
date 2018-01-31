var express = require('express');
var stripe = require("stripe")("sk_test_ngBTWibbJkB5kFe1B5WevZo8");

class StripeRoute {
  constructor() {
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    return router;
  }

  get(req, res) {
    return stripe.accounts.create({
      country: "US",
      type: "custom"
    }).then(function (acct) {
      stripe.charges.create({
        amount: 1000,
        currency: "hkd",
        source: "tok_visa",
        destination: {
          account: acct.id,
        },
      }).then(function(charge) {
        res.json(charge);
      });
      
    });
  }
}

module.exports = StripeRoute;