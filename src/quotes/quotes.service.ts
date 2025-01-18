import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BodyQuote } from './entities/quote.entity';
import { Repository } from 'typeorm';
import { GetAllQuotesDto } from './dtos/get-all-quotes.dto';
import { Client } from './entities/client.entity';
import { PostQuoteDto } from './dtos/post-quote.dto';
import { GetOneQuoteDto } from './dtos/get-one-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(BodyQuote) private quoteRepository: Repository<BodyQuote>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  async getAll(): Promise<GetAllQuotesDto[]> {
    try {
      const quotes = await this.quoteRepository
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

      return quotes.map((quote) => {
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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOne(id: string): Promise<GetOneQuoteDto> {
    try {
      const quote = await this.quoteRepository
        .createQueryBuilder('quote')
        .innerJoinAndSelect('quote.client', 'client')
        .select([
          'client.name',
          'client.email',
          'client.phone',
          'client.company',
          'quote.width',
          'quote.height',
          'quote.length',
          'quote.price',
          'quote.createdAt',
          'quote.description',
          'quote.extra_notes',
        ])
        .where('quote.id = :id', { id })
        .getRawOne();

      return {
        clientName: quote.name,
        clientEmail: quote.email,
        clientPhone: quote.phone,
        clientCompany: quote.company,
        dimensions: {
          width: quote.width,
          height: quote.height,
          length: quote.length,
        },
        price: quote.price,
        createdAt: quote.createdAt,
        description: quote.description,
        extraNotes: quote.extra_notes,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(payload: PostQuoteDto) {
    try {
      const { anonymous } = payload;
      let client: Client | null;

      const quote = this.quoteRepository.create({
        price: payload.price,
        height: payload.height,
        width: payload.width,
        length: payload.length,
        deliveryDate: payload.deliveryDate,
        extra_notes: payload.extraNotes,
        description: payload.description,
      });
      await this.quoteRepository.save(quote);

      if (anonymous) {
        client = await this.clientRepository.save({
          name: 'Anonymous',
        });
      } else {
        client = await this.clientRepository.save({
          name: payload.clientName,
          email: payload.clientEmail,
          phone: payload.clientPhone,
          company: payload.clientCompany,
        });
      }

      client.quotes.push(quote);
      await this.clientRepository.save(client);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
