import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import "../css/MyPage.css";
import Check from "./MyPage_Check";
import Notice from "./MyPage_Notice";
import Review from "./Review";
import UserInfo from "./Mypage_UserInfo";
import FAQ from "./Faq";
import Navigation from "./Navigation";
import Footer from "./Footer";


const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

function MyPage() {
  const [modalType, setModalType] = useState("Check");

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <div className="main">
      <div style={{height:'88vh' }}>
        <Navigation />
        </div>
      </div>
      <div className="MyPage">
        <div className="LeftNav">
        <div className="ListPadding">
          <List sx={style} component="nav" aria-label="mailbox folders">
            <br/>
            <ListItem button onClick={() => openModal("UserInfo")}>
              <ListItemText sx={{ fontWeight: "bold"}} primary="회원정보관리" />
            </ListItem>
            <br />
            <Divider />
            <br />
            <ListItem button onClick={() => openModal("Check")}>
              <ListItemText primary="예매확인/취소" />
            </ListItem>
            <br />
            <Divider />
            <br />
            <ListItem button onClick={() => openModal("Review")}>
              <ListItemText primary="나의 공연 관람" />
            </ListItem>
            <br />
            <Divider light />
            <br />
            <ListItem button>
              <ListItemText primary="소유한 인증기기 확인" />
            </ListItem>
            <br />
            <Divider />
            <ListItem button onClick={() => openModal("Notice")}>
              <ListItemText primary="공지사항" />
            </ListItem>
            <ListItem button  onClick={() => openModal("Faq")} >
              <ListItemText primary="자주묻는질문" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="1:1 문의" />
            </ListItem>
          </List>
          <Divider></Divider>
          </div>
        </div>
        <div className="modal" style={{ display: modalType ? "block" : "none", width:"1000px",height:"880px", margin:"auto",float:"left" }} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {modalType === "Check" && <Check />}
          {modalType === "UserInfo" && <UserInfo />}
          {modalType === "Review" && <Review />}
          {modalType === "Notice" && <Notice />}
          {modalType === "Faq" && <FAQ />}
        </div>
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MyPage;


