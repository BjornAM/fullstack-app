import express from "express";
export const router = express.Router();

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
    islocked: true,
    // visa lås i frontend med html/css istället?
  }
];

router.get("/", (req, res) => {
  res.status(200).send(channelData);
});


 