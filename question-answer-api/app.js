const express = require("express")
const dotenv = require("dotenv")
const router = require("./src/routes/index")
const connectDb = require("./src/helpers/db/db")
const { errorHandler } = require("./src/middlewares/error.handler")

const app = express()

dotenv.config(
    {
        path: "./src/config/config.env"
    }
)
connectDb()
const port = process.env.PORT || 3029

// Express - Body Middleware
app.use(express.json())

// Router Middlewares
app.use("/api", router)

app.use(errorHandler)

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