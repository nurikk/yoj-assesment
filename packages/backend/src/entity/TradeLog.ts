import { InstrumentTradingRecord } from "@yoj/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TradeLog implements InstrumentTradingRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column("float")
  transactedPrice: number;
  @Column("float")
  transactedVolume: number;
  @Column("timestamptz")
  timestamp: Date;
}
