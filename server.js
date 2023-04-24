const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoConnect = require("./db/connect");

dotenv.config();

//middleware
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

app.get("/", (req, res) => {
  res.send("Welcome!!!");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoConnect();

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
