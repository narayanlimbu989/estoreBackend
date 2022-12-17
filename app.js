const express = require("express");
const mongoose = require("mongoose");
const Addproductrouter = require("./router/Productrouter");
const Adduserdata = require("./router/userRouter");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

dotenv.config();
const url = process.env.URL;
const PORT = process.env.PORT;
mongoose
  .connect(url)
  .then(() => console.log("connected To Database"))
  .catch(() => console.log("Disconnected"));

// middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/product", Addproductrouter);
app.use("/user", Adduserdata);

app.listen(PORT, (req, res) => console.log(`${PORT}`));
