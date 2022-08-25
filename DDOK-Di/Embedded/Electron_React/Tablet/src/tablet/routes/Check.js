import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ourLogo from "../assets/ourLogo.png";
import "./Check.css";
import { DS, MU, MD } from "../../constants";

function Check({userStates}) {
    let MH = localStorage.getItem("monitorSet");
    const { ipcRenderer } = window.require("electron");
    const [ticket, setTicket] = useState("");
    const {
        user,
        setUser,
        currentMonitorH,
        setCurrentMonitorH,
        currentDeskH,
        setCurrentDeskH,
    } = userStates;
    
    const [userId, setUserId] = useState();
    const [check, setCheck] = useState(false);

    // const getSeat = () => {

    // }

    const getTicket = (e) => {
        setTicket(e.target.value);
    }
    console.log(ticket);
    const navigate = useNavigate();
    let Interval;
    
        function seatCheck() {
      if(userId === undefined) {
        axios("https://i7a102.p.ssafy.io/api/seats/A/11", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                console.log("test1", res.data.isFull);
                if (res.data.isFull) {
                    clearInterval(Interval);
                    setUserId(res.data.user_id);
                }
            })
            .catch(error => {
                console.error("실패:", error);
            });
      }
    }
    async function getUser() {
        console.log("test3", userId);
        // if (visitSetting === false) {
        await axios(`https://i7a102.p.ssafy.io/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                setUser(res.data);
                console.log("user", res.data);
                setCheck(true);
                // getSettings();
                getFirstSettings();
            })
            .catch(error => {
                console.error("실패:", error);
            });
        // }
    }
    if (check === false) {
        Interval = setInterval(() => {
            seatCheck();
        }, 1000);
    }
    useEffect(() => {
        getUser();
    }, [userId]);
 
    async function getFirstSettings() {
            await axios(
                `https://i7a102.p.ssafy.io/api/settings/${userId}/desks/1`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then(res => {
                console.log("getFirstSettings");
                    // setSettings(res.data);
                    setCurrentDeskH(res.data.deskHeight);
                    setCurrentMonitorH(res.data.monitorHeight);
                    if(MH > res.data.monitorHeight){
                  for(let i=0;i<MH-res.data.monitorHeight;i++){
                    ipcRenderer.send(MD, "send");
                  }
                }
                else if(MH < res.data.monitorHeight){
                    for(let i=0;i<res.data.monitorHeight-MH;i++){
                    ipcRenderer.send(MU, "send");
                  }
                }
                localStorage.setItem("monitorSet", JSON.stringify(res.data.monitorHeight));
                ipcRenderer.send(DS, res.data.deskHeight);
                })
                .catch(error => {
                    console.error("실패:", error);
                });
    }
    
    const getJwt = () => {
        axios('https://i7a102.p.ssafy.io/api/login/tablet', {
            method: "POST",
            headers: {
                'Content-Type': 'application/string'
            },
            data: ticket
        })
            .then((res) => {
                const localTicket = localStorage.getItem('ticket');
                if(localTicket !== ticket){
                const {jwt} = res.data;
                localStorage.setItem('jwt',jwt);
                localStorage.setItem('ticket',ticket);
                setUserId();
                navigate('./thome');
                }
                else{
                  alert("티켓번호가 올바르지 않습니다")
                }
            })
            .catch((err) => {
                alert("티켓번호가 올바르지 않습니다")
            });

    }


    return (
        <div className="ticketPage">
            <div className="logoZone">
                <img src={ourLogo}></img>
            </div>
            <div className="inputZone">
                <input
                    onChange={getTicket}
                    value={ticket}
                    placeholder='티켓번호를 입력해주세요'
                />
                <button onClick={getJwt}>인증하기</button>
            </div>
        </div>
    )
}

export default Check;

// 좌석DB에서 해당 좌석의 name 값을 회원 이름으로 설정하기
