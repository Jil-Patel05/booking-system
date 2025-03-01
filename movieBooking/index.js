require("dotenv").config({ path: "./src/config/config.env" });
const { app } = require("./src/app");
const { connectMongo } = require("./src/config/mongoDbConnection");
const { pool } = require("./src/config/mysqlDbConnection");
const PORT = 6000 || process.env.PORT;

(async function checkDbConnections() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    connectMongo()
      .then((res) => {
        console.log("Databases are connected successfully");
        app.listen(PORT, () => {
          console.log(`MovieBooking is listing on port ${PORT}`);
        });
      })
      .catch((err) => {
        console.log("Mongo database is not connected", err.message);
        process.exit(1);
      });
  } catch (err) {
    console.log("MySQL database is not connected,", err.message);
    process.exit(1);
  }
})();
