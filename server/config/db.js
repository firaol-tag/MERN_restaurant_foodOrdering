const mongoose = require("mongoose");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
db.connect((err) => {
  if (err) {
    console.log("there is something happed with database " + "(" + err + ")");
  } else {
    console.log("database is connected");
  }
});
module.exports = db;
