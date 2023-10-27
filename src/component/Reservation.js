import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Reservation.css";
import Navigation from "./Navigation";
import moment from "moment";
import Button from "@mui/material/Button";
import Payment from "./payment/Payment";
import PaymentModal from "./payment/PaymentModal";

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
    if (moment(selectedDate).isBetween(info[0].start_date, info[0].end_date)) {
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
    console.log(clicked.length, reNumber);
    if(clicked.length < reNumber){
      alert('선택한 좌석이 매수보다 적습니다.');
      return;
    }
    else if(clicked.length > reNumber){
      alert('선택한 좌석이 매수보다 많습니다.')
      return;
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
    
    axios // ********* 지금은 결제완료 안하고 결제하기 버튼만 눌러도 예약이 되기 때문에 나중에 결제 api창으로 빼는 작업이 필요함
      .post(`${process.env.REACT_APP_SERVER_URL}/reservation`, {
        ID: id.show_ID,
        date: date.toLocaleDateString("ko-KR"),
        time: selectedTime,
        user: window.sessionStorage.getItem("id"),
        re_number: reNumber,
        price: totalPrice * (100 - discount) / 100,
        seatArr : seatArr,
        bank: selectedBank
      })
      .then((response) => {
        if (response.data === "1") {
          setModalContent(
            <Payment
              date={date}
              totalPrice={totalPrice * (100 - discount) / 100}
              reNumber={reNumber}
              selectedTime={selectedTime}
            />
          );
          setShowModal(true);
          setClicked([]);
        } else if (response.data === "2") {
          alert("좌석이 부족합니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
      <div className="main">
        <Navigation />
      </div>
      <div className="re_container">
        {info.map((datas, index) => (
          <div key={index} className="re_top">
            <div className="re_showname">
              <strong>{datas.show_name}</strong>
            </div>
            <div className="re_img">
              <img src={datas.poster_url} alt="공연포스터" />
            </div>
            <div className="re_info">
              <p>
                <strong>기간 :</strong> {datas.start_date} ~ {datas.end_date}
              </p>
              <br />
              <p>
                <strong>공연시간 : </strong> {datas.show_time}
              </p>
              <br />
              <p>
                <strong>가격 : </strong> {datas.price}
              </p>
              <br />
              <p>
                <strong>장소 : </strong> {datas.show_location}
              </p>
              <br />
              <p>
                <strong>출연진 :</strong> {datas.actor}
              </p>
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
                <p>시간</p>
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
                <div className="re_sel_top">
                  <p>선택내역</p>
                  <hr />
                  <p>{date.toLocaleDateString("ko-KR")}</p>
                  <p>{selectedTime} </p>
                </div>
                <div>
                  <div className="re_number">
                    <Button
                      variant="contained"
                      disableElevation
                      style={{ float: "left" }}
                      onClick={() => number_button(1)}
                    >
                      -
                    </Button>
                    {reNumber}매
                    <Button
                      variant="contained"
                      disableElevation
                      style={{ float: "right" }}
                      onClick={() => number_button(2)}
                    >
                      +
                    </Button>
                  </div>
                  <p>금액: {totalPrice}원</p>
                </div>
              </div>
            </div>
            <div className="re_down2">
              <div className="seat_box">
                <p className="stage">무대</p>
                <div className="seat_box_alpha">
                  <div>a열</div>
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
                <p>결제사 선택</p>
                <hr />
                <div className="bank-box">
                  <label>
                    <img src="/img/bank1.PNG" alt="bank"></img>
                    <br />
                    {bank.length > 0 && bank[0].discount_rate}% 할인
                    <br />
                    <input
                      type="checkbox"
                      value="Hana"
                      checked={selectedOption === "Hana"}
                      onChange={handleOptionChange}
                    />
                  </label>
                  <br />
                  <label>
                    <img src="/img/bank2.PNG" alt="bank"></img>
                    <br />
                    {bank.length > 0 && bank[1].discount_rate}% 할인
                    <br />
                    <input
                      type="checkbox"
                      value="KB"
                      checked={selectedOption === "KB"}
                      onChange={handleOptionChange}
                    />
                  </label>
                  <br />
                  <label>
                    <img src="/img/bank3.PNG" alt="bank"></img>
                    <br />
                    {bank.length > 0 && bank[2].discount_rate}% 할인
                    <br />
                    <input
                      type="checkbox"
                      value="Sinhan"
                      checked={selectedOption === "Sinhan"}
                      onChange={handleOptionChange}
                    />
                  </label>
                </div>
              </div>
              <div style={{marginLeft:'65px'}}>
                <div className="final-cost">
                  <p>최종금액</p>
                  <hr />
                  { totalPrice * (100 - discount) / 100}원
                </div>
                <div className="final-cost-button">
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => reservate()}
                  >
                    <p>결제하기</p>
                  </Button>
                  {showModal && (
                    <PaymentModal content={modalContent} onClose={closeModal} />
                  )}
                </div>
              </div>
            </div>
            <div className="re_read">
              <p>
                ◈ 예매자는 본 안내페이지의 모든 내용을 숙지 및 동의한 것으로
                간주합니다.
                <br />
                티켓 수령/공연 관람 안내 미숙지로 인한 책임은 관람자 본인에게
                있으며, 이에따른 예매 티켓의 취소/변경/환불은 불가 하오니 각별히
                유의하시기 바랍니다.
                <br />
              </p>
              <p>
                ■ 공연 관람
                <br />
                원활한 공연 진행을 위해 공연 시작 후에는 입장이 제한됩니다.{" "}
                <br />
                공연이 시작된 후에는 공연의 흐름에 따라 입장이 지연되거나 제한될
                수 있으며, 이 경우 예매하신 본인 좌석이 아닌 지연석에 착석하여야
                합니다. 또한 이에 따른 환불 및 좌석 변경은 불가합니다.
                <br />
              </p>
              <p>
                ■ 공연 시점의 정부의 공연장 방역 수칙에 따라 운영이 변동 될 수
                있습니다. 관람 당일 꼭 확인해 주십시오.
                <br />
                방역 수칙에 따른 변경이 있을 경우, 예매자 정보입력 시 기재된
                연락처로 문자 안내 드립니다. 잘못된 연락처 기입으로 인한 책임은
                예매자 본인에게 있으니 올바른 기입 바랍니다.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservation;
