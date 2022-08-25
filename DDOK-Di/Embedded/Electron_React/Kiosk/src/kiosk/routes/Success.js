import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import successCloseBtnImg from "../assets/cancel.png";

import "./Success.css";

function Success() {
    const navigate = useNavigate();
    const zone = useLocation().state.zone;
    const seatNo = useLocation().state.seatNo;
    const ticket = useLocation().state.ticket;

    const goHome = () => {
        navigate("/");
    };
    // const userPhone = "010-8011-8814"

    // function send_message(phone) {
    //     var user_phone_number = phone;//수신 전화번호 기입
    //     var resultCode = 404;
    //     const date = Date.now().toString();
    //     const uri = process.env.SERVICE_ID; //서비스 ID
    //     const secretKey = process.env.NCP_SECRET_KEY;// Secret Key
    //     const accessKey = process.env.NCP_KEY;//Access Key
    //     const method = "POST";
    //     const space = " ";
    //     const newLine = "\n";
    //     const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    //     const url2 = `/sms/v2/services/${uri}/messages`;
    //     const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    //     hmac.update(method);
    //     hmac.update(space);
    //     hmac.update(url2);
    //     hmac.update(newLine);
    //     hmac.update(date);
    //     hmac.update(newLine);
    //     hmac.update(accessKey);
    //     const hash = hmac.finalize();
    //     const signature = hash.toString(CryptoJS.enc.Base64);
    //     request({
    //       method: method,
    //       json: true,
    //       uri: url,
    //       headers: {
    //         "Contenc-type": "application/json; charset=utf-8",
    //         "x-ncp-iam-access-key": accessKey,
    //         "x-ncp-apigw-timestamp": date,
    //         "x-ncp-apigw-signature-v2": signature,
    //       },
    //       body: {
    //         type: "SMS",
    //         countryCode: "82",
    //         from: "발신번호기입",
    //         content: "문자내용 기입",
    //         messages: [
    //           { to: `${user_phone_number}`, },],
    //       },
    //     },
    //       function (err, res, html) {
    //         if (err) console.log(err);
    //         else { resultCode = 200; console.log(html); }
    //       }
    //     );
    //     return resultCode;
    //   }
    

    return (
        <div className="successPage">
            <div className="successContainer">
                <div className="successBackBtnArea">
                    <button className="successBackButton" onClick={goHome}>
                        <img
                            src={successCloseBtnImg}
                            alt="successCloseBtnImg"
                            className="successCloseBtnImg"
                        />
                    </button>
                </div>
                <div className="successLineArea">
                    <div className="firstLine">
                        {zone}구역 {seatNo}번 좌석
                    </div>
                    <div className="secondLine">티켓: {ticket}</div>
                </div>
            </div>
        </div>
    );
}

export default Success;

// 좌석DB에서 해당 좌석의 name 값을 회원 이름으로 설정하기
