import { body } from "express-validator";
import { dateConverterDMYtoYMD } from "../../utils/date.js";

const validate = (method) => {
  switch (method) {
    case "createReservation":
    case "updateReservation":
      {
        return [
          body("roomId", "roomId is required").exists().notEmpty().isNumeric(),
          body("userId", "userId is required").exists().notEmpty(),
          body("checkin", "checkin is required. Date format")
            .exists()
            .notEmpty()
            .custom((value) => {
              return !isNaN(dateConverterDMYtoYMD(value));
            })
            .customSanitizer((value) => dateConverterDMYtoYMD(value)),
          body("checkout", "checkout is required. Date format DD/MM/YYYY")
            .exists()
            .notEmpty()
            .custom((value) => {
              return !isNaN(dateConverterDMYtoYMD(value));
            })
            .customSanitizer((value) => dateConverterDMYtoYMD(value)),
          body(
            "numberOfGuests",
            "numberOfGuests is required. Numbers allowed: 1 to 4"
          )
            .exists()
            .notEmpty()
            .isInt({ min: 1, max: 4 }),
        ];
      }
      break;
  }
};

export default { validate };
