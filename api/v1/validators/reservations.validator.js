import { body } from "express-validator";

const validate = (method) => {
  switch (method) {
    case "createReservation":
    case "updateReservation":
      {
        return [
          body("roomId", "is required").exists().notEmpty().isNumeric(),
          body("userId", "is required").exists().notEmpty().isNumeric(),
          body("checkin", "is required. Date format")
            .exists()
            .notEmpty()
            .isDate({ format: "DD/MM/YYYY", delimiters: "/" }),
          body("checkin", "is required. Date format")
            .exists()
            .notEmpty()
            .isDate({ format: "DD/MM/YYYY", delimiters: "/" }),
          body("checkout", "is required. Date format DD/MM/YYYY")
            .exists()
            .notEmpty()
            .isDate({ format: "DD/MM/YYYY", delimiters: "/" }),
          body("numberOfGuests", "is required. Numbers allowed: 1 to 4")
            .exists()
            .notEmpty()
            .isInt({ min: 1, max: 4 }),
        ];
      }
      break;
  }
};

export default { validate };
