import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Unique,
  DataType,
} from "sequelize-typescript";

@Table({ schema: "KoaREST" })
class User extends Model {
  @PrimaryKey
  @Unique
  @Column(DataType.INTEGER)
  uid!: Number;

  @Column(DataType.STRING)
  username!: String;

  @Column(DataType.STRING)
  password!: String;
}

const getByUid = async (uid: string) => {
  const data = await User.findOne({
    where: {
      uid,
    },
  });
  return data;
};

export default User;
export { getByUid };
