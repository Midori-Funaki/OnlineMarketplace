var express = require('express');

class UserProductRoutes {
  constructor(userProductService) {
    this.userProductService = userProductService;
  }

  router(){
    let router = express.Router({mergeParams: true});
    router.get('/', this.get.bind(this));
    return router;
  }

  get(req, res) {
    return this.userProductService.get(req.params.userId);
  }
}

module.exports = UserProductRoutes;