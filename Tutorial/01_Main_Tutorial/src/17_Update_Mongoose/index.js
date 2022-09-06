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

// updating Document
const updateDocument = async (_id) => {
  try {
    // https://docs.mongodb.com/manual/reference/operator/update/
    // here 'update' is now deprecated so we have to use updateOne or updateMany
    // const updateResult=await Playlist.updateOne({_id:id},{$set:{name:"Javascript"}});

    // now we have object distructuring so we can do this:
    // const updateResult = await Playlist.updateOne(
    //   { _id },
    //   { $set: { name: "Javascript" } }
    // );

    const updateResult = await Playlist.findByIdAndUpdate(
      // findByIdAndUpdate() will find the id and update it
      { _id },
      { $set: { name: "Javascript" } },
      {
        new: true,
        // here we are not getting the updateData we are getting the old data which is being updating but we get the older version of the data
        useFindAndModify: false,
        // to remove this error:
        //   `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
      }
    );
    console.log(updateResult);
  } catch (err) {
    console.log(err);
  }
};

// to update we are trying to get the id of that particular document
// let us assumed that this id is comming through API
updateDocument("60d4856efec8171084b25bfd");
