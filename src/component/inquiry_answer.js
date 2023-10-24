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
          style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {selectedInquiry ? selectedInquiry.inquiry_title : "No notice selected"}
        </h1>
      </div>

      <div className="text-container">
        <h4
          style={{
            overflowWrap: "break-word",
            padding: "60px",
            margin: "auto",
          }}
        >
          {selectedInquiry ? selectedInquiry.inquiry_content : "No notice selected"}
        </h4>
      </div>
      

      <button onClick={goBackToInquiry}>목록으로</button>
    </div>
  );
}

export default InquiryAnswer;
