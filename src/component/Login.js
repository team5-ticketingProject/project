import React from 'react';
import Navigation from "./Navigation";
import axios from "axios";
import '../css/login.css';

const Login = () => {

    
    return(
        <div>
            <Navigation />
            <div class="form">
                <img src='img/user.png'/>
                <p>LOGIN</p>
                <form>
                    <input class="login" type="text" placeholder="아이디" />
                    <input class="login" type="password" placeholder="비밀번호" />
                    <button>로그인</button>
                    <div class='left'><a href='/signup'>회원가입</a></div>
                    <div class='right'><a href='/findIP'>아이디/비밀번호 찾기</a></div>
                    <div class='easy'>
                        <p>간편 로그인</p>
                        <div class='kdiv'>
                            <a href='#'><img class='kakao' src='img/kakao.png' /></a><br />
                            <a href='#' class='size'>카카오 로그인</a>
                        </div>
                        <div class='kdiv'>
                            <a href='#'><img class='kakao' src='img/naver.png' /></a><br />
                            <a href='#' class='size'>네이버 로그인</a>
                        </div>
                        <div class='ezlogin'>
                            <a href='#' class='sizeb'>아이핀<br/>로그인</a><br/>
                            <a href='#'><img class='smallimg' src='img/IPIN.png'/></a>
                        </div>
                        <div class='ezlogin'>
                            <a href='#' class='sizeb'>금융인증서<br/>로그인</a><br/>
                            <a href='#'><img class='smallimg' src='img/key.png'/></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;