const mongoose = require("mongoose");
const mysql = require("mysql");
const db = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port:process.env.DPORT
  },
  console.log("db connected"));
// const connectDB = async () => {
//   await mongoose
//     .connect("mongodb://localhost:27017/fooddelivery")
//     .then(() => console.log("db connected"));
// };
module.exports = db;
