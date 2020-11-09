import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Stock } from "../entity/stock";
import { SeedStocks } from  "../seed/stock.seed"

export class SeedStocks1604869443447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(Stock).save(SeedStocks);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
