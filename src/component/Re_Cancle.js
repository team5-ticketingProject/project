import React from "react";

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

function ReCancle({ selectedReservationInfo }) {
  return (
    <div className="Re_Cancle">
      <h2>예매확인/취소</h2>
      <hr />

      <h3 style={{ color: "#878d95" }}>
        예매한 티켓 확인/취소가 가능합니다.<br />
        결제 및 환불 관련 안내는 고객센터에 안내되어 있습니다.
      </h3>
      <h4 style={{ color: "red" }}>예매정보</h4>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}>티켓명</th>
            <td style={tdStyle}>
              {selectedReservationInfo ? selectedReservationInfo.show_Number : "여기에 티켓명을 추가하세요"}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>관람일시</th>
            <td style={tdStyle}>
              {selectedReservationInfo ? new Date(selectedReservationInfo.show_Choice).toISOString().slice(0, 16).replace('T', ' '): "여기에 관람일시를 추가하세요"}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>좌석</th>
            <td style={tdStyle}>
              여기에 좌석 정보를 추가하세요
            </td>
          </tr>
          <tr>
            <th style={thStyle}>예매일</th>
            <td style={tdStyle}>
            {selectedReservationInfo ? new Date(selectedReservationInfo.Re_Date).toISOString().slice(0, 16).replace('T', ' ') : "여기에 관람일시를 추가하세요"}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>결제</th>
            <td style={tdStyle}>
              여기에 결제 정보를 추가하세요
            </td>
          </tr>
        </tbody>
      </table>
      <div style={buttonContainerStyle}>
        <button style={{ color: "white", backgroundColor: "black", fontSize: "16px" }}>취소하기</button>
      </div>
    </div>
  );
}

export default ReCancle;
