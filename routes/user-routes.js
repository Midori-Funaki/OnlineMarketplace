var express = require('express');

class UserRoutes{
  constructor(userService){
    this.userService = userService;
  }
  
  router(){
    let router = express.Router();
    router.get('/', this.getCurrentUser.bind(this));
    router.get('/:email', this.get.bind(this));
    router.post('/',this.post.bind(this));
    router.delete('/:id',this.delete.bind(this));
    router.put('/:id',this.update.bind(this));
    return router;
  }

  get(req,res){
    return this.userService.retrieve(req.params.email)
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

  getCurrentUser(req, res) {
    if (req.user) {
      res.send(req.user.id);
    } else {
      res.status(404).send("not found");
    }
  }
}
module.exports = UserRoutes;
