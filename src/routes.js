const user = require('./controller/user.js')

function routes(app) {
    app.post('/login', user.login)
    app.post('/register', user.register)
    app.get('/users', middleware, user.getUsers)
    app.post('/users', middleware, user.postUser)
    app.put('/users', middleware, user.putUser)
    app.delete('/users', middleware, user.deleteUser)
    app.get('/user/search/:name', middleware, user.searchUserByName)
}

function middleware(req, res, next) {
	try {
		const bearerHeader = req.headers['authorization']
		if (typeof bearerHeader !== 'undefined') {
			const bearer = bearerHeader.split(' ')
			const bearerToken = bearer[1]
			req.token = bearerToken
			next()
		} else {
			return res.send({
				"message": "not authorized"
			})
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = routes