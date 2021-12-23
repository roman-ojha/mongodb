/*
    -> mongodb BSON has the restriction of only be able to upload the file upto 16MB
    -> so, GridFS is a spacification for storing and retrieving files that excedd the BSON-document size limit of 16MB
    -> to handle the uploading we will going to use 'multer'
    -> and we will use girdfs-stream which easily stream files to and from mongoDB GridFS.
    -> here we will going to use 'mLab' database which is remote mongoDB database
    -> now install package:
        -> npm i express ejs body-parser mongoose multer multer-gridfs-storage gridfs-stream method-override

    -> Doucmentation:
      -> https://github.com/aheckmann/gridfs-stream
      -> https://github.com/devconcept/multer-gridfs-storage
*/

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const path = require("path");
const crypto = require("crypto");
// 'crypto' to generate a file name
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
// for now we will going to create and model for database we will going to use 'GridFS-Stream' to do CRUD operation
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const fs = require("fs");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride("_method"));
// this just telling it that we want to use a query string when we create our form in order to make a delete request
app.set("view engine", "ejs");
// if you want to use react the you can do that but right now we are using 'ejs' module
app.set("views", path.join(__dirname, "../views"));

// Mongo URI
const mongoURI = process.env.DATABASE;

const conn = mongoose.createConnection(mongoURI);

// Init gfs
var gfs;
conn.once("open", () => {
  // initialize Stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  // here we are using 'uploads' for collection name
});

// Creating storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // here it returning a promise
      crypto.randomBytes(16, (err, buf) => {
        // rendeomBytes is use to generage name of 16 character
        if (err) {
          return reject(err);
          // if there is an error the we will going to use the promise reject and throw the error
        }
        // if not error the we will going to create the file name with the extentation
        const filename = buf.toString("hex") + path.extname(file.originalname);
        // we are going to have a object called file info with the file name along with the bucketName
        // the bucketName name should match the colleciton name
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
        // and we are going to resolve the promise with that file info
      });
    });
  },
});
const upload = multer({ storage });
// remember we had made '/upload' in form tag in 'index.ejs' file , and we can then use that this upload variable to use that as middleware so that it upload to the database

// @route GET /
// @desc Loads form
app.get("/", (req, res) => {
  // here we are trying to displaying the image in the home screen
  gfs.files.find().toArray((err, files) => {
    // Check if file exist
    if (!files || files.length === 0) {
      res.render("index", { files: false });
    } else {
      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render("index", { files: files });
      // here we are rendering the image where each file have 'isImage' through we will render it
    }
  });
  // res.render("index");
  // here we are rendering 'index' html file
});

// @route POST /upload
// @desc Uploads file to DB
app.post("/upload", upload.single("file"), (req, res) => {
  // here we are using 'single' because we are uploading single file with multer
  // but you can upload multiple file as an array
  // in 'single()' argument we will going to pass the name for the file field, where in our form field in input tag in index.ejs we use name="file" , so we will put 'file' as an argument
  // res.json({ file: req.file });
  res.redirect("/");
});

// @route GET /files
// @desc Display all files in JSON
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // we can se the gridFS stream, the way we do on mongose model
    // we want to turns this into an array so we will say toArray()
    // to array will take an error and file if it will return a file
    // Check if file exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }
    // file do exist
    return res.json(files);
    // here we are sending files array
  });
});

// @route GET /files/:filename
// @desc Display Signel file object
app.get("/files/:filename", (req, res) => {
  // here we are making a route for every single file name
  // here file name will get from the url
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file exist
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // File exists
    return res.json(file);
  });
});

// now we will going to make images route where if we will go to /images then it will display the image not the data
// for that we have to use 'ReadStream'
// @route GET /image/:filename
// @desc Display image
app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file

    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      // var efs = Grid(conn.db, mongoose.mongo);
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete("/files/:id", (req, res) => {
  // here remove method will remove the given id file which the given collection name
  gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect("/");
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`connecting from ${port}`);
});
