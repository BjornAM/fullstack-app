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
    name: "progression",
    islocked: true,
    // visa lås i frontend med html/css
  }
];

router.get("/", (req, res) => {
  res.status(200).send(channelData);
});

router.post("/", (req, res) => {

});

router.put("/", (req, res) => {

});

router.patch("/", (req, res) => {

});

router.delete("/", (req, res) => {

});



