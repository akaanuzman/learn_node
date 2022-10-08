const mysql = require("mysql2")
const config = require("../config")

let dbConnection = mysql.createConnection(config.db)

dbConnection.connect(function (err) {
    if (err) {
        console.error(err);
    }
    dbConnection.query("select * from Products", function (err, res) {
        console.log(res[0])
        console.log("********")
    })
    dbConnection.query("select * from Products where price > 25000.00", function (err, res) {
        console.log(res)
        console.log("********")
    })
    console.log("db connection was successful")

})

module.exports = dbConnection.promise();