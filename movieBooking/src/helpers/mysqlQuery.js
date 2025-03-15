const { pool } = require("../config/mysqlDbConnection");

// SQL injection -- learn about that to avoid use prepared statements
// Use execute method for prepared statements
// Prepared statements is percompiled and stored on memory make system efficient but consumer memory as well
// User input is considered as string input not query struture

async function getQuery(query, params) {
  try {
    const [row, fields] = await pool.execute(query, params);
    return [row, fields];
  } catch (err) {
    console.log("Error while fetching data from MySQL,", err.message);
  }
}

async function insetAndUpdateQuery(query, params, next) {
  try {
    const result = await pool.execute(query, params);
    return result;
  } catch (err) {
    console.log("Error while inserting data from MySQL,", err.message);
  }
}

module.exports = { getQuery, insetAndUpdateQuery };
