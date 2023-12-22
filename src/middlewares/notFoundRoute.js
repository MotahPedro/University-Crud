const express = require('express')

function notFoundRoute (req, res) {
    res
      .status(404)
      .json({
        msg: "Whoops, looks like this route does not exist. Go back to the main page!",
      });
}

module.exports = notFoundRoute