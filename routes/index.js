const express = require("express");
const router = express.Router();
const helloRoutes = require("./hello");

router.use(helloRoutes);

module.exports = router;
