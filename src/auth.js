import jwt from "jsonwebtoken"
// Hämta kod från JWT-exemplet
const fakeDb = [
	{ name: 'Lovisa', password: 'hej123' }
]

// function userExist(userName) {}

function authenticateUser(userName, password) {
	// Tips: Array.some
	const found = fakeDb.find(user => user.name === userName && user.password === password)

	return Boolean(found)
}


function createToken(name) {
	const user = { name: name }
	const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
	user.token = token
	console.log('createToken', user)
	return user
}

export {authenticateUser}
export {createToken}