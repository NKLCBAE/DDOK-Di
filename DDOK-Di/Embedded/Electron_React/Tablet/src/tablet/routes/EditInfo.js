import React from "react";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ddokdiLogo from "../assets/logoPage.png";
import pencilIcon from "../assets/pencil.png";
import cancelIcon from "../assets/cancel.png";

import "./EditInfo.css";

function EditInfo() {
const jwt = localStorage.getItem('jwt');
  console.log("EditInfo페이지");
  const userId = useLocation().state.userId;
  console.log("유저아이디userId:", userId);
  const [userInfos, setUserInfos] = useState();
  const [check, setCheck] = useState(false);
  console.log("check전", check);
  function getInfo() {
    axios(`https://i7a102.p.ssafy.io/api/users/${userId}`, {
      method: "GET",
      headers: {
        authorization: jwt,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setUserInfos(res.data);
        console.log("GET유저정보setUserInfos:", res.data);
        setCheck(true);
      })
      .catch((error) => {
        console.error("GETdata실패:", error);
      });
  }

  useEffect(() => {
    getInfo();
  }, []);

  console.log("userInfos:", userInfos);

  const getData = (e) => {
    const { value, name } = e.target;
    console.log("getdata함수", name, value);

    setUserInfos(() => {
      return {
        ...userInfos,
        [name]: value,
      };
    });
    console.log(userInfos);
  };

  const putData = (e) => {
    axios(`https://i7a102.p.ssafy.io/api/users/${userId}`, {
      method: "PUT",
      headers: {
        authorization: jwt,
        "Content-Type": "application/json",
      },
      data: {
        email: userInfos.email,
        employeeNumber: userInfos.employeeNumber,
        height: userInfos.height,
        id: userInfos.id,
        name: userInfos.name,
        password: userInfos.password,
        phoneNumber: userInfos.phoneNumber,
        position: userInfos.position,
        userStatus: userInfos.userStatus,
      },
    })
      .then((res) => {
        setUserInfos(res.data);
        console.log("PUT유저정보setAfterInfo:", res.data);
      })
      .catch((error) => {
        console.error("PUTdata실패:", error);
      });
  };
  // let check = false

  // useEffect(() => {putData()}, []);

  // {userInfos.map(userInfo => <div key={userInfo.email}>{userInfo.email}</div>)}
  return (
    <div>
      {check ? (
        <div className="adminUserEditPage">
          <div className="adminUserEditContainer" id="header">
            <div id="wrapper">
              <div id="content">
                <div className="adminUserEditBackBtnArea">
                  {/* <Link to={`/`}>
                    <button data-animation="simpleRotate">
                      <p>✕</p>
                    </button>
                  </Link> */}
                </div>
                <div className="adminUserEditTitleArea">
                  <p className="adminUserEditTitle">
                    {userInfos.name} 님의 정보 수정
                  </p>
                </div>
                <form>
                  <div className="adminUserEditRowsContainer">
                    <div className="adminUserEditLeftColumn">
                      <p>이름: </p>
                      <p>이메일: </p>
                      <p>키 : </p>
                      <p>핸드폰번호: </p>
                      <p>직급: </p>
                    </div>
                    <div className="adminUserEditRightColumn">
                      <p>
                        <input
                          name="name"
                          onChange={getData}
                          value={userInfos.name}
                        />
                      </p>
                      <p>
                        <input
                          name="email"
                          onChange={getData}
                          value={userInfos.email}
                          disabled
                        />
                      </p>
                      <p>
                        <input
                          name="height"
                          onChange={getData}
                          type="number"
                          value={userInfos.height}
                        />
                      </p>
                      <p>
                        <input
                          name="phoneNumber"
                          onChange={getData}
                          value={userInfos.phoneNumber}
                        />
                      </p>
                      <p>
                        <input
                          name="position"
                          onChange={getData}
                          value={userInfos.position}
                          disabled
                        />
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="adminUserEditBtnsArea">
              <Link to={`/thome`}>
                <button className="adminUserEditSubmitBtn" onClick={putData}>
                  <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" /> 수정
                </button>
              </Link>
              <Link to={`/thome`}>
                <button data-animation="simpleRotate" className="adminUserEditCancelBtn">
                <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" /> 취소
                </button>
              </Link>              
            </div>

          </div>
        </div>
      ) : (
        <img src={ddokdiLogo} alt="ddokdiLogo" className="ddokdiLogo" />
      )}
    </div>
  );
}

export default EditInfo;
