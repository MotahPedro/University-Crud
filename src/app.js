require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// error handler

app.use(express.json());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("Students Crud");
});


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
