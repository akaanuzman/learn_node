const express = require("express")
const app =  express()
const port = 5096
const routes = require("./routes/route")

app.use(routes)

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})