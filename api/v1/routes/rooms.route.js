import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get room");
});

router.post("/", (req, res) => {
  res.send("post room");
});

export default router;
