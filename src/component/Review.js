import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

function Review() {
  const [reviews, setReviews] = useState([]); // 후기 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [editingReview, setEditingReview] = useState(null); // 수정 중인 후기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviewsPerPage = 10; // 한 페이지에 보여질 후기 수

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getReview`)
      .then((response) => {
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

  // 모달 열기
  const openModal = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 후기 수정
  const handleUpdateReview = (reviewId, content) => {
    const updatedReviewData = {
      review_number: reviewId,
      content: content,
    };
    axios
    .put(`${process.env.REACT_APP_SERVER_URL}/updateReview/${reviewId}`, updatedReviewData, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      // 성공적으로 업데이트된 후기를 받아와서 상태를 업데이트
      const updatedReview = response.data;
      const updatedReviews = reviews.map((review) => {
        if (review.review_number === updatedReview.review_number) {
          return updatedReview;
        }
        return review;
      });
      setReviews(updatedReviews);
      closeModal();
    })
    .catch((error) => {
      console.error(error);
    });
};

  // 후기 삭제
  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/deleteReview/${reviewId}`, {
        headers: { 'Content-Type': 'application/json' }, // content-type 설정
      })
      .then(() => {
        // 성공적으로 삭제된 후기를 받아와서 상태를 업데이트
        const updatedReviews = reviews.filter((review) => review.review_number !== reviewId);
        setReviews(updatedReviews);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="Review">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
          나의 후기 관리
        </h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>
          고객님께서 남겨주신 <span style={{ color: "red" }}>후기</span>를 확인하실 수 있습니다.
          <br />
          운영 정책에 위반되거나, 후기의 성격에 맞지 않는 글은 고객님께 사전 통보
          없이 삭제될 수 있습니다.
          <br />
          <br />
          제목을 클릭하면 <span style={{ color: "red" }}>수정/삭제</span>가 가능합니다.
        </h4>
      </div>
      {currentReviews.length > 0 ? (
        <div>
          <table className="ReInfo">
            <thead>
              <tr>
                <th>공연</th>
                <th>후기내용</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review, index) => (
                <tr key={index}>
                  <td>
                    <span
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => openModal(review)}
                    >
                      {review.show_name}
                    </span>
                  </td>
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
      {editingReview && isModalOpen && (
        <div className="Review-modal">
          <div className="modalcontent">
            <h2>후기 수정/삭제</h2>
            <textarea
            style={{marginTop:"50px", padding:"20px", marginRight:"20px"}}
              value={editingReview.content}
              onChange={(e) => setEditingReview({ ...editingReview, content: e.target.value })}
              rows="8"
              cols="70"
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => handleUpdateReview(editingReview.review_number, editingReview.content)}>저장</button>
        <button style={{ backgroundColor: "red", color: "white" }} className="delete-button" onClick={() => handleDeleteReview(editingReview.review_number)}>
          삭제
        </button>
      </div>
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
