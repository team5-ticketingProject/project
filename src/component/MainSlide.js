import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MainSlide.css";
import { Link } from "react-router-dom";

const SlideShow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="mainSlide">
      <div className="previousButton">
        <button onClick={handlePrevClick}>
          {" "}
          <h3>&lt;</h3>{" "}
        </button>
      </div>
      <div
        className="imgDiv"
        style={{
          backgroundColor:
            currentImageIndex === 0
              ? "rgb(174, 218, 191)"
              : currentImageIndex === 1
              ? "white"
              : currentImageIndex === 2
              ? "rgb(233, 149, 189)"
              : "",
        }}
      >
        <div className="imgDiv-sub">
          {currentImageIndex === 0 && (
            <div>
              <p>환장할 진심</p>
              <p>화요일 ~ 금요일(19:30), 토요일 ~ 일요일(15:00,18:00)</p>
              <p>씨어터 쿰 (씨어터 쿰)</p>
            </div>
          )}
          {currentImageIndex === 1 && (
            <div>
              <p>괴물 [대학로]</p>
              <p>화요일 ~ 금요일(20:00), 토요일(16:30), 일요일(15:00)</p>
              <p>대학로단막극장 (대학로단막극장)</p>
            </div>
          )}
          {currentImageIndex === 2 && (
            <div>
              <p>인사이드미</p>
              <p>화요일 ~ 금요일(19:30), 토요일(15:00,19:00), 일요일(15:00)</p>
              <p>JTN 아트홀(구. 대학로예술마당) (2관)</p>
            </div>
          )}
        </div>
        <img src={images[currentImageIndex]} alt="Slide" />
      </div>

      <div className="nextButton">
        <button onClick={handleNextClick}>
          {" "}
          <h3>&gt;</h3>{" "}
        </button>
      </div>
    </div>
  );
};

const SlideShowContainer = () => {
  const [showData, setShowData] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const slideImageUrls = [
    ["http://www.kopis.or.kr/upload/pfmPoster/PF_PF226641_230925_144508.gif"],
    "http://www.kopis.or.kr/upload/pfmPoster/PF_PF227080_231005_144935.gif",
    "http://www.kopis.or.kr/upload/pfmPoster/PF_PF226888_231004_094736.gif",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/getDB")
      .then((response) => {
        setShowData(response.data);
        console.log(showData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <SlideShow images={slideImageUrls} />
      <div className="main-box">
        <div className="select-classify">
          <span>
            <strong>연극</strong>
          </span>
          <span className="select-classify-right-span">{showData.length}개 상영중</span>
          <hr />
          <p>
            <button>전체</button>
          </p>
          <div>
            <button
              onClick={() => {
                setShowMap(!showMap);
                setShowDate(false);
              }}
            >
              지역별 예매
            </button>
          </div>
          <p>
            <button
              onClick={() => {
                setShowDate(!showDate);
                setShowMap(false);
              }}
            >
              날짜별 예매
            </button>
          </p>
        </div>
        <div
          className="mapDiv"
          style={{ visibility: showMap ? "visible" : "hidden" }}
        >
          지도 영역
        </div>
        <div
          className="dateDiv"
          style={{ visibility: showDate ? "visible" : "hidden" }}
        >
          달력 영역
        </div>
      </div>
      <div className="show-list-title">
        <h1>연극목록</h1>
      </div>
      <div className="show-list">
        <div className="show-main">
          {showData.map((datas, index) => (
            <div className="main-list">
              <div className="mainslide-show-info">
                <p>
                  <Link to={`/reservation/${datas.show_ID}`}>
                    <img src={datas.poster_url} alt="공연포스터" />
                  </Link>
                </p>
                <div className="info-title">
                  <strong>{datas.show_name}</strong>
                </div>
                <div className="info-location">
                  <strong>{datas.show_location}</strong>
                </div>
                <div className="info-time">
                  <strong>{datas.show_time}</strong>
                </div>
              </div>
              <hr className="hr" />
            </div>
          ))}
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default SlideShowContainer;
