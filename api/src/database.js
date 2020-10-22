const mysql = require('mysql')

const database = mysql.createConnection({
  host: "db",
  port: "3306",
  user: "zach",
  password: "toor",
  database: "piChapter"
});

module.exports = database;
