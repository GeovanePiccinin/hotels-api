import "./env.js";
import express from "express";
import cors from "cors";
import logger from "./config/logger.js";
import helmet from "helmet";

import { redisConnect } from "./api/middlewares/redis.middleware.js";

import v1Router from "./api/v1/router.js";
import v2Router from "./api/v2/router.js";

global.logger = logger;

redisConnect();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(function (req, res, next) {
  res.contentType("application/json");
  next();
});

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

app.use((err, req, res, next) => {
  logger.error(
    `${err.statusCode} - ${err.message} - ${req.method} ${req.baseUrl}`
  );
  res
    .status(err.statusCode || 500)
    .send({ error: err.message || "Something went wrong" });
});

app.listen(3005, () => console.log("API Started!"));

export default app;
