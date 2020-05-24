const express = require("express");
const router = express.Router();
const { dataBase } = require("../data");

router.get("/", (req, res) => {
  return res.status(200).json({
    error: false,
    msg: "Home Page",
    data: {},
  });
});

module.exports = router;
