var express = require('express');
var authClass = require('./../auth');
var auth = authClass();

class FavRoutes{
  constructor(favouriteService){
    this.favouriteService = favouriteService;
  }
  
  router(){
    let router = express.Router();
    router.get('/', auth.authenticate(), this.getAll.bind(this));
    router.get('/:productId', auth.authenticate(), this.getProductId.bind(this));
    router.post('/', auth.authenticate(), this.addFav.bind(this));
    router.delete('/:favouriteId', auth.authenticate(), this.removeFav.bind(this));
    return router;
  }

  getAll(req,res){
    return this.favouriteService.getAll(req.user.id)
      .then((products)=>res.json(products))
      .catch((err)=>res.status(500).json(err));
  }  

  getProductId(req,res) {
    return this.favouriteService.getID(req.user.id, req.params.productId)
        .then((result)=>res.json(result))
        .catch((err)=>res.status(500).json(err));

  }

  addFav(req,res){
    return this.favouriteService.addFav(req.user.id, req.body.productId)
      .then(()=>res.json({message: "Success"}))
      .catch((err)=>res.status(500).json(err))
  }

  removeFav(req,res){
    return this.favouriteService.removeFav(req.params.favouriteId, req.user.id)
      .then((products)=>res.json(products))
      .catch((err)=>res.status(500).json(err))
  }
  
}

module.exports = FavRoutes;
