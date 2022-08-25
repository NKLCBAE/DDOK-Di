const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { UP, DOWN, STOP, ONUP, ONDOWN, DS, MD, MU } = require("./constants");
const { SerialPort } = require("serialport");

//const myRFID = require("../wrappedMFRC522.js");
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
}

//parser.on('data', console.log);

// SimpleSerialPublisher
function AttachSimpleSerialPublisher(CMD, msg, log){
	ipcMain.on(CMD, (event, arg) => {
		port.write(msg + "\n");
		console.log(log);
	})	
}

// SerialPublisher
function AttachSerialPublisher(CMD, msg, log, argcontrol) {
	ipcMain.on(CMD, (event, arg) => {
		arg = argcontrol(arg);
		port.write(msg + arg + "\n");
		console.log(log + arg);
	})	
}

function argcontrolDS(arg) {
	return Number(arg) * 10 ;
}

// SerialListener
function AttachSerialListener(CMD, breakcondfunc) {
	ipcMain.on(CMD, (event, arg) => {
		const temp = port.read();
		if (temp !== null) {
			//console.log(temp);
			const len = temp.length;
			let num = 0;
			for (let i=0; i<len; i++) {
				if((temp[i] === 10) && (i < 2)) break;

				if ((temp[i] === 13)) {
					if (i < 3) break;
					num /= 10;
					if (breakcondfunc(before, num) === true) break;

					before = num;
					event.sender.send("reply", String(num));
					break;
				}
				num = num*10+(temp[i]-48);
			}
		}
	})
}

function breakONUP(a, b) {
	if (a > b) return true;
	else return false;
}

function breakONDOWN(a, b) {
	return breakONUP(b, a);
}

AttachSimpleSerialPublisher(UP, "U", "up");
AttachSimpleSerialPublisher(DOWN, "D", "down");
AttachSimpleSerialPublisher(STOP, "S", "stop");
AttachSerialPublisher(DS, "DS", "ds", argcontrolDS);
AttachSerialListener(ONUP, breakONUP);
AttachSerialListener(ONDOWN, breakONDOWN);

//ipcMain.on('readRFID', (event, arg) => {
//	myRFID.RFIDUIDString(5000)
//		.then (
//			result => {
//				console.log(`Read RFID Successufl!: ${result}`);
//				event.sender.send('reply', result);
//			},
//			error => {
//				console.log(error.message);
//				event.sender.send('reply', 'ERR');
//			},
//		)
//});

ipcMain.on(MD, ()=>{
  port.write("MD" + "\n");
  console.log("MD");
});

ipcMain.on(MU, ()=>{
  port.write("MU" + "\n");
  console.log("MU");
});

app.whenReady().then(() => {
    createWindow();
});
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
