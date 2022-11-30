//const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// launch our backend into a port
const API_PORT = 3001;
app.listen(API_PORT, console.log(`LISTENING ON PORT ${API_PORT}`));
