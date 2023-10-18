import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/ShowList.css'

const GetShowData = () => {
  const [showData, setShowData] = useState([]);
  const [location, setLocation] = useState(['11']);
  // 11:서울, 26:부산광역시, 27:대구광역시, 28:인천광역시, 29:광주광역시, 41:경기도, 45:전라북도, 46:전라남도, 47:경상북도, 48:경상남도, 50:제주도

  useEffect(() => {
    axios
      .get("http://localhost:5000/getDB")
      .then((response) => {
        setShowData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handle_Location = (e) => {
    const locationArray = e.target.dataset.values.split(",");
    setLocation(locationArray);
  };

  return (
    <div className="showList">
      <ul className="locationUl">
        <li data-values="11" onClick={handle_Location}>
          서울
        </li>
        <li data-values="28,41" onClick={handle_Location}>
          경기/인천
        </li>
        <li data-values="27,47" onClick={handle_Location}>
          대구/경북
        </li>
        <li data-values="26,48" onClick={handle_Location}>
          부산/경남
        </li>
        <li data-values="29,45,46" onClick={handle_Location}>
          광주/전라
        </li>
        <li data-values="50" onClick={handle_Location}>
          제주
        </li>
      </ul>
      <br></br>
      <br></br>
      <ul>
        {showData
          .filter((datas) => location.includes(datas.location_code))
          .map((datas, index) => (
            <li key={index}>
              <div className="showDiv">
                <p>
                  <img src={datas.poster_url} alt="공연포스터" />
                </p>
                <p>
                  <strong>제목</strong>: {datas.show_name}
                </p>
                <p>
                  <strong>가격</strong>: {datas.price}
                </p>
                <p>
                  <strong>장소</strong>: {datas.show_location}
                </p>
                <p>
                  <strong>공연시간</strong>: {datas.show_time}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GetShowData;
