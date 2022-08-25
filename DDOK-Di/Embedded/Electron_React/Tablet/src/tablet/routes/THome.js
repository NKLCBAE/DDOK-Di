import { useState, useEffect} from "react";
import React from "react";
import thomeExitImg from "../assets/exitWhite.png";
import thomeEditInfoImg from "../assets/editInfoWhite.png";
import thomeCalendarImg from "../assets/calendarWhite.png";
import onlineWhite from "../assets/onlineWhite.png";
import statusOfflineWhite from "../assets/statusOfflineWhite.png";
import statusAwayWhite from "../assets/statusAwayWhite.png";
import statusDoNotDisturbWhite from "../assets/statusDoNotDisturbWhite.png";
import thomeSettingsImg from "../assets/settingsWhite.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./StatusModal";
import ddokdiLogo from "../assets/logoPage.png";
import axios from "axios";
import "./THome.css";
import viewStatusImg from "../assets/viewStatus.png";
import profile from "../assets/user.png";

function THome({ userStates }) {
    const {
        user,
        setUser,
        currentMonitorH,
        setCurrentMonitorH,
        currentDeskH,
        setCurrentDeskH,
        visitSetting,
        setVisitSetting,
    } = userStates;
    let Interval;
    const [userId, setUserId] = useState();
    const [check, setCheck] = useState(false);
    const ticket = localStorage.getItem('ticket');
    const navigate = useNavigate();

    const jwt = localStorage.getItem("jwt");
    
    function seatCheck() {
      if(userId === undefined) {
        axios("https://i7a102.p.ssafy.io/api/seats/A/11", {
            method: "GET",
            headers: {
                Authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                console.log("test1", res.data.isFull);
                if (res.data.isFull) {
                    clearInterval(Interval);
                    setUserId(res.data.user_id);
                    localStorage.setItem("userId",res.data.user_id);
                }
            })
            .catch(error => {
                console.error("실패:", error);
            });
      }
    }

    async function setStatus(status) {
        await axios(`https://i7a102.p.ssafy.io/api/settings/${userId}/status`, {
            method: "POST",
            headers: {
                Authorization: jwt,
                "Content-Type": "application/string",
            },
            data: status,
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error("실패:", error);
            });
    }
    //상태 정보 얻기
    async function getStatus() {
        await axios(`https://i7a102.p.ssafy.io/api/settings/${userId}/status`, {
            method: "GET",
            headers: {
                Authorization: jwt,
                "Content-Type": "application/string",
            },
        })
            .then(res => {
                setSelect(res.data.status);
                console.log(res.data.status);
            })
            .catch(error => {
                console.error("실패:", error);
            });
    }

    async function getUser() {
        console.log("test3", userId);
        // if (visitSetting === false) {
        await axios(`https://i7a102.p.ssafy.io/api/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
            if(visitSetting === false){
                setStatus("OnLine");
            }
                setUser(res.data);
                console.log("user", res.data);
                setCheck(true);
                // getSettings();
            })
            .catch(error => {
                console.error("실패:", error);
            });
        // }
    }

    async function quit() {
        await axios(`https://i7a102.p.ssafy.io/api/users/${userId}/checkout`, {
            method: "PUT",
            headers: {
                Authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                setCheck(false);
                setVisitSetting(false);
                console.log("퇴실 성공!");
                navigate('/', {state : {userId : undefined}});
            })
            .catch(error => {
                console.error("퇴실 실패:", error);
            });
    }
    // 세팅정보모두
    // const [settings, setSettings] = useState();
    // async function getSettings() {
    //     if (userId !== undefined) {
    //         await axios(
    //             `http://i7a102.p.ssafy.io/api/settings/${userId}/desks`,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: jwt,
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
    //     }
    // }

    // modal
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    getStatus();

    // select
    const statusOpt = [
        { value: "OnLine", label: "온라인" },
        { value: "DoNotDisturb", label: "방해금지" },
        { value: "InOtherWork", label: "자리비움" },
    ];
    const [select, setSelect] = useState();

    const handleChange = event => {
        setSelect(event.target.value);
        setStatus(event.target.value);
    };

    if (check === false) {
        Interval = setInterval(() => {
            seatCheck();
        }, 500);
    }
    
    useEffect(()=>{
        getUser();
    },[userId]);

    const url = `/img/${userId}.jpg`;
    console.log(url);
    
    const onErrorImg = (e) => {
        e.target.src = profile;
    }
    return (
    <div>
      {check ? (
        // if:
        <div className="thomeHomeMain">
          <div className="thomeHomeTopArea">
            <div className="thomePPicArea">
              <div className="thomePPicInnerArea">
                <img
                  src={url}
                  alt="profileImg"
                  className="userProfileImgImage"
                  onError={onErrorImg}
                />
              </div>
            </div>
            <div className="thomeTopInfoArea">
              <div className="thomeUserName">{user.name}</div>
              <div className="thomeUserPosition">
                {user.position}
              </div>
              <div className="thomeUserEmail">{user.email}</div>
            </div>
          </div>
          <div className="thomeHomeBottomArea">
            <div className="thomeHomeBottomBox">
              <div className="thomeLinkButtons">
                <div className="thomeExitButton">
                  <button onClick={quit}>
                    <img
                      src={thomeExitImg}
                      alt="thomeExitImg"
                      className="thomeExitImg"
                    />
                  </button>
                  <p>퇴실</p>
                </div>
                <div className="thomeInfoButton">
                  <Link
                    to={`./editinfo`}
                    state={{ userId: `${user.id}` }}
                    className="thomeLinkIconLink"
                  >
                    <button>
                      <img
                        src={thomeEditInfoImg}
                        alt="thomeEditInfoImg"
                        className="thomeEditInfoImg"
                      />
                    </button>
                  </Link>
                  <p>정보수정</p>
                </div>
                <div className="thomeCalendarButton">
                  <Link
                    to={`./calendar`}
                    state={{ userId: `${user.id}` }}
                  >
                    <button>
                      <img
                        src={thomeCalendarImg}
                        alt="thomeCalendarImg"
                        className="thomeCalendarImg"
                      />
                    </button>
                  </Link>
                  <p>캘린더</p>
                </div>

                <div className="thomeStatusButton">
                  <React.Fragment>
                    <button onClick={openModal}>
                      {select === "OnLine" ? (
                        <img
                          src={onlineWhite}
                          alt="onlineWhite"
                          className="onlineWhite"
                        />
                      ) : null}
                      {/* {select === "OffLine" ? (
                        <img
                          src={statusOfflineWhite}
                          alt="statusOfflineWhite"
                          className="statusOfflineWhite"
                        />
                      ) : null} */}
                      {select === "DoNotDisturb" ? (
                        <img
                          src={
                            statusDoNotDisturbWhite
                          }
                          alt="statusDoNotDisturbWhite"
                          className="statusDoNotDisturbWhite"
                        />
                      ) : null}
                      {select === "InOtherWork" ? (
                        <img
                          src={statusAwayWhite}
                          alt="statusAwayWhite"
                          className="statusAwayWhite"
                        />
                      ) : null}
                    </button>
                    {/* header 부분에 텍스트를 입력한다. */}
                    <Modal
                      open={modalOpen}
                      close={closeModal}
                      header="Modal heading"
                      onClose={closeModal}
                    >
                      <div className="selectYourStatus">
                        <select
                          value={select}
                          onChange={handleChange}
                          className="selectStatus"
                        >
                          {statusOpt.map(option => (
                            <option
                              key={option.label}
                              value={option.value}
                              defaultValue={
                                option.label
                              }
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Modal>
                  </React.Fragment>
                  <p>
                    {select === "OnLine" ? "온라인" : null}
                    {/* {select === "OffLine"
                      ? "오프라인"
                      : null} */}
                    {select === "DoNotDisturb"
                      ? "방해금지"
                      : null}
                    {select === "InOtherWork"
                      ? "자리비움"
                      : null}
                  </p>
                </div>
                <div className="thomeViewStatusButton">
                  <Link
                    to={`./viewstatus`}
                    state={{ userId: `${user.id}` }}
                    className="thomeLinkIconLink"
                  >
                    <button>
                      <img
                        src={viewStatusImg}
                        alt="viewStatusImg"
                        className="viewStatusImg"
                      />
                    </button>
                  </Link>
                  <p>상태보기</p>
                </div>
                <div className="thomeSettingsButton">
                  <Link
                    to={`./settings`}
                    state={{
                      userId: `${user.id}`,
                      currentDeskH: `${currentDeskH}`,
                      currentMonitorH: `${currentMonitorH}`,
                      // setCurrentDeskH: `${setCurrentDeskH}`,
                      // setCurrentMonitorH: `${setCurrentMonitorH}`,
                      // setVisitSetting: `${setVisitSetting}`,
                    }}
                    className="thomeLinkIconLink"
                  >
                    <button>
                      <img
                        src={thomeSettingsImg}
                        alt="thomeSettingsImg"
                        className="thomeSettingsImg"
                      />
                    </button>
                  </Link>
                  <p>세팅변경</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // else:
        <img src={ddokdiLogo} alt="ddokdiLogo" className="ddokdiLogo" />
      )}
    </div>
  );
}
export default THome;
