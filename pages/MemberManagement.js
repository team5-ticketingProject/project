import React, { useState } from "react";
import styles from "./MemberManagement.module.css";

const members = [
  { id: 1, name: "이름1", email: "email1@naver.com", memberLevel: "silver" },
  { id: 2, name: "이름2", email: "email2@daum.com", memberLevel: "gold" },
  { id: 3, name: "이름3", email: "email3@gmail.com", memberLevel: "vip" },
  // 다른 회원 정보 추가
];

const MemberManagement = () => {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [filteredMembers, setFilteredMembers] = useState(members);


  console.log("MemberManagement 컴포넌트 렌더링"); // 확인용 로그
  
  const handleSearch = () => {
    const filtered = members.filter((member) => {
      if (searchOption === "name") {
        // 이름으로 검색
        return member.name.includes(search);
      }
      if (searchOption === "email") {
        // 이메일로 검색
        return member.email.includes(search);
      }
      if (searchOption === "level") {
        // 회원 등급으로 검색
        return member.memberLevel.includes(search);
      }
      return true;
    });

    // 검색 결과를 업데이트
    setFilteredMembers(filtered);
  };

  return (
    <div>
      <div className={styles.tablecontainer}>
        <table className={styles.membertable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>회원 등급</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.memberLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.searchcontainer}>
        <select className={styles.searchoption} value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
          <option value="name">이름</option>
          <option value="email">이메일</option>
          <option value="level">회원 등급</option>
        </select>
        <input
          type="text"
          className={styles.searchinput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }} // 미입력 상태에서 검색을 누르거나 enter 키다운 시 화면초기화
        />
        <button onClick={handleSearch} className={styles.searchbutton}>
          검색
        </button>
      </div>
    </div>
  );
};

export default MemberManagement;
