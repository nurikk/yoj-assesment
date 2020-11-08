import { singleton } from "tsyringe";
import { Connection, createConnection, getConnection } from "typeorm";
import { Stock } from "../entity/stock";


@singleton()
export default class Db {
  constructor() {
    createConnection().then(async connection => {
      const stocks = await connection.manager.find(Stock);
      console.log("Loaded stocks: ", stocks);
    }).catch(error => console.log(error));
  }

  public getConnection(): Connection {
    return getConnection();
  }

}

