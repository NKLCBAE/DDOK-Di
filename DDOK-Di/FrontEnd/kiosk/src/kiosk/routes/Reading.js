import "./Reading.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import cardReadingImg from "../assets/nfcCardReadBlack.png";

function Reading() {
    const zone = useLocation().state.zone;
    const seatNo = useLocation().state.seatNo;

    return (
        <div className="readingPage">
            <div className="cardReadingBox">
                <img
                    src={cardReadingImg}
                    alt="cardReadingImg"
                    className="cardReadingImg"
                />
                <p>회원증을 리더기에 대주세요</p>
            </div>
            <div className="readingButtonsArea">
                <Link to={`/`}>
                    <button className="readingToHome">자리 선택</button>
                </Link>
                <Link
                    to={`/login`}
                    state={{ zone: `${zone}`, seatNo: `${seatNo}` }}
                >
                    <button className="readingToLogin"> 로그인</button>
                </Link>
                <Link
                    to={`/signup`}
                    state={{ zone: `${zone}`, seatNo: `${seatNo}` }}
                >
                    <button className="readingToSignUp">회원 가입</button>
                </Link>
            </div>
        </div>
    );
}

export default Reading;
