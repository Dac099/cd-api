import { Entity, Column, Generated, PrimaryColumn, ManyToOne } from 'typeorm';
import { Client } from './client.entity';

export abstract class Quote {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.quotes)
  client: Client;

  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  @Column({
    type: 'real',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  deliveryDate: Date;

  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  createdAt: Date;
}

@Entity()
export class BodyQuote extends Quote {
  @Column({
    nullable: false,
    type: 'real',
  })
  width: number;

  @Column({
    nullable: false,
    type: 'real',
  })
  height: number;

  @Column({
    nullable: false,
    type: 'real',
  })
  length: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  extra_notes: string;
}
