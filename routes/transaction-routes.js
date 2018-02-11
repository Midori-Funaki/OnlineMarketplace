var express = require('express');
var authClass = require('./../auth');

var auth = authClass();

class TransactionRoutes {
  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  router() {
    let router = express.Router();
    router.get('/', auth.authenticate(), this.get.bind(this));
    router.post('/', auth.authenticate(), this.post.bind(this));
    router.put('/:id', auth.authenticate(), this.put.bind(this));
    return router;
  }

  get(req, res) {
    // console.log('GET TRANS REQ USER ',req.user);
    return this.transactionService.get(req.user.id)
      .then((transactions) => res.json(transactions))
      .catch((err) => res.status(500).json(err))
  }

  post(req, res) {
    return this.transactionService.post(req.user.id, req.body)
      .then(transaction => res.json(transaction))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  }

  put(req, res) {
    return this.transactionService.updateStatus(req.params.id, req.body)
      .then(transaction => res.status(200).json(transaction))
      .catch((err) => res.status(500).json(err))
  }

}

module.exports = TransactionRoutes;