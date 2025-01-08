export class PostQuoteDto {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientCompany?: string;
  description: string;
  price: number;
  deliveryDate?: Date;
  width: number;
  height: number;
  length: number;
  extraNotes: string;
  anonymous: boolean;
}
