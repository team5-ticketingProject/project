import React, { useState, useEffect } from "react";
import axios from "axios";

function NoticeInfo(props) {
  const [selectedNotice, setSelectedNotice] = useState(null); // 공지사항 목록

  useEffect(() => {
    if (props.selectedNotice) {
      // Load the selected notice from props
      setSelectedNotice(props.selectedNotice);
    }
  }, [props.selectedNotice]);

  return (
    <div className="Notice">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h1
          style={{fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {selectedNotice ? selectedNotice.title : "No notice selected"}
        </h1>
      </div>
      <div style={{marginTop:"20px"}}>
        <span style={{color:"gray"}}>등록일:{selectedNotice ? new Date(selectedNotice.date).toISOString().slice(0, 16).replace('T', ' ') : "no notice selected"}</span>
      </div>

      <div className="text-container">
        <h4 style={{overflowWrap:"break-word", padding:"60px", margin:"auto"}}>
          {selectedNotice ? selectedNotice.content : "No notice selected"}
        </h4>
      </div>
    </div>
  );
}

export default NoticeInfo;
