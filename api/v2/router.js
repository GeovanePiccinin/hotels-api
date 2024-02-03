import express from "express";
import roomsRouter from "./routes/rooms.route.js";
import hotelsRouter from "./routes/hotels.route.js";

const router = express.Router();

router.use("/hotels", hotelsRouter);
router.use("/rooms", roomsRouter);

export default router;
