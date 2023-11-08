import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from "react-router-dom";
import './Payment.css';

const Payment = ({ showName, date, totalPrice, reNumber, selectedTime, ID, time, user, seatArr, bank }) => {
  const id = useParams();
  const [payInfo, setPayInfo] = useState([]);
  

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getDetail/${id.show_ID}`)
      .then((response) => {
        setPayInfo(response.data);
      })
  }, [id.show_ID]);

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const requestPay = () => {
    const IMP = window.IMP;
    IMP.init('imp82021042');
    
    axios 
      .post(`${process.env.REACT_APP_SERVER_URL}/reservation`, {
        ID: id.show_ID,
        date: date.toLocaleDateString("ko-KR"),
        time: selectedTime,
        user: window.sessionStorage.getItem("id"),
        re_number: reNumber,
        price: totalPrice,
        seatArr : seatArr,
        bank: bank,
        name: payInfo[0].show_name
      })
      .then((response) => {

        if (response.data === "1") {
 
        } else if (response.data === "2") {
          alert("좌석이 부족합니다.");
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        amount: totalPrice,                                    
        name: showName,   
        buyer_email: 'iamport@siot.do',
        buyer_name: '구매자이름',
        buyer_tel: '010-1234-5678',
      },
      function (rsp) {
        console.log(rsp);
        if (rsp.success) {
          navigate("/successpay");
        } else if (rsp.error_msg === '결제실패') {
          console.log("결제가 실패되었습니다.");
        } else {
          window.location.reload();
          window.scrollTo(0,0);
          console.log("취소");
        }
      }
    ); 
  };

  return (
    <div>
      {payInfo.map((datas, index) => (
        <div key={index} className="pay_info">
          <img src={datas.poster_url} alt="공연포스터" />
          <div className='pay_info_con'>
            <p className='pay_title'>{datas.show_name}</p>
            <div className='pay_text_con'>
              <div className='pay_text'>
                <p>일시</p>
                <p>매수</p>
                <p>배송료</p>
                <p>총 결제</p>
              </div>
              <div className='pay_text2'>
                <p>{date && date.toLocaleDateString("ko-KR")}&nbsp;{selectedTime}</p>
                <p>{reNumber} 매</p>
                <p>0원</p>
                <p>{totalPrice}원</p>
              </div>
            </div>
            <div className='pay_but'>
              <Button 
                size="large" 
                color="error" 
                variant="contained" 
                disableElevation 
                onClick={() => {requestPay();}} >
                  결제하기
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Payment;