import { body } from "express-validator";

const validate = (method) => {
  switch (method) {
    case "createHotel":
    case "updateHotel":
      {
        return [
          body("name", "name is required").exists().notEmpty(),
          body("address", "address is required").exists().notEmpty(),
          body("phone", "phone is required").exists().notEmpty(),
          body("rating", "rating is required").exists().notEmpty().isNumeric(),
        ];
      }
      break;
  }
};

export default { validate };
