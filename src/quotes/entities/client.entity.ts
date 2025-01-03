import { Entity, Column, PrimaryColumn, Generated, OneToMany } from 'typeorm';
import { Quote } from './quote.entity';

@Entity()
export class Client {
  @PrimaryColumn()
  @Generated('uuid')
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
  })
  email: string;

  @Column({
    unique: true,
    nullable: true,
    length: 12,
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

  @OneToMany(() => Quote, (quote) => quote.client)
  quotes: Quote[];
}
