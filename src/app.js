require("dotenv").config();
require("express-async-errors");
const mongoose = require("mongoose");


const express = require("express");
const app = express();

// error handler

app.use(express.json());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("University Crud");
});

// Routes
app.use('/api')


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected!");

    app.listen(port, () => console.log(`Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
