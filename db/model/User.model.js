const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define(
  "User",
  {
    uid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { schema: "KoaREST" }
);

const getByUid = async (uid) => {
  const data = await User.findAll({
    where: {
      uid,
    },
  });
  return data;
};

module.exports = {
  model: User,
  getByUid,
};
