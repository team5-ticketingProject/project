import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

function Notice(props) {
  const [notices, setNotices] = useState([]); // 공지사항 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const noticesPerPage = 10; // 한 페이지에 보여질 공지사항 수
  const [selectedNotice, setSelectedNotice] = useState(null);

  const openNoticeModal = (notice) => {
    // Notice 모달을 열 때 선택된 공지사항을 설정
    setSelectedNotice(notice);
    props.openModal("NoticeInfo", notice);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getNotice`)
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  
  return (
    <div className="Notice">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h3
          style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}
        >
          공지사항
        </h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>
          최신 <span style={{ color: "red" }}>공지사항</span>을 확인하실 수
          있습니다.
          <br />
          자세한 내용은 해당 공지사항을 클릭하여 확인하세요.
        </h4>
      </div>
      <div>
        <table className="NoticeInfo">
          <thead>
            <tr>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {currentNotices.map((notice, index) => (
              <tr key={index}>
                <td>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => openNoticeModal(notice)}
                  >
                    {notice.title}
                  </span>
                </td>
                <td>
                {new Date(new Date(notice.date).getTime() + 9 * 60 * 60 * 1000)
                      .toISOString().split("T")[0]} 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="Pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(notices.length / noticesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </div>
  );
}

export default Notice;
