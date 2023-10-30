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
              }
            })
            .catch((e) => {
              console.error(e);
            });
          }
    };

    const submitUser = () => {
        if (idRef.current.value === "" || idRef.current.value === undefined) {
            alert("아이디를 입력하세요.");
          }
          else if (pwRef.current.value === "" || pwRef.current.value === undefined) {
            alert("패스워드를 입력하세요.");
          }
          else if (pwRef.current.value !== repwRef.current.value) {
            alert("패스워드가 틀립니다.");
          }
          else if (telRef.current.value === "" || telRef.current.value === undefined) {
            alert("전화번호를 입력하세요.");
          }
          else if (fmailRef.current.value === "" || fmailRef.current.value === undefined || bmailRef.current.value === "" || bmailRef.current.value === undefined) {
            alert("이메일을 입력하세요.");
          } else {
            const email = `${fmailRef.current.value}@${bmailRef.current.value}`;
            console.log(email);
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
          document.location.href="/login"
        }
        else alert("회원가입 실패!!!");
      })
      .catch((e) => {
        console.error(e);
      });
    }
    };
    
    return(
        <div>
            <Navigation />
            <div class='container'>
                <h2>정보입력</h2>
                <table>
                    <tr>
                        <td>아이디</td>
                        <td>
                            <input type="text" size={32} ref={idRef}/>&nbsp; &nbsp; &nbsp; &nbsp;
                            <button class="btn" onClick={IDCheck}>ID 중복 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" size={50} ref={pwRef} placeholder="8~16자리 영문, 숫자, 특수문자"/></td>
                    </tr>
                    <tr>
                        <td>비밀번호 확인</td>
                        <td><input type="password" size={50} ref={repwRef}/></td>
                    </tr>
                    <tr>
                        <td valign="top">전화번호</td>
                        <td>
                            <input type="text" size={50} ref={telRef}/>
                            <p class='line'>&#10056; <span class="red">(-)기호</span>를 포함하여 입력해주세요.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input type="text" size={26} ref={fmailRef}/>&nbsp;@&nbsp;<input type="text" size={15} ref={bmailRef}/></td>
                    </tr>
                </table>
                <div class='mid'>
                    <button onClick={submitUser}>가입완료</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
