const express = require("express");
const app = express();
const adminRouter = require("./routes/adminRoutes");
const ownerRouter = require("./routes/ownerRoutes");
const userRouter = require("./routes/userRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

// global middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/auth/admin", adminRouter);
app.use("/auth/owner", ownerRouter);
app.use("/auth/user", userRouter)

// last error middleware
app.use(errorMiddleware);

module.exports = { app };
