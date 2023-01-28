// app.listen
import { app } from './server.js'
import * as dotenv from 'dotenv'
dotenv.config()

//
//

// i framtiden: enviroment-variabler
const PORT = process.env.PORT || 1337

app.listen(PORT, () => {
  console.log('Server is listening on port' + PORT)
})