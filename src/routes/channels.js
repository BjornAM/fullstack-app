import express from "express";
export const router = express.Router();
import shortid from "shortid";

let channelData = [
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
    // visa lås i frontend med html/css istället?
  }
];

router.get("/", (req, res) => {
  res.status(200).send(channelData);
});

router.post("/", (req, res) => {
  console.log('req',req.body)
  channelData.push({
    ...req.body, 
    id: shortid()
  })
  res.json({ok: true})
});

// app.put("/api/channels", (req, res) => {

// });

// app.patch("/api/channels", (req, res) => {

// });

// app.delete("/api/channels", (req, res) => {

// });
 