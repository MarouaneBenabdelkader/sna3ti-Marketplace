const jimp = require('jimp');

module.exports = async (req, res, next) => {

    req.body.images = [];
    if (!req.files || req.files?.length === 0) return next();
    try {
        for (const file of req.files) {
            var extension = file.mimetype.split("/")[1];
            req.body.images.push(`/uploads/items/${req.user.id}-${Date.now()}.${extension}`)
            const image = await jimp.read(file.buffer);
            image.resize(420, jimp.AUTO);
            image.write(`./public${req.body.images[req.body.images.length - 1]}`);
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Internal server error',
            message: 'An error occured while resizing the images'
        });
    }

    next();
};