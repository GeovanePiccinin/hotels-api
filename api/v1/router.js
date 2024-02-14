import express from "express";
import roomsRouter from "./routes/rooms.route.js";
import hotelsRouter from "./routes/hotels.route.js";
import adminRouter from "./routes/admin.route.js";
import AuthController from "./controllers/auth.controller.js";
import UsersValidator from "./validators/users.validator.js";
import {
  verifyToken,
  verifyAuthorization,
} from "../middlewares/auth.middleware.js";
import usersRouter from "./routes/users.route.js";
import reservationsRouter from "./routes/reservations.route.js";

const router = express.Router();

router.use("/hotels", hotelsRouter);

router.use("/rooms", roomsRouter);

router.use("/users", usersRouter);

router.use("/admin", adminRouter);

router.use("/reservations", reservationsRouter);

router.post(
  "/signup",
  UsersValidator.validate("customer_signup"),
  AuthController.signup
);
router.post("/login", UsersValidator.validate("login"), AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/revoke-refresh-token",
  verifyToken,
  verifyAuthorization("admin"),
  AuthController.revokeRefreshToken
);
export default router;
