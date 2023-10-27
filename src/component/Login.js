import React, { useRef } from 'react';
import Navigation from "./Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/login.css';

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 입력하세요!!!");
      idRef.current.focus();
      return false;
    }
    else if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("패스워드를 입력하세요!!!");
      pwRef.current.focus();
      return false;
    }
    else {
       axios
         .post("http://localhost:5000/login", {
           id: idRef.current.value,
           pw: pwRef.current.value,
         })
         .then((res) => {
            console.log(res.data[0])
           if (res.data[0].ID === idRef.current.value && res.data[0].pw === pwRef.current.value) {
             window.sessionStorage.setItem("id", idRef.current.value); 
             // 세션스토리지에 key : id , value : idRef.current.value로 저장
             // sessionsStorage는 창 닫으면 사라짐, localStorage는 안사라짐
             if (res.data[0].rank === 0) {
              document.location.href = '/mypage';
             } else {document.location.href='/';}
           } else {
             alert("아이디, 패스워드가 정확하지 않습니다.");
             console.log(res.data[0])
             idRef.current.value = "";
             pwRef.current.value = "";
             navigate("/login");
           }
         })
         .catch((e) => {
           console.error(e);
         });
       }
    // else {
    //    axios
    //      .post("http://localhost:5000/login", {
    //        id: idRef.current.value,
    //        pw: pwRef.current.value,
    //      })
    //      .then((res) => {
    //        if (res.data[0].cnt === 1) {
    //          window.sessionStorage.setItem("id", idRef.current.value); 
    //          // 세션스토리지에 key : id , value : idRef.current.value로 저장
    //          // sessionsStorage는 창 닫으면 사라짐, localStorage는 안사라짐
    //          document.location.href='/';
    //        } else {
    //          alert("아이디, 패스워드가 정확하지 않습니다.");
    //          idRef.current.value = "";
    //          pwRef.current.value = "";
    //          navigate("/login");
    //        }
    //      })
    //      .catch((e) => {
    //        console.error(e);
    //      });
    //    }
  }
    return(
        <div>
            <Navigation />
            <div class="form">
                <img src='img/user.png' alt='로그인형상'/>
                <p>LOGIN</p>
                <form>
                    <input class="login" type="text" placeholder="아이디" ref={idRef} />
                    <input class="login" type="password" placeholder="비밀번호" ref={pwRef}/>
                    <button onClick={handleLogin}>로그인</button>
                    <div class='left'><a href='/signup'>회원가입</a></div>
                    <div class='right'><a href='/findIP'>아이디/비밀번호 찾기</a></div>
                    <div class='easy'>
                        <p>간편 로그인</p>
                        <div class='kdiv'>
                            <a href='/login'><img class='kakao' src='img/kakao.png' alt='카카오'/></a><br />
                            <a href='/login' class='size'>카카오 로그인</a>
                        </div>
                        <div class='kdiv'>
                            <a href='/login'><img class='kakao' src='img/naver.png' alt='네이버'/></a><br />
                            <a href='/login' class='size'>네이버 로그인</a>
                        </div>
                        <div class='ezlogin'>
                            <a href='/login' class='sizeb'>아이핀<br/>로그인</a><br/>
                            <a href='/login'><img class='smallimg' src='img/IPIN.png' alt='아이핀'/></a>
                        </div>
                        <div class='ezlogin'>
                            <a href='/login' class='sizeb'>금융인증서<br/>로그인</a><br/>
                            <a href='/login'><img class='smallimg' src='img/key.png' alt='금융인증서'/></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
