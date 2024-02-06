import UsersService from "../services/users.service.js";
import { validationResult } from "express-validator";
import { cache } from "../../middlewares/cache.middleware.js";

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});
async function getUsers(req, res, next) {
  try {
    const results = await UsersService.getUsers(req.pagination);

    cache.set(`getUsers - ${JSON.stringify(req.pagination)}`, results);
    res.status(200);
    res.send(results);
    logger.info("GET /Users");
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const User = await UsersService.getUser(req.params.id);
    res.status(200).send(User);
    logger.info("GET /Users/:id");
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    await UsersService.deleteUser(req.params.id);
    res.status(204).end();

    logger.info(`DELETE /Users/:id`);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.array(), null, 2));
    }
    let User = req.body;
    User.UserId = req.params.id;
    User = await UsersService.updateUser(User);
    res.status(204).end();
    logger.info(`POST /Users - ${JSON.stringify(User)}`);
  } catch (err) {
    next(err);
  }
}

export default { getUser, getUsers, deleteUser, updateUser };
