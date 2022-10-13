const dotenv = require("dotenv")
const express = require("express")
const app = express()
dotenv.config(
    {
        path: "./src/config/.env"
    }
)
const port = process.env.PORT || 3029

app.get("/", (req,res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`The server was started on ${port} port.`)
})