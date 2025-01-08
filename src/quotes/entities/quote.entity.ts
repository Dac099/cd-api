import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class BodyQuote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => Client, (client) => client.quotes)
  client: Client;
}
