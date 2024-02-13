import express from "express";
import RoomsController from "../controllers/rooms.controller.js";
import RoomsValidator from "../validators/rooms.validator.js";
import pagination from "../../middlewares/pagination.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";

const router = express.Router();

router.get(
  "/",
  pagination(),
  cacheMiddleware("getRooms"),
  RoomsController.getRooms
);

router.get("/:id", RoomsController.getRoom);

router.post(
  "/",
  RoomsValidator.validate("createRoom"),
  RoomsController.createRoom
);

router.put(
  "/:id",
  RoomsValidator.validate("updateRoom"),
  RoomsController.updateRoom
);

router.delete("/:id", RoomsController.deleteRoom);

export default router;
