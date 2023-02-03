import express from "express";
export const router = express.Router();
import shortid from "shortid";
import {userIsAuthenticated} from "../auth.js";
import {db} from "../database.js"

router.get("/", userIsAuthenticated, async (req, res) => {
  const {user} = req
  let channelData = await db.data
  .channels 

  res.json(channelData.map(channel => ({
    ...channel,
    access: !channel.isLocked || (channel.isLocked && channel.createdBy === user.name)
  })))
});

router.post("/", userIsAuthenticated, async (req, res) => {
  const { user } = req
  db.data
    .channels
    .push({
      ...req.body,
      id: shortid(),
      createdBy: user.name
    })

  await db.write()

  res.sendStatus(200)
});