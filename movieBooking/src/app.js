const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { adminRouter } = require("./routes/adminRouter");
const app = express();

// Global middleware
app.use(express.json());
app.use(cookieParser);

// routes
app.use("/auth/admin", adminRouter);
// app.use("/auth/owner", ownerRouter);
// app.use("/auth/user", userRouter);

// last error middleware
app.use(errorMiddleware);

module.exports = { app };
