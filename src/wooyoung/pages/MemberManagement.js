import React, { useState, useEffect } from "react";
import styles from "./MemberManagement.module.css";
import axios from "axios";

const MemberManagement = () => {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [members, setMembers] = useState([]); // 실제 회원 데이터

  useEffect(() => {
    // 서버에서 회원 데이터를 가져오는 요청
    axios.get("http://localhost:5000/getMembers")
      .then((response) => {
      console.log(response.data); // 추가
      setMembers(response.data);
      setFilteredMembers(response.data); // 초기 데이터로 설정
  })
    .catch((error) => {
      console.error("Error fetching members:", error);
  });

  }, []); // 컴포넌트 마운트 시에 한 번만 실행

  const handleSearch = () => {
    // 서버에 검색 요청을 보내고 반환된 데이터로 filteredMembers 업데이트
    axios.get(`http://localhost:5000/searchMembers?search=${search}&option=${searchOption}`)
      .then((response) => {
        setFilteredMembers(response.data);
      })
      .catch((error) => {
        console.error("Error searching members:", error);
      });
  };

  return (
    <div>
      <div className={styles.tablecontainer}>
        <table className={styles.membertable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>전화번호</th>
              <th>이메일</th>
              <th>회원 등급</th>
            </tr>
          </thead>
          <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.ID}>
              <td>{member.ID}</td>
              <td>{member.tel}</td>
              <td>{member.email}</td>
              <td>{member.rank}</td>
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
