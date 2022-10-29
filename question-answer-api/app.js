import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';
import router from "./src/routes/index.js"
import connectDb from "./src/helpers/db/db.js"
import { errorHandler } from "./src/middlewares/error.handler.js"

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.static(path.join(__dirname, "public")))

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