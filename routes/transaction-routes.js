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
    // router.post('/checkouts', this.postNonce.bind(this));
    return router;
  }

  get(req, res) {
    // console.log('GET TRANS REQ USER ',req.user);
    return this.transactionService.get(req.user)
      .then((transactions) => res.json(transactions))
      .catch((err) => res.status(500).json(err))
  }

  getToken(req, res) {
    return this.transactionService.getClientToken()
      .then((token) => res.json(token))
      .catch((err) => res.status(500).json(err))
  }

  confirm(req, res) {
    return this.transactionService.showCheckouts(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json(err))
  }

  postNonce(req, res) {
    let amount = req.body.amount;
    let nonce = req.body.payment_method_nonce;
    return this.transactionService.processNonce(amount, nonce)
      .then((result) => {
        res.send(result.transaction.id);
        // res.redirect('checkouts/'+result.transaction.id);
      })
      .catch((err) => {
        //req.flash('error',{msg: formatErrors(err)});
        res.redirect('/checkouts/new');
      })
  }

}

module.exports = TransactionRoutes;