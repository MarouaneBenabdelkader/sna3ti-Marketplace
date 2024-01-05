const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
      if (err || decodedToken.user.role != "handicraft") {
        return res.status(402).send({
          status: 402,
          error: "unAuthorized",
          message: "you need to login first",
        });
      } else {
        req.user = decodedToken.user;
        return next();
      }
    });
  } else {
    res.status(401).send({
      status: 401,
      error: "unAuthenticated",
      message: "you need to login first",
    });
  }
};