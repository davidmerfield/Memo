var app = require("electron").app;
const globalShortcut = require("electron").globalShortcut;
var { PanelWindow } = require("electron-panel-window");
var mainWindow = null;
const path = require("path");

app.dock.hide();

app.on("ready", function() {
  mainWindow = new PanelWindow({
    center: true,
    width: 600,
    height: 100,
    minHeight: 100,
    minWidth: 100,
    show: false,
    webPreferences: {
      preload: path.join(app.getAppPath(), "preload.js")
    }
  });

  mainWindow.loadURL("file://" + __dirname + "/index.html");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  mainWindow.on("ready-to-show", function() {
    // mainWindow.webContents.openDevTools();

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
