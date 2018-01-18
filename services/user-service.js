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

    register(userInfo){
        return User.create({
            userId: userInfo.userId,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            password: userInfo.password,
            email: userInfo.email,
            shippingAddress: userInfo.shippingAddress,
            billingAddress: userInfo.billingAddress
        }).then(()=>{
            console.log('Succeeded to register')
        }).catch(err=>{
            console.log(err)
        })
    }
}

module.exports = UserService;