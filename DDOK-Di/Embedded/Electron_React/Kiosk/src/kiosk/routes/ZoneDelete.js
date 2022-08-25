import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ZoneDelete(props) {
    const jwt = useLocation().state.jwt;
    const zone = useLocation().state.zone;
    const navigate = useNavigate();

    const deleteZone = e => {
        e.target.disabled = "disabled";
        axios(`https://i7a102.p.ssafy.io/api/zone/${zone}`, {
            method: "DELETE",
            headers: {
                authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                // console.log("존 삭제 성공!", res);
                navigate("../seatset", { state: { jwt: `${jwt}` } });
            })
            .catch(error => {
                console.error("실패:", error);
            });
    };
    
    const back = ()=>{
        navigate("../seatset", { state: { jwt: `${jwt}` }});
    }
    
    return (
        <div className="adminDeleteAskPage">
            <div className="adminDeleteAskContainer">
                <div className="adminDeleteAskLineArea">
                    <p>{zone} ZONE을 삭제하시겠습니까?</p>
                </div>
                <div className="adminDeleteAskBtnArea">
                    <button onClick={deleteZone}>YES</button>
                    <button onClick={back}>NO</button>
                </div>
            </div>
        </div>
    );
}

export default ZoneDelete;
