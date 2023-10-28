import React, { useState, useEffect } from "react";
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
import InquiryContactUs from "./Inquiry";
import NoticeInfo from "./NoticeInfo";
import FaqInfo from "./FaqInfo";
import InquiryAnswer from "./inquiry_answer";
import SelectInput from "@mui/material/Select/SelectInput";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

function MyPage() {
  const [modalType, setModalType] = useState("Notice");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [previousModalType, setPreviousModalType] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null); 


  const openModal = (type, notice, faq, inquiry) => {
    setPreviousModalType(modalType);
    setModalType(type);
    setSelectedNotice(notice);
    setSelectedFaq(faq);
    setSelectedInquiry(inquiry);
    
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setModalType();
    setSelectedNotice(null);
    setSelectedFaq(null);
    setSelectedInquiry(null);
   
  };
  

  useEffect(() => {
    // 뒤로 가기 버튼을 감지하는 이벤트 리스너
    const handlePopState = (event) => {
      if (event.state && event.state.modalType) {
        setModalType(event.state.modalType);
        setSelectedNotice(null);
        setSelectedFaq(null);
        setSelectedInquiry(null);
       
        
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateToModal = (type) => {
    if (type === "Check") {
      // 예매확인/취소 섹션으로 이동
      setModalType("Check");
    } else {
      // 다른 섹션으로 이동하는 경우
      setModalType(type);
    }
    setSelectedNotice(null);
    setSelectedFaq(null);
    setSelectedInquiry(null);
    const modalState = { modalType: type };
    window.history.pushState(modalState, null, null);
  };

  return (
    <div>
      <div className="main">
        <div style={{ height: "88vh" }}>
          <Navigation navigateToModal={navigateToModal} />
        </div>
      </div>
      <div className="MyPage">
        <div className="LeftNav">
          <div className="ListPadding">
            <List sx={style} component="nav" aria-label="mailbox folders">
              <br />
              <ListItem button onClick={() => navigateToModal("UserInfo")}>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      회원정보관리
                    </span>
                  }
                />
              </ListItem>
              <br />
              <Divider />
              <br />
              <ListItem button onClick={() => navigateToModal("Check")}>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      예매/확인취소
                    </span>
                  }
                />
              </ListItem>
              <br />
              <Divider />
              <br />
              <ListItem button onClick={() => navigateToModal("Review")}>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      나의 후기
                    </span>
                  }
                />
              </ListItem>
              <br />
              <Divider light />
              <br />
              <ListItem button>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      소유기기 인증확인
                    </span>
                  }
                />
              </ListItem>
              <br />
              <Divider />
              <ListItem button onClick={() => navigateToModal("Notice")}>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      공지사항
                    </span>
                  }
                />
              </ListItem>
              <ListItem button onClick={() => navigateToModal("Faq")}>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      자주묻는질문
                    </span>
                  }
                />
              </ListItem>
              <ListItem button onClick={() => navigateToModal("Inquiry")}>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      1:1 문의
                    </span>
                  }
                />
              </ListItem>
            </List>
            <Divider></Divider>
          </div>
        </div>
        <div
          className="modal"
          style={{
            display: modalType ? "block" : "none",
            width: "1000px",
            height: "100%",
            margin: "auto",
            float: "left",
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content"
            style={{ height: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {modalType === "Check" && <Check />}
            {modalType === "UserInfo" && <UserInfo />}
            {modalType === "Review" && <Review />}
            {modalType === "Notice" && <Notice openModal={openModal} />}
            {modalType === "NoticeInfo" && (
              <NoticeInfo
                selectedNotice={selectedNotice}
                goBackToNotice={closeModal}
                openModal={openModal}
              />
            )}
            {modalType === "Faq" && <FAQ openModal={openModal} />}
            {modalType === "FaqInfo" && (
              <FaqInfo
                selectedFaq={selectedFaq}
                goBackToFaq={closeModal}
                openModal={openModal}
              />
            )}
            {modalType === "Inquiry" && <InquiryContactUs openModal={openModal} />}
            {modalType === "InquiryAnswer" && ( <InquiryAnswer selectedInquiry={selectedInquiry} goBackToInquiry={closeModal} openModal={openModal} />)}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MyPage;