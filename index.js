const express = require("express");
const app = express()
const port = 5097

/// Nodejs route struct
app.get("/products/:id", (req, res) => {
    /// [If you wanna send params. You should use the code below.]
    // res.send(req.params);
    res.send(`<h1> Product Detail ${req.params.id} </h1>`);
});

app.get("/products", (req, res) => {
    res.send("<h1> Products </h1>");
});

app.get("/", (req, res) => {
    res.send("<h1> Hello world </h1>");
});

app.listen(port, () => {
    /// [If you wanna use variable in string, you should use the code below.]
    console.log(`Example app listening on port ${port}`);
});