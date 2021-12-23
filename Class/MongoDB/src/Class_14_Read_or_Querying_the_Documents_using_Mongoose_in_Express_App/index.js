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

// reading document
const getDocument = async () => {
  // we have already seen db.collection.find() we have to do same here 'collection.find()'
  //   const result = await Playlist.find();
  //   const result = await Playlist.find({ type: "Front End" });
  //   const result = await Playlist.find({ type: "Front End" }).select({ name: 1 });
  try {
    const result = await Playlist.find({ type: "Front End" })
      .select({ name: 1 })
      .limit(1);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
