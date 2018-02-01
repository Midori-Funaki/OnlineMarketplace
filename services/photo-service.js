const models = require('./../models'),
      ProductPhoto = models.ProductPhoto;

class PhotoService {
    delete(id) {
        return ProductPhoto.destroy({
            where: {
                //Change the key from url to publicid after editting photo schema
                url: id
            }
        }).then(() => {
            return 'deleted image'
        }).catch((err) => {
            return err
        })
    }
}

module.exports = PhotoService;