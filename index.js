const express = require("express")
const mysql = require("mysql2")
const app = express()
const port = 5097

let dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "uzman4343",
    database: "node_db"
})

dbConnection.connect(function(err){
    if (err) {
        console.error(err);
    } else {
        console.log("db connection was successful")
    }
})


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.static("node_modules"))

const products = [
    { id: 1, name: "iPhone 11", price: 18000, image: "1.webp", isHome: false, isActive: false },
    { id: 2, name: "iPhone 14", price: 40000, image: "2.webp", isHome: false, isActive: true },
    { id: 3, name: "iPhone 14 Pro", price: 45000, image: "3.webp", isHome: false, isActive: true },
    { id: 4, name: "Macbook M1 Air", price: 20000, image: "4.webp", isHome: true, isActive: true },
    { id: 5, name: "Macbook M2 Air", price: 25000, image: "5.webp", isHome: true, isActive: true },
]

/// Nodejs route struct
app.get("/products/:id", (req, res) => {
    const product = products.find(element => element.id == req.params.id)
    res.render("product_details", product);
});

app.get("/products", (req, res) => {
    res.render("products", {
        products: products
    });
});

app.get("/", (req, res) => {
    res.render("index", {
        products: products
    })
});

app.listen(port, () => {
    /// [If you wanna use variable in string, you should use the code below.]
    console.log(`Example app listening on port ${port}`);
});