import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ourLogo from "../assets/ourLogo.png";
import "./Check.css";

function Check() {
    const [ticket, setTicket] = useState("");


    // const getSeat = () => {

    // }

    const getTicket = (e) => {
        setTicket(e.target.value);
    }
    console.log(ticket);
    const navigate = useNavigate();



    const check = () => {
        axios('https://i7a102.p.ssafy.io/api/login/tablet', {
            method: "POST",
            headers: {
                'Content-Type': 'application/string'
            },
            data: ticket
            
        })
            .then((res) => {
                const {jwt} = res.data;
                localStorage.setItem('jwt',jwt);
                localStorage.setItem('ticket',ticket);
                navigate('./thome');
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
                <button onClick={check}>인증하기</button>
            </div>
        </div>
    )
}

export default Check;

// 좌석DB에서 해당 좌석의 name 값을 회원 이름으로 설정하기
