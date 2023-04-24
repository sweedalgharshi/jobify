const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// mongoose.connection.once("open", () => {
//   console.log("MongoDb Connection Ready....");
// });

// mongoose.connection.on("error", (err) => {
//   console.error(err);
// });

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URL);
}

module.exports = mongoConnect;
