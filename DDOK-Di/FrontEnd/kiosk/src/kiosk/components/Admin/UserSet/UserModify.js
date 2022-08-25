import React, { useState } from "react";
import "./UserModify.css";
import axios from "axios";
import cancelIcon from "../../../assets/cancel.png";
import pencilIcon from "../../../assets/pencil.png";

function UserModify(props) {
    const jwt = props.jwt;
    const id = props.id;
    const temp = props.user;
    const [user, setUser] = useState(temp);
    const [name, setName] = useState(user.name);

    const setInfo = () => {
        props.setComp("Info");
    };
    const setList = () => {
        props.setComp("List");
    };

    const getData = e => {
        // console.log(e.target.value);

        const { value, name } = e.target;
        // console.log(value,name);

        setUser(() => {
            return {
                ...user,
                [name]: value,
            };
        });
        console.log(user);
    };

    const setAndGo = e => {
        e.target.disabled = "disabled";
        axios(`https://i7a102.p.ssafy.io/api/users/${id}`, {
            method: "PUT",
            headers: {
                authorization: jwt,
                "Content-Type": "application/json",
            },
            data: {
                email: user.email,
                employeeNumber: user.employeeNumber,
                height: user.height,
                id: id,
                name: user.name,
                password: user.password,
                phoneNumber: user.phoneNumber,
                position: user.position,
            },
        })
            .then(res => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.error("실패:", error);
            })
            .then(() => {
                props.setComp("ModifySuccess");
            });
    };

    return (
        <div className="adminUserEditPage">
            <div className="adminUserEditContainer" id="header">
                <div id="wrapper">
                    <div id="content">
                        <div className="adminUserEditTitleArea">
                            <p className="adminUserEditTitle">
                                {name} 정보 수정
                            </p>
                        </div>
                        <form>
                            <div className="adminUserEditRowsContainer">
                                <div className="adminUserEditLeftColumn">
                                    <p>사번: </p>
                                    <p>이름: </p>
                                    <p>이메일: </p>
                                    <p>키 : </p>
                                    <p>전화번호: </p>
                                    <p>직급: </p>
                                    <p>상태: </p>
                                </div>
                                <div className="adminUserEditRightColumn">
                                    <p>
                                        <input
                                            name="employeeNumber"
                                            value={user.employeeNumber}
                                            disabled
                                        />
                                    </p>
                                    <p>
                                        <input
                                            name="name"
                                            onChange={getData}
                                            value={user.name}
                                        />
                                    </p>
                                    <p>
                                        <input
                                            name="email"
                                            onChange={getData}
                                            value={user.email}
                                            disabled
                                        />
                                    </p>
                                    <p>
                                        <input
                                            name="height"
                                            onChange={getData}
                                            value={user.height}
                                            type="number"
                                        />
                                    </p>
                                    <p>
                                        <input
                                            name="phoneNumber"
                                            onChange={getData}
                                            value={user.phoneNumber}
                                        />
                                    </p>
                                    <p>
                                        <input
                                            name="position"
                                            onChange={getData}
                                            value={user.position}
                                        />
                                    </p>
                                    <p>
                                        <input
                                            name="userStatus"
                                            onChange={getData}
                                            value={user.userStatus}
                                        />
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="adminUserEditBackBtnArea">
                    <button
                        className="adminUserEditSubmitBtn"
                        onClick={setAndGo}
                    >
                        <img
                            src={pencilIcon}
                            alt="pencilIcon"
                            className="pencilIcon"
                        />{" "}
                        수정
                    </button>
                    <button
                        onClick={setInfo}
                        className="adminUserEditCancelBtn"
                    >
                        <img
                            src={cancelIcon}
                            alt="cancelIcon"
                            className="cancelIcon"
                        />{" "}
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserModify;
