const jimp = require('jimp');

exports.resizeProfileImage = async (req, res, next) => {

    try {
        const extension = req.file.mimetype.split("/")[1];
        req.body.profileImageUrl = `/static/profileImages/${Date.now()}.${extension}`;
        const image = await jimp.read(req.file.buffer);
        image.resize(250, jimp.AUTO);
        image.write(`./public${req.body.profileImageUrl}`);
        next();
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'internal server error',
            message: error.message
        })
    }
};
