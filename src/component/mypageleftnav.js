import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import "../css/MyPage.css";
import { Link } from "react-router-dom";



function MypageleftNav () {
    const leftNavItems = [
        { label: "회원정보관리", type: "UserInfo" },
        { label: "예매/확인취소", type: "Check" },
        { label: "나의 후기", type: "Review" },
        { label: "소유기기 인증확인", type: "MacInfo" },
        { label: "공지사항", type: "mypagenotice" },
        { label: "자주묻는질문", type: "Faq" },
        { label: "1:1 문의", type: "Inquiry" },
      ];
    
      return (
        <div>
          <div  >
            <div >
            </div>
          </div>
          <div style={{borderRight:"1px solid black", height:"1400px", width:"230px"}}  >
            <div className="LeftNav"  >
              <div>
                <List  component="nav" aria-label="mailbox folders">
                  <br />
                  {leftNavItems.map((item, index) => (
                    <div key={index}>
                      <ListItem >
                        <ListItemText
                        sx={{alignContent:"center", padding:"20px", display:"flex", justifyContent:"center", flexDirection: "column",alignItems:"center" }}
                          primary={
                            <span style={{fontSize: "18px", fontWeight: "bold"}}>
                             <Link to={`/mypageremake/${item.type}`} style={{textDecoration:"none", cursor:"pointer", color:"black"}}> {item.label}</Link>
                            </span>
                          }
                        />
                      </ListItem>
                      <br />
                      {index < leftNavItems.length && <Divider sx={{borderColor:"black"}} />}
                      <br />
                    </div>
                  ))}
                </List>
                
              </div>
            </div>
          </div>
        </div>
      );
    }

export default MypageleftNav;