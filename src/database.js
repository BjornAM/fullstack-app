
// Använd db.read() läsa in filen
// Använd db.write() spara ändringar
// Det ska dyka upp en fil som heter db.json

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'


const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

//kolla kod 08-databas

await db.read()

console.log("The database contains: ", db.data)

//db.data = [] //arrayen som innehåller all data ex.kakor
//await db.data 

export {db}