const mysql = require('mysql');

const db = mysql.createPool({
    host:'localhost',
    user:'back_system',
    password:'111111',
    database:'back_system'
})

module.exports = db