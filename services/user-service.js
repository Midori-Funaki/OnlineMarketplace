const models = require('./../models'),
      User = models.User;

class UserService{
    constructor(){}

    get(userid){
        return User.findOne({
            where:{
                userId: userid
            }
        }).then(user =>{
            console.log('findOne user',user)
            return user
        }).catch(err=>{
            console.log(err);
        })
    }
}

module.exports = UserService;