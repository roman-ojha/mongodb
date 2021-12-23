const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const DATABASE = process.env.DATABASE;

// to connect NodeJS and MongoDB
// we need to pass the proper path
// if the database doesn't exits then it will create it
// here we just have to pass port number of mongodb
mongoose
  .connect(DATABASE, {
    // localhost:<port>/<database name>
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // this return a promise
  })
  .then(() => console.log("Conection Successfull..."))
  .catch((err) => console.log(err));
// this worning will show:
// current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true }
// this error will come until you will not put all the parser
