import React, { useState } from "react";

function PwChange( {onClose} ) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  const handleCancelChange = () => {
    onClose();
  }
  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        setErrorMessage("새로운 비밀번호 확인이 일치하지 않습니다.");
        alert("새로운 비밀번호 확인이 일치하지 않습니다.");
        return;
      }
      const passwordRegex = /^(?=.*[A-Z])[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        setErrorMessage("비밀번호는 최소 8자 이상이어야 하며 대문자를 하나 이상 포함해야 합니다.");
        return;
      }

      // 클라이언트에서 서버로 현재 비밀번호, 새로운 비밀번호, 새로운 비밀번호 확인 전송
      const userID = window.sessionStorage.getItem("id");
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      if (response.ok) {
        // 서버에서 변경이 성공적으로 이루어지면 메시지를 업데이트하고 상태를 초기화합니다.
        setErrorMessage("비밀번호가 성공적으로 변경되었습니다.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        onClose();
        alert("비밀번호가 변경되었습니다.")
      } else {
        if (response.status === 401) {
          // 현재 비밀번호가 일치하지 않을 때 서버에서 401 상태 코드를 반환하도록 설정
          setErrorMessage("현재 비밀번호가 일치하지 않습니다.");
          alert("현재 비밀번호가 일치하지 않습니다.")
        } else {
          // 서버에서 변경이 실패하면 오류 메시지를 표시합니다.
          const data = await response.json();
          setErrorMessage(data.error);
        }
      }
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
    }
  };

  return (
    <form className="ContactForm">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <label htmlFor="currentPassword">현재 비밀번호:</label>
        <input
          placeholder="현재 비밀번호를 입력하세요"
          type="password"
          id="currentPassword"
          name="currentPassword"
          required
          className="input-field"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="newPassword">새로운 비밀번호:</label>
        <input
          placeholder="비밀번호는 숫자와 영어 대문자를 포함한 최소 8자리입니다."
          type="password"
          id="newPassword"
          name="newPassword"
          required
          className="input-field"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="confirmNewPassword">새로운 비밀번호 확인:</label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          required
          className="input-field"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>

      <div style={{margin:"20px auto"}}>
        <button
          type="button"
          onClick={handlePasswordChange}
          className="submit-button"
          style={{marginRight:"10px"}}
          
        >
          비밀번호 변경
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

export default PwChange;
