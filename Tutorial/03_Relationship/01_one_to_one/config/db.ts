import mongoose from "mongoose";

const DATABASE = process.env.DATABASE as string;

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
