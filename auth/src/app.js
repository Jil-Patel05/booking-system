const express = require("express");
const app = express();
const adminRouter = require("./routes/adminRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

// global middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/auth/admin", adminRouter);

// last error middleware
app.use(errorMiddleware);

module.exports = { app };
