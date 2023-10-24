import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../css/Navigation.css";

const Navigation = ({ openModal }) => {
  const [searchList, SetSearchList] = useState([]);
  const [posterIndex, SetPosterIndex] = useState(0);
  const [showSearchOutput, setShowSearchOutput] = useState(false);

  const handelOpenModal = (type) => {
    if (openModal) {
      openModal(type);
    }
  };
  const searchTitle = (e) => {
    const title = e.target.value;
    SetPosterIndex(0);
    SetSearchList([]);
    axios
      .get(`http://localhost:5000/getSearchList/${title}`)
      .then((response) => {
        SetSearchList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const hoverOutputDetail = (index) => {
    SetPosterIndex(index);
  };

  const searchDivRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchDivRef.current && !searchDivRef.current.contains(event.target)) {
      setShowSearchOutput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navigation">
      <div className="inside">
        <div className="logo">
          <a href="/">
            <h2>ticketing</h2>
          </a>
        </div>
        <div className="search">
          <div
            className="searchDiv"
            ref={searchDivRef}
            onClick={() => setShowSearchOutput(true)}
          >
            <input placeholder=" 공연 검색" onChange={searchTitle} />
            <button>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3Ljg3NSAxNy44NzY2TDEzLjI2ODIgMTMuMjY5OEMxMi44MDY1IDEyLjgwODEgMTIuMDY5OSAxMi43MDk5IDExLjUzOTQgMTMuMDczM0MxMC4xOTM3IDE0LjAxNjMgOC40NTUxNCAxNC40Mjg5IDYuNjE4MzIgMTQuMDE2M0M0LjM1OTEyIDEzLjUxNTQgMi41MzIxMiAxMS42ODg0IDIuMDMxMTcgOS40MjkxN0MxLjEyNzQ5IDUuMzUyOCA0LjI3MDcyIDEuNzQ3OTEgOC4yMjkyMiAxLjg3NTYxQzExLjI3NDIgMS45NzM4MyAxMy44Njc0IDQuNDA5ODMgMTQuMTUyMiA3LjQzNTE5QzE0LjIzMDggOC4yNzk5MyAxNC4xMzI2IDkuMDk1MiAxMy45MDY3IDkuODUxNTRMMTMuNjEyIDEwLjU3ODQiIHN0cm9rZT0iIzNBM0EzQSIgc3Ryb2tlLXdpZHRoPSIxLjYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo="
                alt="Search"
              ></img>
            </button>
          </div>
          <div>
            {showSearchOutput && searchList.length > 0 && (
              <div className="search-output" style={{ visibility: "" }}>
                {searchList.slice(0, 10).map((datas, index) => (
                  <Link
                    to={`/reservation/${datas.show_ID}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div
                      className="output-detail"
                      onMouseEnter={() => hoverOutputDetail(index)}
                    >
                      {datas.show_name}
                    </div>
                  </Link>
                ))}
                {searchList.length > 0 && (
                  <Link
                    to={`/reservation/${searchList[posterIndex].show_ID}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="output-detail-image">
                      <div>
                        <img
                          src={searchList[posterIndex].poster_url}
                          alt="공연이미지"
                        ></img>
                        <div className="output-detail-image-explain">
                          {searchList[posterIndex].show_name}
                          <br />
                          <div style={{ color: "gray", fontSize: "12px" }}>
                            {searchList[posterIndex].start_date}~
                            {searchList[posterIndex].end_date}
                            <br />
                            {searchList[posterIndex].show_location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="menu">
          <span>
            <a href="/login">로그인</a>
          </span>
          <span>
            <a href="/signup">회원가입</a>
          </span>
          <span>
            <a href="/mypage">마이페이지</a>
          </span>
          <span>
            <Link to="/mypage" onClick={() => handelOpenModal("Check")}>
              예매확인/취소
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
