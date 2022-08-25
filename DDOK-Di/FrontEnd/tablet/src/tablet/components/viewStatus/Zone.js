import React, { useEffect, useState, useRef } from "react";
import "./Zone.css";
import statusOnlineWhite from "../../assets/onlineWhite.png";
import statusOfflineWhite from "../../assets/statusOfflineWhite.png";
import statusAwayWhite from "../../assets/statusAwayWhite.png";
import statusDoNotDisturbWhite from "../../assets/statusDoNotDisturbWhite.png";
import ourLogo from "../../assets/ourLogo.png";
import axios from "axios";

function Zone(props) {
  let zone = props.zone
  const seatLoading = props.seatLoading;
  const setSeatLoading = props.setSeatLoading;
  const jwt = localStorage.getItem('jwt');
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState();
  function getSeats() {
    axios(`https://i7a102.p.ssafy.io/api/seats/${zone}`, {
      method: "GET",
      headers: {
        authorization: jwt,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSeats(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    getSeats();
  }, 1000);

  console.log(seats);

  return (
    <div>
      {loading ? (
        <p className="tabletZoneALoading">
          <img src={ourLogo} alt="ourLogo" className="ourLogo" />
        </p>
      ) : (
        <div>
          <div className="StatusBox">
          <div className="Status">
            <div className="OnLineStatus">
            </div>
            온라인
          </div>
          <div className="Status">
            <div className="InOtherWorkStatus">
            </div>
            용무중
          </div>
          <div className="Status">
            <div className="DoNotDisturbStatus">
            </div>
            방해금지
          </div>
          </div>
          <div className="tabletZoneAImg">
            {seats.map((seat) =>
              seat.isFull === false ? (
                <button
                  style={{
                    left: `${seat.leftPos}px`,
                    top: `${seat.topPos}px`,
                  }}
                  key={seat.seatNumber}
                  id={seat.seatNumber}
                  className={seat.vertical ? "tabletZoneASeat" : "tabletZoneASeatTurn"}
                >
                  {seat.seatNumber}
                </button>
              ) : (
                <button
                  style={{
                    left: `${seat.leftPos}px`,
                    top: `${seat.topPos}px`,
                  }}
                  key={seat.seatNumber}
                  id={seat.seatNumber}
                  className={(seat.vertical ? "tabletZoneANoSeat " : "tabletZoneANoSeatTurn ") + seat.user_status}
                >
                  <div className="tabletZoneANamePositionArea">
                    <div className="tabletZoneANameArea">{seat.user_name}</div>
                    <div className="tabletZoneAPositionArea">
                      {seat.user_position}
                    </div>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Zone;