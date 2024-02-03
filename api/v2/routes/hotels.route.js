import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get hotels");
});

router.post("/", (req, res) => {
  res.send("post hotels");
});

export default router;
