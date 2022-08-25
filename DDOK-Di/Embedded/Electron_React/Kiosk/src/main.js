const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const myRFID = require("../wrappedMFRC522.js");

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

ipcMain.on('readRFID', (event, arg) => {
	myRFID.RFIDMemoryString(5000, 3)
		.then (
			result => {
				console.log(`Read RFID Successufl!: ${result}`);
				event.sender.send('reply', result);
			},
			error => {
				console.log(error.message);
				event.sender.send('reply', 'ERR');
			},
		)
});


app.whenReady().then(() => {
    createWindow();
});
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
