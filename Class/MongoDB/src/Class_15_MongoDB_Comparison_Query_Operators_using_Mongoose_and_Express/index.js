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

/*
    -> if you want to see about the operator the you can visit:
        https://docs.mongodb.com/manual/reference/operator/

    # Comparison Querry Operators
        -> '$' represent as operator

           Name        Description
        1) $eq         Matches values that are equal to a specified value.
        2) $gt         Matches values that are greater than a specified value.
        3) $gte        Matches values that are greater than or equal to a specified value.
        4) $in         Matches any of the values specified in an array.
        5) $lt         Matches values that are less than a specified value.
        6) $lte        Matches values that are less than or equal to a specified value.
        7) $ne         Matches all values that are not equal to a specified value.
        8) $nin        Matches none of the values specified in an array.
*/

// reading document
const getDocument = async () => {
  try {
    // $gt:
    // Syntax: {field: {$gt: value} }
    const gtresult = await Playlist.find({ videos: { $gt: 50 } });

    // $gte:
    // Syntax: {field: {$gte: value} }
    // const gtresult = await Playlist.find({ videos: { $gte: 50 } });

    // $lt:
    // Syntax: {field: {$lt: value} }
    // const gtresult = await Playlist.find({ videos: { $lt: 50 } });

    // $lte:
    // Syntax: {field: {$lte: value} }
    // const gtresult = await Playlist.find({ videos: { $lte: 50 } });
    // console.log(gtresult);

    // $in
    // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
    const inresult = await Playlist.find({
      type: { $in: ["Database", "Back End"] },
      // if in type field if 'Database' and 'Back End' data will match then it will return
    });
    // console.log(inresult);

    // $nin
    // { field: { $nin: [ <value1>, <value2> ... <valueN> ]} }
    const ninresult = await Playlist.find({
      type: { $nin: ["Database", "Back End"] },
      // if in type field if 'Database' and 'Back End' data will match then it will return
    });
    console.log(ninresult);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
