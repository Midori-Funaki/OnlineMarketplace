const ProductService = require('./services/product-service');
const productService = new ProductService();
const models = require('./models');
const ProductTag = models.ProductTag;
const Tag = models.Tag;

const productArr = [{
    "id": 21,
    "title": "adidas NMD Racer Juice HK",
    "description": "Nobis culpa autem nesciunt molestiae perspiciatis modi voluptatem corrupti.\nQui ad voluptatem in architecto ratione maiores vel.\nIn sit in soluta dolor totam nesciunt voluptatem.\nVero voluptatibus id repellendus et voluptate perferendis quos quo.\nQuisquam itaque reiciendis eum.",
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
    "title": "adidas Yeezy Boost 350 V2 Black Red",
    "description": "Eum cupiditate harum est possimus et.\nMolestiae recusandae repellendus a numquam.",
    "brand": "adidas",
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

function registerTags(){
    productArr.forEach((eachProduct) => {
        //there is id
        let wordsSet = new Set();
        if (eachProduct.Category.title === 'sneakers') {
            wordsSet.add(eachProduct.size);
        }
        wordsSet.add(eachProduct.brand.toLowerCase());
        wordsSet.add(eachProduct.color.toLowerCase());
        eachProduct.title.toLowerCase().replace(/\.\s/g,' ').split(' ').forEach((word) => {
            wordsSet.add(word);
        })
        eachProduct.description.toLowerCase().split(' ').forEach((word) => {
            wordsSet.add(word);
        })
        registerInTable(eachProduct.id, Array.from(wordsSet));
    })
}

function registerInTable(productNumber, keywordsArr) {
    for(let i=0; i<keywordsArr.length; i++){
        let tagNumber = 0;
        let findTagNumber = new Promise(function(resolve,reject){
            Tag.findOne({
                where: {
                    keyword: keywordsArr[i]
                },attributes: { 
                    exclude: ['tagId'] 
                }
            }).then((result) => {
                console.log('findOne result ',result);
                if (result === null ) {
                    Tag.create({
                        keyword: keywordsArr[i]
                    }).then((newEntry) => {
                        console.log('new entry id',newEntry.id);
                        tagNumber = newEntry.id
                        resolve(tagNumber);
                    })
                } else {
                    tagNumber = result.id
                    resolve(tagNumber);
                }
            }).catch((err) => {
                reject(err);
            })
        })

        findTagNumber.then((tag) => {
            console.log('tag id passed on',tag);
            ProductTag.create({
                tagId: tag,
                productId: productNumber
            }).then(() => {
                console.log('producttag registration ok')
            }).catch((err) => {
                console.log(err)
            })
        })
    }
}

module.exports.registerTags = registerTags;
module.exports.registerInTable = registerInTable;