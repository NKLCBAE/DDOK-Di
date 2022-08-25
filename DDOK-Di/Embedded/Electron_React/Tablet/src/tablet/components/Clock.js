import { useState, useEffect, useRef} from "react";
import styles from "./Clock.module.css";
import {format }from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Clock(props) {
  let jwt = localStorage.getItem("jwt");
  const [time, setTime] = useState(new Date())
  const [todos, setTodos] = useState([]);
  const [counter, setCoutner] = useState(0);
  let today;
  let userId = localStorage.getItem("userId");
  let year;
  let month;
  let day;
  let hour;
  let minute;
  var AudioContext;
var audioContext;

window.onload = function() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
  }).catch(e => {
      console.error(`Audio permissions denied: ${e}`);
  });
}


  
  const getTodos = () => {
    if(jwt!==""){
      today = new Date();
      year = format(today, "yyyy");
      month = format(today, "MM");
      day = format(today,"dd");
      hour = format(today,"HH");
      minute =format(today,"mm");
      axios(
        `https://i7a102.p.ssafy.io/api/todos/${userId}/${year}/${month}`,
        {
          method: "GET",
          headers: {
            authorization: jwt,
            "Content-Type": "application/json",
          },
  
        }
      )
        .then(res => {
          let temps = res.data;
          temps = temps.filter(temp=>
          temp.datetimeStart.substr(8,2)===day &&
          temp.datetimeStart.substr(11,2)=== hour &&
          temp.datetimeStart.substr(14,2)===minute
          )
          if(temps.length!==0){
            console.log(temps);
            setTodos(temps);
            setCoutner(current=> current+1);
          }
        })
        .catch(error => {
          console.error("GETtodos실패:", error);
        });
    }

  }

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
      getTodos();
    }, 1000);
    return () => clearInterval(id);
  }, []); 


  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

useInterval(() => {
  if(counter==1){
    toast.info(`${todos[0].title} 할 시간입니다!`, {
      position: "top-center",
  });
  }
  console.log(counter);
  if(counter==60){
    setCoutner(0);
  }
}, 1000);



  return (
    <div>
      <span className={styles.clock} >{time.toLocaleTimeString()}</span>
      <ToastContainer/>
    </div>
  );
}

export default Clock;
