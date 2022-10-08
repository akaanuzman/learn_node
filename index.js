const express = require("express");
const app = express()
const port = 5097

/// Nodejs route struct
app.get("/products/:id", (req, res) => {
    res.render("product_details.ejs");
});

app.get("/products", (req, res) => {
    res.render("products.ejs");
});

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.listen(port, () => {
    /// [If you wanna use variable in string, you should use the code below.]
    console.log(`Example app listening on port ${port}`);
});