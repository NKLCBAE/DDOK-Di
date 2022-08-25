import "./DeleteSuccess.css";
import cancelIcon from "../../../assets/cancel.png";

function DeleteSuccess(props) {
    const timeout = setTimeout(() => {
        props.setComp("List");
    }, 3000);

    const setList = () => {
        props.setComp("List");
        clearTimeout(timeout);
    };

    return (
        <div className="adminDeleteSuccessPage">
            <div className="adminDeleteSuccessContainer">
                <div className="adminDeleteSuccessBackBtnArea">
                    <button
                        className="adminDeleteSuccessBackButton"
                        onClick={setList}
                    >
                        <img
                            src={cancelIcon}
                            alt="cancelIcon"
                            className="cancelIcon"
                        />
                    </button>
                </div>
                <div className="adminDeleteSuccessLineArea">
                    <p>삭제가 완료되었습니다.</p>
                </div>
            </div>
        </div>
    );
}

export default DeleteSuccess;
