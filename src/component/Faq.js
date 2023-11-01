import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FaqInfo from "./FaqInfo";

function FAQ() {
  const [faqs, setFAQs] = useState([]); // FAQ 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const faqsPerPage = 10; // 한 페이지에 보여질 FAQ 수
  const [selectedFaq, setSelectedFaq] = useState(null);
  const navigate = useNavigate();
  const OpenFaqInfoClick = (faq) => {
  
  navigate(`/mypageremake/Faqinfo/`, { state: { selectedFaq: faq } });
  }
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getFAQ`)
      .then((response) => {
        setFAQs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastFAQ = currentPage * faqsPerPage;
  const indexOfFirstFAQ = indexOfLastFAQ - faqsPerPage;
  const currentFAQs = faqs.slice(indexOfFirstFAQ, indexOfLastFAQ);


  return (
    <div className="FAQ">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
          자주 묻는 질문 (FAQ)
        </h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>
          <span style={{color:"red"}}>자주묻는질문</span>을 확인하실 수 있습니다.
          <br />
          궁금한 내용을 클릭하여 답변을 확인하세요.
        </h4>
      </div>
      <div>
        <table className="FAQInfo">
          <thead>
            <tr>
              <th>질문</th>
              <th>답변</th>
            </tr>
          </thead>
          <tbody>
            {currentFAQs.map((faq, index) => (
              <tr key={index}>
                <td>
                  <span style={{cursor:"pointer"}} onClick={() => OpenFaqInfoClick(faq)}>
                    {faq.question}
                  </span>
                </td>
                <td style={{textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap", maxHeight:"200px", maxWidth:"200px"}}>
                  {faq.answer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(faqs.length / faqsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
      {selectedFaq && (
        <FaqInfo inquiry={selectedFaq} />
      )}
    </div>
  );
}

export default FAQ;