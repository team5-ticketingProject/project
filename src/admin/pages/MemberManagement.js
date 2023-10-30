import React, { useState, useEffect } from "react";
import styles from "./MemberManagement.module.css";
import axios from "axios";

const MemberManagement = () => {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("ID");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getMembers")
      .then((response) => {
        const memberData = response.data;
        setMembers(memberData);
        setFilteredMembers(memberData);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);

  const handleSearch = () => {
    const searchTerm = search.toLowerCase(); // 검색어를 소문자로 변환
    const filteredData = members.filter((member) => {
      const fieldToSearch = member[searchOption].toLowerCase();
      return fieldToSearch.includes(searchTerm);
    });

    setFilteredMembers(filteredData);
    setSearch("");
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
