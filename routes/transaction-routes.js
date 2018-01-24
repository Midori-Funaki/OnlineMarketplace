var express = require('express');

class TransactionRoutes{
    constructor(transactionService){
        this.transactionService = transactionService;
    }

    router(){
        let router = express.Router();
        router.get('/checkouts/new',this.getToken.bind(this));
        router.get('/checkouts/:id',this.confirm.bind(this));
        router.post('/checkouts',this.postNonce.bind(this));
        return router;
    }

    getToken(req,res){
        return this.transactionService.getClientToken()
        .then((token)=>res.json(token))
        .catch((err)=>res.status(500).json(err))
    }

    confirm(req,res){
        return this.transactionService. showCheckouts(req.params.id)
        .then((result)=>res.json(result))
        .catch((err)=>res.status(500).json(err))
    }

    postNonce(req,res){
        let amount = req.body.amount;
        let nonce = req.body.payment_method_nonce;
        return this.transactionService.processNonce(amount,nonce)
        .then((result)=>{
            res.send(result.transaction.id);
            // res.redirect('checkouts/'+result.transaction.id);
        })
        .catch((err)=>{
            //req.flash('error',{msg: formatErrors(err)});
            res.redirect('/checkouts/new');
        })
    }

}

module.exports = TransactionRoutes;