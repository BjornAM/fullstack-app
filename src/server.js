// Imports
import express from 'express'
import * as dotenv from 'dotenv'
import { authenticateUser } from './auth.js'
import jwt from 'jsonwebtoken'

import * as url from 'url';
import { router as channelRouter } from './routes/channels.js';
import { router as messageRouter } from './routes/messages.js';
import { router as userRoter } from './routes/user.js';

// Konfiguration
const app = express()
dotenv.config() //.env inte med i .gitignore
const PORT = process.env.PORT || 1337
const SECRET = process.env.SECRET

const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))



//Middleware
app.use(express.json())
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.body)
	next()
})

app.use(express.static(staticPath))
app.use("/api/channels", channelRouter)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRoter)


// Routes
// POST /login
app.post('/login', async (req, res) => {
	const { username, password } = req.body
	let check = await authenticateUser(username, password)
	if (check) {
		const userToken = createToken(username)
		res.status(200).send(userToken)
	} else {
		res.sendStatus(401)
		return
	}
})


function createToken(name) {
	const user = { name: name }
	console.log('server.js createToken: ', user, process.env.SECRET)
	const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
	user.token = token
	console.log('createToken', user)
	return user
}

// GET /secret

app.listen(PORT, () => {
	console.log('Server is listening on http://localhost:' + PORT)
})





// Middleware
// const logger = (req, res, next) => {
// 	console.log(`${req.method}  ${req.url}`, req.body)
// 	next()
// }
// app.use( logger )


app.get('/', (req, res) => {
	let path = staticPath + '/index.html'
	// console.log('GET /  path=', path)
	res.sendFile(path)
})

app.get('/login', (req, res) => {
	let path = staticPath + '/login.html'
	// console.log('GET /  path=', path)
	res.sendFile(path)
})
export { app } 