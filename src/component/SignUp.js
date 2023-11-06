import React, { useRef }from "react";
import Navigation from "./Navigation";
import axios from "axios";
import "../css/signup.css";

const SignUp = () => {
    const idRef = useRef();
    const pwRef = useRef();
    const repwRef = useRef();
    const telRef = useRef();
    const fmailRef = useRef();
    const bmailRef = useRef();

    const IDCheck = () => {
        if (idRef.current.value === "" || idRef.current.value === undefined) {
            alert("아이디를 입력하세요!!!");
            idRef.current.focus();
        } else {
          console.log(idRef.current.value);
        axios
        .post(`${process.env.REACT_APP_SERVER_URL}/idcheck`, {
            id: idRef.current.value,
        })
        .then((res) => {
            if (res.data[0].cnt === 1) {
                alert("중복된 아이디가 존재합니다.")
                idRef.current.value = "";
              } else {
                alert("사용 가능한 아이디입니다.");
                window.sessionStorage.setItem("idcheck",1);
              }
            })
            .catch((e) => {
              console.error(e);
            });
          }
    };


    const submitUser = () => {
      const telCheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      const pwCheck = /^[a-z0-9_]{8,16}$/;
      const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (idRef.current.value === "" || idRef.current.value === undefined) {
            alert("아이디를 입력하세요.");
          }
          else if(!window.sessionStorage.getItem("idcheck")) {
            alert("아이디 중복체크를 해주세요.");
          }
          else if (pwRef.current.value === "" || pwRef.current.value === undefined) {
            alert("비밀번호를 입력하세요.");
          }
          else if (!pwCheck.test(pwRef.current.value)) {
            alert("조건에 맞게 비밀번호를 정해주세요.")
          }
          else if (pwRef.current.value !== repwRef.current.value) {
            alert("비밀번호가 일치하지 않습니다.");
          }
          else if (telRef.current.value === "" || telRef.current.value === undefined) {
            alert("전화번호를 입력하세요.");
          }
          else if(!telCheck.test(telRef.current.value)) {
            alert('전화번호를 다시 입력해주세요.')
          }
          else if (fmailRef.current.value === "" || fmailRef.current.value === undefined || bmailRef.current.value === "" || bmailRef.current.value === undefined) {
            alert("이메일을 입력하세요.");
          }  else {
            const email = `${fmailRef.current.value}@${bmailRef.current.value}`;
            console.log(email);
            if (!emailCheck.test(email)) {
              alert("이메일 형식에 맞게 입력해주세요.")
            }
            else {
      axios
      .post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        id: idRef.current.value,
        pw: pwRef.current.value,
        tel: telRef.current.value,
        email: email,
      })
      .then((res) => {
        console.log("handleMember =>", res);
        // 로그인 성공여부는 res.data.affectedRows가 0인지 1인지 확인하면 됨
        if (res.data.affectedRows === 1) {
          alert("회원가입 성공!!!");
          window.sessionStorage.removeItem("idcheck");
          document.location.href="/login"
        }
        else alert("회원가입 실패!!!");
      })
      .catch((e) => {
        console.error(e);
      });
    }
  }
    };

    return(
        <div>
            <Navigation />
            <div class='container'>
              <div className="signup_title">
                <img src="img/logo_white.png"/>
              </div>
                <table className="signup_content">
                    <tr>
                        <td>아이디</td>
                        <td>
                            <input type="text" size={32} ref={idRef}/>&nbsp; &nbsp; &nbsp; &nbsp;
                            <button class="btn" onClick={IDCheck}>ID 중복 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" size={50} ref={pwRef} placeholder="&nbsp;&nbsp;8~16자리 영문, 숫자, 특수문자"/></td>
                    </tr>
                    <tr>
                        <td >비밀번호 확인</td>
                        <td>
                        <input type="password" size={50} ref={repwRef}/>
                        </td>
                    </tr>
                    <tr>
                        <td class="custom-align">전화번호</td>
                        <td>
                            <input type="text" size={50} ref={telRef}/>
                            <p class='line'>&#10056; <span class="red">(-)기호</span>를 포함하여 입력해주세요.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input type="text" size={15} ref={fmailRef}/>&nbsp;@&nbsp;<input type="text" size={26} ref={bmailRef}/></td>
                    </tr>
                    <tr>
                    <td></td>
                    <td><button className="last_btn" onClick={submitUser}>가입완료</button></td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default SignUp;
