import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Hotel from "../models/hotels.model.js";

export const ROOM_TYPES = ["standard", "double"];

const Room = db.define(
  "rooms",
  {
    roomId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dailyRent: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  { underscored: true }
);

Room.belongsTo(Hotel, { foreignKey: "hotelId" });

export default Room;
