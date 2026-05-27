const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/DB");

const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("bookmyvenue running successfully");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
