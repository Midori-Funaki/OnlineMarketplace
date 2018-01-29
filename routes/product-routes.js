var express = require('express');
var authClass = require('./../auth');
var auth = authClass();

class ProductRoutes{
  constructor(productService){
    this.productService = productService;
  }
  
  router(){
    let router = express.Router();
    router.get('/:id',this.get.bind(this));
    router.get('/', this.getAll.bind(this));
    router.post('/', auth.authenticate(), this.post.bind(this));
    router.delete('/:id',auth.authenticate(), this.delete.bind(this));
    router.put('/:id',auth.authenticate(), this.update.bind(this));
    return router;
  }

  getAll(req,res){
    return this.productService.getAll()
      .then((products)=>res.json(products))
      .catch((err)=>res.status(500).json(err))
  }

  get(req,res) {
      return this.productService.get(req.params.id)
        .then((product) => res.json(product))
        .catch((err)=> res.status(500).json(err))
  }

  post(req,res){
    let result = this.productService.post(req.body, req.user)
    console.log("Result", result);
    return this.productService.post(req.body, req.user)
      .then(()=>{
        res.send('Registration Completed')
      })
      .catch((err)=>res.status(500).json(err))
  }

  update(req,res){
    return this.productService.update(req.params.id,req.body)
      .then((user)=>{
        res.send('Updated Completed')
      })
      .catch((err)=>res.status(500).json(err))
  }

  delete(req,res){
    return this.productService.delete(req.params.id)
      .then(()=>{
        res.send('Product Deletion Completed')
      })
      .catch((err)=>{res.status(500).json(err)})
  }
}
module.exports = ProductRoutes;
