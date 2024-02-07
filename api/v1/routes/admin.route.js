import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { basicAuth } from "../../middlewares/auth.middleware.js";
import UsersValidator from "../validators/users.validator.js";

const router = express.Router();

router.post(
  "/signup",
  UsersValidator.validate("admin_signup"),
  basicAuth,
  AuthController.signup
);

export default router;
