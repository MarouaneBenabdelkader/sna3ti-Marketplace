module.exports = (req, res, next) => {
    if (!req.files && !req.file ) {
        return res.status(400).json({
            status: 400,
            error: 'bad request',
            message: 'Please upload an image'
        })
    }
    next();
}