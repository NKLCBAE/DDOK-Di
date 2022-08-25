const myRFID = require("../wrappedMFRC522.js");

console.log("Check values");

(async() => {
    console.log("start read data");
    let data = await myRFID.RFIDReadSector(3);
    console.log(data);
})();
