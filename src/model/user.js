const mysql = require('./../config/mysql')

function selectUsers(param){
    return new Promise(resolve => {
        let query = 'SELECT * FROM users  where id = ? or name = ?'
        let isEmpty = true
        for (let i = 0; i < param.length; i++) {
            if(param[i] !== '') {
                isEmpty = false
                break
            }
        }
        if(isEmpty) {
            query = 'SELECT * FROM users'
        }
        mysql.query(query, param, function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows)
            }
        })
    })
}
function findUser(param) {
    return new Promise(resolve => {
        let query = 'SELECT * FROM users where id = ? or name = ?'
        mysql.query(query, [param.id, param.name], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows[0])
            }
        })
    })
}
function searchUserByName(name) {
    return new Promise(resolve => {
        let query = 'SELECT * FROM users where name LIKE ?'
        mysql.query(query, ['%'+name+'%'], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows)
            }
        })
    })
}
function addUser(param){
    return new Promise(resolve => {
        let query = 'INSERT INTO users (id, name) values (?,?)'
        mysql.query(query, [param.id, param.name], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows)
            }
        })
    })
}
function editUser(param){
    return new Promise(resolve => {
        let query = 'UPDATE users SET id = ?, name = ? WHERE id = ?'
        mysql.query(query, [param.id, param.name, param.id], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows)
            }
        })
    })
}
function deleteUser(id){
    return new Promise(resolve => {
        let query = 'DELETE FROM users WHERE id = ?'
        mysql.query(query, [id], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows)
            }
        })
    })
}

module.exports = {
    selectUsers,
    findUser,
    searchUserByName,
    addUser,
    editUser,
    deleteUser,
}