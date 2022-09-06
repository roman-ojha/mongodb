/*

=> Following are all the valid schema types in mongoose:
  https://mongoosejs.com/docs/schematypes.html
    1) String
      -> https://mongoosejs.com/docs/schematypes.html#strings
    2) Number
    3) Date
    4) Buffer
    5) Boolean
    6) Mixed
    7) ObjectId
    8) Array
    9) Decimal128
    10) Map
    11) Schema
*/

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const DATABASE = process.env.DATABASE;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conection Successfull..."))
  .catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    // here unique means every time when you are making document you name field value has to be unique
    // otherwise it will throw and error
    // NOTE: unique option is not a validator but it works
    lowercase: true,
    // it will trun string to lowercase
    // uppercase: true,
    trim: true,
    //  name: "           MoonGoOse JS         ", -> name:name: "MoonGoOse JS"
    minlength: [5, "Minimum 5 letter"],
    // if you want to pass custom error then you can do this
    maxlength: 30,
    // 5 <= string >= 30
  },
  type: {
    type: String,
    enum: ["Front End", "Back End", "Database"],
    // enum will check the string that did given string match the defualt string if not the will through and error
  },
  videos: Number,
  acitve: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = new mongoose.model("Playlist", playlistSchema);

const createDocument = async () => {
  try {
    const mongoosePlaylist = new Playlist({
      name: "Mongoose JS",
      type: "Database",
      videos: 5,
      acitve: true,
    });

    // saving the document
    const result = await Playlist.insertMany([mongoosePlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
