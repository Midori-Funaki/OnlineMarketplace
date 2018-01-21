var express = require('express');

class CategoryRoutes {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  router() {
    let router = express.Router();
    router.get('/:title', this.get.bind(this));
    return router;
  }

  get(req, res) {
    return this.categoryService.get(req.params.title)
    .then((items)=>res.json(items))
    .catch((err)=>res.status(500).json(err))
  }
}

module.exports = CategoryRoutes;