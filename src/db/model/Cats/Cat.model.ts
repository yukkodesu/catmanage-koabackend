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
  class Cat extends Model {
    @AutoIncrement
    @PrimaryKey
    @Unique
    @Column(DataType.INTEGER)
    cat_uid!: Number;
  
    @Column(DataType.STRING)
    cat_nickname!: String;
  
    @Column(DataType.STRING)
    cat_breed!: String;

    @Column(DataType.STRING)
    cat_color!: String;
  }
  
  const getCatByUid = async (cat_uid: string) => {
    const data = await Cat.findOne({
      where: {
        cat_uid,
      },
    });
    return data;
  };
  
  const createCat = async (username: string, password: string): Promise<Cat> => {
    return await Cat.create({ username, password });
  };
  
  export default Cat;
  export { getCatByUid, createCat };
  