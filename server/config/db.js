const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Mongodb connected");
  } catch (error) {
    console.error("error occured", error);
  }
};

module.exports = connectDB;
