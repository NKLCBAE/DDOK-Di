import { useState, useEffect } from "react";
import Zone from "../components/viewStatus/Zone";
import LogoImg from "./../assets/ourLogo.png";
import { useNavigate } from 'react-router-dom';
import './ViewStatus.css'
import axios from "axios";

function Home() {
  const [zones, setZones] = useState();
  const [selectedZone, setSelectedZone] = useState();
  const [loading, setLoading] = useState(true);
  const [seatLoading, setSeatLoading] = useState(true);

  const getZone = () => {
    axios(`https://i7a102.p.ssafy.io/api/zone`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        setZones(res.data);
        setSelectedZone(res.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('실패:', error);
      });
  }

  const select = (e) => {
    setSeatLoading(true);
    setSelectedZone(e.target.id);
    e.target.className="ZoneSelected"
    zones.map((zone)=>{
    if(zone!==e.target.id){
      document.getElementById(`${zone}`).className="ZoneUnSelected"
    }
    })
  };

  const navigate = useNavigate()

    const onClick = () => {
      navigate('/thome');
    }

    useEffect(() => {
      getZone();
    }, [])

  return (
    <div className="tabletViewStatusPage">
      <div className="tabletViewStatusTopArea">
        <img src={LogoImg} alt="LogoImg" className="LogoImg" onClick={onClick}/>
        <div className="tabletZoneBtnBox">
        {loading ? <p className="zoneALoading">loading</p> :
            <div className="tabletZoneButtons">
              {zones.map((zone) => (
                <button
                  key={zone}
                  id={zone}
                  className={zone===selectedZone ? "ZoneSelected" : "ZoneUnSelected"}
                  onClick={select}
                >
                  {zone}
                </button>
              ))}
            </div>
          }         
        </div>
      </div>

      <div className="tabletViewStatusBottomArea">
        <div className="tabletViewStatusBottomBox">
          <div className="tabletViewStatusSeatImgArea">
          <Zone zone={selectedZone} seatLoading={seatLoading} setSeatLoading={setSeatLoading} />        
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
