const mysql = require("mysql2");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  })
  .promise(); // promise based query to mysql not callback based

module.exports = { pool };
