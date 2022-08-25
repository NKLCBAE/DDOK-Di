import React, { useEffect } from "react";
import { useState } from "react";
import "./Settings.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import settingsToTHomeIcon from "../assets/backArrow.png";
import AskModalOne from "./SettingsAskModalOne";
import AskModalTwo from "./SettingsAskModalTwo";
import AskModalThree from "./SettingsAskModalThree";
import CallModalOne from "./SettingsCallbackModalOne"
import CallModalTwo from "./SettingsCallbackModalTwo"
import CallModalThree from "./SettingsCallbackModalThree"
import pencilIcon from "../assets/pencil.png";
import cancelIcon from "../assets/cancel.png";

function Settings({ userStates }) {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const { userId, currentMonitorH, setCurrentMonitorH, currentDeskH, setCurrentDeskH, setVisitSetting } = userStates;

  const [deskH, setDeskH] = useState(currentDeskH - 0);
  const [monitorH, setMonitorH] = useState(currentMonitorH - 0);

  const GoHome = (e) => {
    e.target.disabled = "disabled";
    setCurrentDeskH(deskH);
    setCurrentMonitorH(monitorH);
    setVisitSetting(true);
    setTimeout(() => {
      navigate('/thome');
    }, 300);
  }


  // localStorage.setItem("seatSet", JSON.stringify(setting));
  let monitorSet = JSON.parse(localStorage.getItem("monitorSet"));
  if(monitorSet===null){ //지금 모니터 높이가 없으면(처음이면)
    localStorage.setItem("monitorSet", JSON.stringify(1)); 
    // monitorSet = monitorH; // 현재 모니터 높이는 1번세팅 모니터 높이
    console.log(monitorSet);
  }
  else{
    //높이 맞추는 작업 로컬스토리지(실제 모니터 높이) -> 1번세팅 높이
    //그리고 실제 모니터 높이 = 1번세팅 으로 바꾸면 될듯
  console.log(monitorSet);
  }



  const getOne = async (e) => {
    await axios(
      `https://i7a102.p.ssafy.io/api/settings/${userId}/desks/1`,
      {
        method: "GET",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    )
      .then(res => {
        setDeskH(res.data.deskHeight);
        setMonitorH(res.data.monitorHeight);
        closeModalOneB()
      })
      .catch(error => {
        console.error("실패:", error);
      });
  };

  const getTwo = async (e) => {
    await axios(
      `https://i7a102.p.ssafy.io/api/settings/${userId}/desks/2`,
      {
        method: "GET",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    )
      .then(res => {
        setDeskH(res.data.deskHeight);
        setMonitorH(res.data.monitorHeight);
        closeModalTwoB()
      })
      .catch(error => {
        console.error("실패:", error);
      });
  };

  const getThree = async (e) => {
    await axios(
      `https://i7a102.p.ssafy.io/api/settings/${userId}/desks/3`,
      {
        method: "GET",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    )
      .then(res => {
        setDeskH(res.data.deskHeight);
        setMonitorH(res.data.monitorHeight);
        closeModalThreeB()
      })
      .catch(error => {
        console.error("실패:", error);
      });
  };


  const setOne = async (e) => {
    await axios(
      `https://i7a102.p.ssafy.io/api/settings/${userId}/desks/1`,
      {
        method: "PUT",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },
        data: {
          deskHeight: deskH,
          deskIndex: 1,
          monitorHeight: monitorH
        },
      }
    )
      .then(res => {
        console.log(1 + "번 세팅 저장 성공!");
        closeModalOne()
      })
      .catch(error => {
        console.error("실패:", error);
      });
  };


  const setTwo = async (e) => {
    await axios(
      `https://i7a102.p.ssafy.io/api/settings/${userId}/desks/2`,
      {
        method: "PUT",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },
        data: {
          deskHeight: deskH,
          deskIndex: 2,
          monitorHeight: monitorH
        },
      }
    )
      .then(res => {
        console.log(2 + "번 세팅 저장 성공!");
        closeModalTwo()
      })
      .catch(error => {
        console.error("실패:", error);
      });
  };

  const setThree = async (e) => {
    await axios(
      `https://i7a102.p.ssafy.io/api/settings/${userId}/desks/3`,
      {
        method: "PUT",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },
        data: {
          deskHeight: deskH,
          deskIndex: 3,
          monitorHeight: monitorH
        },
      }
    )
      .then(res => {
        console.log(3 + "번 세팅 저장 성공!");
        closeModalThree()
      })
      .catch(error => {
        console.error("실패:", error);
      });
  };

  const DupOn = () => {
    console.log("책상 올라간다.");
    setDeskH(prev => prev + 1);
  };

  const DdownOn = () => {
    console.log("책상 내려간다.");
    setDeskH(current => current - 1);
  };

  const MupOn = (e) => {
    console.log("모니터 올라간다.");
    setMonitorH(current => current + 1);
    localStorage.setItem("monitorSet", JSON.stringify(monitorSet+1));  
  };

  const MdownOn = () => {
    console.log("모니터 내려간다.");
    setMonitorH(current => current - 1);
    localStorage.setItem("monitorSet", JSON.stringify(monitorSet-1)); 
  };

  const Stop = () => {
    console.log("멈춘다.");
  };


  useEffect(()=> {
    if(monitorH===3){
     document.getElementById("monitorUp").disabled="disabled";
    }else{
    document.getElementById("monitorUp").disabled="";
    }
  },[monitorH])

  useEffect(()=> {
    if(monitorH===1){
     document.getElementById("monitorDown").disabled="disabled";
    }else{
    document.getElementById("monitorDown").disabled="";
    }
  },[monitorH])



  const [modalOpenOneB, setModalOpenOneB] = useState(false);

  const openModalOneB = (e) => {
    // e.preventDefault()
    setModalOpenOneB(true);

  };
  const closeModalOneB = () => {
    setModalOpenOneB(false);
  };

  const [modalOpenTwoB, setModalOpenTwoB] = useState(false);

  const openModalTwoB = (e) => {
    // e.preventDefault()
    setModalOpenTwoB(true);

  };
  const closeModalTwoB = () => {
    setModalOpenTwoB(false);
  };

  const [modalOpenThreeB, setModalOpenThreeB] = useState(false);

  const openModalThreeB = (e) => {
    // e.preventDefault()
    setModalOpenThreeB(true);

  };
  const closeModalThreeB = () => {
    setModalOpenThreeB(false);
  };


  const [modalOpenOne, setModalOpenOne] = useState(false);

  const openModalOne = (e) => {
    // e.preventDefault()
    setModalOpenOne(true);

  };
  const closeModalOne = () => {
    setModalOpenOne(false);
  };

  const [modalOpenTwo, setModalOpenTwo] = useState(false);

  const openModalTwo = (e) => {
    // e.preventDefault()
    setModalOpenTwo(true);

  };
  const closeModalTwo = () => {
    setModalOpenTwo(false);
  };

  const [modalOpenThree, setModalOpenThree] = useState(false);

  const openModalThree = (e) => {
    // e.preventDefault()
    setModalOpenThree(true);

  };
  const closeModalThree = () => {
    setModalOpenThree(false);
  };



  return (
    <div className="settingPage">
      <div className="settingContainer" id="header">
        <div className="settingsToTHomeBtnARea">
          <button onClick={GoHome}>
            <img src={settingsToTHomeIcon} alt="settingsToTHomeIcon" className="settingsToTHomeIcon" />
          </button>
        </div>  
        <div id="wrapper" className="settingContainerBody">

          <div className="titleArea">
        
            <h1>세팅</h1>
          </div>
          <div className="settingMain">
            <h2>데스크 높이</h2>
            <div className="settingsForHeightBtn">
              {/* <div className="toHide">ss</div> */}
              <h3>{deskH}</h3>
              <div className="deskArea">
                <button id="deskUp" onMouseDown={DupOn} onMouseUp={Stop}>
                  ▲
                </button>
                <button id="deskDown" onMouseDown={DdownOn} onMouseUp={Stop}>
                  ▼
                </button>
              </div>              
            </div>

          </div>
          <hr></hr>
          <div className="settingMain">
            <h2>모니터 높이</h2>
            <div>
              <div className="settingsForHeightBtn">
                <h3>{monitorH}</h3>
                <div className="deskArea">
                  <button id="monitorUp" onMouseDown={MupOn} onMouseUp={Stop}>
                    ▲
                  </button>
                  <button id="monitorDown" onMouseDown={MdownOn} onMouseUp={Stop}>
                    ▼
                  </button>                  
                </div>
              </div>              
            </div>

          </div>
          <hr></hr>
          <div className="saveAndLoad">
            <h2>세팅 불러오기</h2>
            <div className="saveAndLoadBtnArea">
              <button onClick={openModalOneB} id="1" className="saveAndLoadBtn">
                1
              </button>
              <CallModalOne
                open={modalOpenOneB}
                close={closeModalOneB}
                header="일정 추가"
                onClose={closeModalOneB}>
                  <div>
                    <p className="settingsInModalFont">
                      1번 세팅을 불러오겠습니까?
                    </p>
                    <div className="settingsInModalEditBtnArea">
                      <button onClick={getOne} className='settingsInModalEditBtn'>
                        {/* <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" />  */}
                        예
                      </button>
                      <button onClick={closeModalOneB} className='settingsInModalCancelBtn'>
                        {/* <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" />  */}
                        아니오
                      </button>                      
                    </div>
                  </div>
              </CallModalOne> 
              <button onClick={openModalTwoB} id="2" className="saveAndLoadBtn">
                2
              </button>
              <CallModalTwo
                open={modalOpenTwoB}
                close={closeModalTwoB}
                header="일정 추가"
                onClose={closeModalTwoB}>
                  <div>
                    <p className="settingsInModalFont">
                      2번 세팅을 불러오겠습니까?
                    </p>
                    <div className="settingsInModalEditBtnArea">
                      <button onClick={getTwo} className='settingsInModalEditBtn'>
                        {/* <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" />  */}
                        예
                      </button>
                      <button onClick={closeModalTwoB} className='settingsInModalCancelBtn'>
                        {/* <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" />  */}
                        아니오
                      </button>                      
                    </div>
                  </div>
              </CallModalTwo> 
              <button onClick={openModalThreeB} id="3" className="saveAndLoadBtn">
                3
              </button>
              <CallModalThree
                open={modalOpenThreeB}
                close={closeModalThreeB}
                header="일정 추가"
                onClose={closeModalThreeB}>
                  <div>
                    <p className="settingsInModalFont">
                      3번 세팅을 불러오겠습니까?
                    </p>
                    <div className="settingsInModalEditBtnArea">
                      <button onClick={getThree} className='settingsInModalEditBtn'>
                        {/* <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" />  */}
                        예
                      </button>
                      <button onClick={closeModalThreeB} className='settingsInModalCancelBtn'>
                        {/* <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" />  */}
                        아니오
                      </button>                      
                    </div>
                  </div>
              </CallModalThree> 
            </div>
            <hr></hr>
            <h2>현재 세팅 저장</h2>
            <div className="saveAndLoadBtnArea">
              <button onClick={openModalOne} id="1" className="saveAndLoadBtn">
                1
              </button>
              <AskModalOne
                open={modalOpenOne}
                close={closeModalOne}
                header="일정 추가"
                onClose={closeModalOne}>
                  <div>
                    <p className="settingsInModalFont">
                      1번에 세팅을 저장하시겠습니까?
                    </p>
                    <div className="settingsInModalEditBtnArea">
                      <button onClick={setOne} className='settingsInModalEditBtn'>
                        <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" /> 저장
                      </button>
                      <button onClick={closeModalOne} className='settingsInModalCancelBtn'>
                        <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" /> 취소
                      </button>                      
                    </div>
                  </div>
              </AskModalOne>  
              <button onClick={openModalTwo} id="2" className="saveAndLoadBtn">
                2
              </button>
              <AskModalTwo
                open={modalOpenTwo}
                close={closeModalTwo}
                header="일정 추가"
                onClose={closeModalTwo}>
                  <div>
                    <p className="settingsInModalFont">
                      2번에 세팅을 저장하시겠습니까?
                    </p>
                    <div className="settingsInModalEditBtnArea">
                      <button onClick={setTwo} className='settingsInModalEditBtn'>
                        <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" /> 저장
                      </button>
                      <button onClick={closeModalTwo} className='settingsInModalCancelBtn'>
                        <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" /> 취소
                      </button>                      
                    </div>
                  </div>
              </AskModalTwo>    
              <button onClick={openModalThree} id="3" className="saveAndLoadBtn">
                3
              </button> 
              <AskModalThree
                open={modalOpenThree}
                close={closeModalThree}
                header="일정 추가"
                onClose={closeModalTwo}>
                  <div>
                    <p className="settingsInModalFont">
                      3번에 세팅을 저장하시겠습니까?
                    </p>
                    <div className="settingsInModalEditBtnArea">
                      <button onClick={setThree} className='settingsInModalEditBtn'>
                        <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" /> 저장
                      </button>
                      <button onClick={closeModalThree} className='settingsInModalCancelBtn'>
                        <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" /> 취소
                      </button>                      
                    </div>
                  </div>
              </AskModalThree>             
            </div>

          </div>
        </div>
        <div className="settingsLastGrid"></div>
      </div>
    </div>
  );
}

export default Settings;
