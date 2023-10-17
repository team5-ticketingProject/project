import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ContactForm from "./InquiryPopUp";// 수정된 파일명 사용
import ReactDOM from "react-dom";

function ContactUs() {
  const [inquiries, setInquiries] = useState([]); // 1:1 문의 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const inquiriesPerPage = 10; // 한 페이지에 보여질 1:1 문의 수
  

  // 예시로 1:1 문의 데이터를 상태에 추가
  useEffect(() => {
    // 이 부분에서 1:1 문의 데이터를 가져오는 API를 호출하여 상태에 설정
    const sampleInquiries = [
      {
        subject: "문의 제목 1",
        message: "문의 내용 1",
        date: "문의 일자 1",
      },
      {
        subject: "문의 제목 2",
        message: "문의 내용 2",
        date: "문의 일자 2",
      },
      // 나머지 1:1 문의 데이터도 추가
    ];
    setInquiries(sampleInquiries);
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = inquiries.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );
  const openPopup = () => {
    const popupWindow = window.open(
      "",
      "팝업 제목",
      "width=600,height=400,menubar=no,location=no,resizable=no,scrollbars=no,status=no"
    );

    // 팝업 윈도우에 React 컴포넌트 렌더링
    popupWindow.document.body.innerHTML = "<div id='popup-root'></div>";
    ReactDOM.render(<ContactForm />, popupWindow.document.getElementById("popup-root"));
  };


  return (
    <div className="ContactUs">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "50px" }}>
          1:1 문의
        </h3>
        <h5> 자세한 문의는 <span style={{color:"red"}}>문의하기</span>를 통해 가능합니다. </h5>
        <Stack direction="row" spacing={2} sx={{ marginTop: "40px", marginBottom: "30px" }}>
          <Button
            sx={{ padding: "15px", backgroundColor: "black" }}
            variant="contained"
            onClick={openPopup}
          >
            문의하기
          </Button>
        </Stack>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>문의 내용을 클릭하여 답변을 확인하세요.</h4>
      </div>
      <div>
        <table className="ContactUsInfo">
          <thead>
            <tr>
              <th>문의 제목</th>
              <th>문의 내용</th>
              <th>문의 일자</th>
            </tr>
          </thead>
          <tbody>
            {currentInquiries.map((inquiry, index) => (
              <tr key={index}>
                <td>{inquiry.subject}</td>
                <td>{inquiry.message}</td>
                <td>{inquiry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(inquiries.length / inquiriesPerPage)}
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

export default ContactUs;
