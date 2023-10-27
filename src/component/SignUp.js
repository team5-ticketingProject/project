import React from "react";
import Navigation from "./Navigation";
import "../css/signup.css";

const SignUp = () => {
    return(
        <div>
            <Navigation />
            <div class='container'>
                <h2>정보입력</h2>
                <table>
                    <tr>
                        <td>아이디</td>
                        <td>
                            <input type="text" size={32}/>&nbsp; &nbsp; &nbsp; &nbsp;
                            <button>ID 중복 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" size={50} placeholder="8~16자리 영문, 숫자, 특수문자"/></td>
                    </tr>
                    <tr>
                        <td>비밀번호 확인</td>
                        <td><input type="password" size={50}/></td>
                    </tr>
                    <tr>
                        <td valign="top">전화번호</td>
                        <td>
                            <input type="text" size={50}/>
                            <p class='line'>&#10056; <span>(-)기호</span>를 포함하여 입력해주세요.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input type="text" size={26}/>&nbsp;@&nbsp;<input type="text" size={15} /></td>
                    </tr>
                </table>
                <div class='mid'>
                    <button>가입완료</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;