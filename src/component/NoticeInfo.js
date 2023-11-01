import { useNavigate, useLocation } from "react-router-dom";

function NoticeInfo(notice) {
  // 공지사항 목록
  const navigate = useNavigate();
  const location = useLocation();
  const selectedNotice = location.state?.selectedNotice || null;
 

  const goBackToNotice = () => {
    navigate("/mypageremake/mypagenotice");
  };
 

  
  return (
    <div className="Notice">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h1
          style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {selectedNotice ? selectedNotice.title : "No notice selected"}
        </h1>
      </div>
      <div style={{ marginTop: "20px" }}>
        <span style={{ color: "gray", fontSize:"14px" }}>
          등록일 :{" "}
          {selectedNotice
            ? new Date(new Date(selectedNotice.date).getTime()+ 9 * 60 * 60 * 1000).toISOString().slice(0, 16).replace('T', ' ')
            : "no notice selected"}
        </span>
      </div>

      <div className="text-container">
        <h4
          style={{
            overflowWrap: "break-word",
            padding: "20px",
            margin: "auto",
            fontSize:"17px"
          }}
        >
          {selectedNotice ? selectedNotice.content : "No notice selected"}
        </h4>
      </div>

      <button
        style={{
          position: "absolute",
          bottom: "100px",
          right: "500px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
        onClick={goBackToNotice}
      >
        목록으로
      </button>
    </div>
  );
}

export default NoticeInfo;
