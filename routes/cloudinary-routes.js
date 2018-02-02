var express = require('express');

class CloudinaryRoutes {
  constructor(cloudinaryService) {
    this.cloudinaryService = cloudinaryService;
  }

  router() {
    let router = express.Router();
    router.delete('/dealshub/:id', this.deleteImage.bind(this));
    return router;
  }

  deleteImage(req, res) {
    return this.cloudinaryService.deleteImage(req.params.id)
      .then(() => { res.send("Image deleted from Cloudinary") })
      .catch((err) => { res.status(500).json(err) })
  }
}

module.exports = CloudinaryRoutes;