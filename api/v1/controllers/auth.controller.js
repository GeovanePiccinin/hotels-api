import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import generateTokens from "../../utils/generateTokens.js";
import verifyRefreshToken from "../../utils/verifyRefreshToken.js";
import UsersService from "../services/users.service.js";
import jwt from "jsonwebtoken";
import { ADMIN } from "../models/users.model.js";

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

const generateUserSafeCopy = (user) => {
  let _user = { ...user };
  delete _user.password;
  return _user;
};

async function signup(req, res, next) {
  console.log("chegou em auth.signup");

  try {
    const validationErrors = myValidationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = new Error(
        JSON.stringify(validationErrors.array(), null, 2)
      );
      error.statusCode = 400;
      throw error;
    }

    if (req.body.role === ADMIN && !req.verifiedAdmin) {
      const error = new Error("Not Authorized");
      error.code = 401;
      throw error;
    }

    let user = await UsersService.getUserByEmail(req.body.email);
    if (user) {
      const error = new Error("User with given email already exist");
      error.code = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await UsersService.createUser({
      ...req.body,
      password: hashPassword,
    });

    res.status(201).send(generateUserSafeCopy(user.dataValues));

    logger.info("POST /signup");
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const validationErrors = myValidationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = new Error(
        JSON.stringify(validationErrors.array(), null, 2)
      );
      error.statusCode = 400;
      throw error;
    }

    const user = await UsersService.getUserByEmail(req.body.email);

    if (!user) {
      const error = new Error("Email or password incorrect.");
      error.statusCode = 401;
      throw error;
    }

    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!verifiedPassword) {
      const error = new Error("Email or password incorrect.");
      error.statusCode = 401;
      throw error;
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    await UsersService.updateRefreshToken(user.userId, refreshToken);

    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      message: "Logged in sucessfully",
    });
  } catch (err) {
    next(err);
  }
}

async function refreshToken(req, res, next) {
  try {
    const validationErrors = myValidationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = new Error(
        JSON.stringify(validationErrors.array(), null, 2)
      );
      error.statusCode = 400;
      throw error;
    }

    verifyRefreshToken(req.body.refreshToken)
      .then(({ tokenDetails }) => {
        const payload = { id: tokenDetails.id, role: tokenDetails.role };
        const accessToken = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: "14m" }
        );
        res.status(200).json({
          error: false,
          accessToken,
          message: "Access token created successfully",
        });
      })
      .catch((err) => {
        const error = new Error("Invalid Refresh Token" + err);
        error.statusCode = 400;
        throw error;
      });
  } catch (err) {
    next(err);
  }
}

async function revokeRefreshToken(req, res, next) {
  try {
    const validationErrors = myValidationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = new Error(
        JSON.stringify(validationErrors.array(), null, 2)
      );
      error.statusCode = 400;
      throw error;
    }
    await UsersService.updateRefreshToken(req.query.id, "REVOKED");
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export default {
  signup,
  login,
  refreshToken,
  revokeRefreshToken,
};
