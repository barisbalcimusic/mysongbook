const config = require("../config");
const mysql = require("mysql2")
const connection = mysql.createConnection(config.db)

connection.connect(function (err) {
    if(err) {
        console.log(err);
    } else {
        console.log("db baglantisi basarili");
    }
})

module.exports = connection.promise()