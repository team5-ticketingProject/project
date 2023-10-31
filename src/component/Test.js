import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../admin/component/header";
import Menu from "../admin/component/menu";
import MemberManagement from "../admin/pages/MemberManagement";
import Notice from "../admin/pages/Notice";
import Faq from "../admin/pages/Faq";
import DiscountAdjustment from "../admin/pages/DiscountAdjustment";



const Test = () => {
  useEffect(() => {
    if(window.sessionStorage.getItem('admin') !== 'true'){
      document.location.href = '/';
    }
  })
  return (
    <div style={{paddingTop:'80px'}}>
      <Header />
      <Menu />
      <Routes>
        <Route path="member" element={<MemberManagement />} />
        <Route path="notice" element={<Notice />} />
        <Route path="faq" element={<Faq />} />
        <Route path="discount" element={<DiscountAdjustment />} />
      </Routes>
    </div>
  );
};

export default Test;
