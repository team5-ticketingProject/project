import { useNavigate, useLocation, useParams } from "react-router-dom";


function InquiryAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const selectedInquiry = location.state?.selectedInquiry || null;


  const goBackToInquiry = () => {
    navigate("/mypageremake/Inquiry");
  };

  return (
    <div className="Notice">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h1
          style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {selectedInquiry
            ? selectedInquiry.inquiry_title
            : "No notice selected"}
        </h1>
      </div>

      <div className="text-container">
        <p style={{ fontWeight: "bold", color: "#f123a2", padding: "20px" }}>
         
          문의 내용 :
        </p>
        <h4
          style={{
            overflowWrap: "break-word",

            margin: "auto",
            padding: "20px",
          }}
        >
          {selectedInquiry
            ? selectedInquiry.inquiry_content
            : "No notice selected"}
        </h4>
        <p style={{ fontWeight: "bold", color: "#f123a2", padding: "20px" }}>
          문의 답변 : 
        </p>
        <h4
          style={{
            overflowWrap: "break-word",

            margin: "auto",
            padding: "20px",
          }}
        >
          {selectedInquiry
            ? selectedInquiry.answer || "답변을 작성 중입니다."
            : "Not answer"}
        </h4>
        <button
          onClick={goBackToInquiry}
          style={{
            position: "absolute",
            bottom: "100px",
            right: "300px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          목록으로
        </button>
      </div>
    </div>
  );
}

export default InquiryAnswer;
