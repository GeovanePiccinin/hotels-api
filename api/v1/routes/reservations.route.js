import express from "express";
import ReservationsController from "../controllers/reservations.controller.js";
import ReservationsValidator from "../validators/reservations.validator.js";
import pagination from "../../middlewares/pagination.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";

const router = express.Router();

router.get(
  "/",
  pagination(),
  cacheMiddleware("getReservations"),
  ReservationsController.getReservations
);

router.get("/:id", ReservationsController.getReservation);

router.post(
  "/",
  ReservationsValidator.validate("createReservation"),
  ReservationsController.createReservation
);

router.put(
  "/:id",
  ReservationsValidator.validate("updateReservation"),
  ReservationsController.updateReservation
);

router.delete("/:id", ReservationsController.deleteReservation);

export default router;
