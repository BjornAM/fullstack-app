import express from "express";
export const router = express.Router();
import shortid from "shortid";
import { db } from '../database.js'
import bcrypt from 'bcryptjs'



router.post("/signup", async (req, res) => {
  const { username, password } = req.body

  let hash = await bcrypt.hash(password, 10);

  if (!username || !password) {
    res.sendStatus(500)
    return
  }

  db.data
    .users
    .push({
      username,
      id: shortid(),
      password: hash,
    })

  await db.write()

  res.sendStatus(200)
});