const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URL);

const database = client.db();

const connectMongoDB = async () => {
  try {
    await client.connect();
    console.log("---- Connected to MongoDB ----");
  } catch (error) {
    console.log("Unable to connect to MongoDB:", error);
  }
};

connectMongoDB();

module.exports = {
  database,
  connectMongoDB,
};
