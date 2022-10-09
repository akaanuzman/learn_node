const express = require("express")
const routes = express.Router()

const tasks = [
    { id: 1, todoName: "Todo 1", todoDescription: "Todo 1 Description", createdTime: getDate(), isActive: true },
    { id: 2, todoName: "Todo 2", todoDescription: "Todo 2 Description", createdTime: getDate(), isActive: true },
    { id: 3, todoName: "Todo 3", todoDescription: "Todo 3 Description", createdTime: getDate(), isActive: true },
    { id: 4, todoName: "Todo 4", todoDescription: "Todo 4 Description", createdTime: getDate(), isActive: true }


]

routes.use("/", (req, res) => {
    res.render("index", {
        tasks: tasks
    })
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