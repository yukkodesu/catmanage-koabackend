import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Unique,
  DataType,
  AutoIncrement,
} from "sequelize-typescript";

@Table({ schema: "KoaREST" })
class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column(DataType.INTEGER)
  uid!: Number;

  @Column(DataType.STRING)
  username!: String;

  @Column(DataType.STRING)
  password!: String;
}

const getUserByUid = async (uid: string) => {
  const data = await User.findOne({
    where: {
      uid,
    },
  });
  return data;
};

const createUser = async (username: string, password: string): Promise<User> => {
  return await User.create({ username, password });
};

export default User;
export { getUserByUid, createUser };
