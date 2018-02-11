var express = require('express');
var authClass = require('./../auth');

var auth = authClass();

class ProductRoutes {
  constructor(cartService) {
    this.cartService = cartService;
  }

  router() {
    let router = express.Router();
    router.get('/', auth.authenticate(), this.get.bind(this));
    router.post('/', auth.authenticate(), this.post.bind(this));
    router.put('/:userId', auth.authenticate(), this.put.bind(this));
    router.delete('/:id', auth.authenticate(), this.delete.bind(this));
    router.delete('/', auth.authenticate(), this.empty.bind(this));
    return router;
  }

  get(req, res) {
    return this.cartService.get(req.user)
      .then((items) => res.json(items))
      .catch((err) => res.status(500).json(err))
  }

  post(req, res) {
    return this.cartService.post(req.user, req.body)
      .then((cart) => {
        // console.log("cart: ", cart )
        res.json(cart);
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json(err);
      })
  }

  put(req, res) {
    //req.body format {"productId": XX, "quantity": [{"old":XX,"new":XX}]}
    return this.cartService.put(req.params.id, req.body)
      .then((items) => res.json(items))
      .catch((err) => res.status(500).json(err))
  }

  delete(req, res) {
    return this.cartService.delete(req.params.id)
      .then((cart) => res.status(200).end())
      .catch((err) => res.status(500).json(err))
  }

  empty(req,res) {
    return this.cartService.empty(req.user.id)
      .then((items) => res.status(200).end())
      .catch((err) => res.status(500).json(err))
  }
}

module.exports = ProductRoutes;