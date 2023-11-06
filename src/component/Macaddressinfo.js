import React, { useEffect, useState } from "react";
import { fetchUserInfo } from "./fetchLoginUser";
import { Button } from "@mui/material";
import axios from "axios";

function MacInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [userMacAddress, setUserMacAddress] = useState(null); // 로그인된 사용자의 맥 주소
  const [currentuserMacAddress, setCurrentUserMacAddress] = useState(null);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = window.sessionStorage.getItem("id");
    if (storedUserId !== userId) {
      setUserId(storedUserId);
    }
  }, [userId]);

  useEffect(() => {
    async function fetchUser() {
      if (userId) {
        const user = await fetchUserInfo(userId);
        setUserInfo(user);

        if (user && user.mac_address) {
          setUserMacAddress(user.mac_address); // 로그인된 사용자의 맥 주소 설정
        }
      }
    }

    fetchUser();
  }, [userId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/getmacaddress`, {
        params: { userConsent: 'true' }
      })
      .then((response) => {
        setCurrentUserMacAddress(response.data.mac);
        console.log(currentuserMacAddress)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentuserMacAddress]); // 컴포넌트가 처음 렌더링될 때 맥 주소를 가져옴

  const handleDeleteMac = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 사용자의 맥 주소와 DB에서 가져온 맥 주소 비교
      if (userInfo && currentuserMacAddress && userInfo.mac_address && currentuserMacAddress === userInfo.mac_address) {
        console.log(userInfo.mac_address)
        axios
          .put(`${process.env.REACT_APP_SERVER_URL}/deleteMac/${userId}`, {
            headers: { "Content-Type": "application/json" },
          })
          .then(() => {
            // 삭제 후 바로 화면을 업데이트
            setUserInfo({ ...userInfo, mac_address: null });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("맥 주소가 일치하지 않습니다.");
      }
    }
  };

  return (
    <div className="MacInfo">
      {userInfo ? (
        <div className="MacCollect">
          <h2>인증기기</h2>
          <div
            style={{
              padding: "50px",
              border: "2px solid #ccc",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <p>아이디: {userInfo.ID}</p>
            <p>인증기기정보: {userInfo.mac_address ? userInfo.mac_address.replace(/(\w{2}:\w{2}:\w{2}).*/, '$1:**:**') : "없음"}</p>
            {userInfo.mac_address && (
              <Button
                onClick={handleDeleteMac}
                sx={{
                  backgroundColor: "red",
                  fontWeight: "bold",
                  color: "black",
                  float: "right",
                  margin: "-10px",
                }}
              >
                삭제
              </Button>
            )}
          </div>
        </div>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
}

export default MacInfo;
