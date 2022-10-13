const express = require("express")
const app = express()
const port = process.env.PORT || 4041
const { authControl, banControl, homeControl } = require("./src/middlewares/middleware")

const users = [
    {
        id: 1,
        name: "Ahmet Kaan",
        surname: "Uzman",
        type: "user",
        createdTime: Date.now(),
        isActive: true,
    },
    {
        id: 2,
        name: "Test",
        surname: "User",
        type: "user",
        createdTime: Date.now(),
        isActive: true,
    },
    {
        id: 3,
        name: "Test",
        surname: "Admin",
        type: "admin",
        createdTime: Date.now(),
        isActive: true,
    },
]

/// Middlewares usage in general routes
app.use(authControl, banControl)


/// Middlewares usage in only a route
app.get("/", homeControl, (req, res) => {
    res.send("hello world")
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/users/:id", (req, res) => {
    res.json(
        users.find(e => e.id == req.params.id)
    )
})

/// General error route
app.get("*", (req, res) => {
    res.json(
        {
            message: "This page doesn't exist."
        }
    )
})

app.listen(port, () => {
    console.log("The server was started!")
})