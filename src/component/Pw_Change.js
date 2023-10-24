import React from "react";

function PwChange() {
    
  return (
    <form className="ContactForm"> 
      
      <div>
        <label for="currentPassword">현재 비밀번호:</label>
        <input type="password" id="currentPassword" name="currentPassword" required  className="input-field" />
      </div>

    
      <div>
        <label for="newPassword">새로운 비밀번호:</label>
        <input type="password" id="newPassword" name="newPassword" required  className="input-field" />
      </div>

     
      <div>
        <label for="confirmNewPassword">새로운 비밀번호 확인:</label>
        <input type="password" id="confirmNewPassword" name="confirmNewPassword" required  className="input-field" />
      </div>

      
      <div>
        <button type="submit"  className="submit-button">비밀번호 변경</button>
      </div>
    </form>
  );
}

export default PwChange;
