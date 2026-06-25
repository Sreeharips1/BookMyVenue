const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

const venueRoutes = require("./routes/venueRoutes");

const bookRoutes = require("./routes/bookingRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("bookmyvenue running successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);
//testing

app.use("/api/test", testRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
