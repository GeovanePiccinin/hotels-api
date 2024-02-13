import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Room from "../models/hotels.model.js";
import User from "../models/users.model.js";

const Reservation = db.define(
  "reservations",
  {
    reservationId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    checkin: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    checkout: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    totalRent: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    numberOfGuests: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

Reservation.belongsTo(Room, { as: "room", foreignKey: "roomId" });
Reservation.belongsTo(User, { as: "user", foreignKey: "userId" });

export default Reservation;
