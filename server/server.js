const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/DB");

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

const venueRoutes = require("./routes/venueRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("bookmyvenue running successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
//testing

app.use("/api/test", testRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
