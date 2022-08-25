import "./App.css";
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import THome from "./tablet/routes/THome";
import Clock from "./tablet/components/Clock";
import Settings from "./tablet/routes/Settings";
import EditInfo from "./tablet/routes/EditInfo";
import Calendar from "./tablet/routes/Calendar";
import ViewStatus from "./tablet/routes/ViewStatus";
// import Test from "./tablet/routes/Test"
import Check from "./tablet/routes/Check"
function App() {
  const [userId, setUserId] = useState();
  const [check, setCheck] = useState(false);
  const [user, setUser] = useState();
  const [currentMonitorH, setCurrentMonitorH] = useState();
  const [currentDeskH, setCurrentDeskH] = useState();
  const [visitSetting, setVisitSetting] = useState(false);

  const userStates = {
    userId,
    setUserId,
    check,
    setCheck,
    user,
    setUser,
    currentMonitorH,
    setCurrentMonitorH,
    currentDeskH,
    setCurrentDeskH,
    visitSetting,
    setVisitSetting,
  }

  return (  <BrowserRouter>
    <Clock userId={userId} />
    <Routes>
      <Route path="/" element={<Check userStates={userStates}/>} />
      <Route path="/thome" element={<THome userStates={userStates}/>} />
      <Route path="/thome/settings" element={<Settings userStates={userStates}/>} />
      <Route path="/thome/editinfo" element={<EditInfo />} />
      <Route path="/thome/calendar" element={<Calendar />} />
      <Route path="/thome/viewstatus" element={<ViewStatus userStates={userStates}/>} />
      {/* <Route path="/thome/test" element={<Test/>} /> */}
    </Routes>
  </BrowserRouter>);
}

export default App;
