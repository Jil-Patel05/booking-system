const { app } = require("./src/app");
const { connectMongo } = require("./src/config/dbconnection");
require("dotenv").config({ path: "./src/config/config.env" });
const PORT = 5000 || process.env.PORT;

// Always do schema validation for request coming and response for frontend to backend call
// backend to frontend response, backend to DB call, or any other call provide proper models
// so that incoming and outgoing schema doesn't contain some
// any malicious fields.

connectMongo()
  .then((res) => {
    console.log(
      `mongoDB connected successfully with server ${res.connection.host}`
    );
    app.listen(PORT, () => {
      console.log(`Auth is listing on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database is not connected");
  });
