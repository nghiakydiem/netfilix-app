const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("---- Connected to MongoDB ----");
  } catch (error) {
    console.log("Unable to connect to MongoDB:", error);
  }
};

module.exports = connectMongoDB;
