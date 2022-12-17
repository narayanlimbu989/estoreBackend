const express = require("express");
const Userdiscription = require("../module/userModule");
const Productdiscription = require("../module/ProductModule");
const Auth = require("../middleware/Auth");
const bcrypt = require("bcryptjs");
const userrouter = express.Router();

userrouter.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const checkEmail = await Userdiscription.findOne({ email });
    const checkphone = await Userdiscription.findOne({ phone });

    if (checkEmail || checkphone) {
      return res.status(401).json("user already exit");
    } else {
      const senitazeEmail = email.toLowerCase();
      const hashpassword = bcrypt.hashSync(password);
      const createnewuser = new Userdiscription({
        name,
        phone,
        email: senitazeEmail,
        password: hashpassword,
      });
      const saveuser = await createnewuser.save();
      res.status(201).json({ saveuser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const isEmailexit = await Userdiscription.findOne({ email });
    if (!isEmailexit) {
      return res.status(400).json("Invalid user detail");
    } else {
      const matchpassword = bcrypt.compareSync(password, isEmailexit.password);
      const accesstoken = await isEmailexit.generateAuth();

      if (matchpassword) {
        res.cookie("Token", "i am narayan", {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        });
        res.status(202).json({
          isEmailexit,
          accesstoken,
          email: isEmailexit.email,
          phone: isEmailexit.phone,
          name: isEmailexit.name,
        });
        console.log(req.cookies);
      } else {
        res.status(404).json("Invalid user detail");
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

userrouter.post("/addcart/:id", Auth, async (req, res) => {
  try {
    const cart = await Productdiscription.findById(req.params.id);
    const Usercontact = await Userdiscription.findOne({ _id: req.userID });

    if (Usercontact) {
      // const check = Usercontact.carts;
      await Usercontact.addcartdata(cart);
      await Usercontact.save();

      res.status(201).json(Usercontact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user detail" });
    console.log(error);
  }
});

userrouter.get("/cartitems", Auth, async (req, res) => {
  try {
    const user = await Userdiscription.findOne({ _id: req.userID });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

//get valid user
userrouter.get("/validuser", Auth, async (req, res) => {
  try {
    const validuser = await Userdiscription.findOne({ _id: req.userID });
    res.status(201).json(validuser);
  } catch (error) {
    console.log(error);
  }
});

//delete product in user cart
userrouter.delete("/removeproduct/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((currentvalue) => {
      return currentvalue._id != id;
    });
    req.rootUser.save();
    res.status(201).json(req.rootUser);
  } catch (error) {
    console.log(error);
  }
});
module.exports = userrouter;
