const models = require('./../models');
const ProductTag = models.ProductTag;
const Tag = models.Tag;
const async = require('async');

//create a queue object with concurrency 1
let q = async.queue(function(keyword, callback) {
    console.log('Handling ',keyword);
    findTagNumber(keyword, callback);
}, 1);

//assign a callback
q.drain = function() {
    console.log('Finished processing the item')
};

function registerInTable(productNumber, keywordsArr) {
    for(let i=0; i<keywordsArr.length; i++){
        q.push({product:productNumber, key:keywordsArr[i]});
    }
}

function findTagNumber(newkeyWordData, callback){
    let tagNumber = 0;
    let newkeyword = newkeyWordData.key;
    let productNumber = newkeyWordData.product;
    Tag.findOne({
        where: {
            keyword: newkeyword
        },attributes: { 
            exclude: ['tagId'] 
        }
    }).then((result) => {
        console.log('findOne result ',result);
        if (result === null ) {
            Tag.create({
                keyword: newkeyword
            }).then((newEntry) => {
                console.log('new entry id',newEntry.id);
                tagNumber = newEntry.id
                registerTagId(tagNumber, productNumber, callback);
            })
        } else {
            tagNumber = result.id
            registerTagId(tagNumber, productNumber, callback);
        }
    }).catch((err) => {
        console.log(err);
    })
}

function registerTagId(tag, product, callback){
    console.log('tag id passed on',tag);
    ProductTag.create({
        tagId: tag,
        productId: product
    }).then(() => {
        console.log('producttag registration ok')
        callback();
    }).catch((err) => {
        console.log(err)
    })
}

class ProductTagService {

    registerTags(eachProduct){
        let wordsSet = new Set();
        if (eachProduct.Category.title === 'sneakers') {
            wordsSet.add(eachProduct.size);
        }
        wordsSet.add(eachProduct.Category.title.toLowerCase());
        wordsSet.add(eachProduct.brand.toLowerCase());
        wordsSet.add(eachProduct.color.toLowerCase());
        eachProduct.title.toLowerCase().split(' ').forEach((word) => {
            wordsSet.add(word);
        })
        eachProduct.description.replace(/\.(?=(?:\s*[A-Z])|$)/g,' ').toLowerCase().split(' ').forEach((word) => {
            if (word.length > 1 && word !== "is" && word !== "this" && word !== "these") {
                wordsSet.add(word);
            }
        })
        registerInTable(eachProduct.id, Array.from(wordsSet));
    }
    
}

module.exports.ProductTagService = ProductTagService;