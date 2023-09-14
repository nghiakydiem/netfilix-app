const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const tokenHeader = req.headers.token;
  if (tokenHeader) {
    const accessToken = tokenHeader.split(" ")[1];

    await jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  }
  next();
};

module.exports = { verifyToken };
