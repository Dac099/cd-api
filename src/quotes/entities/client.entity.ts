import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BodyQuote } from './quote.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    unique: true,
    nullable: true,
    length: 100,
    default: 'Not provided',
  })
  email: string;

  @Column({
    unique: true,
    nullable: true,
    length: 12,
    default: 'Not provided',
  })
  phone: string;

  @Column({
    nullable: true,
    length: 100,
    default: 'Independiente',
  })
  company: string;

  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  createdAt: Date;

  @OneToMany(() => BodyQuote, (bodyQuote) => bodyQuote.client)
  quotes: BodyQuote[];
}
