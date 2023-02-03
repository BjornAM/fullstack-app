import express from "express";
export const router = express.Router();
import shortid from "shortid";
import { db } from '../database.js'
import { format } from 'date-fns'
import { userIsAuthenticated } from "../auth.js";

// messages: array med message-objekt
// channels
// users: array med password,username

router.get("/:channelId", userIsAuthenticated, async (req, res) => {
  const { channelId } = req.params
  const { user } = req
  
  const channel = await db.data.channels.find(x => x.id === channelId)
  const access = !channel || !channel.isLocked || (channel.isLocked && channel.createdBy === user.name)
  if (!access) {
    res.json([])
    return
  }

  let messages = await db.data
    .messages
    .filter(x => x.channelId === channelId)

  res.json(messages)
});

router.post("/", userIsAuthenticated, async (req, res) => {
  const { user } = req
  const { text, channelId } = req.body
  if (!text) {
    res.json({ ok: false })
    return
  }
  db.data
    .messages
    .push({
      username: user?.name,
      id: shortid(),
      text,
      channelId,
      time: new Date().toISOString(),
      formattedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    })

  await db.write()

  res.json({ ok: true });
});

// app.put("/", (req, res) => {

// });

// app.patch("/", (req, res) => {

// });

// app.delete("/", (req, res) => {

// });