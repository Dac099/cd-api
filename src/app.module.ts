import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyQuote } from './quotes/entities/quote.entity';
import { Client } from './quotes/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'dac099',
      password: '1991',
      database: 'carrocerias',
      entities: [BodyQuote, Client],
      synchronize: true,
      logging: true,
    }),
    QuotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
