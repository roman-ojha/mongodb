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

// Crearing document or insert
const reactPlaylistPromise = new Playlist({
  name: "ReactJs",
  type: "Front End",
  videos: 80,
  acitve: true,
  // we don't even have to include date here because we have already define the default value for the date
});
// here we are creating an object from the class

// saving the document
reactPlaylistPromise.save();
// save() function will also return promise
// so, in promise it will take a little bit more time to insert documment inside the database so, we will use async await

// this is the new way to create and save the document
const createDocument = async () => {
  // when we are working with async and await you have to put try and catch as well
  try {
    // Crearing document or insert
    const reactPlaylist = new Playlist({
      name: "NodeJS",
      type: "Back End",
      videos: 50,
      acitve: true,
      // we don't even have to include date here because we have already define the default value for the date
      // here we are creating an object from the class
    });
    // saving the document
    const result = await reactPlaylist.save();
    // here now when the document will save to the database then after that it is over then we will store the data inside the result
    // so we know that without async await will not work we have to mention that
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
