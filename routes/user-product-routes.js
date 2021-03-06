var express = require('express');
var authClass = require('./../auth');

var auth = authClass();

class UserProductRoutes {
  constructor(userService) {
    this.userService = userService;
  }

  router() {
    let router = express.Router({ mergeParams: true });
    router.get('/', auth.authenticate(), this.get.bind(this));
    return router;
  }

  get(req, res) {
    return this.userService
      .getProducts(req.params.id)
      .then(products => {
        console.log(products);
        res.json(products);
      })
      .catch(err => res.status(500).json(err))
  }
}

module.exports = UserProductRoutes;