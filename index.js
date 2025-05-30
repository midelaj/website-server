const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const authRouter = require("./src/feature/auth/auth.route");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
