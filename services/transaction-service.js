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

    processNonce(paymentAmount,nonceFromTheClient){
        //Using fake values for testing
        return new Promise(function(resolve,reject){
            gateway.transaction.sale({
                amount: "10.00",
                paymentMethodNonce: "fake-valid-nonce",
                options:{
                    submitForSettlement: true
                }
            }, function(err,result){
                if(result.success || result.transaction){
                    resolve(result);
                } else {
                    transactionErrors = result.errors.deepErrors();
                    reject(formatErrors(transactionErrors));
                }
            })
        })
    }

    showCheckouts(checkoutId){
        let result;
        return new Promise(function(resolve, reject){
            gateway.transaction.find(checkoutId, function(err, transaction){
                result = createResultObject(transaction);
                resolve({transaction: transaction, result: result});
            });
        })
    }
}

module.exports = transactionService;