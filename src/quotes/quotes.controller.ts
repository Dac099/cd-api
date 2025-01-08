import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { PostQuoteDto } from './dtos/post-quote.dto';
import { GetAllQuotesDto } from './dtos/get-all-quotes.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private quoteService: QuotesService) {}

  @Get()
  async getAll(): Promise<GetAllQuotesDto[]> {
    return this.quoteService.getAll();
  }

  @Post()
  async create(@Body() payload: PostQuoteDto) {
    return this.quoteService.create(payload);
  }
}
