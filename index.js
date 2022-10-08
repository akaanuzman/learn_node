
var http = require("http");

var server = http.createServer((req, res) => {
    switch (req.url) {
        case "/home":
            res.write("<h1>home</h1>");
            break;
        case "/products":
            res.write("<h1>products</h1>");
            break;
        default:
            res.write("<h1> the page is not fount </h1>");
            break;
    }
    res.end();
});

server.listen(5098, () => {
    console.log("node.js server was opened at port 5098!");
});