import React from "react";

function PwChange() {
    
  return (
    <form className="ContactForm"> 
      
      <div>
        <label htmlFor="currentPassword">현재 비밀번호:</label>
        <input type="password" id="currentPassword" name="currentPassword" required  className="input-field" />
      </div>

    
      <div>
        <label htmlFor="newPassword">새로운 비밀번호:</label>
        <input type="password" id="newPassword" name="newPassword" required  className="input-field" />
      </div>

     
      <div>
        <label htmlFor="confirmNewPassword">새로운 비밀번호 확인:</label>
        <input type="password" id="confirmNewPassword" name="confirmNewPassword" required  className="input-field" />
      </div>

      
      <div>
        <button htmlFor="submit"  className="submit-button">비밀번호 변경</button>
      </div>
    </form>
  );
}

export default PwChange;
