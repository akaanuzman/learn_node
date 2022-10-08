
var http = require("http");
var fs = require("fs");

var server = http.createServer((req, res) => {
    switch (req.url) {
        case "/":
            fs.readFile("views/index.html", (err, html) => {
                res.write(html);
                res.end();
            })
            break;
        case "/products":
            fs.readFile("views/products.html", (err, html) => {
                res.write(html);
                res.end();
            })
            break;
        default:
            fs.readFile("views/404.html", (err, html) => {
                res.write(html);
                res.end();
            })
            break;
    }
});

server.listen(5097, () => {
    console.log("node.js server was opened at port 5097!");
});