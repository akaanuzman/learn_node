const express = require("express")
const routes = express.Router()
const db = require("../data/db")

routes.use("/", async (req, res) => {
    try {
        const [tasks,] = await db.execute("select * from Tasks where isActive = 1")
        res.render("index", {
            tasks: tasks
        })
    } catch (error) {
        console.error(error)
    }

})


function getDate() {
    var currentdate = new Date();
    var dateTime = currentdate.getDay() + "/" + currentdate.getMonth()
        + "/" + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return currentdate
}

module.exports = routes