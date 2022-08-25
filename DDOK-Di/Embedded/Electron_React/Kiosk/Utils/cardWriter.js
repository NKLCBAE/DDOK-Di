const readline = require("readline");

const myRFID = require("../wrappedMFRC522.js");
const myGenerator = require("../randomGenerator.js")

console.log("Application for Writing Cards");

// 난수 생성
console.log("Generate values");
(async() => {
    let data = await myGenerator.generateSectors(16, 3, 1, [0, 256]);
    // console.log(data);
    
    // 난수 입력
    initKey = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
    // let i = 0;
    setTimeout(function write() {
        console.log("Touch Tag");
        myRFID.RFIDRBKeySet(3, initKey);
        // console.log(data[0]);
        myRFID.RFIDWriteSector(3, data[0]);
    }, 3000);
})();