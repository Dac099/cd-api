import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { PostQuoteDto } from './dtos/post-quote.dto';
import { GetAllQuotesDto } from './dtos/get-all-quotes.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private quoteService: QuotesService) {}

  @Get()
  async getAll(): Promise<GetAllQuotesDto[]> {
    try {
      return this.quoteService.getAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ocurrió un problema al obtener las cotizaciones',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() payload: PostQuoteDto) {
    try {
      return this.quoteService.create(payload);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ocurrió un problema al crear la cotización',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
