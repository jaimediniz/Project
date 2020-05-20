const express = require("express");
const router = express.Router();

router.use("/v0", require("./v0"));
router.use("/v1", require("./v1"));

module.exports = router;
