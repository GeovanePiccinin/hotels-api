import express from "express";
import roomsRouter from "./routes/rooms.route.js";
import hotelsRouter from "./routes/hotels.route.js";
import usersRouter from "./routes/users.route.js";
import AuthController from "./controllers/auth.controller.js";
import UsersValidator from "./validators/users.validator.js";

const router = express.Router();

router.use("/hotels", hotelsRouter);

router.use("/rooms", roomsRouter);

router.use("/users", usersRouter);

router.post(
  "/signup",
  UsersValidator.validate("signup"),
  AuthController.signup
);
router.post("/login", UsersValidator.validate("login"), AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/revoke-refresh-token", AuthController.revokeRefreshToken);
export default router;
