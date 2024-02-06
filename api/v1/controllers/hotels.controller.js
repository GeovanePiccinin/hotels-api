import HotelsService from "../services/hotels.service.js";
import { validationResult } from "express-validator";
import { cache } from "../../middlewares/cache.middleware.js";

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

async function getHotels(req, res, next) {
  try {
    const results = await HotelsService.getHotels(req.pagination);

    cache.set(`getHotels - ${JSON.stringify(req.pagination)}`, results);
    res.status(200);
    res.send(results);
    logger.info("GET /hotels");
  } catch (err) {
    next(err);
  }
}

async function getHotel(req, res, next) {
  try {
    const hotel = await HotelsService.getHotel(req.params.id);
    res.status(200).send(hotel);
    logger.info("GET /hotels/:id");
  } catch (err) {
    next(err);
  }
}

async function createHotel(req, res, next) {
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
    let hotel = req.body;
    hotel = await HotelsService.createHotel(hotel);
    res.status(201).send(hotel);
    logger.info(`POST /hotels - ${JSON.stringify(hotel)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteHotel(req, res, next) {
  try {
    await HotelsService.deleteHotel(req.params.id);
    res.status(204).end();

    logger.info(`DELETE /hotels/:id`);
  } catch (err) {
    next(err);
  }
}

async function updateHotel(req, res, next) {
  try {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.array(), null, 2));
    }
    let hotel = req.body;
    hotel.hotelId = req.params.id;
    hotel = await HotelsService.updateHotel(hotel);
    res.status(204).end();
    logger.info(`POST /hotels - ${JSON.stringify(hotel)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createHotel,
  updateHotel,
  getHotel,
  getHotels,
  deleteHotel,
};
