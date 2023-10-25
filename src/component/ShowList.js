import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ShowList.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const GetShowData = ({clicked, setClicked, setLocation, location}) => {
  const [showData, setShowData] = useState([]);
  // const [location, setLocation] = useState(["11"]);
  
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
    setClicked(e.target.dataset.values);
    const locationArray = e.target.dataset.values.split(",");
    setLocation(locationArray);
  };

  return (
    <div className="showList">
      <ul className="locationUl">
        <li>
          <Button
            data-values="11"
            onClick={handle_Location}
            style={{
              backgroundColor: clicked === "11" ? "black" : "white",
              color: clicked === "11" ? "white" : "black",
            }}
          >
            서울
          </Button>
        </li>
        <li>
          <Button
            data-values="28,41"
            onClick={handle_Location}
            style={{
              backgroundColor: clicked === "28,41" ? "black" : "white",
              color: clicked === "28,41" ? "white" : "black",
            }}
          >
            경기/인천
          </Button>
        </li>
        <li>
          <Button
            data-values="27,47"
            onClick={handle_Location}
            style={{
              backgroundColor: clicked === "27,47" ? "black" : "white",
              color: clicked === "27,47" ? "white" : "black",
            }}
          >
            대구/경북
          </Button>
        </li>
        <li>
          <Button
            data-values="26,48"
            onClick={handle_Location}
            style={{
              backgroundColor: clicked === "26,48" ? "black" : "white",
              color: clicked === "26,48" ? "white" : "black",
            }}
          >
            부산/경남
          </Button>
        </li>
        <li>
          <Button
            data-values="29,45,46"
            onClick={handle_Location}
            style={{
              backgroundColor: clicked === "29,45,46" ? "black" : "white",
              color: clicked === "29,45,46" ? "white" : "black",
            }}
          >
            광주/전라
          </Button>
        </li>
        <li>
          <Button
            data-values="50"
            onClick={handle_Location}
            style={{
              backgroundColor: clicked === "50" ? "black" : "white",
              color: clicked === "50" ? "white" : "black",
            }}
          >
            제주
          </Button>
        </li>
      </ul>
      <br></br>
      <br></br>
      {/* MainSlide.css에서 그대로 가져다 썼음 */}
      <div className="show-list-title"><h1>연극목록</h1></div>
      <div className="show-list">
        <div className="show-main">
          {showData
          .filter((datas) => location.includes(datas.location_code))
          .map((datas, index) => (
              <div className="main-list">
                <div className="mainslide-show-info">
                  <p>
                  <Link to={window.sessionStorage.getItem('id') ? `/reservation/${datas.show_ID}/${datas.show_time}`: '/login'}>
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
                <hr className="hr"/>
              </div>        
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetShowData;
