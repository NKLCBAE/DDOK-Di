import React, { useEffect, useState, useRef } from "react";
import trashCanImg from "../../../assets/deleteIconSpan.png";
import trashCanOpenImg from "../../../assets/deleteIconOpened.png"
import goBackPleaseImg from "../../../assets/backArrow.png"
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Draggable from "react-draggable";
import "./Zone.css";
import CallModalOne from "./SettingsCallbackModalOne"
import CallModalTwo from "./SettingsCallbackModalTwo"

function Zone(props) {
  const zone = useLocation().state.zone;
  const jwt = useLocation().state.jwt;
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState()
  const [index, setIndex] = useState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [removedIndex, setRemovedIndex] = useState([]);
  const [initialPosition, setInitialPosition] = useState([]);
  const [hello, setHello] = useState(false);
  const [trashCheck, setTrashCheck] = useState(false);
  const nodeRef = useRef(null);
  const regex = /[^0-9 -]/g;
  let startX;
  let startY;

  // 업데이트 되는 값을 set 해줌
  const trackPos = (e, data) => {
    setPosition({ x: data.x, y: data.y });
    console.log(e.clientX + " " + e.clientY);
    if (e.clientX >= 1100 && e.clientX <= 1200 && e.clientY >= 550 && e.clientY < 650) {
      setTrashCheck(true);
    } else {
      setTrashCheck(false);
    }
  };

  const getSeats = () => {
    axios(`https://i7a102.p.ssafy.io/api/seats/${zone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        // console.log(res.data);
        setSeats(res.data);
        setLoading(false);
        getInitialPosition(res.data);
        getRemovedIndex(res.data);
      })
      .catch(error => {
        // console.error("실패:", error);
      });
  };

  const getInitialPosition = seats => {
    seats.forEach(seat => {
      initialPosition[seat.seatNumber] = {
        left: seat.leftPos,
        top: seat.topPos,
      };
    });
  };

  const getRemovedIndex = seats => {
    let max = 0;
    let seatsNo = [];
    seats.forEach(seat => {
      seatsNo.push(seat.seatNumber);
      max = Math.max(seat.seatNumber, max);
    });
    setIndex(max + 1);
    for (let i = 1; i < max; i++) {
      if (!seatsNo.includes(i)) {
        removedIndex.push(i);
        removedIndex.sort(function (a, b) {
          return b - a;
        });
      }
    }
  };

  //버튼 추가 회전 삭제 파트
  const addButton = () => {
    if (removedIndex.length === 0) {
      const newButton = {
        isFull: false,
        full: false,
        area: zone,
        seatNumber: index,
        leftPos: 500,
        topPos: 150,
        isVertical: true,
        vertical: true,
      };
      initialPosition[index] = { left: 500, top: 150 };
      setIndex(current => current + 1);
      setSeats([...seats, newButton]);
    } else {
      let temp = removedIndex.pop();
      const newButton = {
        isFull: false,
        full: false,
        area: zone,
        seatNumber: temp,
        leftPos: 500,
        topPos: 150,
        isVertical: true,
        vertical: true,
      };
      initialPosition[temp] = { left: 500, top: 150 };
      setSeats([...seats, newButton]);
    }
  };

  const dragStart = e => {
    let trans = e.target.style.transform;
    let position = trans.replace(regex, "");
    let arr = position.split(" ");
    startX = arr[0];
    startY = arr[1];
  };

  const dragEnd = e => {
    let left = initialPosition[e.target.id].left;
    let top = initialPosition[e.target.id].top;
    let trans = e.target.style.transform;
    let position = trans.replace(regex, "");
    let arr = position.split(" ");
    let newLeft = Number(left) + Number(arr[0]);
    let newTop = Number(top) + Number(arr[1]);
    if (arr[0] === startX && arr[1] === startY) {
      // console.log("돌리자");
      for (let i in seats) {
        if (seats[i].seatNumber === Number(e.target.id)) {
          seats[i].vertical = !seats[i].vertical;
          setHello(current => !current);
        }
      }
    }
    if (
      newLeft >= 1000 &&
      newLeft <= 1150 &&
      newTop >= 160 &&
      newTop <= 350
    ) {
      initialPosition[e.target.id] = null;
      removedIndex.push(e.target.id - 0);
      removedIndex.sort(function (a, b) {
        return b - a;
      });
      let temp = seats.filter(
        element => element.seatNumber !== e.target.id - 0
      );
      setSeats(temp);
      e.target.remove();
    }
    else if (
      newLeft >= 1120 ||
      newLeft <= 0 ||
      newTop >= 350 ||
      newTop <= -135
    ) {
      initialPosition[e.target.id] = null;
      removedIndex.push(e.target.id - 0);
      removedIndex.sort(function (a, b) {
        return b - a;
      });
      let temp = seats.filter(
        element => element.seatNumber !== e.target.id - 0
      );
      setSeats(temp);
      e.target.remove();
    }
    console.log(newLeft + " " + newTop);
  };


  // function test() {
  //   if (!confirm("확인(예) 또는 취소(아니오)를 선택해주세요.")) {
  //     // alert("취소(아니오)를 누르셨습니다.");
  //   } else {
  //     save()
  //     // alert("확인(예)을 누르셨습니다.");
  //   }
  // }


  const save = () => {

    for (let i = 0; i < initialPosition.length; i++) {
      if (initialPosition[i] === null) {
        // console.log(i + "번은 널이잖아!");
        axios(`https://i7a102.p.ssafy.io/api/seats/${zone}/${i}`, {
          method: "DELETE",
          headers: {
            authorization: jwt,
            "Content-Type": "application/json",
          },
        })
          .then(res => {
            // console.log("좌석 삭제 성공!", res);
          })
          .catch(error => {
            console.error("좌석 삭제 실패:", error);
          });
      }
    }
    seats.forEach(seat => {
      let left = initialPosition[seat.seatNumber].left;
      let top = initialPosition[seat.seatNumber].top;
      let trans = document.getElementById(seat.seatNumber).style
        .transform;
      let position = trans.replace(regex, "");
      let arr = position.split(" ");
      let newLeft = Number(left) + Number(arr[0]);
      let newTop = Number(top) + Number(arr[1]);
      // console.log(newLeft, newTop);
      axios(
        `https://i7a102.p.ssafy.io/api/seats/${zone}/${seat.seatNumber}`,
        {
          method: "POST",
          headers: {
            authorization: jwt,
            "Content-Type": "application/json",
          },
          data: {
            area: zone,
            isFull: seat.isFull,
            leftPos: newLeft,
            seatNumber: seat.seatNumber,
            topPos: newTop,
            full: seat.full,
            isVertical: seat.isVertical,
            vertical: seat.vertical,
          },
        }
      )
        .then(res => {
          // console.log(zone + " " + seat.seatNumber + "성공!");
        })
        .catch(error => {
          console.error("실패:", error);
        });
    });
    closeModalTwoB()
  };

  const trashCanIn = (e) => {
    setTrashCheck(true);
  }

  const trashCanOut = (e) => {
    setTrashCheck(false);
  }

  const reset = () => {
    let temp = seats.filter(
      element => element.seatNumber === 1,
      setIndex(2)
    );
    for (let i = 2; i < initialPosition.length; i++) {
      initialPosition[i] = null;
    }
    setSeats(temp);
    closeModalOneB()
    // console.log(seats);
  };


  useEffect(() => {
    getSeats();
    // console.log("한 번만 가져와라");
  }, []);


  const [modalOpenOneB, setModalOpenOneB] = useState(false);

  const openModalOneB = (e) => {
    // const points = document.getElementsByClassName("forBtnZIndex");
    // for(let i in points){
    //   points[i].style.display="none";
    // }
    // e.preventDefault()
    setModalOpenOneB(true);

  };
  const closeModalOneB = () => {
    setModalOpenOneB(false);
  };

  const [modalOpenTwoB, setModalOpenTwoB] = useState(false);

  const openModalTwoB = (e) => {
    // e.preventDefault()
    // const points = document.getElementsByClassName("forBtnZIndex");
    // for(let i in points){
    //   points[i].style.display="none";
    // }
    setModalOpenTwoB(true);

  };
  const closeModalTwoB = () => {
    setModalOpenTwoB(false);
  };


  return (
    <div className="kioskHomePage">
      <div className="kioskHomeTopArea">
        <div className="kioskZoneBtnBox">
          <div className="kioskZoneButtons">
            <h1>{zone} ZONE</h1>
          </div>
        </div>
      </div>
      <div className="kioskHomeBottomArea">
        <div className="kioskHomeBottomBox">
          <div className="kioskHomeSeatImgArea">
            <Link to={`/seatset`} state={{ jwt: `${jwt}` }}>
              <button className="seatSetA">
              <img
                  src={goBackPleaseImg}
                  alt="goBackPleaseImg"
                  className="goBackPleaseImg"
                />
              </button>
            </Link>
            <div className="kioskHomeImgBtnArea">
              <button className="seatSet" onClick={openModalOneB}>
                초기화
              </button>

              <button className="seatSet" onClick={openModalTwoB}>
                저장하기
              </button>

              <button className="seatSet" onClick={addButton}>
                자리 추가
              </button>
            </div>
            <div className="container">
              {loading ? (
                <p className="zoneALoading">loading</p>
              ) : (
                <div className="zoneAImg">
                  {seats.map(seat => (
                    <div key={seat.seatNumber}>
                      <Draggable
                        onDrag={(e, data) =>
                          trackPos(e, data)
                        }
                        onStart={dragStart}
                        onStop={dragEnd}
                      >
                        <button
                          ref={nodeRef}
                          style={{
                            left: `${seat.leftPos}px`,
                            top: `${seat.topPos}px`,
                          }}
                          key={seat.seatNumber}
                          id={seat.seatNumber}
                          className={
                            seat.vertical
                              ? "zoneASeat"
                              : "turnASeat"
                          }
                        >
                          {seat.seatNumber}
                        </button>
                      </Draggable>
                    </div>
                  ))}
                </div>
              )}

              <div className="trashZone"
                onMouseOver={trashCanIn}
                onMouseMove={trashCanIn}
                onMouseOut={trashCanOut}
              >
                <img
                  src={trashCheck ? trashCanOpenImg : trashCanImg}
                  alt="trashCan"
                  draggable="false"

                  className="trashCan"
                />
                <h1 hidden>{hello}</h1>
              </div>

            </div>
            <CallModalOne
                open={modalOpenOneB}
                close={closeModalOneB}
                header="일정 추가"
                onClose={closeModalOneB}>
                  <div>
                    <p className="settingsInModalFont">
                      초기화 하시겠습니까?
                    </p>
                    <div className="settingsInModalEditBtnArea">
                      <button onClick={reset} className='settingsInModalEditBtn'>
                        예
                      </button>
                      <button onClick={closeModalOneB} className='settingsInModalCancelBtn'>
                        아니오
                      </button>                      
                    </div>
                  </div>
              </CallModalOne> 
              <CallModalTwo
                open={modalOpenTwoB}
                close={closeModalTwoB}
                header="일정 추가"
                onClose={closeModalTwoB}>
                  <div>
                    <p className="settingsInModalFont">
                      저장하시겠습니까?
                    </p>
                    <div className="settingsInModalEditBtnArea">
                      <button onClick={save} className='settingsInModalEditBtn'>
                        예
                      </button>
                      <button onClick={closeModalTwoB} className='settingsInModalCancelBtn'>
                        아니오
                      </button>                      
                    </div>
                  </div>
              </CallModalTwo> 
          </div>
        </div>
      </div>
    </div>
  );
}
export default Zone;
