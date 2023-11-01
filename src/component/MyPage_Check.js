import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import "../css/MyPage.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import ReactDOM from "react-dom";
import ReCancel from "./Re_Cancel";
import { fetchUserInfo } from "./fetchLoginUser";
import {useNavigate} from "react-router-dom"; 


function Check() {
  const [selectedPeriod, setSelectedPeriod] = useState("15일");
  const [reservationInfo, setReservationInfo] = useState([]);
  const [isActive, setIsActive] = useState("15일");
  const [isLoading, setIsLoading] = useState(false); // 버튼 로딩 상태
  const [selectedYear, setSelectedYear] = useState(""); // 선택한 연도
  const [selectedMonth, setSelectedMonth] = useState(""); // 선택한 월
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [userInfo, setUserInfo] = useState(null);
  const [filteredReservationInfo, setFilteredReservationInfo] = useState([]);

  const ReservationPerPage = 10; // 한 페이지에 보여질 공지사항 수

  const indexOfLastreservation = currentPage * ReservationPerPage;
  const indexOfFirstreservation = indexOfLastreservation - ReservationPerPage;
  const currentreservations = filteredReservationInfo.slice(indexOfFirstreservation, indexOfLastreservation);

  const navigate = useNavigate();
  
  const handleReservationInfoClick = (selectedReservationInfo) => {
    
    const popupWindow = window.open(
      "",
      "팝업 제목",
      "width=1000,height=600,menubar=no,location=no,resizable=no,scrollbars=no,status=no"
    );
    function closePopupWindow() {
      if (popupWindow) {
        popupWindow.close();
      }
    }

    // 팝업 윈도우에 React 컴포넌트 렌더링
    popupWindow.document.body.innerHTML = "<div id='popuppw-root'></div>";
    ReactDOM.render(
      <ReCancel selectedReservationInfo={selectedReservationInfo}
      closePopupWindow={closePopupWindow} />,
      popupWindow.document.getElementById("popuppw-root")
    );
    popupWindow.document.head.innerHTML += `
    <style>
      .Re_Cancle {
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      height: 800px;
      width: 800px;
      }
    </style>
  `;
  };

  const fetchReservationInfo = useCallback((period, startDate, endDate) => {
    setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getreservation_info`)
      .then((response) => {
        const filteredData = response.data.filter((item) => {
          const reDate = new Date(item.re_date);
          return reDate >= startDate && reDate <= endDate;
        });
        setReservationInfo(filteredData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
   
  
    const today = new Date();
    let startDate;
    let endDate;

    if (selectedPeriod === "15일") {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 15);
      endDate = new Date(today);
    } else if (selectedPeriod === "1개월") {
      startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 1);
      endDate = new Date(today);
    } else if (selectedPeriod === "3개월") {
      startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 3);
      endDate = new Date(today);
    }

    fetchReservationInfo(selectedPeriod, startDate, endDate);
  }, [selectedPeriod, fetchReservationInfo]);
  
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlePeriodClick = useCallback((period) => {
    if (isLoading) {
      return;
    }
    if (period === selectedPeriod) {
      return;
    }

    setSelectedPeriod(period);
    setIsActive(period);
  }, [isLoading, selectedPeriod]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleMonthClick = () => {
    if (selectedYear === "" || selectedMonth === "") {
      handlePeriodClick("15일");
      return;
    }

    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth) - 1;
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    fetchReservationInfo("custom", startDate, endDate);
  }; 

  const loadUserInfo = async () => {
    
    const userId = window.sessionStorage.getItem("id");
    if (userId) {
      try {
        const user = await fetchUserInfo(userId);
        setUserInfo(user);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    }
  };

  // useEffect를 사용하여 사용자 정보를 가져오도록 설정
  useEffect(() => {
    loadUserInfo();
  }, []); // 처음 한 번만 실행

  // 예매 정보 필터링
  
  useEffect(() => {
  const filteredReservationInfo = reservationInfo.filter((item) => {
    return userInfo && item.user_ID === userInfo.ID;
  });
  setFilteredReservationInfo(filteredReservationInfo);
}, [userInfo, reservationInfo]);


useEffect(() => {
  if (!window.sessionStorage.getItem('id')) {
    // Display an alert with a message
    window.alert("로그인이 필요합니다.");
    
    // Navigate to the login page
    navigate("/login");
  }
}, [navigate]);
  return (
    <div className="Check">
      <h1>예매확인/취소</h1>
      <hr />

      <h3>
        <span>예매번호</span>를 클릭하면 예매 상세 내용을 확인할 수 있습니다.
      </h3>
      <div className="Reservation">
        <div className="select-container">
          <div
            className="button-container"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="custom-p" style={{ marginRight: "10px" }}>
              기간별 조회
            </div>
            <Box sx={{ margin: "5px" }}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button
                  sx={{
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                      borderColor: "gray",
                    },
                    borderColor: "gray",
                    backgroundColor: isActive === "15일" ? "black" : "white",
                    color: isActive === "15일" ? "white" : "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => handlePeriodClick("15일")}
                >
                  <span style={{ fontWeight: "bold" }}>15일</span>
                </Button>
                <Button
                  sx={{
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                      borderColor: "gray",
                    },
                    borderColor: "gray",
                    backgroundColor: isActive === "1개월" ? "black" : "white",
                    color: isActive === "1개월" ? "white" : "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => handlePeriodClick("1개월")}
                >
                  1개월
                </Button>
                <Button
                  sx={{
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                      borderColor: "gray",
                    },
                    borderColor: "gray",
                    backgroundColor: isActive === "3개월" ? "black" : "white",
                    color: isActive === "3개월" ? "white" : "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => handlePeriodClick("3개월")}
                >
                  <span style={{ fontWeight: "bold" }}>3개월</span>
                </Button>
              </ButtonGroup>
            </Box>
          </div>
          <div
            className="custom-p"
            style={{ marginLeft: "100px", marginRight: "5px" }}
          >
            월 별 조회
          </div>
          <select
            className="form-select"
            onChange={handleYearChange}
            value={selectedYear}
            style={{ width: "auto", padding: "4px", margin: "5px" }}
          >
            <option value="">연도</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <select
            className="form-select"
            onChange={handleMonthChange}
            value={selectedMonth}
            style={{ width: "auto", padding: "4px", margin: "5px" }}
          >
            <option value="">월</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <button
            style={{
              border: "2px solid #000",
              borderRadius: "4px",
              padding: "4px 10px",
              fontWeight: "bold",
              margin: "5px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={handleMonthClick}
          >
            조회
          </button>
        </div>
      </div>
      <div>
        <table className="ReInfo">
          <thead>
            <tr>
              <th>예매번호</th>
              <th>티켓명</th>
              <th>관람일시</th>
              <th>매수</th>
              <th>취소가능일</th>
              <th>예매날짜</th>
            </tr>
          </thead>
          <tbody>
            {currentreservations.length === 0 ?  (
              <tr>
                <td colSpan="6">예매한 내역이 없습니다.</td>
              </tr>
            ) : (
              filteredReservationInfo.map((item, index) => (
                <tr key={index}>
                  <td>
                    <button
                      style={{ backgroundColor: "white", border: "none", cursor: "pointer" }}
                      onClick={() => handleReservationInfoClick(item)}
                    >
                      {item.show_number}
                    </button>
                  </td>
                  <td>{item.show_ID}</td>
                  <td>
                  {new Date(new Date(item.DATE).getTime() + 9 * 60 * 60 * 1000)
                      .toISOString().split("T")[0]} {item.TIME}
                  </td>
                  <td>{item.re_number}</td>
                  <td>
                    {
                      new Date(new Date(item.DATE) - 15 * 60 * 60 * 1000)
                      .toISOString().split("T")[0]} {item.TIME}
                  </td>
                  <td>{new Date(new Date(item.re_date).getTime() + 9 * 60 * 60 * 1000).toISOString().split("T")[0]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="Pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredReservationInfo.length / ReservationPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
      <div className="Cancle">
        <h6>티켓취소 안내</h6>
        <ol>
          <li>
            예매한 티켓 전체 취소, 혹은 신용카드 결제 시 부분 취소가 가능합니다.
            <br />
            단, 일부 상품의 경우도 부분 취소가 불가합니다.
          </li>
          <li>
            티켓이 배송된 이후에는 인터넷이나 고객센터를 통한 취소가 불가하며,
            받으신 티켓을 취소일 전까지 NHN LINK 본사로 반송을 해주셔야 취소
            가능합니다. (등기우편을 이용해주세요!)
          </li>
          <li>
            예매 당일 자정까지 취소하실 경우는 예매수수료도 환불되며,
            취소수수료가 부과되지 않습니다. 그 이후에 취소하실 경우는
            예매수수료가 환불되지 않으며, 취소수수료는 정책에 따라 부과됩니다.
          </li>
          <li>
            티켓의 날짜/시간/좌석 등급/좌석 위치 변경은 불가합니다. 자세한
            안내가 필요할 경우 고객센터를 이용해주세요.
          </li>
        </ol>
      </div>
    </div>
  );
}
export default Check;
