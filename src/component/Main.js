import React, {useState} from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import GetShowCode from "../api/GetShowCode";
import GetShowData from "./ShowList";
import MainSlide from "./MainSlide";
import { Link } from "react-router-dom";
import '../css/Main.css';


const Main = () => {
  const [menuNumber, setMenuNumber] = useState(0);
  const [clicked, setClicked] = useState("11");
  const [location, setLocation] = useState(["11"]);

  const handleMenu = (e) => {
    setMenuNumber(e.target.value);
    if(e.target.value === 1){
      setClicked("11");
    }
  }

  return (
    <div className="main">
      <div>
        <Navigation />
        <GetShowCode />  
        <Link to ='/test'>임시 어드민페이지</Link>
    
        <div className="mainMenu">
          <ul>
            <li onClick={handleMenu} value="0">메인</li>
            <li onClick={handleMenu} value="1">지역별</li>
            <li onClick={handleMenu} value="2">할인</li>
          </ul>
        </div>

        <div style={{height:'100px' }}></div>

        <div className="selectedMenu">
          {menuNumber === 0 && <MainSlide setMenuNumber={setMenuNumber} setClicked={setClicked} setLocation={setLocation} location={location}/>}
          {menuNumber === 1 && <GetShowData clicked={clicked} setClicked={setClicked} setLocation={setLocation} location={location}/>}
          {menuNumber === 2 && <div>할인</div>}
        </div>
      </div>
          
      {/* <Footer /> */}
    </div>
  );
};

export default Main;
