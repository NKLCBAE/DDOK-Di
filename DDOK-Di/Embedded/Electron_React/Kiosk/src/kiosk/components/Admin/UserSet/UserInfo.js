import "./UserInfo.css";
import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import userInfoToListIcon from "../../../assets/backArrow.png";
import pencilIcon from "../../../assets/pencil.png";
import cancelIcon from "../../../assets/deleteIcon.png";

function UserInfo(props) {
    const jwt = props.jwt;
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const userId = props.id;
    function getUsers() {
        axios(`https://i7a102.p.ssafy.io/api/users/${userId}`, {
            method: "GET",
            headers: {
                authorization: jwt,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                setUser(res.data);
                // console.log(res.data);
                setLoading(true);
            })
            .catch(error => {
                console.error("실패:", error);
            });
    }

    const setModify = () => {
        props.setUser(user);
        props.setComp("Modify");
    };
    const setList = () => {
        props.setComp("List");
    };
    const setDelete = () => {
        props.setComp("Delete");
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="adminUserInfoPage">
            {loading ? (
                <div className="adminUserInfoContainer">
                    <div className="adminUserInfoTitleArea">
                        <div className="adminUserInfoBackBtnArea">
                            <button onClick={setList}>
                                <img
                                    src={userInfoToListIcon}
                                    alt="userInfoToListIcon"
                                    className="userInfoToListIcon"
                                />
                            </button>
                        </div>
                        <p className="adminUserInfoTitle">
                            {user.name} 상세 정보
                        </p>
                        <img
                            src={userInfoToListIcon}
                            alt="userInfoToListIcon"
                            className="srOnly"
                        />
                    </div>
                    <div>
                        <div className="adminUserInfoRowsContainer">
                            <div className="adminUserInfoLeftColumn">
                                <p>사번: </p>
                                <p>이름: </p>
                                <p>이메일: </p>
                                <p>키 : </p>
                                <p>전화번호: </p>
                                <p>직급: </p>
                                <p>상태: </p>
                            </div>
                            <div className="adminUserInfoRightColumn">
                                <p>{user.employeeNumber}</p>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                                <p>{user.height}cm</p>
                                <p>{user.phoneNumber}</p>
                                <p>{user.position}</p>
                                <p>{user.userStatus}</p>
                            </div>
                        </div>
                    </div>
                    <div className="adminUserInfoBtnArea">
                        <button
                            className="adminUserInfoEditBtn"
                            onClick={setModify}
                        >
                            <img
                                src={pencilIcon}
                                alt="pencilIcon"
                                className="pencilIcon"
                            />{" "}
                            수정
                        </button>
                        <div>
                            <button
                                onClick={setDelete}
                                className="adminUserInfoDeleteBtn"
                            >
                                <img
                                    src={cancelIcon}
                                    alt="cancelIcon"
                                    className="cancelIcon"
                                />{" "}
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>로딩중</div>
            )}
        </div>
    );
}

export default UserInfo;
