const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "kyoko",
  password: process.env.MYSQL_PASSWORD || "example",
  database: process.env.MYSQL_DATABASE || "example",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

app.post("/api/memos", (req, res) => {
  const { text, tags } = req.body;
  const query = "INSERT INTO memos (text, tags) VALUES (?, ?)";
  db.query(query, [text, JSON.stringify(tags)], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ id: results.insertId, text, tags });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
