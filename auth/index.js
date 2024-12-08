const { app } = require("./src/app");
const { connectMongo } = require("./src/config/dbconnection");
require("dotenv").config({ path: "./src/config/config.env" });
const PORT = 5000 || process.env.PORT;

connectMongo()
  .then((res) => {
    console.log(
      `mongoDB connected successfully with server ${res.connection.host}`
    );
    app.listen(PORT, () => {
      console.log(`Server is listing on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database is not connected");
  });
