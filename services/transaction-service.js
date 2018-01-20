var gateway = require('./../gateway');

class transactionService{
    constructor(){}

    getClientToken(){
        return new Promise(function(resolve,reject){
            gateway.clientToken.generate({},function(err, response){
                if(err){
                    console.log(err);
                    reject(err);
                }
                resolve(response.clientToken);
            })
        })
    }
}

module.exports = transactionService;