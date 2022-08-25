import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SeatSet.css";

function SeatSetting() {
    const jwt = useLocation().state.jwt;
    const [loading, setLoading] = useState(true);
    const [selectedZone, setSelectedZone] = useState();
    const [zones, setZones] = useState();
    const [seatLoading, setSeatLoading] = useState(false);
    const [index, setIndex] = useState();
    const [removedIndex, setRemovedIndex] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);

    const navigate = useNavigate();

    const getZone = () => {
        axios(`https://i7a102.p.ssafy.io/api/zone`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                setZones(res.data);
                setSelectedZone(res.data[0]);
                setLoading(false);
                getRemovedIndex(res.data);
            })
            .catch(error => {
                console.error("실패:", error);
            });
    };

    const getRemovedIndex = zones => {
        let max = 0;
        let zonesNo = [];
        zones.forEach(zone => {
            zonesNo.push(zone.charCodeAt());
            max = Math.max(zone.charCodeAt(), max);
        });
        setIndex(max + 1);
        for (let i = 65; i < max; i++) {
            if (!zonesNo.includes(i)) {
                removedIndex.push(i);
                removedIndex.sort(function (a, b) {
                    return b - a;
                });
            }
        }
    };

    const addZone = () => {
        let newZone;
        if (removedIndex.length === 0) {
            newZone = String.fromCharCode(index);
            setIndex(current => current + 1);
            setZones([...zones, newZone]);
        } else {
            let temp = removedIndex.pop();
            newZone = String.fromCharCode(temp);
            setZones([...zones, newZone]);
        }
        axios(`https://i7a102.p.ssafy.io/api/zone/${newZone}`, {
            method: "POST",
            headers: {
                authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                // console.log("존 생성 성공!");
                addSeat(newZone);
            })
            .catch(error => {
                console.error("존 생성 실패:", error);
            });
    };

    const addSeat = newZone => {
        axios(`https://i7a102.p.ssafy.io/api/seats/${newZone}/1`, {
            method: "POST",
            headers: {
                authorization: jwt,
                "Content-Type": "application/json",
            },
            data: {
                area: newZone,
                full: false,
                isFull: false,
                isVertical: true,
                leftPos: 500,
                seatNumber: 1,
                topPos: 150,
                vertical: true,
            },
        })
            .then(res => {
                // console.log("자리 생성 성공!");
            })
            .catch(error => {
                console.error("자리 생성 실패:", error);
            });
    };

    const select = e => {
        setSeatLoading(false);
        setSelectedZone(e.target.id);
        e.target.className = "ZoneSelected";
        zones.map(zone => {
            if (zone !== e.target.id) {
                document.getElementById(`${zone}`).className = "ZoneUnSelected";
            }
        });
    };

    const deleteToggle = e => {
        if (deleteMode === false) {
            e.target.innerText = "취소";
            setDeleteMode(true);
        } else {
            e.target.innerText = "구역 삭제";
            setDeleteMode(false);
        }
    };

    const deleteZone = e => {
        e.preventDefault();
        navigate("../seatset/delete/", {
            state: { jwt: `${jwt}`, zone: `${e.target.id}` },
        });
    };

    useEffect(() => {
        getZone();
    }, []);

    return (
        <div className="kioskHomePage">
            <div className="kioskHomeTopArea"></div>
            <div className="seatSetBackBtn">
                <Link
                    to={`/admin`}
                    state={{ jwt: `${jwt}` }}
                    style={{ textDecoration: "none" }}
                >
                    <button>뒤로 가기</button>
                </Link>
                <button onClick={addZone}>구역 추가</button>
                <button onClick={deleteToggle}>구역 삭제</button>
            </div>

            <div className="kioskHomeBottomArea">
                <div className="kioskHomeBottomBoxx">
                    <div className="kioskHomeSeatImgAreaa">
                        {loading ? (
                            <p className="zoneALoading">loading</p>
                        ) : (
                            <div className="setZoneButton">
                                {zones.map(zone => (
                                    <Link
                                        to={`/seatset/${zone}`}
                                        state={{
                                            zone: `${zone}`,
                                            jwt: `${jwt}`,
                                        }}
                                        style={{ textDecoration: "none" }}
                                        key={zone}
                                        id={zone}
                                        className={"ZoneSelected"}
                                        onClick={
                                            deleteMode ? deleteZone : select
                                        }
                                    >
                                        {zone}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeatSetting;
