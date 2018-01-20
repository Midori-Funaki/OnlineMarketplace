var express = require('express');

class TransactionRoutes{
    constructor(transactionService){
        this.transactionService = transactionService;
    }

    router(){
        let router = express.Router();
        router.get('/client_token',this.getToken.bind(this));
        return router;
    }

    getToken(req,res){
        return this.transactionService.getClientToken()
        .then((token)=>res.json(token))
        .catch((err)=>res.status(500).json(err))
    }
}

module.exports = TransactionRoutes;