import React, { useState, useEffect } from "react";

function InquiryContactForm({ onSubmit, onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [ID, setID] = useState("");
  

  
  useEffect(() => {
    const min = 1;
    const max = 10000000;
    const existingIDs = new Set(); // 이미 사용된 ID를 추적하기 위한 Set

    const generateUniqueRandomID = () => {
      let inquiryID;
      do {
        inquiryID = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (existingIDs.has(inquiryID)); // 이미 사용된 ID인 경우 재시도
      existingIDs.add(inquiryID); // 새로 생성된 ID를 Set에 추가
      setID(inquiryID);
    };

    generateUniqueRandomID();
  }, []);
  
  useEffect(() => {
    const loginuser = window.sessionStorage.getItem("id")
    setUserId(loginuser)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { ID, subject, message, email, userId };
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/submit_inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("문의가 성공적으로 제출");
        onClose(); // 제출 후 onClose 함수 호출하여 팝업 닫기
      } else {
        console.error("문의 제출 실패");
      }
    } catch (error) {
      console.error("문의 제출 중 오류:", error);
    }
  };

  return (
    <div className="ContactForm">
      <h3>1:1 문의 작성</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <textarea
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="subject">문의 제목</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="message">문의 내용</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-area"
          />
        </div>
        <button type="submit" className="submit-button">
          문의 제출
        </button>
      </form>
    </div>
  );
}

export default InquiryContactForm;
