import { body } from "express-validator";
import { ROOM_TYPES } from "../models/rooms.model.js";

const validate = (method) => {
  switch (method) {
    case "createRoom":
    case "updateRoom":
      {
        return [
          body("dailyRent", "dailyRent test")
            .exists()
            .notEmpty()
            .isFloat()
            .withMessage("problem with rent value"),
          body("type", "type is required")
            .exists()
            .notEmpty()
            .custom((value) => {
              if (!ROOM_TYPES.includes(value)) {
                throw new Error("invalid room option");
              }
              return true;
            })
            .withMessage("problem with custom"),
        ];
      }
      break;
  }
};

export default { validate };
