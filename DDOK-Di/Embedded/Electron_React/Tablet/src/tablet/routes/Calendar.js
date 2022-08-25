import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ToastContainer, toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfMonth,
  startOfToday,
} from "date-fns";
import "./Calendar.css";
import { endOfWeek } from "date-fns/esm";
import myCalendarToTHomeIcon from "../assets/backArrow.png";
import todoPlusIcon from "../assets/plus.png";
import todoDeleteBtnIcon from "../assets/deleteBtn.png";
import todoEditBtnIcon from "../assets/editBtn.png";
import pencilIcon from "../assets/pencil.png";
import cancelIcon from "../assets/cancel.png";
import downloadIcon from "../assets/downloadIcon.png";
import todoSpanCloseIcon from "../assets/arrowUp.png";
import todoSpanOpenIcon from "../assets/arrowDown.png";
import EditModal from "./ToDoEditModal";
import CreateModal from "./ToDoCreateModal";

const jwt = localStorage.getItem("jwt");



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Example() {
  console.log('시작!!!!!!!!!')
  const [check, setCheck] = useState(false);
  const [userToDos, setUserToDos] = useState([]);
  console.log("1 check: ", check);
  // function useGetTodo(month, year) {
  const userId = useLocation().state.userId;

  const getToDos = e => {
    axios(
      `https://i7a102.p.ssafy.io/api/todos/${userId}/${currentYearNum}/${selectedMonth}`,
      {
        method: "GET",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },

      }
    )
      .then(res => {
        setUserToDos(res.data);
        console.log(userId);
        console.log("GET유저정보setUserToDos:", userToDos);
        if (check === false) {
          setCheck(true);
        }
      })
      .catch(error => {
        console.error("GETtodos실패:", error);
      });
  };

  // return userToDos
  // }


  let today = startOfToday();
  // let newDays = eachDayOfInterval({
  //   start: startOfMonth(today),
  //   end: endOfWeek(endOfMonth(today)),
  // });
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let [selectedMonth, setSelectedMonth] = useState(format(today, "MM"));
  console.log("selectedMonth숫자:", selectedMonth);
  console.log("currentmonth", currentMonth);
  let [currentMonthNum, setCurrentMonthNum] = useState(format(today, "MM"));
  console.log("currentmonth숫자", currentMonthNum);
  let [currentYearNum, setCurrentYearhNum] = useState(format(today, "yyyy"));
  console.log("currentyear숫자", currentYearNum);
  // console.log('userToDos Function',useGetTodo(currentMonthNum, currentYearNum))
  // let [meetings, setMeetings] = useState(useGetTodo(currentMonthNum, currentYearNum))
  // console.log('meetings Function',meetings)

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setSelectedMonth(format(firstDayNextMonth, "MM"));
  }
  
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setSelectedMonth(format(firstDayNextMonth, "MM"));
  }
  // useGetTodo(currentMonthNum, currentYearNum)
  //useEffect(() => {
  //  getToDos();
  //}, [selectedMonth]);
   getToDos();
  console.log("userToDos: ", userToDos);

  let selectedDayMeetings = userToDos.filter(meeting =>
    isSameDay(parseISO(meeting.datetimeStart), selectedDay)
  );
  console.log('오늘의미팅들다', selectedDayMeetings.length)

  // const [color, setColor] = useState('C')
  // for (var i = 0; i < selectedDayMeetings.length; i++){
  //   console.log('오늘의미팅들 for', selectedDayMeetings[i].priority)
  //   if (selectedDayMeetings[i].priority === 'VERYIMPORTANT') {
  //     setColor('A')

  //     console.log(color)}
  //    else if (selectedDayMeetings[i].priority === 'IMPORTANT') {
  //     setColor('B')
  //     console.log('IMPORTANT:',color)}
  //   }


  const [spanCreate, setSpanCreate] = useState(false)

  function openCreate() {
    if (spanCreate) {
      setSpanCreate(false)
    } else {setSpanCreate(true)}
    console.log('openCreate!!!')
  }


  const [newData, setNewData] = useState({
    content: '',
    dateEnd: '',
    timeEnd: '',
    dateStart: '',
    timeStart: '',
    noticeTime: '',
    priority: '',
    title: '',
  })

  // toastify
  const checkTitle  = newData.title
  const titleCheck = () => {
    if(checkTitle === '') {
      toast.error('제목을 입력해주세요', {
        position: "top-center",
        className: 'claendarToastMessage'
      });
      console.log('토스트나와라')
    }
    console.log('타이틀',checkTitle)
  }
  const checkContent  = newData.content
  const contentCheck = () => {
    if(checkContent === '') {
      toast.error('내용을 입력해주세요', {
        position: "top-center",
        className: 'claendarToastMessage'
      });
    }
  }

  const goData = async e => {
    e.preventDefault();

    const {
      content,
      dateEnd,
      timeEnd,
      dateStart,
      timeStart,
      noticeTime,
      priority,
      title,
    } = newData;

    if (title === "") {
      toast.error("제목을 입력하세요", {
        position: "top-center",
      });
    } else if (content === "") {
      toast.error("내용을 입력하세요", {
        position: "top-center",
      });
    } else if (priority === "") {
      toast.error("중요도를 입력하세요", {
        position: "top-center",
      });
    } else if (dateStart === "") {
      toast.error("시작일을 입력하세요", {
        position: "top-center",
      });
    } else if (timeStart === "") {
      toast.error("시작시간을 입력하세요", {
        position: "top-center",
      });
    } else if (dateEnd === "") {
      toast.error("종료일을 입력하세요", {
        position: "top-center",
      });
    } else if (timeEnd === "") {
      toast.error("종료시간을 입력하세요", {
        position: "top-center",
      });
    } else {
      // e.target.disabled = 'disabled'
      postTodo();
    }
  };

  const getData = (e) => {

    const { value, name } = e.target;
    setNewData(() => {
      return {
        ...newData,
        [name]: value
      }
    })
  }

  const priorityOpt = [
    {value: "NORMAL", label: "보통"},
    {value: "IMPORTANT", label: "중요"},
    {value: "VERYIMPORTANT", label: "매우중요"}
  ]

  const alertTimeOpt = [
    {value: 5, label: "5분 전"},
    {value: 10, label: "10분 전"},
    {value: 15, label: "15분 전"},
    {value: 30, label: "30분 전"},
    {value: 60, label: "60분 전"},
    {value: 1440, label: "1일 전"}
  ]

  console.log('뉴데이터 시간', newData.dateEnd + ' ' + newData.timeEnd + ':00')
  console.log('뉴데이터',newData)

  const postTodo = e => {
    // console.log('뉴데이터전', newData.dateEnd + ' ' + newData.timeEnd + ':00')

    axios(
      `https://i7a102.p.ssafy.io/api/todo/${userId}`,
      {
        method: "POST",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },
        data: {
          content: newData.content,
          datetimeEnd: newData.dateEnd + ' ' + newData.timeEnd + ':00',
          datetimeStart: newData.dateStart + ' ' + newData.timeStart + ':00',
          noticeTime: 5,
          priority: newData.priority,
          title: newData.title,
        }
      }
    )
      .then(res => {
        setNewData(res.data);
        console.log(userId);
        console.log("POST유저정보setUserToDos:", userToDos);
        // if (check === false) {
        //   setCheck(true);
        // }
        getToDos()
        closeModal()
      })
      .catch(error => {
        console.error("POSTtodos실패:", error);
      });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault()
    const points = document.getElementsByClassName("point");
    setModalOpen(true);
    for(let i in points){
      points[i].style.display="none";
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    const points = document.getElementsByClassName("point");
    for(let i in points){
      points[i].style.display="";
    }
  };


  const ImportanceWrap = (e) => {
    getData(e);
    let selectBox = document.getElementById('newselbox')
    if (selectBox.value === '') {
      selectBox.style.color = "gray"
    } else {
      selectBox.style.color = "black"
    }
  }
  function countToDo(d) {
    let selectedDayMeetingCount = userToDos.filter(meeting =>
      isSameDay(parseISO(meeting.datetimeStart), d)
    );
    console.log('오늘의미팅들다!!!!!!!!!!!', selectedDayMeetingCount.length)
    if (selectedDayMeetingCount.length > 1) {
      const forReturn = '+'+ (selectedDayMeetingCount.length-1)
      return forReturn
    }

  }

  return (
    <div>
      {check ? (
        <div className="myCalendarPage">
          <div className="myCalendarSmallPage">
            <Link to={`/thome`}>
              <button className="myCalendarToTHomeBtn">
                <img
                  src={myCalendarToTHomeIcon}
                  alt="myCalendarToTHomeIcon"
                  className="myCalendarToTHomeIcon"
                />
              </button>
            </Link>
            <div className="myCalendarContainerL">
              <div className="myCalendarContainerM">
                <div className="myCalendarContainerTop">
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="myCalendarPrevMBtn"
                  >
                    <span className="myCalendarSrOnly">
                      Previous month
                    </span>
                    <ChevronLeftIcon
                      className="myCalendarNextMBtnIcon"
                      aria-hidden="true"
                    />
                  </button>
                  <h2 className="myCalendarTitle">
                    {/* {userToDos} */}
                    {format(
                      firstDayCurrentMonth,
                      "MMMM yyyy"
                    )}
                  </h2>
                  <button
                    onClick={nextMonth}
                    type="button"
                    className="myCalendarNextMBtn"
                  >
                    <span className="myCalendarSrOnly">
                      Next month
                    </span>
                    <ChevronRightIcon
                      className="myCalendarNextMBtnIcon"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="myCalendarWeekBar">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
                <div className="myCalendarDaysArea">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 &&
                        colStartClasses[
                        getDay(day)
                        ],
                        "myCalendarDaysDay"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDay(day)
                        }
                        className={classNames(
                          isEqual(day, selectedDay) &&
                          "myCalendarDaysDayBtnSelected",
                          !isEqual(
                            day,
                            selectedDay
                          ) &&
                          isToday(day) &&
                          "myCalendarDaysDayBtnToday",
                          !isEqual(
                            day,
                            selectedDay
                          ) &&
                          !isToday(day) &&
                          isSameMonth(
                            day,
                            firstDayCurrentMonth
                          ) &&
                          "myCalendarDaysDayBtnCurrentWeekDays",
                          !isEqual(
                            day,
                            selectedDay
                          ) &&
                          !isToday(day) &&
                          !isSameMonth(
                            day,
                            firstDayCurrentMonth
                          ) &&
                          "myCalendarDaysDayBtnGrayFour",
                          isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "myCalendarDaysDayBtnBgRed",
                          isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "myCalendarDaysDayBtnSelectedBg",
                          !isEqual(
                            day,
                            selectedDay
                          ) &&
                          "myCalendarDaysDayHover",
                          (isEqual(
                            day,
                            selectedDay
                          ) ||
                            isToday(day)) &&
                          "myCalendarDaysDayBtnFwSemiB",
                          "myCalendarDaysDayBtnEtc"
                        )}
                      >
                        <time
                          dateTime={format(
                            day,
                            "yyyy-MM-dd"
                          )}
                        >
                          {format(day, "d")}
                        </time>
                      </button>
                      
                      <div className="myCalendarDaysToDoArea">
                        <div className="myCalendarHide">h</div>
                        <div className="center">
                          {userToDos.map(meeting => (
                            isSameDay(parseISO(
                              meeting.datetimeStart), day)?
                              <div className={"myCalendarDaysToDoCircle"+meeting.priority+" point"}></div>
                              :null
                          ))}                          
                        </div>
                        <div className="calendarViewCountMeeting">
                          {/* {userToDos.map(meeting => (
                            isSameDay(parseISO(
                              meeting.datetimeStart), day)?<p>{meeting.id}</p>:null))} */}
                          {countToDo(day)}
                        </div>

                      </div>

                    </div>
                  ))}
                </div>
              </div>
              <section className="myCalendarSelectedDateContainer">
                <h2 className="myCalendarSelectedDateContainerText">
                  {/* <time
                    dateTime={format(
                      selectedDay,
                      "yyyy-MM-dd"
                    )}
                  >
                    {format(selectedDay, "MMM dd, yyy")}
                  </time>{" "}
                  스케줄 */}
                  오늘의 스케줄
                </h2>
                <ol className="myCalendarToDoListArea">
                    {selectedDayMeetings.length > 0 ? (
                      selectedDayMeetings.map(meeting => (
                        <Meeting
                          meeting={meeting}
                          key={meeting.id}
                          onClick={openCreate}
                        />))
                    ) : (
                      <div className="myCalendarToDoListNoMeeting">
                        No meetings for today.
                      </div>
                    )}   
              </ol>
                <button onClick={openModal} className='myCalendarToDoPlusBtn'>
                  <img
                    src={todoPlusIcon}
                    alt="todoPlusIcon"
                    className="todoPlusIcon"
                  />
                </button>
                <CreateModal
                  open={modalOpen}
                  close={closeModal}
                  header="일정 추가"
                  onClose={closeModal}>
                  <div>
                    <p className="myTodoInModalFont">
                      <p>제목{'  '}</p>
                      <input onChange={getData} name='title' type="text"/>
                    </p>
                    <p className="myTodoModalContentInput">
                      <p>내용{'  '}</p>
                      {'  '}<textarea onChange={getData} name='content' className='myTodoModalContentInput'/>
                    </p>
                    <p className="myTodoInModalFont">
                      <p>중요도 </p>
                      <select id="newselbox" onChange={ImportanceWrap} name='priority' defaultValue='' style={{color: "gray"}}>
                        {/* {priorityOpt.map(option => (
                          <option key={option.label} value={option.value} defaultValue={option.label}>{option.label}</option>))} */}
                          <option value='' disabled style={{color: "gray"}}>중요도를 설정해주세요</option>
                          <option value='NORMAL' style={{color: "black"}}>보통</option>
                          <option value="IMPORTANT" style={{color: "black"}}>중요</option>
                          <option value="VERYIMPORTANT" style={{color: "black"}}>매우 중요</option>
                      </select>
                    </p>
                    <p className="myTodoInModalFontDate">
                      <p>시작{'  '}</p>
                      <div>
                      <input type='date' onChange={getData} name='dateStart' /> <input type='time' onChange={getData} name='timeStart' />                        
                      </div>
                      </p>
                    <p className="myTodoInModalFont">
                      <p>종료{'  '}</p>
                      <div>
                        <input type='date' onChange={getData} name='dateEnd' /> <input type='time' onChange={getData} name='timeEnd' />
                      </div>
                      </p>
                    
                    <div className="myTodoInModalSaveBtnArea">                      
                      <button onClick={goData} className='myTodoInModalSaveBtn'>
                        <img src={downloadIcon} alt="downloadIcon" className="downloadIcon" /> 저장
                      </button>
                    </div>
                  </div>
                  <ToastContainer />
                </CreateModal>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
export default Example;

function Meeting({ meeting }) {
  let datetimeStart = parseISO(meeting.datetimeStart);
  let datetimeEnd = parseISO(meeting.datetimeEnd);
  console.log('Meeting에서Date:', datetimeEnd)
  const [check, setCheck] = useState(false);
  const [spanSchedule, setSpanSchedule] = useState(false)
  function openData() {
    if (spanSchedule) {
      setSpanSchedule(false)
    } else {setSpanSchedule(true)}
    console.log('openCreate!!!')
    getToDo()
  }

  // const [userToDo, setUserToDo] = useState([]);
  const userId = useLocation().state.userId;
  console.log('meetingid: ',meeting.id)


  function getToDo() {
    axios(
      `https://i7a102.p.ssafy.io/api/todo/${userId}/${meeting.id}`,
      {
        method: "GET",
        headers: {
          authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    )
      .then(res => {
        setUserToDo(res.data);
        setShowUserToDo(res.data)
        console.log('유저투두가져오기성공!');
        console.log("GETtodo정보setUserToDo:", userToDo);
        if (check === false) {
          setCheck(true);
        }
      })
      .catch(error => {
        console.error("GETtodo실패:", error);
      });
  };

  // const startDateFormat = userToDo.datetimeStart.substr(0,10)
  // const startTimeFormat = userToDo.datetimeStart.substr(11,5)
  // const endDateFormat = userToDo.datetimeStart.substr(0,10)
  // console.log('!!!!!!!!!!!!!!!!!!',startTimeFormat)


  const priorityOpt = [
    {value: "NORMAL", label: "보통"},
    {value: "IMPORTANT", label: "중요"},
    {value: "VERYIMPORTANT", label: "매우중요"}
  ]

  

  const alertTimeOpt = [
    {value: '', label: "ㄴㄴㄴㄴ"},
    {value: 5, label: "5분 전"},
    {value: 10, label: "10분 전"},
    {value: 15, label: "15분 전"},
    {value: 30, label: "30분 전"},
    {value: 60, label: "60분 전"},
    {value: 1440, label: "1일 전"}
  ]

  const [userToDo, setUserToDo] = useState({
    content: '',
    dateEnd: '',
    timeEnd: '',
    dateStart: '',
    timeStart: '',
    noticeTime: '',
    priority: '',
    title: '',
  })

  const [showUserToDo, setShowUserToDo] = useState({
    content: '',
    dateEnd: '',
    timeEnd: '',
    dateStart: '',
    timeStart: '',
    noticeTime: '',
    priority: '',
    title: '',
  })


  // const checkTitle  = showUserToDo.title
  // const titleCheck = () => {
  //   if(checkTitle === '') {
  //     toast.error('제목을 입력해주세요', {
  //       position: "top-center",
  //       className: 'claendarToastMessage'
  //     });
  //     console.log('토스트나와라')
  //   }
  //   console.log('타이틀',checkTitle)
  // }
  // const checkContent  = showUserToDo.content
  // const contentCheck = () => {
  //   if(checkContent === '') {
  //     toast.error('내용을 입력해주세요', {
  //       position: "top-center",
  //       className: 'claendarToastMessage'
  //     });
  //   }
  // }

  const goData = async e => {
    e.preventDefault();

    const {
      content,
      dateEnd,
      timeEnd,
      dateStart,
      timeStart,
      noticeTime,
      priority,
      title,
    } = showUserToDo;
    console.log('풋에쓴는값',showUserToDo)

    if (title === "") {
      toast.error("제목을 입력하세요", {
        position: "top-center",
      });
    } else if (content === "") {
      toast.error("내용을 입력하세요", {
        position: "top-center",
      });
    } else if (priority === "") {
      toast.error("중요도를 입력하세요", {
        position: "top-center",
      });
    } else if (dateStart === "") {
      toast.error("시작일을 입력하세요", {
        position: "top-center",
      });
    } else if (timeStart === "") {
      toast.error("시작시간을 입력하세요", {
        position: "top-center",
      });
    } else if (dateEnd === "") {
      toast.error("종료일을 입력하세요", {
        position: "top-center",
      });
    } else if (timeEnd === "") {
      toast.error("종료시간을 입력하세요", {
        position: "top-center",
      });
    } else {
      putToDo();
    }
  };



  // useEffect(() => {
  //   getToDo();
  // }, []);
  // console.log('!!!!!!!!!!!!!!!!!!',userToDo)

  const getData = (e) => {
    const { value, name } = e.target;
    console.log("getdata함수", name, value);

    setShowUserToDo(() => {
      return {
        ...showUserToDo,
        [name]: value,
      };
    });

    console.log('유저투두getData',userToDo);
    console.log('쇼유저투두getData',showUserToDo);

  };

  const putToDo = (e) => {
    axios(`https://i7a102.p.ssafy.io/api/todo/${userId}/${meeting.id}`, {
      method: "PUT",
      headers: {
        authorization: jwt,
        "Content-Type": "application/json",
      },
      data: {
        content: showUserToDo.content,
        datetimeEnd: showUserToDo.dateEnd + ' ' + showUserToDo.timeEnd + ':00',
        datetimeStart: showUserToDo.dateStart + ' ' + showUserToDo.timeStart + ':00',
        noticeTime: 5,
        priority: showUserToDo.priority,
        title: showUserToDo.title,
      },
    })
      .then((res) => {
        setUserToDo(res.data);
        console.log("PUT유저정보setAfterInfo 성공!!:", res.data);
        getToDo()
        closeModal()
      })
      .catch((error) => {
        console.error("PUTdata실패:", error);
      });
  };
  

  const deleteToDo = (e) => {
    axios(`https://i7a102.p.ssafy.io/api/todo/${userId}/${meeting.id}`, {
      method: "DELETE",
      headers: {
        authorization: jwt,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("DELETE TODO 성공", res);
      })
      .catch((error) => {
        console.error("DELETE TODO 실패:", error);
      });
  };

  // useEffect(() => {
  //   openData()
  // }, [])
  // console.log('!!!!!!!!!!!!!!!!!!',startTimeFormat)


  const [modalOpen, setModalOpen] = useState(false);

  // const [showUserToDo, setShowUserToDo] = useState()

  const openModal = (e) => {
    console.log('쇼유저투두', showUserToDo);
    e.preventDefault();
    const points = document.getElementsByClassName("point");
    setModalOpen(true);
    for(let i in points){
      points[i].style.display="none";
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    const points = document.getElementsByClassName("point");
    for(let i in points){
      points[i].style.display="";
    }
  };

  return (
    // <div>
    //   { check ?
    <li className="myTodoContainerL">
      {spanSchedule ? (
      <div>
        <div className="myTodoContainerS">
          <div className="myTodoTitleNBtnArea">
            <p className="myTodoSpanTitle">
              <div className={"myTodoToDoCircle"+userToDo.priority} />
              {userToDo.title}
            </p>
            <div className="myTodoEditDeleteBtnArea">
              <button onClick={openModal} className='myTodoEditBtn'>
                <img src={todoEditBtnIcon} alt="todoEditBtnIcon" className="todoEditBtnIcon" />
              </button>
              <div>

              { check ? (
                <EditModal
                  open={modalOpen}
                  close={closeModal}
                  header="일정 수정"
                  onClose={closeModal}>
                  <div className="myTodoInModalContainer">
                    <p className="myTodoInModalFont">
                      <p>제목 </p>
                      <input onChange={getData} name='title' defaultValue={userToDo.title}/>
                    </p>
                    <p className="myTodoModalContentInput">
                      <p>내용{'  '}</p>
                      {'  '}<textarea onChange={getData} name='content' defaultValue={userToDo.content} className='myTodoModalContentInput'/>
                    </p>
                    <p className="myTodoInModalFont">
                      <p>중요도 </p>
                      <select onChange={getData} name='priority' defaultValue={userToDo.priority}>
                        {priorityOpt.map(option => (<option key={option.label} value={option.value}>{option.label}</option>))}
                      </select>
                    </p>
                    <p className="myTodoInModalFontDate">
                      <p>시작{'  '}</p>
                      <div>
                        <input type='date' onChange={getData} name='dateStart' placeholder="시작일"/>
                        {' '}<input type='time' onChange={getData} name='timeStart' placeholder="시작시간" />
                      </div>
                    </p>
                    <p className="myTodoInModalFont">
                      <p>종료{'  '}</p>
                      <div>
                        <input type='date' onChange={getData} name='dateEnd' placeholder="종료일" />
                        {' '}<input type='time' onChange={getData} name='timeEnd' placeholder="종료시간" />                        
                      </div>
                    </p>
                    <div className="myTodoInModalEditBtnArea">
                      <button onClick={goData} className='myTodoInModalEditBtn'>
                        <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" /> 수정
                      </button>
                      <button onClick={closeModal} className='myTodoInModalCancelBtn'>
                        <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" /> 취소
                      </button>                      
                    </div>

                    
                  </div>
                </EditModal>
                ) : (
        <p>loading</p>
      )}
              </div>
                <button onClick={deleteToDo}  className='myTodoDeleteBtn'>
                    <img src={todoDeleteBtnIcon} alt="todoDeleteBtnIcon" className="todoDeleteBtnIcon" />
                </button>
                
            </div>
          </div>
          <p className="myTodoSpanContent">
            <p>내용{'  '}</p>
            {userToDo.content}
          </p>
          <p className="myTodoSpanContent">
            <p>중요도 </p>
            {userToDo.priority === "NORMAL" ? "보통" : null}
            {userToDo.priority === "IMPORTANT" ? "중요" : null}
            {userToDo.priority === "VERYIMPORTANT" ? "매우중요" : null}
          </p>
          <p className="myTodoSpanContent">
            <p>시작{'  '}</p>
            <time dateTime={userToDo.datetimeStart}>
              {format(datetimeStart, "yyyy년 M월 dd일 h:mm a")}
            </time>
          </p>
          <p className="myTodoSpanContent">
            <p>종료{'  '}</p>
            <time dateTime={userToDo.datetimeEnd}>
            {format(datetimeEnd, "yyyy년 M월 dd일 h:mm a")}
            </time>
          </p>

          <div className="todoSpanCloseBtnArea">
            <button onClick={openData}>
              <img src={todoSpanCloseIcon} alt="todoSpanCloseIcon" className="todoSpanCloseIcon" />
            </button>
          </div>
          {/* <div className="myTodoEditDeleteBtnArea">
            <button onClick={openModal} className='myTodoEditBtn'>
              <img src={todoEditBtnIcon} alt="todoEditBtnIcon" className="todoEditBtnIcon" />
            </button>
              <EditModal
                open={modalOpen}
                close={closeModal}
                header="일정 수정"
                onClose={closeModal}>
                <div>
                  <p className="myTodoInModalFont">제목: <input onChange={getData} name='title' defaultValue={showUserToDo.title}/></p>
                  <p className="myTodoInModalFont">내용: <input onChange={getData} name='content' defaultValue={showUserToDo.content} /></p>
                  <p className="myTodoInModalFont">중요도:{' '}
                    <select onChange={getData} name='priority' defaultValue={showUserToDo.priority}>
                      {priorityOpt.map(option => (<option key={option.label} value={option.value}>{option.label}</option>))}
                    </select>
                  </p>
                  <p className="myTodoInModalFont">시작일:{' '}
                    <input type='date' onChange={getData} name='dateStart' />
                    {' '}<input type='time' onChange={getData} name='timeStart' />
                  </p>
                  <p className="myTodoInModalFont">종료일:{' '}
                    <input type='date' onChange={getData} name='dateEnd' />
                    {' '}<input type='time' onChange={getData} name='timeEnd' />
                  </p>
                  <p className="myTodoInModalFont">알림시간:{' '}
                    <select onChange={getData} name='noticeTime'>
                      {alertTimeOpt.map(option => (<option key={option.label} value={option.value}>{option.label}</option>))}
                    </select>
                  </p>
                  <button onClick={putToDo} className='myTodoInModalEditBtn'>
                    <img src={pencilIcon} alt="pencilIcon" className="pencilIcon" /> 수정
                  </button>
                  <button onClick={closeModal} className='myTodoInModalCancelBtn'>
                    <img src={cancelIcon} alt="cancelIcon" className="cancelIcon" /> 취소
                  </button>
                  
                </div>
              </EditModal>
              <button onClick={deleteToDo}  className='myTodoDeleteBtn'>
                  <img src={todoDeleteBtnIcon} alt="todoDeleteBtnIcon" className="todoDeleteBtnIcon" />
              </button>
            </div> */}
        </div>
      </div>
      ) : (
      <div className="myTodoContainerM">
        <div className="myTodoContainerS">
          <p className="myTodoNonSpanTitle">
            <div className={"myTodoToDoCircle"+meeting.priority} />
            {meeting.title}
          </p>
          <p className="myTodoNonSpanContent">
            <p>시작{' '}</p>
            <time dateTime={meeting.datetimeStart}>
              <p></p>
              {format(datetimeStart, "yyyy년 M월 dd일  h:mm a")}
            </time>
          </p>
          <p className="myTodoNonSpanContent"><p>종료{" "}</p>
            <time dateTime={meeting.datetimeEnd}>
              {format(datetimeEnd, "yyyy년 M월 dd일  h:mm a")}
            </time>
          </p>
          <div className="todoSpanOpenBtnArea">
            <button onClick={openData}>
              <img src={todoSpanOpenIcon} alt="todoSpanOpenIcon" className="todoSpanOpenIcon" />
            </button>
          </div>
        </div>
        

        <Menu as="div" className="myToDoContainerMenu">
          {/* <div>
            <DotsVerticalIcon
                className="myToDoContainerMenuDots"
                onClick={openData}
                // aria-hidden="true"
              />

          </div> */}

          <Transition
            as={Fragment}
            enter="myToDoContainerTransitionEnter"
            enterFrom="myToDoContainerTransitionEnterForm"
            enterTo="myToDoContainerTransitionEnterTo"
            leave="myToDoContainerTransitionLeave"
            leaveFrom="myToDoContainerTransitionLeaveForm"
            leaveTo="myToDoContainerTransitionLeaveTo"
          >
            {/* <Menu.Items className="myToDoContainerTransitionMenu">
              <div className="myToDoContainerTransitionMenuDiv">
                <Menu.Item>
                    <React.Fragment>
                    <p
                      // href="#"
                      className=
                        "myToDoContainerTransitionMenuBox"
                    >
                      Edit
                    </p>
                    </React.Fragment>
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={deleteToDo}
                      className={classNames(
                        active
                          ? "myToDoContainerTransitionMenuIf"
                          : "myToDoContainerTransitionMenuElseOne",
                        "myToDoContainerTransitionMenuBox"
                      )}
                    >
                      Delete
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items> */}
          </Transition>
        </Menu>
      </div>)}
    </li>
    //    : <p>loading</p>}
    // </div>
  );
}

let colStartClasses = [
  "",
  "myCalendarDayStartMon",
  "myCalendarDayStartTue",
  "myCalendarDayStartWed",
  "myCalendarDayStartThu",
  "myCalendarDayStartFri",
  "myCalendarDayStartSat",
];

