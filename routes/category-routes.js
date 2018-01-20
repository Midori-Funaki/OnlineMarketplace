var express = require('express');

class CategoryRoute {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  router() {
    let router = express.Router();
    router.get('/:title', this.get.bind(this));
  }

  get(req, res) {
    return this.categoryService.get(req.params.title)
  }
}

module.exports = CategoryRoutes;