// 서버의 app.js 또는 server.js 파일
const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql2");

// MySQL 연결 설정
const dbconfig = {
  host: "localhost",
  user: "root",
  password: "123456", // MySQL 비밀번호
  database: "show_data", // 데이터베이스 이름
};

const db = mysql.createPool(dbconfig);

// 노트 리스트 가져오기
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

// FAQ 리스트 가져오기
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
