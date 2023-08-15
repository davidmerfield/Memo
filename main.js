const { app, globalShortcut, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
let mainWindow = null;

app.dock.hide();

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    frame: false,
    show: false,
    center: true,
    width: 600,
    height: 100,
    minHeight: 100,
    minWidth: 100,
    type: "panel",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });

  mainWindow.loadURL("file://" + path.join(app.getAppPath(), "index.html"));

  ipcMain.handle("ping", () => mainWindow.hide());

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.on("ready-to-show", function () {
    mainWindow.webContents.openDevTools();

    let hidden = true;

    // const events = [
    //   "blur",
    //   "focus",
    //   "hide",
    //   "maximize",
    //   "minimize",
    //   "restore",
    //   "show"
    // ];

    mainWindow.on("hide", () => (hidden = true));
    mainWindow.on("show", () => (hidden = false));

    // events.forEach(_event => {
    //   mainWindow.on(_event, () => console.log(_event, mainWindow.isVisible()));
    // });

    globalShortcut.register("CommandOrControl+/", () => {
      if (hidden) mainWindow.show();
      else mainWindow.hide();
    });
  });
});
