import React, { useState, useEffect } from "react";

function ContactForm({ onSubmit, onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // 사용자 로그인 프로세스를 통해 사용자 ID를 얻어옵니다.
    // 이 부분은 사용자 로그인 로직에 따라 달라집니다.
    const loggedInUserId = "user123"; // 예시 사용자 ID

    setUserId(loggedInUserId);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
   
   const formData = { userId, subject, message, email };
   try {
    const response = await fetch("/submit_inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      console.log("문의가 성공적으로 제출");
    } else {
      console.error("문의 제출 실패");
    } 
  }
    catch (error) {
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
            className="input-field" // 이메일 입력 필드에 스타일 적용
          />
        </div>
        <div>
          <label htmlFor="subject">문의 제목</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-field" // 제목 입력 필드에 스타일 적용
          />
        </div>
        <div>
          <label htmlFor="message">문의 내용</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-area" // 내용 입력 필드에 스타일 적용
          />
        </div>
        <button type="submit" className="submit-button">문의 제출</button>
      </form>
    </div>
  );
}

export default ContactForm;
