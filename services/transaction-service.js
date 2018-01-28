var gateway = require('./../gateway'),
    braintree = require('braintree');

var TRANSACTION_SUCCESS_STATUSES = [
    braintree.Transaction.Status.Authorizing,
    braintree.Transaction.Status.Authorized,
    braintree.Transaction.Status.Settled,
    braintree.Transaction.Status.Settling,
    braintree.Transaction.Status.SettlementConfirmed,
    braintree.Transaction.Status.SettlementPending,
    braintree.Transaction.Status.SubmittedForSettlement
]

function createResultObject(transaction){
    let result;
    let status = transaction.status;

    if(TRANSACTION_SUCCESS_STATUSES.indexOf(status) !== -1){
        result = {
            header: 'Payment Success!',
            icon: 'success',
            message: 'Your test transaction has been successfully processed.'
        }
    } else {
        result = {
            header: 'Transaction Failed',
            icon: 'fail',
            message: 'Your test transaction has a status of ' + status + '.'
        }
    }

    return result;
}

class transactionService{
    constructor(){}

    get(user){
        return Transaction.findAll({
            where:{
                buyerId: user.id
            }
        }).then((transactions) => {
            return transactions;
        }).catch((err) => {
            return err;
        })
    }

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