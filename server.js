require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1", routes);
const port = config.system.port;
