import React from "react";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "./fetchLoginUser";
import {useNavigate} from "react-router-dom"; 
import { Button } from "@mui/material";



function MacInfo() {
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보를 가져오는 비동기 함수
    async function fetchUser() {
      const userId = window.sessionStorage.getItem("id") // 현재 로그인한 사용자의 ID를 어떻게 가져올지에 따라 수정

      const user = await fetchUserInfo(userId); // fetchUserInfo 함수를 사용하여 사용자 정보 가져오기
      setUserInfo(user);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (!window.sessionStorage.getItem('id')) {
      // Display an alert with a message
      window.alert("로그인이 필요합니다.");
      
      // Navigate to the login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="MacInfo">
      {userInfo ? (
        <div className="MacCollect">
          <h2>인증기기</h2>
          <div style={{padding:"50px", border:"2px solid #ccc", fontWeight:"bold", fontSize:"20px",}}>
          <p>아이디 : {userInfo.ID}</p>
          <p>인증기기정보 : {userInfo.mac_address}</p>
          <Button sx={{backgroundColor:"red", fontWeight:"bold", color:"black",float:"right", margin:"-10px"}}>삭제</Button>
          </div>
        </div>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>

    )
}

export default MacInfo;