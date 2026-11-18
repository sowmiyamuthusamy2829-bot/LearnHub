const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "learnhub-rds.c92wo2882wnp.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password:"XXXXXXXXXX",
    database: "learnhub"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("MySQL connected successfully");
});

module.exports = db;