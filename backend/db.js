const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Root05050400",
  database: "jbq_db",
});

module.exports = pool;
