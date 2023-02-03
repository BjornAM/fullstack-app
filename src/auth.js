
import jwt from "jsonwebtoken"
import { db } from "./database.js"
import bcrypt from 'bcryptjs'

async function authenticateUser(username, password) {
	const found = await db.data
		.users
		.some(user => user.username === username && bcrypt.compareSync(password, user.password))

	return found
}

function createToken(name) {
	const user = { name: name }
	const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
	user.token = token
	console.log('createToken', user)
	return user
}

export { authenticateUser }
export { createToken }

export const userIsAuthenticated = async (req, res, next) => {

	let token = req.headers?.authorization?.replace('Bearer ', '')
	let decoded = jwt.decode(token, process.env.SECRET)

	if (!decoded) {
		res.sendStatus(401)
		return
	}
	req.user = decoded
	next()
}