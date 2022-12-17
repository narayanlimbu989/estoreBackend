const express = require("express");
const cloudinary = require("../utils/cloudinary");
const Productdiscription = require("../module/ProductModule");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { title, about, price, rating, discount, Pimage, category } = req.body;

  try {
    if (Pimage) {
      const uploadResponse = await cloudinary.uploader.upload(Pimage, {
        upload_preset: "ecommerceproduct",
      });
      if (uploadResponse) {
        const newproduct = new Productdiscription({
          title,
          about,
          price,
          rating,
          discount,
          Pimage: uploadResponse,
          category,
        });
        const saveproduct = await newproduct.save();
        res.status(200).json(saveproduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/list", async (req, res) => {
  try {
    const productlist = await Productdiscription.find();
    res.status(200).json(productlist);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const Deletebyid = await Productdiscription.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(Deletebyid);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const Deletebyid = await Productdiscription.findById(
      req.params.id
    );
    res.status(200).json(Deletebyid);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatebyid = await Productdiscription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatebyid);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;

