import "./UserDelete.css";
import axios from "axios";
import cancelIcon from "../../../assets/cancel.png";

function UserDelete(props) {
    const jwt = props.jwt;
    const id = props.id;
    const deleteUser = e => {
        e.target.disabled = "disabled";
        axios(`https://i7a102.p.ssafy.io/api/users/${id}`, {
            method: "DELETE",
            headers: {
                authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                // console.log("계정 삭제 성공!", res);
            })
            .catch(error => {
                console.error("실패:", error);
            })
            .then(() => {
                props.setComp("DeleteSuccess");
            });
    };
    const setInfo = () => {
        props.setComp("Info");
    };
    return (
        <div className="adminDeleteAskPage">
            <div className="adminDeleteAskContainer">
                <div className="adminDeleteAskBackBtnArea">
                    <button
                        className="adminDeleteAskBackButton"
                        onClick={setInfo}
                    >
                        <img
                            src={cancelIcon}
                            alt="cancelIcon"
                            className="cancelIcon"
                        />
                    </button>
                </div>
                <div className="adminDeleteAskLineArea">
                    <p>계정을 정말 삭제하시겠습니까?</p>
                </div>
                <div className="adminDeleteAskBtnArea">
                    <button onClick={deleteUser}>예</button>
                    <button onClick={setInfo}>아니오</button>
                </div>
            </div>
        </div>
    );
}

export default UserDelete;
