const mysql = require('mysql')

const database = mysql.createConnection({
  host: "db",
  port: "3306",
  user: "zach",
  password: "ZachAndr2020#@",
  database: "brothers"
});

module.exports = database;
