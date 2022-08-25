# Electron에 React 올리기

## Tablet

### 1. Electron 및 의존성 패키지 추가
```bash
npm i electron concurrently wait-on serialport
```
-   패키지에 대한 설명
    -   concurrently
        > 일렉트론과 리액트 프로세스를 동시에 실행하기 위해 사용합니다.
    -   wait-on
        > 프로세스 동시 수행시 한개의 프로세스가 완료되기를 기다리다 완료된 후 다음 프로세스를 수행하게 만들어 줍니다.

### 2. React로 페이지를 만든 후 package.json 수정
```json
// package.json
{
  "name": "electron-app",
  "main": "src/main.js",
  "scripts": {
    ...
    "electron:start": "electron ."
  },
  ...
  "scripts": {
    "start": "concurrently \"npm run react:start\" \"npm run electron:start\"",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron:start": "wait-on http://localhost:3000 && electron .",
    "react:start": "react-scripts start"
  },
}
```

### 3. src폴더 내에 main.js 생성
```js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { UP, DOWN, STOP, ONUP, ONDOWN } = require("./constants");
const { SerialPort } = require("serialport");

const myRFID = require("../wrappedMFRC522.js");
//const {ReadlineParser}=require('@serialport/parser-readline');
const port = new SerialPort({
    path: "/dev/ttyACM0",
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: "none",
});
let before = 0;

//const parser = port.pipe(new ReadlineParser({delimiter:'\r\n'}));

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.loadURL("http://localhost:3000/");
    const win2 = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win2.loadURL("http://localhost:3000/thome/01");
}

//parser.on('data', console.log);

ipcMain.on(UP, (event, arg) => {
    port.write("U\n");
    console.log("up");
});
ipcMain.on(DOWN, (event, arg) => {
    port.write("D\n");
    console.log("down");
});
ipcMain.on(STOP, (event, arg) => {
    port.write("S\n");
    console.log("stop");
});
ipcMain.on(ONUP, (event, arg) => {
    //console.log(parser._writableState);
    const temp = port.read();
    if (temp !== null) {
        //console.log(temp);
        const len = temp.length;
        let num = 0;
        for (var i = 0; i < len; i++) {
            if (temp[i] === 13) {
                num /= 10;
                if (before > num) {
                    break;
                }
                before = num;
                event.sender.send("reply", String(num));
                break;
            }
            num = num * 10 + (temp[i] - 48);
        }
    }
});
ipcMain.on(ONDOWN, (event, arg) => {
    //console.log(parser._writableState);
    const temp = port.read();
    if (temp !== null) {
        //console.log(temp);
        const len = temp.length;
        let num = 0;
        for (var i = 0; i < len; i++) {
            if (temp[i] === 13) {
                num /= 10;
                //console.log("be : " + before);
                //console.log("num : " + num);
                if (before < num) {
                    break;
                }
                before = num;
                event.sender.send("reply", String(num));
                break;
            }
            num = num * 10 + (temp[i] - 48);
        }
    }
});

ipcMain.on("readRFID", (event, arg) => {
    myRFID.RFIDUIDString(5000).then(
        result => {
            console.log(`Read RFID Successufl!: ${result}`);
            event.sender.send("reply", result);
        },
        error => {
            console.log(error.message);
            event.sender.send("reply", "ERR");
        }
    );
});

app.whenReady().then(() => {
    createWindow();
});
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
```

### 4. npm을 통한 React Electron App 실행

```bash
npm start
```

### 5. (Optional) 브라우저 무시 후 Electron만 실행

루트 폴더에 .env 파일을 만들고, 다음 내용을 추가합니다.

```
BROWSER=none
```

---
---

## Kiosk

### 1. Electron 및 의존성 패키지 추가

```bash
npm i electron concurrently wait-on rc522-rpi
```
-   패키지에 대한 설명
    -   rc522-rpi
        > MFRC522 기반의 RFID 리더를 쉽게 사용할 수 있도록 해 줍니다.

### 2. React로 페이지를 만든 후 package.json 수정

```json
// package.json
{
  "name": "electron-app",
  "main": "src/main.js",
  ...
  "scripts": {
    "start": "concurrently \"npm run react:start\" \"npm run electron:start\"",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron:start": "wait-on http://localhost:3000 && electron .",
    "react:start": "react-scripts start"
  },
  ...
  "proxy": "https://i7a102.p.ssafy.io/"
}
```

### 3. src폴더 내에 main.js 생성

```js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

/// 생략

app.whenReady().then(() => {
    createWindow();
});
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
```

### 4. rebuild electron app

electron concurrently wait-on rc522-rpi에 대한 electron-rebuild를 먼저 수행하고 다른 패키지를 설치해야 리빌드 실패를 피할 수 있음.

rpio 모듈의 Nan.h가 가진 레거시 요소로 인한 것으로 추정됩니다.

```bash
npm i -D electron-rebuild
rm -r node_modules package-lock.json
npm i && ./node_modules/.bin/electron-rebuild
```

### 5. 의존성 패키지 추가 설치

```bash
npm i js-sha256
```
-   패키지에 대한 설명
    -   js-sha256
        > SHA2-256 해싱을 제공하는 JS 모듈입니다.

### 6. npm을 통한 React Electron App 실행

```bash
npm start
```

### Error Resolving
- electron-rebuild 과정 중 컴파일을 미래 시점까지 지속적으로 연기하는 문제가 발생하는 경우

    [현재 시간으로 시간 재설정](../Docs/raspi-setup.md)
    
