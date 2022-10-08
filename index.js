const express = require("express")
const app = express()
const port = 5097
const routes = require("./routes/users")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.static("node_modules"))

app.use(routes)


app.listen(port, () => {
    /// [If you wanna use variable in string, you should use the code below.]
    console.log(`Example app listening on port ${port}`);
});


