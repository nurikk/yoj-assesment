import { singleton } from "tsyringe";
import { Connection, createConnection, getConnection } from "typeorm";

@singleton()
export default class Db {
  constructor() {
  }

  public getConnection(): Connection {
    return getConnection();
  }

}

