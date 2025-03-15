const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const adminRouter = require("./routes/adminRoutes");
const ownerRouter = require("./routes/ownerRoutes");
const app = express();

// Global middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/movie/admin", adminRouter);
app.use("/movie/owner", ownerRouter);
// app.use("/auth/user", userRouter);

// last error middleware
app.use(errorMiddleware);

module.exports = { app };
