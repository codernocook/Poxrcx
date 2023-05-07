module.exports = function() {
  const express = require("express");
  const { exec } = require("child_process");

  const app = express();

  app.listen(3000, () => { })
  let counter = false;

  app.use((req, res, next) => {
    res.status(200).json({
      "online": true
    })
}
