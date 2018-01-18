var express = require('express');

class UserRoutes{
  constructor(userService){
    this.userService = userService;
  }
  
  router(){
    let router = express.Router();
    router.get('/:id', this.get.bind(this));

    return router;
  }

  get(req,res){
    return this.userService.get(req.params.id)
      .then((user)=>res.json(user))
      .catch((err)=>res.status(500).json(err))
  }

}
module.exports = UserRoutes;
