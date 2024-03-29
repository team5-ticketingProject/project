require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.SERVER_PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const xml2js = require("xml2js");
const mysql = require("mysql2");
const macaddress = require('node-macaddress');
const codes = [];
const datas = [];

const dbconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const db = mysql.createPool(dbconfig);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/text", async (req, res) => {
  //데이터 받는 곳
  const code = req.body.name;
  codes.push(code);
});

app.post('/getUserMac', (req, res) => {
  const ID = req.body.user;
  const sql = 'SELECT mac_address FROM `user` WHERE ID = ?';

  db.query(sql, [ID], (err, result) => {
    if(err){
      console.error(err);
    }
    res.send(result);
  })
})

app.post('/saveUserMac', (req, res) => {
  const ID = req.body.user;
  const mac = req.body.mac;
 
  const sql = 'UPDATE `user` set mac_address = ? WHERE `ID` = ?';
  db.query(sql, [mac, ID], (err, result) => {
    if(err){
      console.error(err);
    }
  })
})

app.get('/api/getmacaddress', (req, res) => {
  const userConsent = req.query.userConsent;
  if (userConsent === 'true') {
    macaddress.one(function (err, mac) {
      if (!err) {
        res.json({ mac });
      } else {
        res.status(500).json({ error: 'MAC 주소 가져오기 실패' });
      }
    });
  } else {
    res.status(403).json({ error: '사용자 동의 필요' });
  }
});


app.post("/cancelreservation", async (req, res) => {
  const { reservationId } = req.body;

  // 현재 날짜 가져오기
  const currentDate = new Date();
  
  // 데이터베이스 연결 풀에서 연결 가져오기
  db.getConnection(function (err, connection) {
    if (err) {
      console.error("연결 가져오기 오류:", err);
      return res.status(500).send("내부 서버 오류");
    }

    connection.beginTransaction(function (err) {
      if (err) {
        connection.release(); // 오류 발생 시 연결 해제
        console.error("트랜잭션 시작 오류:", err);
        return res.status(500).send("내부 서버 오류");
      }

      const selectReservationSql = "SELECT cancel_date, show_ID FROM reservation WHERE show_number = ?";
      connection.query(selectReservationSql, [reservationId], function (err, selectResult) {
        if (err) {
          connection.rollback(function () {
            connection.release();
            console.error("트랜잭션 롤백 오류 (선택):", err);
            return res.status(500).send("내부 서버 오류");
          });
        }

        // 선택된 예약의 취소 날짜 가져오기
        const cancelDate = selectResult[0] ? selectResult[0].cancel_date : null;
        const showId = selectResult[0] ? selectResult[0].show_ID : null;

        // 예약 정보가 없거나 이미 취소된 경우
        if (!cancelDate || currentDate > cancelDate) {
          connection.rollback(function () {
            connection.release();
            console.error("취소 실패: 예약 정보가 없거나 이미 취소되었습니다.");
            return res.status(400).send("취소 실패: 예약 정보가 없거나 이미 취소되었습니다.");
          });
        } else {
          const insertCancelSql = `
            INSERT INTO cancelreservation (show_number, show_ID, bank, re_number, cancel_date, re_date, user_ID, DATE, TIME, seat_num, price) 
            SELECT show_number, ?, bank, re_number, ?, re_date, user_ID, DATE, TIME, seat_num, price
            FROM reservation WHERE show_number = ?;
          `;
  
          const deleteReservationSql = "DELETE FROM reservation WHERE show_number = ?";
          
          connection.query(insertCancelSql, [showId, currentDate, reservationId], function (err, insertResult) {
            if (err) {
              connection.rollback(function () {
                connection.release();
                console.error("트랜잭션 롤백 오류 (삽입):", err);
                return res.status(500).send("내부 서버 오류");
              });
            } else {
              console.log("예약이 취소되고 취소 정보로 이동:", insertResult);
  
              connection.query(deleteReservationSql, [reservationId], function (err, deleteResult) {
                if (err) {
                  connection.rollback(function () {
                    connection.release();
                    console.error("트랜잭션 롤백 오류 (삭제):", err);
                    return res.status(500).send("내부 서버 오류");
                  });
                } else {
                  console.log("예약 삭제:", deleteResult);
  
                  // 여기서 `currentDate`를 `cancelday_date` 열에 삽입
                  const updateCancelDateSql = "UPDATE cancelreservation SET cancelday_date = ? WHERE show_number = ?";
                  connection.query(updateCancelDateSql, [currentDate, reservationId], function (err, updateResult) {
                    if (err) {
                      connection.rollback(function () {
                        connection.release();
                        console.error("트랜잭션 롤백 오류 (cancelday_date 업데이트):", err);
                        return res.status(500).send("내부 서버 오류");
                      });
                    } else {
                      console.log("cancelday_date 업데이트 완료:", updateResult);
                      // 트랜잭션 성공 시 커밋
                      connection.commit(function (err) {
                        if (err) {
                          connection.rollback(function () {
                            connection.release();
                            console.error("트랜잭션 롤백 오류 (커밋):", err);
                            return res.status(500).send("내부 서버 오류");
                          });
                        } else {
                          res.status(200).send("예약 정보가 성공적으로 삭제 및 취소 정보로 이동되었으며, cancelday_date 열이 업데이트되었습니다.");
                          connection.release(); // 트랜잭션이 완료되면 연결을 해제합니다.
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  });
});






app.post("/changePassword", (req, res) => {
  
  const { userID, currentPassword, newPassword, confirmNewPassword } = req.body;

  const selectUserQuery = "SELECT pw FROM user WHERE ID = ?";
  db.query(selectUserQuery, [userID], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.status(500).json({ error: "내부 서버 에러" });
    }

    if (selectResults.length === 0) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    const userPassword = selectResults[0].pw;

    if (currentPassword !== userPassword) {
      return res.status(400).json({ error: "비밀번호가 틀립니다." });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "새로운 비밀번호 확인이 일치하지 않습니다." });
    }

    // 2. 비밀번호 업데이트 쿼리
    const updatePasswordQuery = "UPDATE user SET pw = ? WHERE ID = ?";
    db.query(updatePasswordQuery, [newPassword, userID], (updateErr, updateResults) => {
      if (updateErr) {
        console.error(updateErr);
        return res.status(500).json({ error: "비밀번호 업데이트 중 오류가 발생했습니다." });
      }
      
      return res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
    });
  });
});

app.post("/changeEmail", (req, res) => {
  const { userID, newEmail, confirmNewEmail } = req.body;

  // 1. 사용자 조회 쿼리
  const selectUserQuery = "SELECT email FROM user WHERE ID = ?";
  db.query(selectUserQuery, [userID], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.status(500).json({ error: "내부 서버 에러" });
    }

    if (selectResults.length === 0) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    if (newEmail.trim() !== confirmNewEmail.trim()) {
      return res.status(400).json({ error: "새로운 이메일 확인이 일치하지 않습니다." });
    }

    // 2. 이메일 업데이트 쿼리 (오타 수정: eamil -> email)
    const updateEmailQuery = "UPDATE user SET email = ? WHERE ID = ?";
    db.query(updateEmailQuery, [newEmail, userID], (updateErr, updateResults) => {
      if (updateErr) {
        console.error(updateErr);
        return res.status(500).json({ error: "이메일 업데이트 중 오류가 발생했습니다." });
      }

      return res.status(200).json({ message: "이메일이 성공적으로 변경되었습니다." });
    });
  });
});
app.post("/submit_inquiry", (req, res) => {
  const { ID, email, subject, message, userId } = req.body;

  // 데이터베이스에 데이터 삽입
  const sql = 'INSERT INTO personal_inquiry (ID, email, inquiry_title, inquiry_content, inquiry_date, userID) VALUES (?, ?, ?, ?, ?, ?)';
  const currentDate = new Date()
  db.query(sql, [ ID, email, subject, message, currentDate, userId], (err, result) => {
    if (err) {
      console.error('문의 제출 실패:', err);
      res.status(500).send('문의 제출 실패');
    } else {
      console.log('문의가 성공적으로 제출되었습니다.');
      res.status(200).send('문의가 성공적으로 제출되었습니다.');
    }
  });
});
   

app.post("/changePassword", (req, res) => {
  const { userID, currentPassword, newPassword, confirmNewPassword } = req.body;

  const selectUserQuery = "SELECT pw FROM user WHERE ID = ?";
  db.query(selectUserQuery, [userID], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.status(500).json({ error: "내부 서버 에러" });
    }

    if (selectResults.length === 0) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    const userPassword = selectResults[0].pw;

    if (currentPassword !== userPassword) {
      return res.status(400).json({ error: "비밀번호가 틀립니다." });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ error: "새로운 비밀번호 확인이 일치하지 않습니다." });
    }

    // 2. 비밀번호 업데이트 쿼리
    const updatePasswordQuery = "UPDATE user SET pw = ? WHERE ID = ?";
    db.query(
      updatePasswordQuery,
      [newPassword, userID],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error(updateErr);
          return res
            .status(500)
            .json({ error: "비밀번호 업데이트 중 오류가 발생했습니다." });
        }

        return res
          .status(200)
          .json({ message: "비밀번호가 성공적으로 변경되었습니다." });
      }
    );
  });
});

app.post("/changeEmail", (req, res) => {
  const { userID, newEmail, confirmNewEmail } = req.body;

  // 1. 사용자 조회 쿼리
  const selectUserQuery = "SELECT email FROM user WHERE ID = ?";
  db.query(selectUserQuery, [userID], (selectErr, selectResults) => {
    if (selectErr) {
      console.error(selectErr);
      return res.status(500).json({ error: "내부 서버 에러" });
    }

    if (selectResults.length === 0) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    if (newEmail.trim() !== confirmNewEmail.trim()) {
      return res
        .status(400)
        .json({ error: "새로운 이메일 확인이 일치하지 않습니다." });
    }

    // 2. 이메일 업데이트 쿼리 (오타 수정: eamil -> email)
    const updateEmailQuery = "UPDATE user SET email = ? WHERE ID = ?";
    db.query(
      updateEmailQuery,
      [newEmail, userID],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error(updateErr);
          return res
            .status(500)
            .json({ error: "이메일 업데이트 중 오류가 발생했습니다." });
        }

        return res
          .status(200)
          .json({ message: "이메일이 성공적으로 변경되었습니다." });
      }
    );
  });
});

app.post("/submit_inquiry", (req, res) => {
  const { ID, email, subject, message, userId } = req.body;

  // 데이터베이스에 데이터 삽입
  const inquirysql =
    "INSERT INTO personal_inquiry (ID, email, inquiry_title, inquiry_content, inquiry_date, userID) VALUES (?, ?, ?, ?, ?, ?)";
  const currentDate = new Date();
  db.query(
    inquirysql,
    [ID, email, subject, message, currentDate, userId],
    (err, result) => {
      if (err) {
        console.error("문의 제출 실패:", err);
        res.status(500).send("문의 제출 실패");
      } else {
        console.log("문의가 성공적으로 제출되었습니다.");
        res.status(200).send("문의가 성공적으로 제출되었습니다.");
      }
    }
  );
});

//FAQ 등록
app.post("/registerFAQ", async (req, res) => {
  var sql = "INSERT INTO faq (question, answer) VALUES (?)";
  var values = [req.body.question, req.body.answer];

  db.query(sql, [values], function (err, result) {
    if (err) throw err;
  });
});

app.post("/registerNotice", async (req, res) => {
  var sql = "INSERT INTO notice (title, content) VALUES (?)";
  var values = [req.body.title, req.body.content];

  db.query(sql, [values], function (err, result) {
    if (err) throw err;
  });
});

app.post("/getSeatInfo", async (req, res) => {
  const { ID, date, time } = req.body;
  var sql =
    "SELECT seat_num FROM reservation WHERE show_ID = ? AND DATE = ? AND TIME = ?";

  db.query(sql, [ID, date, time], (err, results) => {
    if (err) {
      console.error(err);
    }
    res.json(results);
  });
});

app.get("/getBank", async (req, res) => {
  const sql = "SELECT * FROM discount_rate";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
  });
});

app.get("/getFAQ", async (req, res) => {
  const sql = "SELECT * FROM faq";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
  });
});

app.get("/getNotice", async (req, res) => {
  const sql = "SELECT * FROM notice ORDER BY date DESC;";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
  });
});

app.get("/getRank", async (req, res) => {
  const sql =
    "SELECT show_name, poster_url, show_ID, show_time, ROW_NUMBER() OVER(ORDER BY seat DESC) as show_rank From show_info limit 5";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
  });
});

app.get("/getDB", async (req, res) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  const today = year + "." + month + "." + day;
  const sql = "SELECT * FROM show_info WHERE end_date > ?";

  db.query(sql, [today], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
  });
});

app.get("/getreservation_info", async (req, res) => {
  const sql = "SELECT * FROM reservation";

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

app.get("/searchMembers", (req, res) => {
  const { search, option } = req.query;
  const sql = `SELECT * FROM User WHERE ${option} LIKE ?`; // option에 따라 검색 조건을 변경

  db.query(sql, [`%${search}%`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.get("/getSearchList/:title", async (req, res) => {
  const title = req.params.title;
  const sql = "SELECT * from show_info WHERE show_name LIKE ?;";
  db.query(sql, [`%${title}%`], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/getDateList/:From/:To", async (req, res) => {
  const From = req.params.From;
  const To = req.params.To;
  const sql =
    "SELECT * FROM show_info WHERE (start_date < ? AND end_date >= ?) OR (start_date >= ? AND start_date <= ?)";
  db.query(sql, [From, From, From, To], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/getDetail/:ID", async (req, res) => {
  const ID = req.params.ID;
  const sql = "SELECT * FROM show_info WHERE show_ID = ?";
  db.query(sql, [ID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
  });
});

app.get("/getShowInfo/:ID", async (req, res) => {
  const location = req.params.ID;
  const today = new Date();
  const today2 = new Date();
  today2.setDate(today2.getDate() + 60);

  //(“0” + (this.getMonth() + 1)).slice(-2);
  try {
    const serviceKey = "8cd44b00e6b7438ebee27dfb9f4cdf16";
    const response = await axios.get(
      `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${serviceKey}&stdate=${today.getFullYear()}${("0"+(today.getMonth() + 1)).slice(-2)}${("0"+ today.getDate()).slice(-2)}&eddate=${today2.getFullYear()}${("0"+(today2.getMonth() + 1)).slice(-2)}${("0"+ today2.getDate()).slice(-2)}&cpage=1&rows=5&prfstate=02&signgucode=${location}&signgucodesub=&kidstate=N`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/LoginInfo", async (req, res) => {
  const userId = req.query.id; // 로그인한 사용자의 ID를 쿼리 매개변수로부터 가져옴
  const sql = "SELECT * FROM user WHERE ID = ?"; // 해당 ID에 대한 정보만 가져오도록 쿼리 수정

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
  });
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
            console.log("PK 중복검사");
            if (sql_result[0].count === 0) {
              // 이미 존재하는 ID는 차단
              console.log("데이터 삽입 성공");
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
                0,
                result.dbs.db.dtguidance,
                result.dbs.db.prfcast,
              ];

              db.query(sql, [values], function (err, sql_result2) {
                if (err) throw err;
              });
            } else {
              console.log("PK 중복 에러");
            }
            console.log("---------------------");
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

app.get("/LoginInfo", async (req, res) => {
  const userId = req.query.id; // 로그인한 사용자의 ID를 쿼리 매개변수로부터 가져옴
  const sql = "SELECT * FROM user WHERE ID = ?"; // 해당 ID에 대한 정보만 가져오도록 쿼리 수정

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "내부 서버 에러" });
    }
    res.json(results);
  });
});

// 로그인(관리자 포함)
app.post("/login", (req, res) => {
  var id = req.body.id;
  var pw = req.body.pw;
  const sqlQuery = "select * from user where ID =? and pw =?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    res.send(result);
  });
});

app.post("/reservation", (req, res) => {
  var show_id = req.body.ID;
  var date = req.body.date;
  var time = req.body.time;
  var user = req.body.user;
  var re_number = req.body.re_number;
  var price = req.body.price;
  var seatArr = req.body.seatArr;
  var bank = req.body.bank;
  var name = req.body.name;
  const d = new Date();
  var today = d.toLocaleDateString("ko-KR");
  var parts = date.split('.');
  var formattedDate = new Date(parts[0], parts[1]-1, parts[2]); 
  formattedDate.setDate(formattedDate.getDate() - 7);
  var year = formattedDate.getFullYear();
  var month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  var day = formattedDate.getDate().toString().padStart(2, '0');
  var cancel_date = year + '. ' + month + '. ' + day;

  var sql =
    "SELECT SUM(re_number) as NUM FROM reservation WHERE show_ID = ? AND DATE = ? AND TIME = ?";
  db.query(sql, [show_id, date, time], (err, result) => {
    if (result[0].NUM < 100 && Number(result[0].NUM) + re_number <= 100) {
      var sql2 = "UPDATE show_info SET seat = seat + ? WHERE show_ID = ?";
      db.query(sql2, [re_number, show_id], (err2, result2) => {
        if (err2) {
          console.error(err2);
        }
      });

      var sql3 =
        "INSERT INTO reservation (show_ID, bank, re_number, cancel_date, re_date, user_ID, DATE, TIME, seat_num, price, show_name) VALUES (?)";
      var values = [
        show_id,
        bank,
        re_number,
        cancel_date,
        today,
        user,
        date,
        time,
        seatArr,
        price,
        name
      ];
      db.query(sql3, [values], function (err3, result3) {
        if (err3) throw err3;
        res.json("1");
      });
    } else {
      res.json("2");
    }
  });
});

// ID 중복 체크
app.post("/idcheck", async (req, res) => {
  const id = req.body.id;

  const sql = "select count(*) as 'cnt' from User where ID =?";
  db.query(sql, [id], (err, result) => {
    res.send(result);
  });
});

// 회원가입시 정보 등록
app.post("/signup", async (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const tel = req.body.tel;
  const email = req.body.email;
  const rank = 1;

  var sql2 = "INSERT INTO `user` (ID, pw, tel, email, `rank`) VALUES (?)";
  const val = [id, pw, tel, email, rank];

  db.query(sql2, [val], (err, result) => {
    res.send(result);
  });
});

///////// Notice /////////////////////////////////////////////////////////////////////
app.get("/getNotices", (req, res) => {
  const sql = "SELECT * FROM notice";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.post("/updateNotice", (req, res) => {
  const { notification_ID, title, content } = req.body;
  const sql =
    "UPDATE notice SET title = ?, content = ? WHERE notification_ID = ?";

  db.query(sql, [title, content, notification_ID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "Data updated successfully" });
  });
});

app.delete("/deleteNotice/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM notice WHERE notification_ID = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "Notice deleted successfully" });
  });
});

app.post("/addNotice", (req, res) => {
  const { title, content } = req.body;
  const sql = "INSERT INTO notice (title, content) VALUES (?, ?)";

  db.query(sql, [title, content], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "Data added successfully" });
  });
});

/////////// member /////////////////////////////////////////////////////////////////////
app.get("/getMembers", (req, res) => {
  const sql = "SELECT * From user"; // user_rank에 대한 테이블 이름 수정
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.get("/searchMembers", (req, res) => {
  const { search, option } = req.query;
  const sql = `SELECT * FROM User WHERE ${option} LIKE ?`; // option에 따라 검색 조건을 변경

  db.query(sql, [`%${search}%`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

/////////// Faq
app.get("/getFAQs", (req, res) => {
  const sql = "SELECT * FROM faq";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.post("/registerFAQ", (req, res) => {
  const { question, answer } = req.body;
  const sql = "INSERT INTO faq (question, answer) VALUES (?, ?)";

  db.query(sql, [question, answer], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const insertedFAQ = {
      ID: results.insertId,
      question,
      answer,
    };

    res.json(insertedFAQ);
  });
});

app.delete("/deleteFAQ/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM faq WHERE ID = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "FAQ deleted successfully" });
  });
});

app.post("/changeDiscountRate", (req, res) => {
  const { bank, rate } = req.body;

  var sql = "UPDATE discount_rate SET discount_rate = ? WHERE bank = ?";

  db.query(sql, [Number(rate), bank], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json("1");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.get('/getReview/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM review WHERE userID = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.put('/updateReview/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;
  const updatedContent = req.body.content;
  const sql = 'UPDATE review SET content = ? WHERE review_number = ?';
  db.query(sql, [updatedContent, reviewId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Review updated successfully' });
    }
  });
});

app.delete('/deleteReview/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;
  const sql = 'DELETE FROM review WHERE review_number = ?';
  db.query(sql, [reviewId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Review deleted successfully' });
    }
  });
});

app.put('/deleteMac/:UserId', (req, res) => {
  const userId = req.params.UserId;
  const sql = 'UPDATE user SET mac_address = NULL WHERE ID = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Mac deleted successfully' });
    }
  });
});



// Reservation_Tabs 결제페이지 하단 후기 -> 마이페이지 Reivew
app.get('/getReview', async (req, res) => {
  const sql = 'SELECT * FROM review';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

app.post('/addReview', (req, res) => {
  const show_name = req.body.show_name;
  const ID = req.body.user;
  const content = req.body.content;
  const rating = req.body.rating;

  const sql = 'INSERT INTO review (ID, show_name, content, rating) VALUES (?, ?, ?, ?)';
  const values = [ID, show_name, content, rating];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Data added successfully' });
  });
});
