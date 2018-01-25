var express = require('express');

class CategoryRoutes {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.getAll.bind(this));
    router.get('/brands/:title',this.getBrands.bind(this));    
    router.get('/:title', this.get.bind(this));
    return router;
  }

  get(req, res) {
    return this.categoryService.get(req.params.title)
    .then(items=>res.json(items))
    .catch((err)=>res.status(500).json(err))
  }

  getAll(req,res) {
    return this.categoryService.getAll()
      .then(categories => res.json(categories))
      .catch(err => res.status(500).json(err));
  }

  getBrands(req,res){
    return this.categoryService.getBrands(req.params.title)
      .then(brands => res.json(brands))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = CategoryRoutes;