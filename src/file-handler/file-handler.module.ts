import { Module } from '@nestjs/common';
import { PdfMakerService } from './pdf-maker/pdf-maker.service';

@Module({
  providers: [PdfMakerService],
  exports: [PdfMakerService],
})
export class FileHandlerModule {}
