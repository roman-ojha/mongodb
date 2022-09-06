const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const DATABASE = process.env.DATABASE;

// connecting to mongodb
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conection Successfull..."))
  .catch((err) => console.log(err));

/*
 schema
 -> A Mongoose schema defines the structure of the document, default values, valicators, etc.,
 -> so inside the document there will be a field in which which value has to come that will say by the schema
-> EX:
  name:"Node JS" -> here this is string
  type:"Back End" -> here this is also string 
  videos:40 -> here this is int(number)
  acitve:true -> here this is boolean
  date:2021-06-23T18:15:00.000+00:00 -> here this is date

    -> al of this this will define by the schema
*/

// defining schma
const playlistSchema = new mongoose.Schema({
  // here we can use default values, and validation
  name: {
    type: String,
    require: true,
    // require: true means it has to be made
  },
  type: String,
  videos: Number,
  acitve: Boolean,
  // here we are defining
  date: {
    type: Date,
    default: Date.now, // default value
  },
});

/*
  # What is Models
  -> A Mongoose model is a wrapper on the Mongoose schema.
  -> A mongoose model provieds a interface to the database for creating, querying, updating, deleting record, etc.
  -> models will create a collection
*/

// creating model(collection)
const Playlist = new mongoose.model("Playlist", playlistSchema);
// model("<collection-name>",<schema>)
// it has to be in capital and singular where it will automatically convert collection-name to plurle
//now Playlist is a class
