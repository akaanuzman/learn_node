const express = require("express")
const app =  express()
const port = 5096
const routes = require("./routes/route")
app.set("view engine","ejs")
app.set("views","./views")
app.use(express.static("node_modules"))
app.use(routes)


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})