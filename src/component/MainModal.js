import React, { useState, useRef, useEffect } from "react";
import "../css/MainModal.css";

const MainModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const handlePayment = () => {
    window.open("/booking","", "_blank",'resizable=no width=50 height=50');return false
  };

  return (
    <>
      <div className={'btn-wrapper'}>
        <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
          <p>공연정보</p>
        </button>
      </div>
      {modalOpen && (
        <div
          className={'modal-container'}
          ref={modalBackground}
          onClick={e => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className={'modal-content'}>
            <ul>
              <li >
                <div>
                  <img src={props.posterUrl} alt="공연포스터"/>
                  <p>{props.showName}</p>
                  <p><strong>기간</strong> {props.startDate} ~ {props.endDate}</p>
                  <p><strong>공연시간</strong> {props.showTime}</p>
                  <p><strong>가격</strong> {props.Price}</p>
                  <p><strong>장소</strong> {props.showLocation}</p>
                  <p><strong>출연진</strong> {props.Actor}</p>
                </div>
              </li>
             </ul>

            <button className={'modal-payment-btn'} onClick={() => handlePayment()}>
              <p>결제하기</p>
            </button>
            <button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
              <p>닫기</p>
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default MainModal; 

