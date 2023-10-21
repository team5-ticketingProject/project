import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../wooyoung/component/header";
import Menu from "../wooyoung/component/menu";
import MemberManagement from "../wooyoung/pages/MemberManagement";
import Notice from "../wooyoung/pages/Notice";
import Faq from "../wooyoung/pages/Faq";
import DiscountAdjustment from "../wooyoung/pages/DiscountAdjustment";
import styles from "../App.module.css";

const Test = () => {
  return (
    <div className={styles.App}>
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
