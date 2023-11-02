import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Reservation.css";
import Navigation from "./Navigation";
import moment from "moment";
import Payment from "./payment/Payment";
import PaymentModal from "./payment/PaymentModal";
import ReservationTabs from "./ReservationTabs";
import { Button, ButtonGroup } from "@mui/material";

const Reservation = () => {
  const [info, SetInfo] = useState([]);
  const id = useParams();
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [time3, setTime3] = useState("");
  const [time4, setTime4] = useState("");
  const [reNumber, setReNumber] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const week = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedOption, setSelectedOption] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedBank, setSelectedBank] = useState('기타');
  const [bank, setBank] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [reservatedSeat, setReservatedSeat] = useState([]);
  const [mac, setMac] = useState("");
  const [userMac, setUserMac] = useState("");
  const [showName, setShowName] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    for(let i = 0 ; i < bank.length ; i++){
      if(bank[i].bank === e.target.value){
        setDiscount(bank[i].discount_rate);
        setSelectedBank(bank[i].bank);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getDetail/${id.show_ID}`)
      .then((response) => {
        SetInfo(response.data);
        setShowName(response.data[0].show_name);
        let split_price = response.data[0].price.split(",");
        let temp_price = "";
        for (let i = 0; i < split_price[0].length; i++) {
          if (split_price[0][i] >= "0" && split_price[0][i] <= "9") {
            temp_price += split_price[0][i];
          }
          else{
            temp_price = '';
          }
        }
        for (let i = 0; i < split_price[1].length; i++) {
          if (split_price[1][i] >= "0" && split_price[1][i] <= "9") {
            temp_price += split_price[1][i];
          }
        }
        setPrice(Number(temp_price));
      })
      .catch((error) => {
        console.error(error);
      });

    let temp = id.show_time.split(")");
    for (let i = 0; i < temp.length - 1; i++) {
      while (temp[i][0] === "," || temp[i][0] === " ") {
        temp[i] = temp[i].slice(1);
      }
      temp[i] += ")";
      let first = temp[i][0];
      let second = "";
      if (temp[i][4] === "~") {
        second = temp[i][6];
      }
      let temp2 = false;
      let show_day = [];
      for (let i = 0; i < week.length; i++) {
        if (week[i] === first) {
          temp2 = true;
        }
        if (temp2) {
          show_day.push(week[i]);
          if (second === "") {
            break;
          }
        }
        if (week[i] === second) {
          break;
        }
      }
      let temp3 = temp[i].split("(");
      temp3[1] = temp3[1].slice(0, temp3[1].length - 1);
      temp3.push(show_day);
      let temp4 = [];
      temp4.push(temp3[2]); // temp4 배열에 요일 정보를 넣음
      temp4.push(temp3[1].split(",")); // temp4 배열에 시간 정보를 넣음
      setSchedule((schedule) => [...schedule, temp4]); // schedule 배열에 temp4를 넣음
    }

    if (info.length > 0) {
      let which_day = week[date.getDay() - 1];
      if (date.getDay() - 1 === -1) {
        which_day = "일";
      }
      let comp = 0;
      for (comp = 0; comp < schedule.length; comp++) {
        if (schedule[comp][0].includes(which_day)) {
          const times = schedule[comp][1];
          setTime1(times[0]);
          setTime2(times[1]);
          setTime3(times[2]);
          setTime4(times[3]);
          break;
        }
      }
      if (comp === schedule.length) {
        setTime1("가능한 시간대 없음");
      }
    }
  }, [date]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getBank`)
      .then((response) => {
        setBank(response.data);
        console.log(bank);
      })
      .catch((error) => {
        console.error(error);
      });

      axios
      .post(`${process.env.REACT_APP_SERVER_URL}/getUserMac`, {
        user: window.sessionStorage.getItem('id')
      })
      .then((response) => {
        setMac(response.data[0].mac_address);
      });

      axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/getmacaddress`, {
        params: { userConsent: 'true' }
      })
      .then((response) => {
        setUserMac(response.data.mac);
      })
      .catch((error) => {
        console.error(error);
      });    
  }, []);

  useEffect(() => {
    setSelectedBank('기타');
    setClicked([]);
    setReservatedSeat([]);
    axios
    .post(`${process.env.REACT_APP_SERVER_URL}/getSeatInfo`, {
      //날짜, 시간, 좌석
      ID: id.show_ID,
      date: date.toLocaleDateString("ko-KR"),
      time: selectedTime
    })
    .then((response) => {
      for(let i = 0 ; i < response.data.length ; i++){
        const temp_seat = response.data[i].seat_num.split(',');
        for(let j = 0 ; j < temp_seat.length ; j++){
          setReservatedSeat(reservatedSeat => [...reservatedSeat, temp_seat[j]]);
        }      
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }, [date, selectedTime]);

  const onChange = (selectedDate) => {
    const d = new Date();
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);

    const today = year + '.' + month + '.' + day;

    console.log(info[0].start_date);
    console.log(today);

    if (info[0].start_date <= today && info[0].end_date >= today) {
      setDate(selectedDate);
      setTotalPrice(price);
      setReNumber(1);
    } else {
      alert("유효한 기간 내에서 날짜를 선택해주세요.");
    }
  };

  const reservate = () => {   
    if (selectedTime === "") {
      alert("유효한 날짜를 선택해 주세요.");
      return;
    }

    if(clicked.length < reNumber){
      alert('선택한 좌석이 매수보다 적습니다.');
      return;
    }
    else if(clicked.length > reNumber){
      alert('선택한 좌석이 매수보다 많습니다.')
      return;
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/getUserMac`, {
        user: window.sessionStorage.getItem('id')
      })
      .then((response) => {
        setMac(response.data[0].mac_address);
      })

    if(mac === null){
      if(window.confirm('최초 결제 시 기기인증 정보 수집이 필요합니다. 동의하시겠습니까?')){

      axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/getmacaddress`, {
        params: { userConsent: 'true' }
      })
      .then((response) => {
        setMac(response.data.mac);
        setUserMac(response.data.mac);
        axios
        .post(`${process.env.REACT_APP_SERVER_URL}/saveUserMac`, {
          user:window.sessionStorage.getItem('id'),
          mac: response.data.mac
        })
        .catch((err) => {
          console.error(err);
        })
      })
      .catch((error) => {
        console.error(error);
      });
      }
      else{
        return;
      }
    }
    else{
      axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/getmacaddress`, {
        params: { userConsent: 'true' }
      })
      .then((response) => {
        setUserMac(response.data.mac);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log('user: '+ userMac);
      console.log('mac: '+ mac);
      if(userMac === mac){
        console.log('기기 정보 일치');
      }
      else{
        alert('기기 인증 정보가 다릅니다');
        return;
      }
    }
    
    
    let seatArr = '';
    for(let i = 0 ; i < clicked.length ; i++){
      if(i === 0){
        seatArr += clicked[i];
      }
      else{
        seatArr += ','+clicked[i];
      }
    }
    
    setModalContent(
      <Payment
        date={date}
        totalPrice={totalPrice * (100 - discount) / 100}
        reNumber={reNumber}
        selectedTime={selectedTime}
        ID={id.show_ID}
        time={selectedTime}
        user={window.sessionStorage.getItem('id')}
        seatArr={seatArr}
        bank={selectedBank}
        showName={showName}
      />
    );
    setShowModal(true);
    setClicked([]);

    
  };

  const number_button = (e) => {
    if (e === 1) {
      if (reNumber === 1) {
        alert("최소 수치입니다.");
        return;
      }
      setReNumber(reNumber - 1);
      setTotalPrice(totalPrice - price);
    } else {
      setReNumber(reNumber + 1);
      setTotalPrice(totalPrice + price);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onClickSeat = (e) => {
    if(clicked.includes(e.target.dataset.values)){
      const updatedClicked = [...clicked];
      const indexToRemove = updatedClicked.indexOf(e.target.dataset.values);
      updatedClicked.splice(indexToRemove, 1);
      setClicked(updatedClicked);
    }

    else{
      setClicked(clicked => [...clicked, e.target.dataset.values]);
    }
  }

  return (
    <div>
      <Navigation />
      <div className="re_container">
        {info.map((datas, index) => (
          <div key={index} className="re_top">
            <img className="re_img" src={datas.poster_url} alt="공연포스터" />
            <p className="re_title">{datas.show_name}</p>
            <div className="re_info">
              <div className="re_info1">
                <p>기간</p>
                <p>장소</p>
                <p>가격</p>
                <p style={{height:"40px"}}>공연시간</p>
                <br/>
                <p style={{height:"40px"}}>출연진</p> 
              </div>
              <div className="re_info2">
                <p></p>
                <p>{datas.start_date} ~ {datas.end_date}</p>
                <p>{datas.show_location}</p>
                <p>{datas.price}</p>
                <p style={{height:"40px"}}>{datas.show_time}</p>
                <br/>
                <p style={{height:"40px"}}>{datas.actor}</p>
              </div>
            </div>

            <div className="re_down">
              <Calendar
                className="re_calendar"
                onChange={onChange}
                value={date}
                minDate={new Date()}
                maxDate={new Date(datas.end_date)}
                formatDay={(locale, date) =>
                  date.toLocaleString("en", { day: "numeric" })
                }
                />
              <div className="re_time">
                <p>시간선택</p>
                <hr />
                <Button
                  onClick={() => {
                    setSelectedTime(time1);
                    setTotalPrice(price);
                    setReNumber(1);
                  }}
                >
                  {time1}
                </Button>
                <br />
                {time1 !== "가능한 시간대 없음" && (
                  <>
                    <Button
                      onClick={() => {
                        setSelectedTime(time2);
                        setTotalPrice(price);
                        setReNumber(1);
                      }}
                    >
                      {time2}
                    </Button>
                    <br />
                    <Button
                      onClick={() => {
                        setSelectedTime(time3);
                        setTotalPrice(price);
                        setReNumber(1);
                      }}
                    >
                      {time3}
                    </Button>
                    <br />
                    <Button
                      onClick={() => {
                        setSelectedTime(time4);
                        setTotalPrice(price);
                        setReNumber(1);
                      }}
                    >
                      {time4}
                    </Button>
                  </>
                )}
              </div>
              <div className="re_select">
                  <div className="re_number" >
                  <p>인원선택</p>
                  <hr />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      variant="outline"
                      disableElevation
                      onClick={() => number_button(1)}
                    >
                      -
                    </button>
                    <p className="re_number_p">{reNumber}명</p>
                    <button
                      variant="outline"
                      disableElevation
                      onClick={() => number_button(2)}
                    >
                      +
                    </button>
                    </div>
                  </div>
              </div>
                <div className="re_sel_top">
                  <p>선택내역</p>
                  <hr />
                  <p>{date.toLocaleDateString("ko-KR")}</p>
                  <p>{selectedTime} </p>
                  <p>{reNumber} 명</p>
                </div>
            </div>
            <div className="re_down2">
              <div className="seat_box">
                <p> 좌석선택</p>
                  <hr />
                <p className="stage">STAGE</p>
                <div className="seat_box_alpha">
                  <div className="seat_box_alpha_detail">a열</div>
                  <div className="seat_box_alpha_detail">b열</div>
                  <div className="seat_box_alpha_detail">c열</div>
                  <div className="seat_box_alpha_detail">d열</div>
                  <div className="seat_box_alpha_detail">e열</div>
                  <div className="seat_box_alpha_detail">f열</div>
                  <div className="seat_box_alpha_detail">g열</div>
                  <div className="seat_box_alpha_detail">h열</div>
                  <div className="seat_box_alpha_detail">i열</div>
                  <div className="seat_box_alpha_detail">j열</div>
                </div>
                <div>
                  {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map(
                    (datas, index) => (
                      <div>
                        {[
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                        ].map((num, index2) => (
                          <div>
                            <div className="seat_span" style = {{backgroundColor: clicked.includes(datas+num) ? 'green' : reservatedSeat.includes(datas+num) ? 'red' : '' }}>
                              <Button style={{width:"100%", height:'100%', color:'black'}} data-values={datas+num} onClick={onClickSeat} disabled= {reservatedSeat.includes(datas+num) ? true : false}>{datas+num}</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="re_down3">
              <div className="select_bank">
                <p style={{color:"black"}}>할인 선택</p>
                <hr />
                <div className="bank-box">
                  <label>
                    <input
                      type="checkbox"
                      value="Hana"
                      checked={selectedOption === "Hana"}
                      onChange={handleOptionChange}
                    />
                    <img src="/img/bank1.PNG" alt="bank"/>
                    <p>{bank.length > 0 && bank[0].discount_rate}% 할인</p>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="KB"
                      checked={selectedOption === "KB"}
                      onChange={handleOptionChange}
                    />
                    <img src="/img/bank2.PNG" alt="bank"/>
                    <p>{bank.length > 0 && bank[1].discount_rate}% 할인</p>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Sinhan"
                      checked={selectedOption === "Sinhan"}
                      onChange={handleOptionChange}
                    />
                    <img src="/img/bank3.PNG" alt="bank"/>
                    <p>{bank.length > 0 && bank[2].discount_rate}% 할인</p>
                  </label>
                </div>
              </div>
                <div className="final-cost">
                  <p>금액&nbsp;&nbsp; {totalPrice}원</p>
                  <p>할인금액&nbsp; { (totalPrice * (100 - discount) / 100) - totalPrice}원</p>
              </div>
            </div>
            <div className="final-cost-button">
              <Button
                variant="contained"
                disableElevation
                onClick={() => reservate()}
              >
                <p>{ totalPrice * (100 - discount) / 100}원 결제하기</p>
              </Button>
              {showModal && (
                <PaymentModal content={modalContent} onClose={closeModal} />
              )}
            </div>
        <ReservationTabs show_name={datas.show_name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservation;
