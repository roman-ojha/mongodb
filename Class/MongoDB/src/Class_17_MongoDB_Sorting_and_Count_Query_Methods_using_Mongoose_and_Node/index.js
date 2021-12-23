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
  // if we want to count the document that meet the requirment or condition
  // we can do this:
  try {
    // const countresult = await Playlist.find({
    //   $and: [{ type: "Database" }, { acitve: true }],
    // }).count();
    // warning: collection.count is deprecated, and will be removed in a future version. Use Collection.countDocuments or Collection.estimatedDocumentCount

    const countresult = await Playlist.find({
      $and: [{ type: "Database" }, { acitve: true }],
    }).countDocuments();
    // here we are using countDocuments to count the document that meet the condition
    // console.log(countresult);

    // if you want do sorting in document then:
    // sorting
    // syntex: { field: value }
    const shortResult = await Playlist.find({ acitve: true }).sort({ name: 1 });
    // 1 -> accending order
    // -1 -> decending order
    console.log(shortResult);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
