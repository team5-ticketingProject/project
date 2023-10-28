import React, { useState, useEffect } from "react";
import styles from "./MemberManagement.module.css";
import axios from "axios";

const MemberManagement = () => {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("ID"); // 초기 검색 옵션을 ID로 설정
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getMembers")
      .then((response) => {
        setMembers(response.data);
        setFilteredMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);

  const handleSearch = () => {
    const url = `http://localhost:5000/searchMembers?search=${search}&option=${searchOption}`;
  
    axios.get(url)
      .then((response) => {
        setFilteredMembers(response.data);
        setSearch(""); // 검색 후 검색어 초기화
      })
      .catch((error) => {
        console.error("Error searching members:", error);
      });
  };

  const handleSelectChange = (e) => {
    setSearchOption(e.target.value);
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
        <select
          className={styles.searchoption}
          value={searchOption}
          onChange={handleSelectChange}
        >
          <option value="ID">ID</option>
          <option value="tel">전화 번호</option>
          <option value="email">이메일</option>
          <option value="rank">회원 등급</option>
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
          }}
        />
        <button onClick={handleSearch} className={styles.searchbutton}>
          검색
        </button>
      </div>
    </div>
  );
};

export default MemberManagement;
