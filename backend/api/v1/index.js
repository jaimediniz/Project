const express = require("express");
const router = express.Router();

const { loginFunction } = require("../functions/functions");

router.use("/login", loginFunction);

module.exports = app;
