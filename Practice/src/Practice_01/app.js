const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const DATABASE = process.env.DATABASE;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log(err));

const userData = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  id: Number,
  class: String,
  gender: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    require: true,
  },
});
const Razzdata = new mongoose.model("razzdata", userData);
