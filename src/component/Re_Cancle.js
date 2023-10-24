import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };
  
  const thStyle = {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    padding: '10px',
  };
  
  const tdStyle = {
    border: '1px solid #ccc',
    padding: '10px',
  };
function ReCancle () {
    return (
        <div className="Re_Cancle">
          <h2>예매확인/취소</h2>
          <hr />
    
          <h3 style={{color:"#878d95"}}>
          예매한 티켓 확인/취소가 가능합니다.<br/>
          결제 및 환불 관련 안내는 고객센터에 안내되어 있습니다.
          </h3>
          <h4 style={{color:"red"}}>예매정보</h4>
          <table style={tableStyle}>
      <tr>
        <th style={thStyle}>티켓명</th>
        <td style={tdStyle}>여기에 티켓명을 추가하세요</td>
      </tr>
      <tr>
        <th style={thStyle}>관람일시</th>
        <td style={tdStyle}>여기에 관람일시를 추가하세요</td>
      </tr>
      <tr>
        <th style={thStyle}>좌석</th>
        <td style={tdStyle}>여기에 좌석 정보를 추가하세요</td>
      </tr>
      <tr>
        <th style={thStyle}>예매일</th>
        <td style={tdStyle}>여기에 예매일을 추가하세요</td>
      </tr>
      <tr>
        <th style={thStyle}>결제</th>
        <td style={tdStyle}>여기에 결제 정보를 추가하세요</td>
      </tr>
    </table>

          </div>
)
}

export default ReCancle;