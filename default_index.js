
var http = require("http");
var fs = require("fs");

var server = http.createServer((req, res) => {
    switch (req.url) {
        case "/":
            readFile("views/index.html", res);
            break;
        case "/products":
            readFile("views/products.html", res);
            break;
        default:
            readFile("views/404.html", res);
            break;
    }
});

function readFile(path, res) {
    fs.readFile(path, (err, html) => {
        if (err) {
            res.write("<h1>the page was crashed! </h1>");
            res.end();
        } else {
            res.write(html);
            res.end();
        }
    })
}

server.listen(5096, () => {
    console.log("node.js server was opened at port 5096!");
});