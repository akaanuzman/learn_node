const mysql = require("mysql2")
const config = require("../config")

let dbConnection = mysql.createConnection(config.db)

dbConnection.connect(function (err) {
    if (err) {
        console.log(err)
    }
    dbConnection.query("select * from Tasks", function (err, res) {
        console.log(res[0])
    })
    console.log("db connection was successful!")
})

module.exports = dbConnection.promise()