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
  }
}

module.exports = CategoryRoutes;