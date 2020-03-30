const { remote } = require("electron");
const fs = require("fs");

window.addEntry = function(text) {
	fs.appendFileSync(
		__dirname + "/Hello.txt",
		"\n[" + new Date() + "] " + text,
		"utf-8"
	);
	remote.getCurrentWindow().hide();
};
