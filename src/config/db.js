import mongoose from "mongoose";
import config from "./config.js";

async function connectWithDB() {
  console.log(config.mongodbUrl);
  try {
    await mongoose.connect(config.mongodbUrl);
    console.log("Successfully connected with Database");
  } catch (error) {
    console.log(error.message);
  }
}

export default connectWithDB;
