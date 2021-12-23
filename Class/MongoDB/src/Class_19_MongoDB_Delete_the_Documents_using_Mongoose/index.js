const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const DATABASE = process.env.DATABASE;

// connecting to database
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conection Successfull..."))
  .catch((err) => console.log(err));

// defining schma
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: String,
  videos: Number,
  acitve: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// creating model(collection)
const Playlist = new mongoose.model("Playlist", playlistSchema);

//deleting data
const deleteDocument = async (_id) => {
  try {
    // const deleteResult = await Playlist.deleteOne({ _id });
    // we can use 'deleteMany()' as well
    // to get the older or original version of the data the you have to use 'findByIdAndDelete();
    const deleteResult = await Playlist.findByIdAndDelete({ _id });
    console.log(deleteResult);
  } catch (err) {
    console.log(err);
  }
};

deleteDocument("60d4b8a932d8f921f86f1982");
