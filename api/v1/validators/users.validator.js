import { body, query } from "express-validator";
import { ROLES, ADMIN } from "../models/users.model.js";

const signupValidation = [
  body("firstName", "First name is required").exists().notEmpty(),
  body("lastName", "Last name is required").exists().notEmpty(),
  body("email", "E-mail is required").exists().notEmpty().isEmail(),
  body("password", "Password is required")
    .exists()
    .notEmpty()
    .isLength({ min: 8 }),
  body("phone", "Phone is required").exists().notEmpty(),
];

const validate = (method) => {
  switch (method) {
    case "customer_update":
    case "customer_signup": {
      return [
        ...signupValidation,
        body("role", "Role are required")
          .exists()
          .notEmpty()
          .custom((value) => {
            if (!ROLES.includes(value) || value === ADMIN) {
              throw new Error("Invalid role option");
            }
            return true;
          }),
      ];
    }
    case "admin_signup": {
      return [
        ...signupValidation,
        body("role", "Admin Role are required")
          .exists()
          .notEmpty()
          .custom((value) => {
            if (value !== ADMIN) {
              throw new Error(`Invalid role option: ${value}`);
            }
            return true;
          }),
      ];
    }
    case "login": {
      return [
        body("email", "E-mail is required").exists().notEmpty().isEmail(),
        body("password", "Password is required")
          .exists()
          .notEmpty()
          .isLength({ min: 8 }),
      ];
    }
    case "refreshToken": {
      return [
        body("refreshToken", "Refresh Token is required").exists().notEmpty(),
      ];
    }
    case "revoke-refresh-token": {
      return [query("id", "Id is required").exists().notEmpty()];
    }
  }
};

export default { validate };
