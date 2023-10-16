import React, { useState } from "react";

function ContactForm({ onSubmit, onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 서버로 데이터를 보내는 로직을 추가할 수 있습니다.
    console.log("제목:", subject);
    console.log("내용:", message);
    console.log("내용:", email);
    onSubmit({ subject, message, email });
    onClose();
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
          />
        </div>
        <div>
          <label htmlFor="subject">문의 제목</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">문의 내용</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">문의 제출</button>
      </form>
    </div>
  );
}

export default ContactForm;
