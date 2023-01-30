import express from "express";
export const router = express.Router();
const channelData = [
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
    name: "progression",
    islocked: true,
    // visa lås i frontend css?
  }
];

router.get("/", (req, res) => {
  res.status(200).send(channelData);
});
