const fs = require("fs");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("memo", {
  addEntry: function (text) {
    fs.appendFileSync(
      __dirname + "/Hello.txt",
      "\n[" + new Date() + "] " + text,
      "utf-8"
    );
    ipcRenderer.invoke('ping');
  },
});
