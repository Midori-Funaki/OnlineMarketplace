var express = require('express');
var authClass = require('./../auth');
var auth = authClass();
var cloudinaryService = require('./../services/cloudinary-service');

class ProductRoutes{
  constructor(productService){
    this.productService = productService;
  }
  
  router(){
    let router = express.Router();
    router.get('/color/:title', this.getColor.bind(this));
    router.get('/sell', auth.authenticate(), this.getSell.bind(this));
    router.get('/:id', this.get.bind(this));
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

  getSell(req,res){
    return this.productService.getSell(req.user)
      .then((products) => res.json(products))
      .catch((err) => res.status(500).json(err))
  }

  getColor(req,res){
    let title = (req.params.title).replace(/\+/g,' ');
    return this.productService.getColor(title)
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json(err))
  }

  get(req,res) {
      return this.productService.get(req.params.id)
        .then((product) => res.json(product))
        .catch((err)=> res.status(500).json(err))
  }

  post(req,res){
    // let result = this.productService.post(req.body, req.user)
    // console.log("Result", result);
    return this.productService.post(req.body, req.user)
      .then((result)=>{
        res.send(result)
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
