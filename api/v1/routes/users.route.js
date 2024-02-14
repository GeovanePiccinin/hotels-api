import express from "express";
import UsersController from "../controllers/users.controller.js";
import UsersValidator from "../validators/users.validator.js";
import pagination from "../../middlewares/pagination.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";

const router = express.Router();

router.get(
  "/",
  pagination(),
  cacheMiddleware("getUsers"),
  UsersController.getUsers
);

router.get("/:id", UsersController.getUser);

router.post(
  "/",
  UsersValidator.validate("customer_signup"),
  UsersController.createUser
);

router.put(
  "/:id",
  UsersValidator.validate("customer_update"),
  UsersController.updateUser
);

router.delete("/:id", UsersController.deleteUser);

export default router;
