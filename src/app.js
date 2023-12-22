require("dotenv").config();
require("express-async-errors");
const mongoose = require("mongoose");


const express = require("express");
const app = express();

const adminRoutes = require('./routes/adminsRoutes')
const studentRoutes = require('./routes/studentsRoutes')
const teacherRoutes = require('./routes/teachersRoutes')

// error handler

app.use(express.json());
// extra packages

// Main Route
app.get("/", (req, res) => {
  res.send("University Crud");
});

// Routes
app.use('/api')
app.use("/api", adminRoutes);
app.use("/api", teacherRoutes);
app.use("/api", studentRoutes);


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
