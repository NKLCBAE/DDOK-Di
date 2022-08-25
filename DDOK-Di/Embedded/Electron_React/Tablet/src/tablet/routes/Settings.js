import React, { useEffect } from "react";
import { useState } from "react";
import "./Settings.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UP, DOWN, STOP, ONUP, ONDOWN, DS, MD, MU } from "../../constants";
import settingsToTHomeIcon from "../assets/backArrow.png";
import AskModalOne from "./SettingsAskModalOne";
import AskModalTwo from "./SettingsAskModalTwo";
import AskModalThree from "./SettingsAskModalThree";
import CallModalOne from "./SettingsCallbackModalOne"
import CallModalTwo from "./SettingsCallbackModalTwo"
import CallModalThree from "./SettingsCallbackModalThree"
import pencilIcon from "../assets/pencil.png";
import cancelIcon from "../assets/cancel.png";
// import Select from "react-select";
let timer;

function Settings({ userStates }) {
    const { ipcRenderer } = window.require("electron");
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
          // localStorage.setItem("seatSet", JSON.stringify(setting));
    let MH = localStorage.getItem("monitorSet");
    const {
        currentMonitorH,
        setCurrentMonitorH,
        currentDeskH,
        setCurrentDeskH,
        setVisitSetting,
    } = userStates;
    const userId = useLocation().state.userId;
    const [deskH, setDeskH] = useState(currentDeskH - 0);
    const [monitorH, setMonitorH] = useState(currentMonitorH - 0);

    const GoHome = e => {
        e.target.disabled = "disabled";
        setCurrentDeskH(deskH);
        setCurrentMonitorH(monitorH);
        setVisitSetting(true);
        setTimeout(() => {
            navigate("/thome");
        }, 300);
    };

    // async function getSettings() {
    //         await axios(
    //             `http://i7a102.p.ssafy.io/api/settings/${userId}/desks`,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     authorization: "hello",
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         )
    //             .then(res => {
    //                 setSettings(res.data);
    //                 console.log("settings", res.data);
    //             })
    //             .catch(error => {
    //                 console.error("실패:", error);
    //             });
    // }

    // async function updateSettings(index) {
    //     if (userId !== undefined) {
    //         await axios(
    //             `http://i7a102.p.ssafy.io/api/settings/${userId}/desks/${index}`,
    //             {
    //                 method: "DELETE",
    //                 headers: {
    //                     authorization: "hello",
    //                     "Content-Type": "application/json",
    //                 },
    //                 data: {
    //                     deskHeight: settings[index - 1].deskHeight,
    //                     deskIndex: settings[index - 1].deskIndex,
    //                     monitorHeight: settings[index - 1].monitorHeight,
    //                 },
    //             }
    //         )
    //             .then(res => {
    //                 setSettings(res.data);
    //                 console.log("settings", res.data);
    //             })
    //             .catch(error => {
    //                 console.error("실패:", error);
    //             });

    //         await axios(
    //             `http://i7a102.p.ssafy.io/api/settings/${userId}/desks/${index}`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     authorization: "hello",
    //                     "Content-Type": "application/json",
    //                 },
    //                 data: {
    //                     deskHeight: deskH,
    //                     deskIndex: index,
    //                     monitorHeight: monitorH,
    //                 },
    //             }
    //         )
    //             .then(res => {
    //                 setSettings(res.data);
    //                 console.log("settings", res.data);
    //             })
    //             .catch(error => {
    //                 console.error("실패:", error);
    //             });
    //     }
    // }
    // useEffect(() => {
    //     getSettings();
    // }, []);

    // const seatNo = useLocation().state.seatNo;
    // const email = useLocation().state.email;

    // let setting = JSON.parse(localStorage.getItem("seatSet"));

    // const [check, setCheck] = useState(false);
    // const [userSet, setUserSet] = useState([]);

    // if (check === false) {
    //     let Found = false;
    //     for (let i in setting) {
    //         if (setting[i][0].email === email) {
    //             console.log("이메일에 해당하는 세팅을 찾았다");
    //             setUserSet(setting[i]);
    //             setDeskH(setting[i][0].desk);
    //             setMonitorH(setting[i][0].monitor);
    //             Found = true;
    //         }
    //     }
    //     if (!Found) {
    //         console.log("이메일에 해당하는 세팅이 없다잉 처음 왔구만?");
    //         userSet.push({ deskIndex: 1, deskHeight: 1, desk: 0, monitor: 0 });
    //         // setting = [...setting, userSet];
    //         // console.log(userSet);
    //         // localStorage.setItem("seatSet", JSON.stringify(setting));
    //     }
    //     setCheck(true);
    // }
    
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
        if(MH > res.data.monitorHeight){
                  for(let i=0;i<MH-res.data.monitorHeight;i++){
                    ipcRenderer.send(MD, "send");
                    console.log("내려간다");
                  }
                }
                else if(MH < res.data.monitorHeight){
                    for(let i=0;i<res.data.monitorHeight-MH;i++){
                    ipcRenderer.send(MU, "send");
                    console.log("올라간다");
                  }
                }
                localStorage.setItem("monitorSet", JSON.stringify(res.data.monitorHeight));
                ipcRenderer.send(DS, res.data.deskHeight);
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
        if(MH > res.data.monitorHeight){
                  for(let i=0;i<MH-res.data.monitorHeight;i++){
                    ipcRenderer.send(MD, "send");
                    console.log("내려간다");
                  }
                }
                else if(MH < res.data.monitorHeight){
                    for(let i=0;i<res.data.monitorHeight-MH;i++){
                    ipcRenderer.send(MU, "send");
                    console.log("올라간다");
                  }
                }
                localStorage.setItem("monitorSet", JSON.stringify(res.data.monitorHeight));
                ipcRenderer.send(DS, res.data.deskHeight);
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
        if(MH > res.data.monitorHeight){
                  for(let i=0;i<MH-res.data.monitorHeight;i++){
                    ipcRenderer.send(MD, "send");
                    console.log("내려간다");
                  }
                }
                else if(MH < res.data.monitorHeight){
                    for(let i=0;i<res.data.monitorHeight-MH;i++){
                    ipcRenderer.send(MU, "send");
                    console.log("올라간다");
                  }
                }
                localStorage.setItem("monitorSet", JSON.stringify(res.data.monitorHeight));
                ipcRenderer.send(DS, res.data.deskHeight);
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
        ipcRenderer.send(UP, "send");
        timer = setInterval(() => {
            ipcRenderer.send(ONUP, "send");
            ipcRenderer.once("reply", (event, arg) => {
                setDeskH(arg);
            });
        }, 200);
    };

    const DdownOn = () => {
        console.log("책상 내려간다.");
        ipcRenderer.send(DOWN, "send");
        timer = setInterval(() => {
            ipcRenderer.send(ONDOWN, "send");
            ipcRenderer.once("reply", (event, arg) => {
                setDeskH(arg);
            });
        }, 200);
    };

    const MupOn = e => {
        console.log("모니터 올라간다.");
        ipcRenderer.send(MU, "send");
        localStorage.setItem("monitorSet", JSON.stringify(monitorH + 1));
        setMonitorH(current => current + 1);
    };

    const MdownOn = () => {
        console.log("모니터 내려간다.");
        localStorage.setItem("monitorSet", JSON.stringify(monitorH - 1));
        setMonitorH(current => current - 1);
        ipcRenderer.send(MD, "send");
    };

    const dStop = () => {
        ipcRenderer.send(STOP, "send");
        clearInterval(timer);
    };
    

    useEffect(() => {
        if (monitorH === 3) {
            document.getElementById("monitorUp").disabled = "disabled";
        } else {
            document.getElementById("monitorUp").disabled = "";
        }
    }, [monitorH]);

    useEffect(() => {
        if (monitorH === 1) {
            document.getElementById("monitorDown").disabled = "disabled";
        } else {
            document.getElementById("monitorDown").disabled = "";
        }
    }, [monitorH]);
    
    //useEffect(() => {
    //    if (deskH >= 16.8) {
    //        document.getElementById("deskUp").disabled = "disabled";
    //        Stop();
    //    } else {
    //        document.getElementById("deskUp").disabled = "";
    //    }
    //}, [deskH]);

    //useEffect(() => {
    //    if (deskH <= 15.3) {
    //       document.getElementById("deskDown").disabled = "disabled";
    //        Stop();
    //    } else {
    //        document.getElementById("deskDown").disabled = "";
    //    }
    //}, [deskH]);
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
                <button id="deskUp" onMouseDown={DupOn} onMouseUp={dStop}>
                  ▲
                </button>
                <button id="deskDown" onMouseDown={DdownOn} onMouseUp={dStop}>
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
                  <button id="monitorUp" onMouseDown={MupOn}>
                    ▲
                  </button>
                  <button id="monitorDown" onMouseDown={MdownOn}>
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
