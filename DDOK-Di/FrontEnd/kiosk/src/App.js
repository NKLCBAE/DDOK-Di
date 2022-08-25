import "./App.css";
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./kiosk/routes/Home";
import Reading from "./kiosk/routes/Reading";
import Login from "./kiosk/routes/Login";
import SignUp from "./kiosk/routes/SignUp";
import Success from "./kiosk/routes/Success";
import Clock from "./kiosk/components/Clock";
import Admin from "./kiosk/routes/Admin";
import SeatSet from "./kiosk/routes/SeatSet";
import UserSet from "./kiosk/routes/UserSet";
import LogoToHome from "./kiosk/components/LogoToHome/LogoToHome";
import Zone from "./kiosk/components/Admin/SeatSet/Zone";
import ZoneDelete from "./kiosk/routes/ZoneDelete";
import AdminLogin from "./kiosk/routes/AdminLogin"
import ViewStatus from "./kiosk/routes/ViewStatus"

function App() {
    const [adminLogin, setAdminLogin] = useState(false);
    return (
        <BrowserRouter>
            <Clock adminLogin={adminLogin}  setAdminLogin={setAdminLogin} />
            <LogoToHome />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reading" element={<Reading />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminlogin" element={<AdminLogin setAdminLogin={setAdminLogin}/>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/success" element={<Success />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/seatset" element={<SeatSet />} />
                <Route path="/userset" element={<UserSet />} />
                <Route path="/viewstatus" element={<ViewStatus />} />
                <Route path="/seatset/:zone" element={<Zone />} />
                <Route path="/seatset/delete/" element={<ZoneDelete />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
