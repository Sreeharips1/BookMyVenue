const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/DB");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("bookmyvenue running successfully");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
