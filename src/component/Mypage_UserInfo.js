import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import "../css/MyPage.css";
import PwChange from "./Pw_Change";
import ReactDOM from "react-dom";
import axios from "axios";

function UserInfo() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getFAQ")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const openPopupPw = () => {
    const popupWindow = window.open(
      "",
      "팝업 제목",
      "width=600,height=400,menubar=no,location=no,resizable=no,scrollbars=no,status=no"
    );

    // 팝업 윈도우에 React 컴포넌트 렌더링
    popupWindow.document.body.innerHTML = "<div id='popuppw-root'></div>";
    popupWindow.document.head.innerHTML += `
    <style>
      .ContactForm {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f7f7f7;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 2px 2px 5px #888;
      }
  
      .input-field {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      .text-area {
        width: 100%;
        height: 150px;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
  
      .submit-button {
        background-color: black;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 16px;
      }
  
      .submit-button:hover {
        background-color: #0056b3;
      }
    </style>
    `;
    ReactDOM.render(
      <PwChange />,
      popupWindow.document.getElementById("popuppw-root")
    );
  };
  return (
    <>
      <div className="UserInfodiv">
        <h3>회원정보</h3>
        {userData ? (
          <>
            <div className="h4div">
              <h4>
                회원님은 <span style={{ color: "red" }}>{userData.rank}</span>
                이십니다.
              </h4>
            </div>
            <div>
              <table className="UserTable">
                <caption>회원 정보 수정 내용</caption>
                <colgroup>
                  <col style={{ width: "160px" }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                <th scope="row">
                      {" "}
                      <br />
                      아이디 <br /> <br />
                    </th>

                    <td className="ID">{userData.ID}</td>
                    </tr>
                  <tr>
                    <th scope="row">이메일</th>
                    <td>
                      {userData.email}
                      <p className="fs12_v2 color_gray">
                        <span id="agreeMail" className="checkbox">
                          <input
                            type="checkbox"
                            id="agree_mail"
                            name="agree_mail"
                          />
                        </span>
                        <label htmlFor="agree_mail">
                          <span
                            style={{
                              fontSize: "12px",
                              letterSpacing: "-.5px",
                              color: "#62676c",
                            }}
                          >
                            홍보성 정보수신 동의
                          </span>
                        </label>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비밀번호</th>
                    <td>
                      {userData.PW}
                      <Button
                        onClick={openPopupPw}
                        sx={{
                          border: "1px solid #000",
                          color: "black",
                          fontSize: "12px",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                      >
                        비밀번호 변경 <br />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {" "}
                      <br />
                      연락처 <br /> <br />
                    </th>

                    <td className="number">{userData.tel}</td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
            <div className="U-Button">
              <Button
                sx={{
                  "&:hover": { color: "white", backgroundColor: "black" },
                  border: "1px solid #000",
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "2opx",
                  textAlign: "center",
                }}
              >
                회원정보 수정
              </Button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default UserInfo;
