const express = require("express");
const app = express()
const port = 5097

app.get("/",(req,res) => {
    res.send("<h1> Hello world </h1>");
})

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})