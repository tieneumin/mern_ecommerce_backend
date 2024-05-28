const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config");
const { getUserByEmail } = require("../controllers/user");

const isUserValid = async (req, res, next) => {
  try {
    // validate token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email);
    // console.log(user);
    if (user) {
      // valid user
      // pass user obj to next fx
      req.user = user;
      // trigger next function
      next();
    } else {
      // invalid user
      res.status(403).send({
        message: "You are not authorized to perform this action.",
      });
    }
  } catch (error) {
    // console.log(error);
    // 403 here as well to keep error message generic for security
    res.status(403).send({
      message: "You are not authorized to perform this action.",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    // validate token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email);

    if (user && user.role === "admin") {
      // valid user
      // pass user obj to next fx
      req.user = user;
      // trigger next function
      next();
    } else {
      // invalid user
      res.status(403).send({
        message: "You are not authorized to perform this action.",
      });
    }
  } catch (error) {
    // console.log(error);
    // 403 here as well to keep error message generic for security
    res.status(403).send({
      message: "You are not authorized to perform this action.",
    });
  }
};

module.exports = { isUserValid, isAdmin };
