import React, { useState, useEffect } from "react";
import { Routes, Route, } from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Main from "./component/Main";
import MyPage from "./component/MyPage";
import Reservation from "./component/Reservation";
import Reserve_Calendar from "./component/Reserve_Calendar";
import Test from "./component/Test";
import MemberManagement from './wooyoung/pages/MemberManagement';
import Notice from './wooyoung/pages/Notice';
import Faq from './wooyoung/pages/Faq';
import DiscountAdjustment from './wooyoung/pages/DiscountAdjustment';

const App = () => {
  return (
    <div style={{overflowX:'hidden'}}>
      <Routes>
        <Route path="/" element={<Main/>}/>      
        <Route path="/login" element={<Login/>} />  
        <Route path="/signup" element={<SignUp/>} />  
        <Route path="/mypage" element={<MyPage/>} />  
        <Route path="/reservation/:show_ID" element={<Reservation/>}/>
        <Route path='/dateList' element={<Reserve_Calendar/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/member" element={<MemberManagement />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/discount" element={<DiscountAdjustment />} />
      </Routes>
    </div>
  );
};

export default App;
