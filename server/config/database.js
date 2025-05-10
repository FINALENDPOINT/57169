const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "103.66.86.234",
  user: "unteyojo_atun",
  password: ")?9hi-o--AYI",
  database: "unteyojo_PortalNews",
});

module.exports = pool;
