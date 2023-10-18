import React from "react";

function PwChange() {
    
  return (
    <form>
      {/* 현재 비밀번호 입력란 */}
      <div>
        <label for="currentPassword">현재 비밀번호:</label>
        <input type="password" id="currentPassword" name="currentPassword" required />
      </div>

      {/* 새로운 비밀번호 입력란 */}
      <div>
        <label for="newPassword">새로운 비밀번호:</label>
        <input type="password" id="newPassword" name="newPassword" required />
      </div>

      {/* 새로운 비밀번호 재입력란 */}
      <div>
        <label for="confirmNewPassword">새로운 비밀번호 확인:</label>
        <input type="password" id="confirmNewPassword" name="confirmNewPassword" required />
      </div>

      {/* 비밀번호 변경 버튼 */}
      <div>
        <button type="submit">비밀번호 변경</button>
      </div>
    </form>
  );
}

export default PwChange;
