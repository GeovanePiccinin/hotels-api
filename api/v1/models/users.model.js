import Sequelize from "sequelize";
import db from "../repositories/db.js";

export const CUSTOMER = "customer";
export const ADMIN = "admin";
export const ROLES = [CUSTOMER];

const User = db.define(
  "users",
  {
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: CUSTOMER,
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NOT ISSUED",
    },
  },
  { underscored: true }
);

export default User;
