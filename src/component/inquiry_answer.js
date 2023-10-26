import React, { useState, useEffect } from "react";

function InquiryAnswer(props) {
  const [selectedInquiry, setSelectedInquiry] = useState(null); // 공지사항 목록

  useEffect(() => {
    if (props.selectedInquiry) {
      // Load the selected notice from props
      setSelectedInquiry(props.selectedInquiry);
    }
  }, [props.selectedInquiry]);

  const goBackToInquiry = () => {
    props.openModal("Inquiry"); //
    setSelectedInquiry(null);
  };

  return (
    <div className="Notice">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h1
          style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {selectedInquiry
            ? selectedInquiry.inquiry_title
            : "No notice selected"}
        </h1>
      </div>

      <div className="text-container">
        <p style={{ fontWeight: "bold", color: "gray", padding:"20px" }}> 문의 내용 : </p>
        <h4
          style={{
            overflowWrap: "break-word",

            margin: "auto",
            padding:"20px"
          }}
        >
          {selectedInquiry
            ? selectedInquiry.inquiry_content
            : "No notice selected"}
        </h4>
        <p style={{ fontWeight: "bold", color: "gray", padding:"20px" }}>문의 답변 :</p>
        <button
        onClick={goBackToInquiry}
        style={{
          position: "absolute",
          bottom: "100px",
          right: "500px",
          fontWeight:"bold",
          fontSize:"16px"
        }}
      >
        목록으로
      </button>
      </div>

     
    </div>
  );
}

export default InquiryAnswer;
