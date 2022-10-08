
var http = require("http");

var server = http.createServer((req, res) => {
    res.write("<h1> Hello world ! </h1>")
    res.end();
});

server.listen(5098, () => {
    console.log("node.js servers was opened at port 5098!");
});