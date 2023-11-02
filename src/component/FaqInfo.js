import { useNavigate, useLocation } from "react-router-dom";


function FaqInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFaq= location.state?.selectedFaq || null;


  const goBacktoFaq = () => {
    navigate("/mypageremake/Faq");
  };


  
  return (
    <div className="FAQ">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h1
          style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {selectedFaq ? selectedFaq.question : "No FAQ selected"}
        </h1>
      </div>
      <div className="text-container">
        <h4
          style={{
            overflowWrap: "break-word",
            padding: "60px",
            margin: "auto",
            fontSize: "17px",
          }}
        >
          {selectedFaq ? selectedFaq.answer : "No FAQ selected"}
        </h4>
      </div>
      <button
        style={{
          position: "absolute",
          bottom: "100px",
          right: "500px",
          fontWeight:"bold",
          fontSize:"16px"
        }}
        onClick={goBacktoFaq}
      >
        목록으로
      </button>
    </div>
  );
}

export default FaqInfo;
