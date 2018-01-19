const models = require('./../models'),
      User = models.User;

class UserService{
    constructor(){}

    retrieve(userid){
        return User.findOne({
            where:{
                userId: userid
            }
        }).then(user =>{
            console.log('findOne user',user)
            return user
        }).catch(err=>{
            console.log(err);
            return err
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

    edit(userId,req){
        let attr = req.attr;
        let updates = req.updates;
        let newData = {
            [attr]:updates
        };
        return User.update(newData, {where:{userId: userId}})
        .then(result => {
            return result;
        })
        .catch(err =>{
            return err;
        })
    }

    deregister(userId){
        return User.destroy({
            where:{ userId:userId }
        }).then(()=>{
            console.log('Deleted ',userId)
        }).catch(err=>{
            console.log(err)
        })
    }
}

module.exports = UserService;