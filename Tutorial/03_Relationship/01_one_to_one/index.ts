import Customer from "./models/Customers.js";
import Identifier from "./models/Identifiers.js";
import "./config/db.js";

const createCustomers = (name: string, age: number, gender: string) => {
  // creating customer
  const customer = new Customer({
    name,
    age,
    gender,
  });
  return customer.save();
};

const createIdentifiers = (code: string, customer: any) => {
  // create identifier for created customer
  const identifier = new Identifier({
    customerCode: code,
    customer: customer,
  });
  return identifier.save();
};

const showIdentifier = async () => {
  // finding identifier
  return await Identifier.find().populate("customer");
  //   now here we are finding all the identifier and then also populating means getting 'Customer' from Customer id that is contain in 'customer' field
  //   return result looks like:
  /*
    [
        {
    _id: new ObjectId("631780e932570dd5756728a3"),
    customerCode: '631780e932',
    customer: {
        _id: new ObjectId("631780e932570dd5756728a0"),
        name: 'Roman',
        age: 14,
        gender: 'Male',
        __v: 0
        },
        __v: 0
    },
    ]
*/
};

createCustomers("Roman", 14, "Male")
  .then((customer) => {
    // after it create and return customer successfully we can create the identifier
    console.log("Customer created");
    // console.log(customer);
    return createIdentifiers(
      customer._id.toString().substring(0, 10),
      customer
    );
  })
  .then((identifier) => {
    console.log("Identifier created");
    // console.log(identifier);
    return showIdentifier();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
