import express from "express"
import router from "./api/routes/index.js"
import { api } from "./api/config/index.js"

const app = express()
const port = api.port


// api url'lerimiz localhost:3001/api/
// şeklinde başlamasını sağlayan middleware
app.use("/api", router)

app.listen(port, () => {
    console.log(`The server was started on ${port} port.`)
})