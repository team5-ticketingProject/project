import React, { useEffect, useState } from "react";
import { fetchUserInfo } from "./fetchLoginUser";
import { Button } from "@mui/material";
import axios from "axios";

function MacInfo() {
  const [userInfo, setUserInfo] = useState(null);

  // userId 상태를 추가하여 의존성 배열에 넣어 데이터 로딩을 최적화
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // window.sessionStorage에서 userId를 가져오는 작업을 최적화
    const storedUserId = window.sessionStorage.getItem("id");

    if (storedUserId !== userId) {
      setUserId(storedUserId);
    }
  }, [userId]);

  useEffect(() => {
    async function fetchUser() {
      // userId가 변경될 때만 사용자 정보를 다시 불러옴
      if (userId) {
        const user = await fetchUserInfo(userId);
        setUserInfo(user);
      }
    }

    fetchUser();
  }, [userId]);

  const handleDeleteMac = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
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
            <p>인증기기정보: {userInfo.mac_address || "없음"}</p>
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
