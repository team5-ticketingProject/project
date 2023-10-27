import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";



const Payment = ({date, totalPrice, reNumber, selectedTime}) => {
  const id = useParams();
  const [payInfo, setPayInfo] = useState([]);
    useEffect(() => {
      axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getDetail/${id.show_ID}`)
      .then((response) => {
        setPayInfo(response.data);
      })
    })

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
    const { IMP } = window;
    IMP.init('imp82021042');
    IMP.request_pay({
      pg: 'html5_inicis',                             // PG사
      pay_method: 'card',                             // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,    // 주문번호
      amount: 100,                                    // 결제금액
      name: 'test',                                   // 주문명
      buyer_name: '5조',                              // 구매자 이름
      buyer_tel: '01012341234',                       // 구매자 전화번호
      buyer_email: 'example@example',                 // 구매자 이메일
      buyer_addr: '신사동 661-16',                    // 구매자 주소
      buyer_postcode: '06018',                        // 구매자 우편번호
    }, async (rsp) => {
      try {
        const { data } = await axios.post('http://localhost:8080/verifyIamport/' + rsp.imp_uid);
        if (rsp.paid_amount === data.response.amount) {
       
              <p>결제에 완료하였습니다.</p>
          
        } else {
      
              <p>결제에 실패하였습니다. 다시 시도해주세요.</p>
         
        }

      } catch (error) {
   
              <p>결제에 실패하였습니다. 다시 시도해주세요.</p>
          
      }
    });
  };

  return (
    <div>
      {payInfo.map((datas, index) => (
        <div key={index} className="payment_info">
          <img src={datas.poster_url} alt="공연포스터" />
          <div>
            <p className='payment_title'>{datas.show_name}</p>
            <div className='payment_text'>
              <p>일시</p>
              <p>매수</p>
              <p>배송료</p>
              <p>총 결제</p>
            </div>
            <div className='payment_text2'>
              <p>{date && date.toLocaleDateString("ko-KR")}&nbsp;{selectedTime}</p>
              <p>{reNumber} 매</p>
              <p>0원</p>
              <p>{totalPrice}원</p>
            </div>
            <div className='payment_but'>
              <Button variant="contained" disableElevation onClick={requestPay}>결제하기</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payment;