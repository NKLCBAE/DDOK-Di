const Mfrc522 = require("rc522-rpi");
const SoftSPI = require("rpi-softspi");
const SHA256 = require('js-sha256');

const softSPI = new SoftSPI({
clock: 23, // pin number of SCLK
mosi: 19, // pin number of MOSI
miso: 21, // pin number of MISO
client: 24 // pin number of CS
});

const mfrc522 = new Mfrc522(softSPI).setResetPin(22)

function getStringfyuid() {
    let uidresponse = mfrc522.getUid();
    let uidString = stringifyUid(uidresponse.data);

    return uidString;
}

function stringifyUid(uidarr) {
    let uidString = uidarr[0].toString(16) + uidarr[1].toString(16) + uidarr[2].toString(16)+ uidarr[3].toString(16);
    return uidString;
}

async function getUIDPromise(timeoutmillis = 5000) {

    return new Promise((resolve, reject) => {
        let readTimer = setInterval(() => {
            mfrc522.reset();
            let readresponse = mfrc522.findCard();
            if (readresponse.status) {
                resolve(mfrc522.getUid().data)
                mfrc522.stopCrypto();
            }
        }, 500)

        setTimeout(() => reject(new Error ('get Uid Failed')), timeoutmillis);
        setTimeout(() => {clearInterval(readTimer)}, timeoutmillis);

    });
}


///////////////////////////////////////////////////////
// getUserMemory을 위한 함수
///////////////////////////////////////////////////////

// Auth Wrapper
function authWrap(block, key, uid) {
    if (!mfrc522.authenticate(block, key, uid)) {
        console.log("[Auth]Auth Error");
        // Thorw Error
        return new Error('Auth Failed');
    }
}

// rule based Key 얻기
function ruleBasedKey(uid) {
    let startidx = parseInt(stringifyUid(uid).substr(0,1),16);
    let keyStr = SHA256.sha256(uid).substr(startidx, 12);
    
    let key = [];
    
    for (let idx = 0; idx<12; idx = idx + 2) {
        key.push(parseInt(keyStr.substr(idx, 2), 16));
    }
    
    return key;
}


// Key A 변경
async function changeKeyARuleBased(sector, oldkey) {
    mfrc522.reset();
    
    let uid = await getUIDPromise();
    let startblock = 4 * sector;
    
    mfrc522.selectCard(uid);
    authWrap(startblock + 3, oldkey, uid);

    newkey = ruleBasedKey(uid);
    mfrc522.writeAuthenticationKey(startblock + 3, newkey);
    authWrap(startblock + 3, newkey, uid)

    mfrc522.stopCrypto();
}

// 섹터 값 직렬화
function serializeArray(blockreadArr) {
    let serialized = [];
    for(const block of blockreadArr) {
        serialized.push(...block);
    }

    return serialized;
}

// 타겟 섹터 읽기
async function readSector(sector) {
    let uid = await getUIDPromise();
    let startblock = 4 * sector;
    
    mfrc522.selectCard(uid);

    let key = ruleBasedKey(uid)

    let blockreadArr = [];
    for (let offset = 0; offset < 3; offset++) {
        authWrap(startblock + offset, key, uid)
        blockreadArr.push(mfrc522.getDataForBlock(startblock + offset));
    }

    mfrc522.stopCrypto();

    return blockreadArr;
}

// 타겟 섹터 쓰기
async function writeSector(sector, blockwriteArr) {
    let uid = await getUIDPromise();
    let startblock = 4 * sector;
    
    mfrc522.selectCard(uid);

    let key = ruleBasedKey(uid)

    for (let offset = 0; offset < 3; offset++) {
        authWrap(startblock + offset, key, uid)
        mfrc522.writeDataToBlock(startblock + offset, blockwriteArr[offset]);
    }

    mfrc522.stopCrypto();

    return 1;
}

// Wrapping Routine for Promise
async function getmem(sector) {
    let data = await readSector(sector)
    let userMemory = serializeArray(data);
    return SHA256.sha256(userMemory);
}

// Sector Read - Promise
async function getUserMemory(timeoutmillis = 5000, sector = 3) {

    return new Promise((resolve, reject) => {

        let readTimer = setInterval(async() => {
            mfrc522.reset();
            let readresponse = mfrc522.findCard();
            if (readresponse.status) {
                try {
                    resolve(await getmem(sector));
                } catch(error) {
                    reject(error);
                }
                
                mfrc522.stopCrypto();
            }
        }, 500)

        setTimeout(() => reject(new Error('Cannot read User Memory')), timeoutmillis);
        setTimeout(() => {clearInterval(readTimer)}, timeoutmillis);

    });
}



module.exports = {
    //RFIDUIDString: getUIDString,
    RFIDUIDPromise: getUIDPromise,
    RFIDMemoryString: getUserMemory,
    RFIDRBKeySet: changeKeyARuleBased,
    RFIDReadSector: readSector,
    RFIDWriteSector: writeSector,
}