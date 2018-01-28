var express = require('express');
var authClass = require('./../auth');

var auth = authClass();


class UserRoutes{
  constructor(userService){
    this.userService = userService;
  }
  
  router(){
    let router = express.Router();
    router.get('/profile',auth.authenticate(), this.get.bind(this));
    router.post('/',this.post.bind(this));
    router.delete('/:id',this.delete.bind(this));
    router.put('/:id',this.update.bind(this));
    return router;
  }

  get(req,res){
    console.log("user: ", req.user);
    return this.userService.retrieve(req.user)
      .then((user)=>res.json(user))
      .catch((err)=>res.status(500).json(err))
  }

  post(req,res){
    return this.userService.register(req.body)
      .then((result)=>res.send(result))
      .catch((err)=>res.status(500).json(err))
  }

  update(req,res){
    return this.userService.edit(req.params.id,req.body)
      .then((result)=>{
        res.send(result);
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
