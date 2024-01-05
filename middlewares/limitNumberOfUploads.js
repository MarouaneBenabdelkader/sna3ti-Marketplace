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

const uploadImages = multer(imageUploadOptions);

const uploadImagesWithLimit = (field, maxCount) => (req, res, next) => {
    uploadImages.array(field, maxCount)
    (req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Handle Multer errors (e.g., file size exceeded)
            // Check the number of uploaded files
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                // Reject any extra files beyond the limit
                return res.status(400).json({
                    status: 400,
                    error: 'bad request',
                    message: `Cannot upload more than ${maxCount} files`
                });
            }
            return res.status(400).json({
                status: 400,
                error: 'bad request',
                message: err.message
            });
        } else if (err) {
            // Handle other errors
            return res.status(500).json({
                status: 500,
                error: 'server error',
                message: err.message
            });
        }

        next();
    });
};
module.exports = {
    uploadImagesWithLimit
}