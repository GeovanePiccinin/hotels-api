import { body } from "express-validator";
import { ROLES } from "../models/users.model.js";

const validate = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("firstName", "First name is required").exists().notEmpty(),
        body("lastName", "Last name is required").exists().notEmpty(),
        body("email", "E-mail is required").exists().notEmpty().isEmail(),
        body("password", "Password is required")
          .exists()
          .notEmpty()
          .isLength({ min: 8 }),
        body("phone", "Phone is required").exists().notEmpty(),
        body("role", "Role are required")
          .exists()
          .notEmpty()
          .custom((value) => {
            if (!ROLES.includes(value)) {
              throw new Error("Invalid role option");
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
  }
};

export default { validate };
