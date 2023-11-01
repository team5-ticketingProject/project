import React, { useState } from "react";

function EmailChange({ onClose }) {
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");

  const email_rule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.)+[a-zA-Z]{2,4}$/i;


  const handleCancelChange = () => {
    onClose();
  };

  const handleEmailChange = async () => {
    
    try {
      const email = `${emailId}@${emailDomain}`;

    // 이메일 유효성 검사
     if (!email_rule.test(email) || emailDomain === "") {
      setErrorMessage("올바른 이메일 주소를 입력하세요.");
      
      return;
       }
      
      
      if (email.trim() !== confirmNewEmail.trim()) {
        setErrorMessage("새로운 이메일 확인이 일치하지 않습니다.");
        
        return;
      }

      const userID = window.sessionStorage.getItem("id");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/changeEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID,
            newEmail: email,
            confirmNewEmail,
          }),
        }
      );

      if (response.ok) {
        setErrorMessage("이메일이 성공적으로 변경되었습니다.");
        setEmailId(""); // 이메일 아이디 초기화
        setEmailDomain(""); // 이메일 도메인 초기화
        setConfirmNewEmail("");
        onClose();
        alert("이메일이 변경되었습니다.");
        window.location.reload();
      } else {
        if (response.status === 401) {
          setErrorMessage("이메일 변경에 실패하였습니다.");
          alert("변경 실패");
        } else {
          const data = await response.json();
          setErrorMessage(data.error);
        }
      }
    } catch (error) {
      console.error("이메일 변경 실패:", error);
    }
  };

  const setEmailDomainSelection = (event) => {
    setEmailDomain(event.target.value);
  };

  return (
    <form className="ContactForm">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <label htmlFor="newEmail">새로운 이메일 :</label>
        <input
          type="text"
          id="email_id"
          className="input-field"
          value={emailId}
          title="이메일 아이디"
          placeholder="이메일"
          maxLength="18"
          onChange={(e) => setEmailId(e.target.value)}
        />{" "}
        @
        <input
          type="text"
          id="email_domain"
          className="input-field"
          value={emailDomain}
          title="이메일 도메인"
          placeholder="이메일 도메인"
          maxLength="18"
          onChange={(e) => setEmailDomain(e.target.value)}
        />
        <select
          className="input-field"
          title="이메일 도메인 주소 선택"
          onChange={setEmailDomainSelection}
        >
          <option value="">-선택-</option>
          <option value="naver.com">naver.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="hanmail.net">hanmail.net</option>
          <option value="hotmail.com">hotmail.com</option>
          <option value="korea.com">korea.com</option>
          <option value="nate.com">nate.com</option>
          <option value="yahoo.com">yahoo.com</option>
        </select>
      </div>

      <div>
        <label htmlFor="confirmNewEmail">새로운 이메일 확인 :</label>
        <input
          type="email"
          id="confirmNewEmail"
          name="confirmNewEmail"
          required
          className="input-field"
          value={confirmNewEmail}
          onChange={(e) => setConfirmNewEmail(e.target.value)}
        />
      </div>

      <div style={{ margin: "20px auto" }}>
        <button
          type="button"
          onClick={handleEmailChange}
          className="submit-button"
          style={{ marginRight: "10px" }}
        >
          이메일 변경
        </button>
        <button
          type="button"
          onClick={handleCancelChange}
          className="submit-button"
        >
          취소
        </button>
      </div>
    </form>
  );
}

export default EmailChange;
