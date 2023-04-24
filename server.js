const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoConnect = require("./db/connect");

//Routes
const authRoute = require("./routes/authRoutes");
const jobRoute = require("./routes/jobRoutes");

dotenv.config();

//middleware
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!!!");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", jobRoute);

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
