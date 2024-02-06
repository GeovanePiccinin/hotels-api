import express from "express";
import HotelsController from "../controllers/hotels.controller.js";
import HotelsValidator from "../validators/hotels.validator.js";
import pagination from "../../middlewares/pagination.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";
import { verifyToken } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  pagination(),
  cacheMiddleware("getHotels"),
  HotelsController.getHotels
);

router.get("/:id", HotelsController.getHotel);

router.post(
  "/",
  HotelsValidator.validate("createHotel"),
  HotelsController.createHotel
);

router.put(
  "/:id",
  HotelsValidator.validate("updateHotel"),
  HotelsController.updateHotel
);

router.delete("/:id", HotelsController.deleteHotel);

export default router;
