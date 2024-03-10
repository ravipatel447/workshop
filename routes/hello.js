const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/hello", controller.hello.helloToUsers);

module.exports = router;
