import "./env.js";
import express from "express";
import cors from "cors";
import logger from "./config/logger.js";
import v1Router from "./api/v1/router.js";
import v2Router from "./api/v2/router.js";

global.logger = logger;

const app = express();
app.use(express.json());
app.use(cors());
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

app.listen(process.env.port || 3000, () => console.log("API Started!"));
