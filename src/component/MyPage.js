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
  const [modalType, setModalType] = useState("UserInfo");
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
      setModalType("Check");
    } else {
      setModalType(type);
    }
    setSelectedNotice(null);
    setSelectedFaq(null);
    setSelectedInquiry(null);
    const modalState = { modalType: type };
    window.history.pushState(modalState, null, null);
  };

  // 아래는 좌측 네비게이션 메뉴 항목을 배열로 정의하여 반복적으로 렌더링합니다.
  const leftNavItems = [
    { label: "회원정보관리", type: "UserInfo" },
    { label: "예매/확인취소", type: "Check" },
    { label: "나의 후기", type: "Review" },
    { label: "소유기기 인증확인", type: "DeviceVerification" },
    { label: "공지사항", type: "Notice" },
    { label: "자주묻는질문", type: "Faq" },
    { label: "1:1 문의", type: "Inquiry" },
  ];

  return (
    <div>
      <div className="main">
        <div style={{ height: "88vh" }}>
          <Navigation />
        </div>
      </div>
      <div className="MyPage">
        <div className="LeftNav">
          <div className="ListPadding">
            <List sx={style} component="nav" aria-label="mailbox folders">
              <br />
              {leftNavItems.map((item, index) => (
                <div key={index}>
                  <ListItem button onClick={() => navigateToModal(item.type)}>
                    <ListItemText
                      primary={
                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                          {item.label}
                        </span>
                      }
                    />
                  </ListItem>
                  <br />
                  {index < leftNavItems.length - 1 && <Divider />}
                </div>
              ))}
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
            className="modal-contents"
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
            {modalType === "Inquiry" && (
              <InquiryContactUs openModal={openModal} />
            )}
            {modalType === "InquiryAnswer" && (
              <InquiryAnswer
                selectedInquiry={selectedInquiry}
                goBackToInquiry={closeModal}
                openModal={openModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
