//const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const forumsRoutes = require("./routes/forums");
const bookRoutes = require("./routes/books");
const orderRoutes = require("./routes/orders");
const path = require("path");
const { application } = require("express");

// database connection
connection();

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forums", forumsRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  console.log(path.join(__dirname, "client/build"));
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// launch our backend into a port
const API_PORT = process.env.PORT || 3001;
app.listen(API_PORT, console.log(`LISTENING ON PORT ${API_PORT}`));
