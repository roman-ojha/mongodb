import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
