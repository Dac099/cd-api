import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BodyQuote } from './entities/quote.entity';
import { Repository } from 'typeorm';
import { GetAllQuotesDto } from './dtos/get-all-quotes.dto';
import { Client } from './entities/client.entity';
import { PostQuoteDto } from './dtos/post-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(BodyQuote) private quoteRepository: Repository<BodyQuote>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
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

  async create(payload: PostQuoteDto) {
    const { anonymous } = payload;
    let client: Client | null;
    //Crear cotización
    //Verificar si el cliente existe
    //Si es anónimo, obtener cliente anónimo
    //Si no existe, crearlo
    if (anonymous) {
      client = await this.clientRepository.findOneBy({
        name: 'Anonymous',
      });

      if (!client) {
        client = this.clientRepository.create({
          name: 'Anonymous',
        });
      }
    }else {
      client = await this.clientRepository.findOneBy({ })
    }
    //De lo contrario buscar cliente por nombre y teléfono
    //Si no existe, crearlo
    //Agregar cotización al cliente
  }
}
