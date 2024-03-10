require("dotenv").config();
const express = require("express");
const cors = require("cors");
const database = require("./db/Database");
const config = require("./config/config");
const { errorController } = require("./controllers");
const routes = require("./routes");
const { tokenService } = require("./services");
const cookieParser = require("cookie-parser");
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const catchAsync = require("./utils/catchAsync");
const { tokenMessages } = require("./messages");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use(async (req, res, next) => {
//   if (req.query) {
//     res.locals.query = req.query;
//   }
//   const cookies = req.cookies;
//   if (cookies.token) {
//     req.headers["authorization"] = cookies.token;
//     try {
//       const user = await tokenService.verifyToken(cookies.token);
//       if (user) {
//         req.user = user;
//         res.locals.user = user;
//       }
//     } catch (err) {
//       //pass
//       res.locals.user = null;
//       return next();
//     }
//   } else {
//     res.locals.user = null;
//   }
//   next();
// });

app.use("/api/v1", routes);
app.use(express.static("public"));

// error handler
app.all(
  "*",
  catchAsync(async (req, res) => {
    throw new ApiError(
      tokenMessages.error.PAGE_NOT_FOUND,
      httpStatus.NOT_FOUND
    );
  })
);
app.use(errorController);

const port = config.system.port;

database
  ._connect()
  .then(() => {
    console.log("DataBase Connected Successfully");
    app.listen(port, () => {
      console.log(`[SERVER][START]: http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(`[SERVER][ERROR]: `, err);
  });
