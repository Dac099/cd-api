import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyQuote } from './quotes/entities/quote.entity';
import { Client } from './quotes/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1991',
      database: 'cd-api',
      entities: [BodyQuote, Client],
      synchronize: true,
    }),
    QuotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
