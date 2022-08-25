import LogoImg from "../../assets/ourLogo.png";
import { useNavigate } from "react-router-dom";
import "./LogoToHome.css";

function LogoToHome() {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    };

    return (
        <div>
            <span className="LogoToHomeArea" onClick={onClick}>
                <img src={LogoImg} alt="LogoImg" className="LogoImg" />
            </span>
        </div>
    );
}

export default LogoToHome;
