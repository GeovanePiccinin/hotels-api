import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.ELEPHANT_SQL_PG_HOTELS_DB, {
  dialectModule: pg,
  define: {
    timestamps: false,
  },
});

export default sequelize;
