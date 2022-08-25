import "./Login.css";
import loginEmail from "../assets/emailIconBlue.png";
import loginPassword from "../assets/passwordIconBlue.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// import {useHistory} from "react-router-dom";


function Login() {
    const zone = useLocation().state.zone;
    const seatNo = useLocation().state.seatNo;
    // console.log(zone + " " + seatNo);
    // const zone = 'A';
    // const seatNo = 1;
    const navigate = useNavigate();

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    // const data = useState([])
    // console.log(inpval);

    const getdata = e => {
        const { value, name } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value,
            };
        });
    };

    const addData = e => {
        e.preventDefault();

        function login() {
            axios(`https://i7a102.p.ssafy.io/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email: email,
                    password: password,
                },
            })
                .then(res => {
                    const { ticket, jwt, userId } = res.data;
                    if (ticket === null) {
                        toast.error("이메일 혹은 비밀번호를 잘못 입력했습니다.", {
                            position: "top-center",
                        });
                    } else {
                        allocate(jwt, userId);
                        navigate("../success", {
                            state: {
                                zone: `${zone}`,
                                seatNo: `${seatNo}`,
                                ticket: `${ticket}`,
                            },
                        });
                    }
                })
                .catch(error => {
                    toast.error("이메일 혹은 비밀번호를 잘못 입력했습니다.", {
                        position: "top-center",
                    });
                });
        }

        const allocate = (jwt, userId) => {
            axios(
                `https://i7a102.p.ssafy.io/api/users/${userId}/alloc/${zone}/${seatNo}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: jwt,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then(res => {
                    // console.log("자리 할당 성공");
                })
                .catch(error => {
                    console.error("실패:", error);
                });
        };

        const { email, password } = inpval;
        if (email === "") {
            toast.error("email field is requred", {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error("이메일 형식을 확인하세요", {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error("비밀번호를 입력해주세요", {
                position: "top-center",
            });
        } else {
            login();
        }
    };

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <div>
                    <h1>로그인</h1>
                    <div>
                        <img
                            src={loginEmail}
                            alt="loginEmail"
                            className="loginInputEmailImg"
                        />
                        <input
                            type="text"
                            placeholder="이메일"
                            className="name"
                            onChange={getdata}
                            name="email"
                        />
                    </div>
                    <div className="loginInputPassword">
                        <img
                            src={loginPassword}
                            alt="loginPassword"
                            className="loginInputPwdImg"
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className="name"
                            onChange={getdata}
                            name="password"
                        />
                    </div>  
                    <div className="loginButtonPlace">
                        <button
                            className="loginButton"
                            onClick={addData}
                            type="submit"
                        >
                            로그인
                        </button>
                    </div>
                    <div className="loginToSignupBtnPlace">
                        <Link
                            to={`../signup`}
                            state={{ zone: `${zone}`, seatNo: `${seatNo}` }}
                        >
                            <button className="loginToSignupBtn">
                                회원가입
                            </button>
                        </Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
