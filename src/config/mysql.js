const mysql = require('mysql')
const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = require('./setting')

const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
})

con.connect(function (err){
    if(err) throw err
})

module.exports = con