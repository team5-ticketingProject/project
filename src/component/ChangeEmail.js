import React, { useState } from "react";

function EmailChange({ onClose }) {
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCancelChange = () => {
    onClose();
  };

  const handleEmailChange = async () => {
    try {
      if (newEmail.trim() !== confirmNewEmail.trim()) {
        setErrorMessage("새로운 이메일 확인이 일치하지 않습니다.");
        alert("새로운 이메일 확인이 일치하지 않습니다.");
        return;
      }

      const userID = window.sessionStorage.getItem("id");
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/changeEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          newEmail,
          confirmNewEmail,
        }),
      });

      if (response.ok) {
        setErrorMessage("이메일이 성공적으로 변경되었습니다.");
        setNewEmail("");
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

  return (
    <form className="ContactForm">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <label htmlFor="newEmail">새로운 이메일:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="input-field"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="confirmNewEmail">새로운 이메일 확인:</label>
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
