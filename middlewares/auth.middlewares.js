const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  console.log()
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        const userID = decoded.userID;
        console.log("after decoding the token", userID);
        req.body.authorID = userID;
        next();
      } else {
        res.send({ msg: "please login" });
      }
    });
  } else {
    res.send({ msg: "please login" });
  }
};
module.exports = {
  authenticate,
};
