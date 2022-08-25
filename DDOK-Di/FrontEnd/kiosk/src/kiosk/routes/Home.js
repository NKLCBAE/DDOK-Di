import { useState, useEffect } from "react";
import Zone from "../components/Home/Zone";
import axios from "axios";
import "./Home.css";

function Home() {
    const [loading, setLoading] = useState(true);
    const [selectedZone, setSelectedZone] = useState();
    const [zones, setZones] = useState();
    const [seatLoading, setSeatLoading] = useState(true);

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
            })
            .catch(error => {
                console.error("실패:", error);
            });
    };

    const select = e => {
        setSeatLoading(true);
        setSelectedZone(e.target.id);
        e.target.className = "ZoneSelected";
        zones.map(zone => {
            if (zone !== e.target.id) {
                document.getElementById(`${zone}`).className = "ZoneUnSelected";
            }
        });
    };

    useEffect(() => {
        getZone();
    }, []);

    return (
        <div className="kioskHomePage">
            <div className="kioskHomeTopArea">
                <div className="kioskZoneBtnBox">
                    {loading ? (
                        <p className="zoneALoading">Loading</p>
                    ) : (
                        <div className="kioskZoneButtons">
                            {zones.map(zone => (
                                <button
                                    key={zone}
                                    id={zone}
                                    className={
                                        zone === selectedZone
                                            ? "ZoneSelected"
                                            : "ZoneUnSelected"
                                    }
                                    onClick={select}
                                >
                                    {zone}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="kioskHomeBottomArea">
                <div className="kioskHomeBottomBox">
                    <div className="kioskHomeImgBtnArea">
                        <button className="seatAble">선택 가능</button>
                        <button className="seatDisabled">선택 불가능</button>
                    </div>
                    <div className="kioskHomeSeatImgArea">
                        <Zone
                            zone={selectedZone}
                            seatLoading={seatLoading}
                            setSeatLoading={setSeatLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
