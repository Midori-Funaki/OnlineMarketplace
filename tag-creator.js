const ProductService = require('./services/product-service');
const productService = new ProductService();
const models = require('./models');
const ProductTag = models.ProductTag;
const Tag = models.Tag;
const async = require('async');

const productArr = [{
    "id": 21,
    "title": "One Two Three Four",
    "description": "This is the first product. Yahoo.",
    "brand": "adidas",
    "size": 8,
    "color": "red",
    "condition": "used",
    "curentBidPrice": 705,
    "currentAskPrice": 840,
    "quantity": 4,
    "sellerId": 3,
    "buyerId": null,
    "categoryId": 1,
    "createdAt": "2018-02-01T18:09:36.765Z",
    "updatedAt": "2018-02-01T18:09:36.765Z",
    "Category": {
        "id": 1,
        "title": "Sneakers",
        "createdAt": "2018-02-01T18:09:36.899Z",
        "updatedAt": "2018-02-01T18:09:36.899Z"
    },
    "ProductPhotos": [
        {
            "id": 61,
            "url": "https://stockx.imgix.net/Adidas-NMD-Racer-Juice-HK.png",
            "productId": 21,
            "createdAt": "2018-02-01T18:09:37.027Z",
            "updatedAt": "2018-02-01T18:09:37.027Z"
        },
        {
            "id": 62,
            "url": "http://lorempixel.com/640/480/fashion",
            "productId": 21,
            "createdAt": "2018-02-01T18:09:37.027Z",
            "updatedAt": "2018-02-01T18:09:37.027Z"
        },
        {
            "id": 63,
            "url": "http://lorempixel.com/640/480/fashion",
            "productId": 21,
            "createdAt": "2018-02-01T18:09:37.027Z",
            "updatedAt": "2018-02-01T18:09:37.027Z"
        }
    ]
},{
    "id": 13,
    "title": "one two three four five",
    "description": "This is the second item. Google",
    "brand": "adidaaas",
    "size": 5,
    "color": "lavender",
    "condition": "new",
    "curentBidPrice": 369,
    "currentAskPrice": 639,
    "quantity": 4,
    "sellerId": 1,
    "buyerId": null,
    "categoryId": 2,
    "createdAt": "2018-02-01T18:09:36.765Z",
    "updatedAt": "2018-02-01T18:09:36.765Z",
    "Category": {
        "id": 2,
        "title": "Handbags",
        "createdAt": "2018-02-01T18:09:36.899Z",
        "updatedAt": "2018-02-01T18:09:36.899Z"
    },
    "ProductPhotos": [
        {
            "id": 264,
            "url": "https://stockx.imgix.net/Adidas-Yeezy-Boost-350-V2-Core-Black-Red-2017.png",
            "productId": 13,
            "createdAt": "2018-02-03T10:09:52.916Z",
            "updatedAt": "2018-02-03T10:09:52.916Z"
        },
        {
            "id": 265,
            "url": "http://lorempixel.com/640/480/fashion",
            "productId": 13,
            "createdAt": "2018-02-03T10:09:52.916Z",
            "updatedAt": "2018-02-03T10:09:52.916Z"
        },
        {
            "id": 266,
            "url": "http://lorempixel.com/640/480/fashion",
            "productId": 13,
            "createdAt": "2018-02-03T10:09:52.916Z",
            "updatedAt": "2018-02-03T10:09:52.916Z"
        },
        {
            "id": 267,
            "url": "http://res.cloudinary.com/dealshubspace/image/upload/v1517652582/dealshub/ojyszytknxdeub9cuajp.jpg",
            "productId": 13,
            "createdAt": "2018-02-03T10:09:52.920Z",
            "updatedAt": "2018-02-03T10:09:52.920Z"
        }
    ]
}];


// productService.get()
//     .then((products) => {
//         // productArr = products;
//         registerTags();
//     })
//     .catch((err) => {
//         console.log(err)
//     });

//create a queue object with concurrency 1
let q = async.queue(function(keyword, callback) {
    console.log('Handling ',keyword);
    findTagNumber(keyword, callback);
}, 1);

//assign a callback
q.drain = function() {
    console.log('Finished processing the item')
};

function registerTagByEach(){
    for(let i=0;i<productArr.length; i++) {
        registerTags(productArr[i]);
    }
}

function registerTags(eachProduct){
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
        if (word.length > 1) {
            wordsSet.add(word);
        }
    })

    registerInTable(eachProduct.id, Array.from(wordsSet));
}

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
        callback(); //====== CALLBACK =======//
    }).catch((err) => {
        console.log(err)
    })
}

// module.exports.registerTagByEach = registerTagByEach;
// module.exports.registerTags = registerTags;
// module.exports.registerInTable = registerInTable;
module.exports.registerTagByEach = registerTagByEach;