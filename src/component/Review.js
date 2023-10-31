import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

function Review() {
  const [reviews, setReviews] = useState([]); // 후기 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const reviewsPerPage = 10; // 한 페이지에 보여질 후기 수

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getReview`)
      .then((response) => {
        // 이 부분에서 후기 데이터를 가져오는 API를 호출하여 상태에 설정 
        // 현재 페이지의 로그인된 ID와 동일한 내용을 가진 review 데이터만 출력
        const userId = window.sessionStorage.getItem("id");
        const filteredReviews = response.data.filter((review) => review.ID === userId);
        setReviews(filteredReviews);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="Review">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
          나의 후기 관리
        </h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>
          고객님께서 남겨주신 <span style={{color:"red"}}>후기</span>를 확인하실 수 있습니다.
          <br />
          운영정책에 위반되거나, 후기의 성격에 맞지 않는 글은 고객님께 사전 통보
          없이 삭제될 수 있습니다.
        </h4>
      </div>
      {currentReviews.length > 0 ? (
        <div>
          <table className="ReInfo">
            <thead>
              <tr>
                <th>상품명</th>
                <th>후기내용</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.show_name}</td>
                  <td>{review.content}</td>
                  <td>{review.date.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>작성한 후기가 없습니다.</p>
        </div>
      )}
      <div className="Pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
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

export default Review;
