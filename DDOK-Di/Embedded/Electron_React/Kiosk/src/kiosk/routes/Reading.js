import './Reading.css'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import cardReadingImg from '../assets/nfcCardReadBlack.png'

import axios from "axios";
import { useNavigate } from "react-router-dom";
const { ipcRenderer } = window.require("electron");

function Reading() {
  const zone = useLocation().state.zone;
  const seatNo = useLocation().state.seatNo;
  
  const navigate = useNavigate();
  
  let jwt = ""
  let userId = null;
  let ticket = null;
  let assignflag = false;
  
  // [Login]
  // Func: Login via card Hash (async)
  async function loginRead(arg) {
      console.log(`[loginRead] arg: ${arg}`);
      await axios(
          `/api/cardlogin`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              data: {
                    "cardNumber": arg,
              },
          }
      )
      .then((res) => {
          console.log(res);
          jwt = res.data.jwt;
          userId = res.data.userId;
          ticket = res.data.ticket
          console.log("[loginRead] I'll return True!")
          assignflag = true;
      })
  }
  //////////////////////////////////////////////////

  // Func: Set Seat
  async function setSeat() {
      if (userId !== null) {
          await axios(
              `/api/users/${userId}/alloc/${zone}/${seatNo}`,
              {
                  method: "PUT",
                  headers: {
                      authorization: jwt,
                      "Content-Type": "application/json",
                  }
              }
          )
      }
  }

  // Func: [Routine] Assign Seat
  async function assignSeat(numRead) {
      console.log(`Assign Seat for card ${numRead}`);
      
            
      // 서버에 로그인 요청
      await loginRead(numRead);
      console.log(assignflag);
      
      // 회원 자리 할당
      if (assignflag === true) {
          // 자리 할당
          await setSeat();
          
          // 이하 success 페이지는 단순 표시용
          navigate("../success", {
              state: {
                  zone: `${zone}`,
                  seatNo: `${seatNo}`,
                  ticket: `${ticket}`,
              },
          });
      } else {
          // // Debug Code
          // alert(`No user info for card num ${numRead}`);
      }
  }
  

  // [Electron IPC listener for RFID]
  function rfidListener(event, arg) {
      if (arg === "ERR") {
          // // Debug Code
          console.log('Error reading RFID');
          
      // // Add Exception Routine
      // } elif {
      } else {
          console.log('Successfully reading RFID');
          assignSeat(arg);
      }
  }

  function tryRead() {
      cancelRead();
      ipcRenderer.send("readRFID", "send");
      ipcRenderer.once("reply", rfidListener);
  }

  function cancelRead() {
    ipcRenderer.removeListener("reply", rfidListener);
  }

  tryRead();

  // [React Return]
  return (
    <div className="readingPage">
      <div className='cardReadingBox'>
        <img src={cardReadingImg} alt='cardReadingImg' className='cardReadingImg'/>
        <p>회원증을 리더기에 대주세요</p>
      </div>
      <div className='readingButtonsArea'>
        <Link to={`/`}>
          <button className='readingToHome' onClick={cancelRead}>자리 선택</button>
        </Link>
        <Link to={`/login`} state={{ zone: `${zone}`, seatNo: `${seatNo}` }}>
          <button className='readingToLogin' onClick={cancelRead}> 로그인</button>
        </Link>
        <Link to={`/signup`} state={{ zone: `${zone}`, seatNo: `${seatNo}` }}>
          <button className='readingToSignUp' onClick={cancelRead}>회원 가입</button>
        </Link>
      </div>
    </div>
  );
}

export default Reading;
