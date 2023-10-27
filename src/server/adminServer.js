const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser"); // 요청 본문(body) 파싱을 위한 미들웨어 추가

const dbconfig = {
  host: "127.0.0.1",
  user: "root",
  password: "123456", // MySQL 비밀번호
  database: "show_data", // 데이터베이스 이름
};

const db = mysql.createPool(dbconfig);
app.use(cors());
app.use(bodyParser.json()); // JSON 요청 본문(body) 파싱 설정

/////////// member /////////////////////////////////////////////////////////////////////

app.get("/getMembers", (req, res) => {
  const sql = "SELECT ID, tel, email, rank FROM User"; // 테이블명을 변경된 이름으로 복구
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});


///////// Notice /////////////////////////////////////////////////////////////////////
app.get('/getNotices', (req, res) => {
  const sql = 'SELECT * FROM notice';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

app.post('/updateNotice', (req, res) => {
  const { notification_ID, title, content } = req.body;
  const sql = 'UPDATE notice SET title = ?, content = ? WHERE notification_ID = ?';

  db.query(sql, [title, content, notification_ID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Data updated successfully' });
  });
});

app.delete('/deleteNotice/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM notice WHERE notification_ID = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Notice deleted successfully' });
  });
});

app.post('/addNotice', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO notice (title, content) VALUES (?, ?)';

  db.query(sql, [title, content], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Data added successfully' });
  });
});




/////////// Faq /////////////////////////////////////////////////////////////////////
app.get('/getFAQs', (req, res) => {
  const sql = 'SELECT * FROM faq';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

app.post('/registerFAQ', (req, res) => {
  const { question, answer } = req.body;
  const sql = 'INSERT INTO faq (question, answer) VALUES (?, ?)';

  db.query(sql, [question, answer], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const insertedFAQ = {
      ID: results.insertId,
      question,
      answer,
    };

    res.json(insertedFAQ);
  });
});

app.delete('/deleteFAQ/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM faq WHERE ID = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'FAQ deleted successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
