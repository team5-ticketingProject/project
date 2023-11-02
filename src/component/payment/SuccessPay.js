import React from "react";
import Navigation from "../Navigation";
import {useNavigate} from 'react-router-dom';
import './Payment.css';

const SuccessPay = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="main">
                <Navigation />
            </div>
            <div className="pay_suc_con">
                <img className="pay_suc_img" src="img/pay_success.png" alt='예매성공이미지'/>
                <p className="pay_suc_text">결제가 정상 승인되었습니다.</p>
                <button className="pay_suc_but1" size="large" onClick={() => navigate("/")}>홈</button>
                <button className="pay_suc_but2"size="large" onClick={() => navigate("/mypageremake/Check")}>예매 확인</button>
                </div>
            </div>
    );
}

export default SuccessPay;