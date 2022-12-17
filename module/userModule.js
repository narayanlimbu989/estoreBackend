const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secretkey = process.env.secretkey;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});

//generate token
userSchema.methods.generateAuth = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, secretkey);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

// add to cart
userSchema.methods.addcartdata = async function (cart) {
  try {
    this.carts=this.carts.concat(cart)
    await this.save();
    return this.carts
  } catch (error) {console.log(error)}
};

const Userdiscription = mongoose.model("user", userSchema);
module.exports = Userdiscription;
