import ReservationsService from "../services/reservations.service.js";
import { validationResult } from "express-validator";
import { cache } from "../../middlewares/cache.middleware.js";

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

async function getReservations(req, res, next) {
  try {
    const results = await ReservationsService.getReservations(req.pagination);

    cache.set(`getReservations - ${JSON.stringify(req.pagination)}`, results);
    res.status(200);
    res.send(results);
    logger.info("GET /reservations");
  } catch (err) {
    next(err);
  }
}

async function getReservation(req, res, next) {
  try {
    const reservation = await ReservationsService.getReservation(req.params.id);
    res.status(200).send(reservation);
    logger.info("GET /reservations/:id");
  } catch (err) {
    next(err);
  }
}

async function createReservation(req, res, next) {
  try {
    const validationErrors = myValidationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = new Error(
        "Missing fields or invalid data" +
          "Error Details:" +
          JSON.stringify(validationErrors.array(), null, 2)
      );
      error.statusCode = 400;
      throw error;
    }
    let reservation = req.body;
    reservation = await ReservationsService.createReservation(reservation);
    res.status(201).send(reservation);
    logger.info(`POST /reservations - ${JSON.stringify(reservation)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteReservation(req, res, next) {
  try {
    await ReservationsService.deleteReservation(req.params.id);
    res.status(204).end();

    logger.info(`DELETE /reservations/:id`);
  } catch (err) {
    next(err);
  }
}

async function updateReservation(req, res, next) {
  try {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.array(), null, 2));
    }
    let reservation = req.body;
    reservation.reservationId = req.params.id;
    reservation = await ReservationsService.updateReservation(reservation);
    res.status(204).end();
    logger.info(`POST /reservations - ${JSON.stringify(reservation)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createReservation,
  updateReservation,
  getReservation,
  getReservations,
  deleteReservation,
};
