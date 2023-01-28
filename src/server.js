// Imports
import express from 'express'
import * as url from 'url';
import booksRoute from './routes/books.js'
import { authenticateUser, createToken } from './auth.js'

// Konfiguration
const app = express()
const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))
const publicPath = url.fileURLToPath(new URL('../public', import.meta.url))


// Middleware
const logger = (req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
}
app.use( express.json() )
app.use( logger )
app.use( express.static(staticPath) )
app.use( express.static(publicPath) )

// Routes
app.post('/login', (req, res) => {
	const { username, password } = req.body 

	// Finns användaren i databasen?
	if( authenticateUser(username, password) ) {
		const userToken = createToken(username)
		res.status(200).send(userToken) // skapat jwt som vi skickar tillbaka till frontend

	} else {
		res.sendStatus(401)  // Unauthorized
		return
	}
})	

app.get('/', (req, res) => {
	let path = staticPath + '/index.html'
	// console.log('GET /  path=', path)
	res.sendFile(path)
})

export {app}