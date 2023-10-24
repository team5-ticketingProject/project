const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const xml2js = require("xml2js");
const mysql = require("mysql2");
const codes = [];
const datas = [];

const dbconfig = {
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "show_data",
};

const db = mysql.createPool(dbconfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // 
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.post("/text", async (req, res) => {
  //데이터 받는 곳
  const code = req.body.name;
  codes.push(code);
});

app.post("/submit_inquiry", (req, res) => {
  const { userId, email, subject, message } = req.body;

  // 데이터베이스에 데이터 삽입
  const sql = 'INSERT INTO personal_inquiry (ID, email, inquiry_title, inquiry_content, inquiry_date) VALUES (?, ?, ?, ?, ?)';
  const currentDate = new Date()
  db.query(sql, [ userId, email, subject, message, currentDate], (err, result) => {
    if (err) {
      console.error('문의 제출 실패:', err);
      res.status(500).send('문의 제출 실패');
    } else {
      console.log('문의가 성공적으로 제출되었습니다.');
      res.status(200).send('문의가 성공적으로 제출되었습니다.');
    }
  });
});

//FAQ 등록
app.post("/registerFAQ", async (req, res) => {
  var sql = 'INSERT INTO faq (question, answer) VALUES (?)';
  var values = [
    req.body.question,
    req.body.answer,
  ];

  db.query(sql, [values], function (err, result) {
    if(err) throw err;
  });
})

app.post("/registerNotice", async (req, res) => {
  var sql = 'INSERT INTO notice (title, content) VALUES (?)';
  var values = [
    req.body.title,
    req.body.content,
  ];

  db.query(sql, [values], function (err, result) {
    if(err) throw err;
  });
})

app.get('/getFAQ', async (req, res) => {
  const sql = 'SELECT * FROM faq';

  db.query(sql, (err, results) => {
    if(err){
      console.error(err);
      return res.status(500).json({error: '내부 서버 에러'});
    }
    res.json(results);
  })
})

app.get('/getNotice', async (req, res) => {
  const sql = 'SELECT * FROM notice';

  db.query(sql, (err, results) => {
    if(err){
      console.error(err);
      return res.status(500).json({error: '내부 서버 에러'});
    }
    res.json(results);
  })
})

app.get('/getRank', async(req, res) => {
  const sql = 'SELECT show_name, poster_url, ROW_NUMBER() OVER(ORDER BY seat ASC) as show_rank From show_info limit 5';

  db.query(sql, (err, results) => {
    if(err){
      console.error(err);
      return res.status(500).json({error: '내부 서버 에러'});
    }
    res.json(results);
  })
})

app.get('/getDB', async (req, res) => {
  const sql = 'SELECT * FROM show_info';

  db.query(sql, (err, results) => {
    if(err){
      console.error(err);
      return res.status(500).json({error: '내부 서버 에러'});
    }
    res.json(results);
  });
});

app.get("/getreservation_info", async (req, res) => {
  const sql = "SELECT * FROM reservation_info";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
    });
  });
app.get("/getpersonal_inquiry", async (req, res) => {
    const sql = "SELECT * FROM personal_inquiry";

    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "내부 서버 에러" });
      }
      res.json(results);
      });
});   

app.get('/getSearchList/:title', async (req, res) => {
  const title = req.params.title;
  const sql = 'SELECT * from show_info WHERE show_name LIKE ?;'
  db.query(sql, [`%${title}%`], (err, results) => {
    if(err){
      console.error(err);
      res.status(500).json({error: 'Internal server error'});
    }
    else{
      res.json(results);
    }
  })
})

app.get('/getDateList/:From/:To', async (req, res) => {
  const From = req.params.From;
  const To = req.params.To;
  const sql = "SELECT * FROM show_info WHERE (start_date < ? AND end_date >= ?) OR (start_date >= ? AND start_date <= ?)";
  db.query(sql, [From, From, From, To], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});


app.get('/getDetail/:ID', async (req, res) => {
  const ID = req.params.ID;
  const sql = "SELECT * FROM show_info WHERE show_ID = ?";
  db.query(sql, [ID], (err, results) => {
    if(err){
      console.error(err);
      return res.status(500).json({error: '내부 서버 에러'});
    }
    res.json(results);
  })
})

app.get('/getShowInfo/:ID', async (req, res) => {
  const location = req.params.ID;
  try {
    const serviceKey = '8cd44b00e6b7438ebee27dfb9f4cdf16';
    const response = await axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${serviceKey}&stdate=20230901&eddate=20231230&cpage=1&rows=5&prfstate=02&signgucode=${location}&signgucodesub=&kidstate=N`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/getShowList/:ID", async (req, res) => {
  const location = req.params.ID;
  try {
    datas.splice(0);
    const serviceKey = "8cd44b00e6b7438ebee27dfb9f4cdf16";
    const fetchDataPromises = codes.map((code) =>
      axios.get(
        `http://www.kopis.or.kr/openApi/restful/pblprfr/${code}?service=${serviceKey}`
      )
    );

    const responses = await Promise.all(fetchDataPromises);
    datas.push(...responses.map((response) => response.data));

    const parser = new xml2js.Parser({ explicitArray: false });
    for (let i = 0; i < datas.length; i++) {
      parser.parseString(datas[i], (err, result) => {
        if (err) {
          console.error("Failed to parse XML:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        try {
          var sql = "SELECT COUNT(*) AS count FROM show_info WHERE show_ID = ?";
          db.query(sql, [result.dbs.db.mt20id], function (err, sql_result) {
            if (err) throw err;
            console.log('PK 중복검사');
            if (sql_result[0].count === 0) {   // 이미 존재하는 ID는 차단
              console.log('데이터 삽입 성공');
              var sql = "INSERT INTO show_info VALUES (?)";
              var values = [
                result.dbs.db.mt20id,
                result.dbs.db.prfnm,
                location,
                result.dbs.db.fcltynm,
                result.dbs.db.prfpdfrom,
                result.dbs.db.prfpdto,
                result.dbs.db.pcseguidance,
                result.dbs.db.poster,
                100,
                result.dbs.db.dtguidance,
                result.dbs.db.prfcast,
              ];

              db.query(sql, [values], function (err, sql_result2) {
                if (err) throw err;
              });
            }
            else{
              console.log('PK 중복 에러');
            }
            console.log('---------------------');
          });
        } catch (error) {
          console.error("데이터 삽입 실패:", error);
          return res.status(500).json({ error: "내부 서버 오류" });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});