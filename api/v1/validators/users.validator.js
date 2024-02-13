import { body } from "express-validator";
import { ROLES, ADMIN } from "../models/users.model.js";

const validate = (method) => {
  switch (method) {
    case "createUser":
    case "updateUser":
      {
        return [
          body("firstName", "is required").exists().notEmpty(),
          body("lastName", "is required").exists().notEmpty(),
          body("email", "is required").exists().notEmpty().isEmail(),
          body("password", "is required")
            .exists()
            .notEmpty()
            .isLength({ min: 8 }),
          body("phone", "is required").exists().notEmpty(),
          body("role", "is required")
            .exists()
            .notEmpty()
            .custom((value) => {
              if (!ROLES.includes(value) || value === ADMIN) {
                throw new Error("invalid role option");
              }
              return true;
            }),
        ];
      }
      break;
  }
};

export default { validate };
