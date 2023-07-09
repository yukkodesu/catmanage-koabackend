import { Sequelize } from "sequelize-typescript";
import User from "./model/User.model";
import { dbUser, dbPassword } from "../config/server.config";

const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@localhost:5432/postgres`,
  {
    define: {
      timestamps: false,
    },
    models: [User],
  }
);

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB successfully!");
  } catch (e) {
    console.error(`Error in connect DB: ${e}`);
    throw e;
  }
};

export default sequelize;
