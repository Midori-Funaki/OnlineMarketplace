var cloudinary = require('cloudinary');

class CloudinaryService {
  constructor() { }

  deleteImage(id) {
    let cid = 'dealshub/' + id;
    return cloudinary.v2.uploader.destroy(cid, function (error, result) {
      if (error) {
        console.log(error);
        return error
      }
      console.log(result);
      return result
    });
  }
}

module.exports = CloudinaryService; 