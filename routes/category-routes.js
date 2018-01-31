var express = require('express');

class CategoryRoutes {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.getAll.bind(this));
    router.get('/titles/:category/:brand', this.getTitles.bind(this));
    router.get('/brands/:category',this.getBrands.bind(this));
    // router.get('/size&color/:title',this.getSizeColor.bind(this));    
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
    return this.categoryService.getBrands(req.params.category)
      .then(brands => res.json(brands))
      .catch(err => res.status(500).json(err));
  }

  getTitles(req,res){
    return this.categoryService.getTitles(req.params.category,req.params.brand)
      .then(title => res.json(title))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = CategoryRoutes;