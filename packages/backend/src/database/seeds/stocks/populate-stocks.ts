import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Stock } from '../../../entity/stock';


export default class StocksUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Stock)
      .values([
        { name: 'Stock A' },
        { name: 'Stock B' },
      ])
      .execute()
  }
}