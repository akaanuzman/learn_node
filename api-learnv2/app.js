const express = require("express")
const app = express()
const port = process.env.PORT || 4041

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

/// General error route
app.get("*", (req,res) => {
    res.json(
        {
            message: "This page doesn't exist."
        }
    )
})

app.get("/", (req,res) => {
    res.send("hello world")
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/users/:id", (req,res) => {
    res.json(
        users.find(e => e.id == req.params.id)
    )
})

app.listen(port, () => {
    console.log("The server was started!")
})