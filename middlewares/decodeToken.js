const jwt = require('jsonwebtoken');
 function decodeToken(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
            if (!err)
                req.user = decodedToken.user;
        });
    }
    next();
}
module.exports = decodeToken;