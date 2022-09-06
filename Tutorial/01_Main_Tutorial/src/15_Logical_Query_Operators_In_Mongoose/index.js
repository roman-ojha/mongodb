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
    https://docs.mongodb.com/manual/reference/operator/query-logical/
    # Logical Query Operators
        -> 
            Name        Description
            1) $and     Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
            2) $not     Inverts the effect of a query expression and returns documents that do not match the query expression.
            3) $nor     Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
            4) $or      Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
*/

// reading document
const getDocument = async () => {
  try {
    // $or
    // Syntax: { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
    const orresult = await Playlist.find({
      $or: [{ type: "Database" }, { name: "Javascript" }],
    });
    // console.log(orresult);

    // $and
    // Syntax: { $and: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
    const andresult = await Playlist.find({
      $and: [{ type: "Database" }, { acitve: true }],
    });
    // console.log(andresult);

    // $not
    // Syntax: { field: { $not: { <operator-expression> } } }
    const notresult = await Playlist.find({
      type: { $not: { $eq: "Database" } },
    });
    // console.log(notresult);

    // $nor
    // { $nor: [ { <expression1> }, { <expression2> }, ...  { <expressionN> } ] }
    const norresult = await Playlist.find({
      $nor: [{ name: "Javascript" }, { type: "Database" }],
    });
    console.log(norresult);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
