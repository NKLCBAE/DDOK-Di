import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import { useLocation } from "react-router-dom";
import userManagementImg from "../assets/userManagement.png";
import seatArrangementImg from "../assets/seatSet.png";
import seatViewImg from "../assets/seatView.png";

function Admin() {
    const jwt = useLocation().state.jwt;

    return (
        <div className={styles.AdminHomePage}>
            <div className={styles.adminHomeContainer}>
                <div className={styles.adminElementBox}>
                    <Link
                        to={`/userset`}
                        state={{ jwt: `${jwt}` }}
                        className={styles.userManagementImgArea}
                    >
                        <img
                            src={userManagementImg}
                            alt="userManagementImg"
                            className={styles.userManagementImg}
                        />
                    </Link>
                    <p className={styles.adminTitles}>사용자 관리</p>
                </div>
                <div className={styles.adminElementBox}>
                    <Link
                        to={`/seatset`}
                        state={{ jwt: `${jwt}` }}
                        className={styles.seatArrangementImgArea}
                    >
                        <img
                            src={seatArrangementImg}
                            alt="seatArrangementImg"
                            className={styles.seatArrangementImg}
                        />
                    </Link>
                    <p className={styles.adminTitles}>자리 배치</p>
                </div>
                <div className={styles.adminElementBox}>
                    <Link
                        to={`/viewstatus`}
                        state={{ jwt: `${jwt}` }}
                        className={styles.seatArrangementImgArea}
                    >
                        <img
                            src={seatViewImg}
                            alt="seatViewImg"
                            className={styles.seatViewImg}
                        />
                    </Link>
                    <p className={styles.adminTitles}>좌석 현황</p>
                </div>
            </div>
        </div>
    );
}

export default Admin;
