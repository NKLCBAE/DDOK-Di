import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupName from "../assets/userIconBlue.png";
import signupEmail from "../assets/emailIconBlue.png";
import signupPassword from "../assets/passwordIconBlue.png";
import signupHeightImg from "../assets/heightIconBlue.png";
import "./SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();

    const zone = useLocation().state.zone;
    const seatNo = useLocation().state.seatNo;
    const [emailTip, setEmailTip] = useState("");
    const [pwdTip, setPwdTip] = useState("");
    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        userHeight: "",
        password: "",
    });

    const getdata = e => {
        const { value, name } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value,
            };
        });
    };

    function setAndGo() {
        axios(`https://i7a102.p.ssafy.io/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: inpval.email,
                employeeNumber: Math.floor(
                    Math.random() * 8999999 + 1000000
                ).toString(),
                height: inpval.userHeight,
                name: inpval.name,
                password: inpval.password,
                phoneNumber: "010-0000-0000",
                position: "신입",
            },
        })
            .then(res => {
                navigate("../login", {
                    state: { zone: `${zone}`, seatNo: `${seatNo}` },
                });
            })
            .catch(error => {
                console.error("실패:", error);
            });
    }
    const { email } = inpval;

    const emailCheck = () => {
        if (email === "") {
            document.getElementById("emailTip").style.color="red";
            setEmailTip("이메일을 입력해주세요")
        } else if (!email.includes("@")) {
            document.getElementById("emailTip").style.color="red";
            setEmailTip("이메일 형식이 올바르지 않습니다.")
        } else {
            axios(`https://i7a102.p.ssafy.io/api/signup/emailcheck`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email: inpval.email,
                },
            })
                .then(res => {
                    if (res.data === "Y") {
                        document.getElementById("emailTip").style.color="green";
                        setEmailTip("사용 가능한 이메일입니다")
                    } else {
                        document.getElementById("emailTip").style.color="red";
                        setEmailTip("사용할 수 없는 이메일입니다.")
                    }
                })
                .catch(error => {
                    console.error("실패:", error);
                });
        }
    };

    const pwdCheck = () => {
        if (inpval.password !== inpval.passwordCheck) {
            document.getElementById("pwdTip").style.color="red";
            setPwdTip("비밀번호가 일치하지 않습니다.")
        } else {
            document.getElementById("pwdTip").style.color="green";
            setPwdTip("비밀번호가 일치합니다.")
        }
    };

    const addData = async e => {
        e.preventDefault();

        const { name, email, userHeight, password, passwordCheck } = inpval;

        if (name === "") {
            toast.error("이름을 입력하세요", {
                position: "top-center",
            });
        } else if (email === "") {
            toast.error("이메일을 입력하세요", {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error("이메일 형식을 확인하세요", {
                position: "top-center",
            });
        } else if (userHeight === "") {
            toast.error("키를 입력하세요", {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error("비밀번호를 입력하세요", {
                position: "top-center",
            });
        } else if (password.length < 2) {
            toast.error("8자리 이상의 비밀번호를 입력하세요", {
                position: "top-center",
            });
        } else if (password !== passwordCheck) {
            toast.error("비밀번호가 일치하지 않습니다", {
                position: "top-center",
            });
        } else {
            // e.target.disabled = 'disabled'
            setAndGo();
        }
    };

    return (
        <div className="signupPage">
            <div className="signupContainer">
                <div>
                    {/* <div className="signupBackBtnArea">
            <Link to={`/reading`} state={{ zone: `${zone}`, seatNo: `${seatNo}` }}>
              <button className="signupBackButton">X</button>
            </Link>
          </div> */}
                    <h1 className="signupSignUp">회원가입</h1>
                    <div>
                        <div>
                            <img
                                src={signupName}
                                alt="signupName"
                                className="signupInputNameImg"
                            />
                            <input
                                name="name"
                                type="text"
                                onChange={getdata}
                                placeholder="이름을 입력하세요"
                                className="name"
                            />
                        </div>
                        <div className="signupInputEmail">
                            <img
                                src={signupEmail}
                                alt="signupEmail"
                                className="signupInputEmailImg"
                            />
                            <input
                                name="email"
                                type="text"
                                onChange={getdata}
                                onBlur={emailCheck}
                                placeholder="이메일을 입력해주세요"
                                className="name"
                            />
                        </div>
                        <p id="emailTip">{emailTip}</p>
                        <div className="signupInputPassword">
                            <img
                                src={signupPassword}
                                alt="signupPassword"
                                className="signupInputPwdImg"
                            />
                            <input
                                name="password"
                                type="password"
                                onChange={getdata}
                                placeholder="비밀번호를 입력해주세요"
                                className="name"
                            />
                        </div>
                        <div className="signupPasswordCheck">
                            <img
                                src={signupPassword}
                                alt="signupPasswordCheck"
                                className="signupInputPwdImg"
                            />
                            <input
                                name="passwordCheck"
                                type="password"
                                onChange={getdata}
                                onBlur={pwdCheck}
                                placeholder="비밀번호를 확인해주세요"
                                className="name"
                            />
                        </div>
                        <p id="pwdTip">{pwdTip}</p>
                        <div className="signupInputHeight">
                            <img
                                src={signupHeightImg}
                                alt="signupPassword"
                                className="signupInputHeightImg"
                            />
                            <input
                                name="userHeight"
                                type="number"
                                onChange={getdata}
                                placeholder="키를 입력해주세요"
                                className="name"
                            />
                        </div>
                        <div className="signupSettingRecommendationArea">
                            <p>키를 바탕으로 알맞은 세팅을 추천해드립니다</p>
                        </div>
                        <div className="signupButtonPlace">
                            <button
                                className="signupButton"
                                type="submit"
                                onClick={addData}
                            >
                                회원가입
                            </button>
                        </div>
                    </div>
                    <p className="signupLink">
                        계정이 이미 있으신가요?{" "}
                        <Link
                            to={`../login`}
                            state={{ zone: `${zone}`, seatNo: `${seatNo}` }}
                            style={{ textDecoration: "none" }}
                        >
                            로그인
                        </Link>
                    </p>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default SignUp;
