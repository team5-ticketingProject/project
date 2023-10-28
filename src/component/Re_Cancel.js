import React, { useState } from "react";
import axios from "axios";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  padding: "10px",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "20px",
};
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  zIndex: "1000",
  width: "300px",
};

function ReCancel({ selectedReservationInfo, closePopupWindow }) {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleCancelReservation = () => {
  
      setConfirmationOpen(true);
      
  };
   const confirmCancel = () => {
    closePopupWindow();

    if (selectedReservationInfo) {
      axios
        .post("http://localhost:5000/Cancelreservation", {
          reservationId: selectedReservationInfo.show_number,
        })
        .then((response) => {
          console.log(response.data);
          // 취소 성공 메시지를 처리

          window.close();
        })
        .catch((error) => {
          console.error("취소 실패:", error);
        });
    }
    
  };
  return (
    <div className="Re_Cancle">
      <h2>예매확인/취소</h2>
      <hr />

      <h3 style={{ color: "#878d95" }}>
        예매한 티켓 확인/취소가 가능합니다.
        <br />
        결제 및 환불 관련 안내는 고객센터에 안내되어 있습니다.
      </h3>
      <h4 style={{ color: "red" }}>예매정보</h4>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}>티켓명</th>
            <td style={tdStyle}>
              {selectedReservationInfo
                ? selectedReservationInfo.show_ID
                : "여기에 티켓명을 추가하세요"}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>관람일시</th>
            <td style={tdStyle}>
              {selectedReservationInfo
                ? new Date(selectedReservationInfo.DATE)
                    .toISOString()
                    .slice(0, 16)
                    .replace("T", " ")
                : "여기에 관람일시를 추가하세요"}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>좌석</th>
            <td style={tdStyle}> {selectedReservationInfo
                ? selectedReservationInfo.seat_num
                : "여기에 티켓명을 추가하세요"}</td>
          </tr>
          <tr>
            <th style={thStyle}>예매일</th>
            <td style={tdStyle}>
              {selectedReservationInfo
                ? new Date(selectedReservationInfo.re_date)
                    .toISOString()
                    .slice(0, 16)
                    .replace("T", " ")
                : "여기에 관람일시를 추가하세요"}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>가격</th>
            <td style={tdStyle}> {selectedReservationInfo
                ? selectedReservationInfo.price
                : "여기에 티켓명을 추가하세요"}</td>
          </tr>
        </tbody>
      </table>
      <div style={buttonContainerStyle}>
        <button
          style={{ color: "white", backgroundColor: "black", fontSize: "16px" }}
          onClick={handleCancelReservation}
         
        >
          취소하기
        </button>
        {isConfirmationOpen && (
        <div style={modalStyle} className="confirmation-dialog">
          <p style={{fontWeight:"bold"}}>정말 취소하시겠습니까?</p>
          <button style={{marginRight:"5px"}} onClick={confirmCancel}>확인</button>
          <button onClick={() => {
          setConfirmationOpen(false);
          closePopupWindow();
          }}>취소</button>
        </div>
      )}
      </div>
      
    </div>
  );
}

export default ReCancel;
