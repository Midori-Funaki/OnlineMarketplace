const ProductService = require('./services/product-service');
const productService = new ProductService();
const models = require('./../models');
const ProductTag = models.ProductTag;
const Tag = models.Tag;

const productArr = [];

this.productService.get()
    .then((products) => {
        productArr = products;
        registerTags();
    })
    .catch((err) => {
        console.log(err)
    });

function registerTags(){
    productArr.forEach((eachProduct) => {
        //there is id
        let wordsSet = new Set();
        if (eachProduct.categoryId === 2) {
            wordsSet.add(eachProduct.size);
        }
        wordsSet.add(eachProduct.brand);
        wordsSet.add(eachProduct.color);
        eachProduct.title.split(' ').forEach((word) => {
            wordsSet.add(word);
        })
        eachProduct.title.split(' ').forEach((word) => {
            wordsSet.add(word);
        })
        registerInTable(eachProduct.id, wordsSet);
    })
}

function registerInTable(productId, keywords){}