import express from "express";
export const router = express.Router();
import shortid from "shortid";
import {db} from '../database.js'

let messageData = [
  // Hur lägger man till själva meddelandet i varje objekt?
  {
    id: "1",
    name: "Deadlift",
    isLocked: false,
  },
  {
    id: "2",
    name: "Squat",
    isLocked: false,
  },
  {
    id: "3",
    name: "Benchpress",
    isLocked: false,
  },
  {
    id: "4",
    name: "🔓 Progression",
    isLocked: true,
  },
];
// messages: array med message-objekt
// channels
// users: array med password,username

router.get("/", (req, res) => {
  res.status(200).send(db.data.messages);
});

router.post("/", (req, res) => {
  console.log("req", req.body);
  messageData.push({
    ...req.body,
    id: shortid(),
  });
  res.json({ ok: true });
});

// app.put("/", (req, res) => {

// });

// app.patch("/", (req, res) => {

// });

// app.delete("/", (req, res) => {

// });
