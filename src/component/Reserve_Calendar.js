import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Calendar from "react-calendar";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import "react-calendar/dist/Calendar.css";
import "../css/Reserve_Calendar.css";

const Reserve_Calendar = () => {
  const [leftDate, SetLeftDate] = useState(new Date());
  const [rightDate, SetRightDate] = useState(new Date());
  const today = new Date();
  const [left, setLeft] = useState(
    today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate()
  );
  const [right, setRight] = useState(
    today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate()
  );
  const [markLeft, setMarkLeft] = useState(
    today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate()
  );
  const [markRight, setMarkRight] = useState(
    today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate()
  );
  const [showList, setShowList] = useState([]);

  const handleLeftDateChange = (newDate) => {
    SetLeftDate(newDate);
    let month = newDate.getMonth() + 1;
    let date = newDate.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    setLeft(newDate.getFullYear() + "." + month + "." + date);
  };
  const handleRightDateChange = (newDate) => {
    SetRightDate(newDate);

    let month = newDate.getMonth() + 1;
    let date = newDate.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    setRight(newDate.getFullYear() + "." + month + "." + date);
  };

  const search = () => {
    if (left > right) {
      alert("잘못된 입력입니다.");
      return;
    }
    setMarkLeft(left);
    setMarkRight(right);
    axios
      .get(`http://localhost:5000/getDateList/${left}/${right}`)
      .then((response) => {
        setShowList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ width: "1920px", margin:'auto' }}>
      <Navigation />
      <div className="reserve-calendar">
        <div className="calendar">
          <div className="calendar-title">
            <h3>날짜별 예매</h3>
          </div>
          <div className="calendar-container">
            <Calendar onChange={handleLeftDateChange} value={leftDate} />
          </div>
          <div className="calendar-container">
            <Calendar onChange={handleRightDateChange} value={rightDate} />
          </div>
          <div>
          <Button onClick={() => search()} style={{backgroundColor:'black', color:'white'}}>
            조회하기
          </Button>
          </div>
        </div>
        <div className="calendar-list">
          <div>
            <p>
              <span style={{ color: "red" }}>{markLeft}</span>부터{" "}
              <span style={{ color: "red" }}>{markRight}</span> 까지 총{" "}
              <span style={{ color: "red" }}>{showList.length}개</span> 공연이
              있습니다.
            </p>
          </div>
          <div>
            <div className="calendar-list-title">
              <div style={{width:'50%', borderLeft:'none'}}>상품명</div>
              <div style={{width:'19%'}}>장소</div>
              <div style={{width:'17%'}}>기간</div>
              <div style={{width:'13%'}}>할인</div>
            </div>
            {showList.map((datas, index) => (
              <div className="calendar-list-detail">
                <div className="calendar-list-detail-inside">
                  <div style={{width:'50%'}}>
                    <Link to={`/reservation/${datas.show_ID}`}>
                      <img src={datas.poster_url} alt="공연포스터" />
                    </Link>
                    <Link to={`/reservation/${datas.show_ID}`} style={{textDecoration:'none'}}>
                      <span className="inside-show-name">{datas.show_name}</span>
                    </Link>
                  </div>
                  <div className="inside-div" style={{width:'17%', padding:'0 10px'}}>
                    {datas.show_location}
                  </div>
                  <div className="inside-div" style={{width:'17%', padding:'0 10px'}}>
                    {datas.show_time}
                  </div>
                  <div className="inside-div" style={{width:'16%'}}>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve_Calendar;
