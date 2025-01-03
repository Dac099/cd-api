import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BodyQuote } from './entities/quote.entity';
import { Repository } from 'typeorm';
import { GetAllQuotesDto } from './dtos/get-all-quotes.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(BodyQuote) private quoteRepository: Repository<BodyQuote>,
  ) {}

  async getAll(): Promise<GetAllQuotesDto[]> {
    const quotes = this.quoteRepository
      .createQueryBuilder('quote')
      .innerJoinAndSelect('quote.client', 'client')
      .select([
        'client.name',
        'quote.width',
        'quote.height',
        'quote.length',
        'quote.price',
        'quote.createdAt',
      ])
      .getRawMany();

    return (await quotes).map((quote) => {
      return {
        clientName: quote.name,
        dimensions: {
          width: quote.width,
          height: quote.height,
          length: quote.length,
        },
        price: quote.price,
        createdAt: quote.createdAt,
      };
    });
  }
}
