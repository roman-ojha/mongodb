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

const createDocument = async () => {
  try {
    // Crearing document or insert
    const reactPlaylist = new Playlist({
      name: "Javascript",
      type: "Front End",
      videos: 150,
      acitve: true,
    });
    const mongoPlaylist = new Playlist({
      name: "MongoDB",
      type: "Database",
      videos: 10,
      acitve: true,
    });
    const mongoosePlaylist = new Playlist({
      name: "Moongoose JS",
      type: "Database",
      videos: 5,
      acitve: true,
    });
    const expressPlaylist = new Playlist({
      name: "Express JS",
      type: "Back End",
      videos: 23,
      acitve: true,
    });
    // saving the document
    const result = await Playlist.insertMany([
      // now by insertMany function from the main class we can easily be able to pass more then one document.
      reactPlaylist,
      mongoPlaylist,
      mongoosePlaylist,
      expressPlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
