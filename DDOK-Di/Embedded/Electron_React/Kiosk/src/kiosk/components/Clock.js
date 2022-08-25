import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Clock.module.css";

function Clock(props) {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate()
  const adminLogin = props.adminLogin;
  const setAdminLogin = props.setAdminLogin;
  const jwt = localStorage.getItem("jwt");
  let click = 0;
  const onClick = () => {
    click++;
    if(click===1){
        if(adminLogin){
            click = 0;
            navigate("../admin",{
                state:{
                    jwt: jwt
                }
            });
        }
        else{
            click = 0;
            navigate("../adminlogin", {
                state: {
                    zone: `A`,
                    seatNo: `1`,
                },
            });
        }
    }
  }

  const logout = () => {
    setAdminLogin(false)
    localStorage.setItem("jwt","");
    navigate("/");
  }

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
    <button className={adminLogin?styles.show:styles.hide} onClick={logout}>로그아웃</button>
      <span className={styles.clock} onClick={onClick}>{time.toLocaleTimeString()}</span>
    </div>
  );
}

export default Clock;
