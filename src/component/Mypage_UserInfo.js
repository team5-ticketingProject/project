import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import "../css/MyPage.css";
import PwChange from "./Pw_Change";
import ReactDOM from "react-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailChange from "./ChangeEmail";


function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = window.sessionStorage.getItem("id");

    console.log("사용자 아이디:", userId);
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/LoginInfo`,{
          params: {
            id: userId,
          }
        })
        .then((response) => {
          setUserInfo(response.data[0]);
        })
        .catch((error) => {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        });
    }
  }, []);
  
  
  
  const openPopupPw = (popupName) => {
    const popupWindow = window.open(
      "",
      "팝업 제목",
      "width=600,height=400,menubar=no,location=no,resizable=no,scrollbars=no,status=no"
    );

    // 팝업 윈도우에 React 컴포넌트 렌더링
    popupWindow.document.body.innerHTML = "<div id='popuppw-root'></div>";
    const contanier = popupWindow.document.getElementById("popuppw-root");
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
    if (popupName === "PwChange") {
      ReactDOM.render(<PwChange onClose={popupWindow.close} />, contanier);
    } else if (popupName === "EmailChange") {
      ReactDOM.render(<EmailChange onClose={popupWindow.close} />, contanier);
    }
  };
  useEffect(() => {
    if (!window.sessionStorage.getItem('id')) {
      // Log out users who are not logged in and navigate to the login page
      const confirmResult = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
      if (confirmResult) {
        navigate("/login");
      }
    }
  }, [navigate]);
  return (
    <>
      <div className="UserInfodiv">
        <h3>회원정보</h3>
        {userInfo ? (
          <>
            <div className="h4div">
              <h4>
                회원님은 <span style={{ color: "red" }}>"{userInfo.rank}"</span>
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
                    <td className="ID">{userInfo.ID}</td>
                    </tr>
                  <tr>
                    <th scope="row">이메일</th>
                    <td>
                      <br/>
                      {userInfo.email}
                      <p className="fs12_v2 color_gray">
                        <label htmlFor="agree_mail">
                        <Button
                        onClick={() => openPopupPw("EmailChange")}
                        sx={{
                          border: "1px solid #000",
                          color: "black",
                          fontSize: "12px",
                        }}
                      >
                        이메일 변경 
                      </Button>
                        </label>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비밀번호</th>
                    <td>
                      {userInfo.PW}
                      <Button
                        onClick={() => openPopupPw("PwChange")}
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

                    <td className="number">{userInfo.tel}</td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>로그인이 필요합니다!</p>
        )}
      </div>
    </>
  );
}

export default UserInfo;
