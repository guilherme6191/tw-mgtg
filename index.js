var fs = require('fs');
var readLine = require('readline');
var Main = require('./src/main.js');

var Reader = readLine.createInterface({
	input : fs.createReadStream('./input.txt'),
	terminal : false
});

Reader.on('line', function(line) {
	var result = Main.processLine(line.trim());
  if (result) console.log(result);
});

process.on('uncaughtException', function(err) {
	console.log(err);
});
