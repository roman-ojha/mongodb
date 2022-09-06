import mongoose from "mongoose";
import { customerSchema } from "./Customers.js";

const identifierSchema = new mongoose.Schema({
  customerCode: String,
  customer: {
    // this will store the object id of the Customer '_id'
    type: mongoose.Schema.Types.ObjectId,
    // and here we will write to which collection we are creating a reference
    ref: "Customer",
    // here we are providing the reference
  },

  // another way using embedded schema
  // customer: customerSchema,
  // so here 'customer' store customer Schema which create the identifier it will now store the customer Object
  // for this method we don't do 'populate'
  // NOTE that now this 'customer' field will again store the same document that is create which customer is being create and store into 'Customer' collection, it will re store that whole data into new Identifier
});

const Identifier = mongoose.model("Identifier", identifierSchema);

export default Identifier;
