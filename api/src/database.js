const mysql = require('mysql')

const database = mysql.createPool({
  connectLimit: 100,
  host: "db-svc.pi.svc.cluster.local",
  port: "3306",
  user: "zach",
  password: "toor",
  database: "piChapter"
});

module.exports = database;
