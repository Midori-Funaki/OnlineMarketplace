var express = require('express');

class UserRoutes{
  constructor(userService){
    this.userService = userService;
  }
  
  router(){
    let router = express.Router();
    router.get('/:id', this.get.bind(this));
    router.post('/register',this.post.bind(this));

    return router;
  }

  get(req,res){
    return this.userService.get(req.params.id)
      .then((user)=>res.json(user))
      .catch((err)=>res.status(500).json(err))
  }

  post(req,res){
    return this.userService.register(req.body)
      .then(()=>{
        console.log('Registration completed')
        res.send('Registration Completed')
      })
      .catch((err)=>res.status.json(err))
  }
}
module.exports = UserRoutes;
