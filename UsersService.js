const models = require('./models'),
      Users = models.Users;

class UsersService{
    constructor(){}

    get(userid){
        Users.findOne({
            where:{
                user_id: userid
            }
        })
    }
}

module.exports = UsersService;