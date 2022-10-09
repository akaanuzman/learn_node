const express = require("express")
const routes = express.Router()

routes.use("/",(req,res) => {
    res.send("hello world")
})

module.exports = routes