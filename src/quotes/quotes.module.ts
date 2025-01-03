import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyQuote } from './entities/quote.entity';
import { Client } from './entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BodyQuote, Client])],
  providers: [QuotesService],
  controllers: [QuotesController],
})
export class QuotesModule {}
