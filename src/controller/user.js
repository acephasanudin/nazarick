/**
 * (tanpa await) Gak butuh kembalian data, gak perlu di tunggu.
 * (await) Butuh kembalian data, menunggu dari hasil proses. jadi nunggu proses selesai
*/
const jwt = require('jsonwebtoken')
const queryUser = require('./../model/user')
const {JWT_SECRET} = require('./../config/setting')
const secret = Buffer.from(JWT_SECRET, 'hex')

async function login(req, res) {
    // (await)
    isExist = await queryUser.findUser({name: req.body.name})
    if(!isExist) {
        return res.status(400).json({
            message: "user not found"
        })
    }
    let data = {
        id: isExist.id,
        name: isExist.name,
    }
    // Compress data to jwt token
    data.token = jwt.sign(data, secret)
    return res.status(200).json({
        message: "login success",
        data
    })

}
async function register(req, res) {
    isExist = await queryUser.findUser({name: req.body.name})
    if(isExist) {
        return res.status(400).json({
            message: "user already exists"
        })
    }
    let data = {
        id: req.body.id,
        name: req.body.name
    }
    queryUser.addUser(data)
    // Compress data to jwt token
    data.token = jwt.sign(data, secret)
    return res.status(200).json({
        message: "register success",
        data
    })
}
// Users: Get all user
async function getUsers(req, res) {
    // Example decode (extract) token to data
    let token = await jwt.verify(req.token, secret)
    // Extracted token
    console.log(token)
    let param = [
        req.query.id ? req.query.id : '',
        req.query.name ? req.query.name : ''
    ]
    // (await)
    let users = await queryUser.selectUsers(param)
    return res.status(200).json({
        message: "get users",
        data: users
    })
}
// User: Search users by name using url param
async function searchUserByName(req, res) {
    // (await)
    let user = await queryUser.searchUserByName(req.params.name)
    return res.status(200).json({
        message: "search user by name",
        data: user
    })
}
// User: Post new user
async function postUser(req, res) {
    // (await)
    let isExist = await queryUser.findUser({ name: req.body.name })
    if(isExist) {
        return res.status(400).json({
            message: "user already exists"
        })
    }
    // (tanpa await)
    queryUser.addUser({ name: req.body.name })
    return res.status(200).json({
        message: "post user success"
    })
}
// User: Edit user by id
async function putUser(req, res) {
    // (await)
    let isExist = await queryUser.findUser({ id: req.body.id, name: req.body.name })
    if(!isExist) {
        return res.status(400).json({
            message: "user not exists"
        })
    }
    // (tanpa await)
    queryUser.editUser({ id: req.body.id, name: req.body.name })
    return res.status(200).json({
        message: "update user success"
    })
}
// User: Delete user by id
async function deleteUser(req, res) {
    // (await)
    let isExist = await queryUser.findUser({ id: req.body.id })
    if(!isExist) {
        return res.status(400).json({
            message: "user not exists"
        })
    }
    // (tanpa await)
    queryUser.deleteUser(req.body.id)
    return res.status(200).json({
        message: "delete user success"
    })
}

module.exports = {
    login,
    register,
    getUsers,
    postUser,
    putUser,
    deleteUser,
    searchUserByName
}