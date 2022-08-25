const SHA256 = require('js-sha256');
const fs = require('fs');
const readline = require("readline");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

function genRand1DArr(length, range) {
    randArr = [];
    for (let len = 0; len < length; len ++) {
        randArr.push(getRandomInt(range[0], range[1]));
    }
    return randArr;
}

function genRand2DArr(length, height, range) {
    randArr = [];
    for (hei = 0; hei < height; hei ++) {
        randArr.push(genRand1DArr(length, range));
    }

    return randArr;
}

function ArrayTo2DArray(arr, length, height) {
    randArr = [];
    for (hei = 0; hei < height; hei ++) {
        let startidx = hei * length;
        let endidx = (hei + 1) * length;
        randArr.push(arr.slice(startidx, endidx));
    }
    
    return randArr;
}

function checkDuple(hashArr, hash) {
    for(const h of hashArr) {
        if (hash === h) {
            return true;
        }
    }

    return false;
}

// txt 파일에서 읽기/쓰기 함수
function loadFilePromise(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

function writeFilePromise(filepath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data), 'utf-8', err => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Write used hase complete.");
            }
        }
    })
}

async function loadUsedHashes(filepath) {
    data = await loadFilePromise(filepath);

    return data.split('\n');
}

async function saveUsedHashes(filepath, hashArr) {
    data = "";
    for (let line of hashArr) {
        data = data + line + "\n";
    }

    writeFilePromise(filepath)
    .then(
        result => {
            console.log(result);
        },
        error => {
            console.log(error.message);
        },
    )
}

async function randomGen(length, height, set, range) {
    let randArr = [];
    let hashes = await loadUsedHashes('hashes.txt');

    let flagDuple = true;

    for (se = 0; se < set; se ++) {
        flagDuple = true;

        while(flagDuple) {
            let arr = genRand1DArr(length * height, range);
            let hash = SHA256.sha256(arr);

            flagDuple = checkDuple(hashes, hash);

            if (flagDuple === false) {
                randArr.push(ArrayTo2DArray(arr, 16, 3));
                hashes.push(hash);
            }
        }
    }

    saveUsedHashes('hashes.txt', hashes);

    return randArr;
}

module.exports = {
    generateSectors: randomGen,
}