// app.listen
import { app } from './server.js'
import * as dotenv from 'dotenv'
dotenv.config()

//
//

// i framtiden: enviroment-variabler
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('Server is listening on port' + 1337)
})