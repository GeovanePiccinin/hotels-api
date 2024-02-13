import RoomsService from "../services/rooms.service.js";
import { validationResult } from "express-validator";
import { cache } from "../../middlewares/cache.middleware.js";

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

async function getRooms(req, res, next) {
  try {
    const results = await RoomsService.getRooms(req.pagination);

    cache.set(`getRooms - ${JSON.stringify(req.pagination)}`, results);
    res.status(200);
    res.send(results);
    logger.info("GET /rooms");
  } catch (err) {
    next(err);
  }
}

async function getRoom(req, res, next) {
  try {
    const room = await RoomsService.getRoom(req.params.id);
    res.status(200).send(room);
    logger.info("GET /rooms/:id");
  } catch (err) {
    next(err);
  }
}

async function createRoom(req, res, next) {
  try {
    const validationErrors = validationResult(req);

    console.log(validationErrors);

    if (!validationErrors.isEmpty()) {
      const error = new Error(
        "Missing fields or invalid data" +
          "Error Details:" +
          JSON.stringify(validationErrors.array(), null, 2)
      );
      error.statusCode = 400;
      throw error;
    }
    let room = req.body;
    room = await RoomsService.createRoom(room);
    res.status(201).send(room);
    logger.info(`POST /rooms - ${JSON.stringify(room)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteRoom(req, res, next) {
  try {
    await RoomsService.deleteRoom(req.params.id);
    res.status(204).end();

    logger.info(`DELETE /rooms/:id`);
  } catch (err) {
    next(err);
  }
}

async function updateRoom(req, res, next) {
  try {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.array(), null, 2));
    }
    let room = req.body;
    room.roomId = req.params.id;
    room = await RoomsService.updateRoom(room);
    res.status(204).end();
    logger.info(`POST /rooms - ${JSON.stringify(room)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
};
