const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// =====================================
// MYSQL CONNECTION - AWS RDS
// =====================================

const db = mysql.createConnection({
  host: "learnhub-rds.c92wo2882wnp.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "YOUR_RDS_PASSWORD",
  database: "learnhub",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }

  console.log("✅ MySQL connected successfully");
});


// =====================================
// HOME
// =====================================

app.get("/", (req, res) => {
  res.json({
    message: "LearnHub Backend is running!",
  });
});


// =====================================
// GET ALL USERS
// =====================================

app.get("/api/users", (req, res) => {
  const sql = `
    SELECT *
    FROM users
    ORDER BY id ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Users fetch error:", err.message);

      return res.status(500).json({
        message: "Unable to fetch users.",
      });
    }

    res.json(results);
  });
});


// =====================================
// REGISTER
// =====================================

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  const checkSql = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error("Register check error:", err.message);

      return res.status(500).json({
        message: "Database error.",
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        message: "Email already registered.",
      });
    }

    const sql = `
      INSERT INTO users
      (name, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [name, email, password],
      (err, result) => {
        if (err) {
          console.error("Register error:", err.message);

          return res.status(500).json({
            message: "Registration failed.",
          });
        }

        res.status(201).json({
          message: "Registration successful.",

          user: {
            id: result.insertId,
            name,
            email,
          },
        });
      }
    );
  });
});


// =====================================
// LOGIN
// =====================================

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  const sql = `
    SELECT id, name, email
    FROM users
    WHERE email = ? AND password = ?
  `;

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Login error:", err.message);

      return res.status(500).json({
        message: "Database error.",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    res.json({
      message: "Login successful.",
      user: results[0],
    });
  });
});


// =====================================
// GET ALL COURSES
// =====================================

app.get("/api/courses", (req, res) => {
  const sql = `
    SELECT *
    FROM courses
    ORDER BY id ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Courses fetch error:", err.message);

      return res.status(500).json({
        message: "Unable to fetch courses.",
      });
    }

    res.json(results);
  });
});


// =====================================
// GET SINGLE COURSE
// =====================================

app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;

  const sql = `
    SELECT *
    FROM courses
    WHERE id = ?
  `;

  db.query(sql, [courseId], (err, results) => {
    if (err) {
      console.error("Single course error:", err.message);

      return res.status(500).json({
        message: "Unable to fetch course.",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Course not found.",
      });
    }

    res.json(results[0]);
  });
});


// =====================================
// SAVE / UPDATE PROGRESS
// =====================================

app.post("/api/progress", (req, res) => {
  const { user_id, course_id } = req.body;

  if (!user_id || !course_id) {
    return res.status(400).json({
      message: "user_id and course_id are required.",
    });
  }

  const checkSql = `
    SELECT *
    FROM progress
    WHERE user_id = ?
    AND course_id = ?
  `;

  db.query(checkSql, [user_id, course_id], (err, results) => {
    if (err) {
      console.error("Progress check error:", err.message);

      return res.status(500).json({
        message: "Database error.",
      });
    }

    if (results.length > 0) {
      const updateSql = `
        UPDATE progress
        SET completed = 1,
            completed_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
        AND course_id = ?
      `;

      db.query(updateSql, [user_id, course_id], (err) => {
        if (err) {
          console.error("Progress update error:", err.message);

          return res.status(500).json({
            message: "Unable to update progress.",
          });
        }

        return res.json({
          message: "Progress updated successfully.",
        });
      });

      return;
    }

    const insertSql = `
      INSERT INTO progress
      (
        user_id,
        course_id,
        completed,
        completed_at
      )
      VALUES (?, ?, 1, CURRENT_TIMESTAMP)
    `;

    db.query(insertSql, [user_id, course_id], (err) => {
      if (err) {
        console.error("Progress insert error:", err.message);

        return res.status(500).json({
          message: "Unable to save progress.",
        });
      }

      res.json({
        message: "Lesson completed successfully.",
      });
    });
  });
});


// =====================================
// GET USER PROGRESS
// =====================================

app.get("/api/progress/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT
      progress.id,
      progress.user_id,
      progress.course_id,
      progress.completed,
      progress.completed_at,
      courses.title AS course_name
    FROM progress
    LEFT JOIN courses
      ON progress.course_id = courses.id
    WHERE progress.user_id = ?
    ORDER BY progress.id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("User progress error:", err.message);

      return res.status(500).json({
        message: "Unable to get progress.",
      });
    }

    res.json(results);
  });
});


// =====================================
// GET ALL USERS PROGRESS
// =====================================

app.get("/api/all-progress", (req, res) => {
  const sql = `
    SELECT
      progress.id,

      users.id AS user_id,
      users.name,
      users.email,

      courses.id AS course_id,
      courses.title AS course_name,

      progress.completed,
      progress.completed_at

    FROM progress

    INNER JOIN users
      ON progress.user_id = users.id

    INNER JOIN courses
      ON progress.course_id = courses.id

    ORDER BY progress.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("All progress error:", err.message);

      return res.status(500).json({
        message: "Unable to fetch all progress.",
      });
    }

    res.json(results);
  });
});


// =====================================
// START SERVER
// =====================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 LearnHub Backend running on http://localhost:${PORT}`
  );
});