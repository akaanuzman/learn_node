const express = require("express")
const routes = express.Router()
const db = require("../data/db")

routes.use(express.json())
routes.use(express.urlencoded())

routes.get("/", (req, res) => {
    fetchData(res)
})

routes.post("/", (req, res) => {
    const todoName = req.body.todoName
    addTodo(todoName, res)
    console.log(req.body)
})

async function fetchData(res) {
    try {
        const [tasks,] = await db.execute("select * from Tasks where isActive = 1")
        res.render("index", {
            tasks: tasks,
        })
    } catch (error) {
        console.error(error)
    }
}

async function addTodo(todoName, res) {
    try {
        const query = "INSERT INTO `node_db`.`Tasks` (`todoName`, `createdTime`, `isActive`) VALUES (?, NOW(), '1')"
        await db.execute(query, [todoName])
        fetchData(res)
    } catch (error) {
        console.error(error)
    }
}

function getDate(tasks) {
    var currentdate = new Date();
    var dateTime = currentdate.getDay() + "/" + currentdate.getMonth()
        + "/" + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return currentdate
}

module.exports = routes