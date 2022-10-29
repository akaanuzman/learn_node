import express from "express"
import router from "./api/routes/index.js"

const app = express()
const port = process.env.PORT || 3001


// api url'lerimiz localhost:3001/api/
// şeklinde başlamasını sağlayan middleware
app.use("/api", router)

app.listen(port, () => {
    console.log(`The server was started on ${port} port.`)
})