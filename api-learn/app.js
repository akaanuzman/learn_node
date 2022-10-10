const express = require("express")
const app = express()
const port = process.env.PORT || 8081

app.use("/", (req, res) => {
    res.json({
        message: "Hello world"
    })
})

app.listen(port, () => {
    console.log(`The server was listening ${port}`)
})