var express = require('express');

class UserRoutes{
  constructor(userService){
    this.userService = userService;
  }
  
  router(){
    let router = express.Router();
    router.get('/:id', this.get.bind(this));
    router.post('/',this.post.bind(this));
    router.delete('/:id',this.delete.bind(this));
    router.put('/:id',this.update.bind(this));
    return router;
  }

  get(req,res){
    return this.userService.retrieve(req.params.id)
      .then((user)=>res.json(user))
      .catch((err)=>res.status(500).json(err))
  }

  post(req,res){
    return this.userService.register(req.body)
      .then((result)=>{
        console.log(result);
        res.send(result);
      })
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
