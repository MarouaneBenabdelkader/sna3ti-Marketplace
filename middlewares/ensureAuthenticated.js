const jwt = require('jsonwebtoken')

module.exports = (req, res,next) => {

    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).send({
                    authenticated: false,
                    message: "you need to login first",
                    status: 401,
                });
            } else {
                return next()
            }
        });
    } else {
        return res.status(401).send({
            authenticated: false,
            message: "you need to login first",
            status: 401,
        });
    }
};