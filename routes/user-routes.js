var express = require('express');

class UserRoutes{
  constructor(userService){
    this.userService = userService;
  }
  
  router(){
    let router = express.Router();
    router.get('/:id', this.get.bind(this));
    router.post('/register',this.post.bind(this));
    router.delete('/deregister/:id',this.delete.bind(this));
    router.post('/update/:id',this.update.bind(this));
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
        res.send('Registration Completed')
      })
      .catch((err)=>res.status(500).json(err))
  }

  update(req,res){
    return this.userService.edit(req.params.id,req.body)
      .then((user)=>{
        res.send('Updated Completed')
      })
      .catch((err)=>res.status(500).json(err))
  }

  delete(req,res){
    return this.userService.deregister(req.params.id)
      .then(()=>{
        res.send('Deregistration Completed')
      })
      .catch((err)=>{res.status(500).json(err)})
  }
}
module.exports = UserRoutes;
