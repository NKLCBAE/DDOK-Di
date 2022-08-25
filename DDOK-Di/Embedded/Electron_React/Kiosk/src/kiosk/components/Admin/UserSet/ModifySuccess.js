import "./ModifySuccess.css";
import cancelIcon from "../../../assets/cancel.png";

function ModifySuccess(props) {
    const timeout = setTimeout(() => {
        props.setComp("Info");
    }, 3000);

    const setInfo = () => {
        props.setComp("Info");
        clearTimeout(timeout);
    };

    return (
        <div className="adminEditSuccessPage">
            <div className="adminEditSuccessContainer">
                <div className="adminEditSuccessBackBtnArea">
                    <button
                        className="adminEditSuccessBackButton"
                        onClick={setInfo}
                    >
                        <img
                            src={cancelIcon}
                            alt="cancelIcon"
                            className="cancelIcon"
                        />
                    </button>
                </div>
                <div className="adminEditSuccessLineArea">
                    <p>정보가 수정되었습니다.</p>
                </div>
            </div>
        </div>
    );
}

export default ModifySuccess;
