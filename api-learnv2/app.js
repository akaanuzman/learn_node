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

app.use(express.json())

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

app.post("/addUser", (req, res) => {
    const newUser = req.body
    users.push(newUser)
    res.json({
        succes: true,
        user: newUser
    })
})

app.put("/updateUser/:id", (req, res) => {
    let updatedUser = users.find(e => e.id == req.params.id)
    updatedUser = req.body
    res.json({
        succes: true,
        body: updatedUser
    })
})

app.delete("/deleteUser/:id", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            users.splice(i,1)
        }
    }
    res.json({
        succes: true,
        body: users,
    })
})

/// General error route
app.get("*", (req, res) => {
    res.status(404).json(
        {
            message: "This page doesn't exist."
        }
    )
})

app.listen(port, () => {
    console.log("The server was started!")
})