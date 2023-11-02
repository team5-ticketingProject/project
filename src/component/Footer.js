import '../css/Footer.css';
import {FaYoutube, FaInstagramSquare, FaFacebookSquare} from 'react-icons/fa';

const Footer = () => {
    return(
        <div className="footer">    
            <div className='footer-left'>
                ticketing project
                <p>관리자: 고승렬 | 손승광 | 장우영 | 장해민 | 최예슬</p>
                <hr/>
                <p>Copyright© 2023. 5조가쵝5. All rights reserved </p>
            </div>
            <div className='footer-center'>
                <div>
                    <p>About Us</p>
                    <p>튜토리얼</p>
                    <p>CODE</p>
                </div>
                <div style={{paddingLeft:'50px'}}>
                    <p>이용약관</p>
                    <p>개인정보처리방침</p>
                    <p>1:1문의</p>
                </div>

            </div>
            <div className='footer-right'>
                <FaYoutube style={{color:'red', fontSize:'30px'}}/>
                <FaInstagramSquare style={{color:'#C72252', fontSize:'30px', marginLeft:'10px'}}/>
                <FaFacebookSquare style={{color:'#38529A', fontSize:'30px', marginLeft:'10px'}}/>
            </div>        
        </div>
    );
}
export default Footer;