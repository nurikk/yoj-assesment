import { singleton } from "tsyringe";
import { Connection, createConnection, getConnection } from "typeorm";

@singleton()
export default class Db {
  constructor() {
    createConnection().then(async connection => {
      console.log("Connected to db");
    }).catch(error => console.log(error));
  }

  public getConnection(): Connection {
    return getConnection();
  }

}

