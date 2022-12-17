const mongoose = require("mongoose");

const Productschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    Pimage: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Productdiscription = mongoose.model("Newproduct", Productschema);
module.exports = Productdiscription;
