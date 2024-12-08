const mongoose = require("mongoose");

async function connectMongo() {
  return await mongoose.connect(process.env.MONGO_CONNECTION_URI);
}

module.exports = { connectMongo };