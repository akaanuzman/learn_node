const express = require("express");
const app = express()
const port = 5097

const products = [
    { id: 1, name: "iPhone 11", price: 18000, isActive: false },
    { id: 2, name: "iPhone 14", price: 40000, isActive: true },
    { id: 3, name: "iPhone 14 Pro", price: 45000, isActive: true },
    { id: 4, name: "Macbook M1 Air", price: 20000, isActive: true },
    { id: 5, name: "Macbook M2 Air", price: 25000, isActive: true },
]

/// Nodejs route struct
app.get("/products/:id", (req, res) => {
    res.render("product_details.ejs");
});

app.get("/products", (req, res) => {
    res.render("products.ejs", {
        products: products
    });
});

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.listen(port, () => {
    /// [If you wanna use variable in string, you should use the code below.]
    console.log(`Example app listening on port ${port}`);
});