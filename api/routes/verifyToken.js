const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("in verifyToken");
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        console.log(err);
        res.status(499).json({
          body: "Token Is Not Valid !",
          status: 499,
          err: true,
          message: "Token Is Not Valid, Please Try to Login Again !"
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => { 
  console.log("in verify and AUTHORIZE !");
  verifyToken(req, res, () => {
    console.log("user is : "+req.user.id);
    console.log(req.params.id);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      console.log("errorrrrrr verifyToken and authorize");
      res.status(401).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
