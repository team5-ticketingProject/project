import React from "react";
import Navigation from "./Navigation";
import MypageleftNav from "./mypageleftnav";
import { Routes, Route } from "react-router-dom";
import MypageNotice from "./MyPage_Notice";
import UserInfo from "./Mypage_UserInfo";
import Check from "./MyPage_Check";
import Review from "./Review";
import MacInfo from "./Macaddressinfo";
import FAQ from "./Faq";
import InquiryContactUs from "./Inquiry";
import InquiryAnswer from "./inquiry_answer";
import NoticeInfo from "./NoticeInfo";
import FaqInfo from "./FaqInfo";
import Footer from "./Footer";

function MypageRemake() {
  return (
    <div>
        <Navigation></Navigation>
    <div className="Mypageremake">
      
      <div className="LeftNav">
        <MypageleftNav />
      </div>
      <div className="MypageContainer">
        
          <Routes>
            <Route path="/mypagenotice" element={<MypageNotice />} />
            <Route path="/UserInfo" element={<UserInfo />} />
            <Route path="/check" element={<Check />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/MacInfo" element={<MacInfo />} />
            <Route path="/Faq" element={<FAQ />} />
            <Route path="/Inquiry" element={<InquiryContactUs />} />
            <Route path="/Inquiry/:id" element={<InquiryAnswer/>} />
            <Route path="/mypagenotice/:id" element={<NoticeInfo/>} />
            <Route path="/Faq/:id" element={<FaqInfo/>} />
          </Routes>
        
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default MypageRemake;
