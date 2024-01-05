module.exports = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            status: 400,
            error: 'bad request',
            message: 'Please upload at least one image of your item'
        })
    }
    next();
}