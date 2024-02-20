import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.SQL_PG_HOTELS_DB, {
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

export default sequelize;
