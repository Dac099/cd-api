import { Injectable } from '@nestjs/common';
import { GetOneQuoteDto } from 'src/quotes/dtos/get-one-quote.dto';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Injectable()
export class PdfMakerService {
  async generateQuotePdf(quote: GetOneQuoteDto): Promise<Buffer> {
    try {
      
    } catch (error) {
      throw new Error(`Error generando el PDF: ${error.message}`);
    }
  }
}
