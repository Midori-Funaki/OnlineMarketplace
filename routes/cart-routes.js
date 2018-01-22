var express = require('express');

class ProductRoutes{
    constructor(cartService){
        this.cartService = cartService;
    }

    router(){
        let router = express.Router();
        router.get('/:userId',this.get.bind(this));
        router.post('/:userId',this.post.bind(this));
        router.put('/:userId',this.put.bind(this));
        router.delete('/:userId',this.delete.bind(this));
        return router;
    }

    get(req,res){
        return this.cartService.get(req.params.userId)
        .then((items)=>res.json(items))
        .catch((err)=>res.status(500).json)
    }

    post(req,res){
        return this.cartService.post(req.params.userId,req.body)
        .then((items)=>res.json(items))
        .catch((err)=>res.status(500).json)
    }

    put(req,res){
        //req.body format {"productId": XX, "quantity": [{"old":XX,"new":XX}]}
        return this.cartService.put(req.params.userId,req.body)
        .then((items)=>res.json(items))
        .catch((err)=>res.status(500).json)
    }

    delete(req,res){
        return this.cartService.delete(req.params.userId, req.body)
        .then((items)=>res.json(items))
        .catch((err)=>res.status(500).json)
    }
}

module.exports = ProductRoutes;