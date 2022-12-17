const jwt = require("jsonwebtoken");
const Userdiscription = require("../module/userModule");
const secretkey = process.env.secretkey;

const Auth = async (req, res, next) => {
  try {
    const token = await req.header("Auth-token");

    const verifytoken = jwt.verify(token, secretkey);

    const rootUser = await Userdiscription.findOne({
      _id: verifytoken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("no token provides");
    console.log(error);
  }
};
module.exports = Auth;
