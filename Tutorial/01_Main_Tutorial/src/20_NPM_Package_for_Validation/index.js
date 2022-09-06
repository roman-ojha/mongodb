const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const DATABASE = process.env.DATABASE;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Conection Successfull..."))
  .catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [5, "Minimum 5 letter"],
    maxlength: 30,
  },
  type: {
    type: String,
    enum: ["Front End", "Back End", "Database"],
  },
  videos: {
    type: Number,
    // custom vadiation
    validate(value) {
      // here 'value' is the exect value that we are going to store in database
      if (value < 0) {
        // we can use 'throw new Error' will going to throw the custom error
        throw new Error("Videos can't be in negetive");
      }
    },
    // another way
    // validate: {
    //   validator: function (v) {
    //     return value.length < 0;
    //   },
    //   message: "Videos can't be in negetive",
    // },
  },
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
      videos: -5,
      acitve: true,
    });

    const result = await Playlist.insertMany([mongoosePlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
