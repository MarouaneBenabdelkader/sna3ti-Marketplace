const multer = require('multer');

/* ******************************* options *************************** */

const imageUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    // storing images files up to 2mb
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith("image/")) {
      next(null, true);
    } else {
      next(null, false);
    }
  }
};

module.exports = multer(imageUploadOptions);