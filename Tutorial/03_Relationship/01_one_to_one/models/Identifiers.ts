import mongoose from "mongoose";

const identifierSchema = new mongoose.Schema({
  customerCode: String,
  customer: {
    // this will store the object id of the Customer '_id'
    type: mongoose.Schema.Types.ObjectId,
    // and here we will write to which collection we are creating a reference
    ref: "Customer",
  },
});

const Identifier = mongoose.model("Identifier", identifierSchema);

export default Identifier;
