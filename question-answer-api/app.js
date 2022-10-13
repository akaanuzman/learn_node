const express = require("express")
const dotenv = require("dotenv")
const router = require("./src/routes/index")
const connectDb = require("./src/db/db")

const app = express()

dotenv.config(
    {
        path: "./src/config/.env"
    }
)
connectDb()
const port = process.env.PORT || 3029

// Router Middlewares
app.use("/api", router)

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("*", (req, res) => {
    res.status(404).json(
        {
            err: "This page doesn't exist."
        }
    )
})

app.listen(port, () => {
    console.log(`The server was started on ${port} port.`)
})