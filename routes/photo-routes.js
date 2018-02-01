var express = require('express');
var authClass = require('./../auth');

var auth = authClass();

class PhotoRoutes {
    constructor(photoService) {
        this.photoService = photoService;
    }

    router() {
        let router = express.Router();
        router.delete('/:id', this.delete.bind(this));
        return router;
    }

    delete(req,res) {
        return this.photoService.delete(req.params.id)
        .then((result) => res.json(result))
        .catch((err)=> res.status(500).json(err))
    }
}

module.exports = PhotoRoutes;