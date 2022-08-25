import React, { useEffect, useState, useRef } from "react";
import "./Zone.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Zone(props) {
  let zone = props.zone;
  const seatLoading = props.seatLoading;
  const setSeatLoading = props.setSeatLoading;
  const [seats, setSeats] = useState();
  const getSeats = () => {
    axios(`https://i7a102.p.ssafy.io/api/seats/${zone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        setSeats(res.data);
        // console.log(res.data);
        setSeatLoading(false);
      })
      .catch(error => {
        console.error("실패:", error);
      });
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    getSeats();
  }, 1000);

  // console.log(seats);

  return (
    <div>
      {seatLoading ? (
        <p className="zoneALoading">Loading...</p>
      ) : (
        <div className="zoneAImg">
          {seats.map(seat =>
            seat.isFull === false ? (
              <Link
                to={`/reading`}
                state={{
                  zone: `${zone}`,
                  seatNo: `${seat.seatNumber}`,
                }}
                key={seat.seatNumber}
              >
                <button
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
              </Link>
            ) : (
              <button
                style={{
                  left: `${seat.leftPos}px`,
                  top: `${seat.topPos}px`,
                }}
                key={seat.seatNumber}
                id={seat.seatNumber}
                className={
                  seat.vertical
                    ? "zoneANoSeat"
                    : "turnANoSeat"
                }
              >
                {seat.seatNumber}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
export default Zone;
