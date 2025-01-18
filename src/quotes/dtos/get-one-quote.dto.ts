export class GetOneQuoteDto {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientCompany?: string;
  dimensions: {
    width: number;
    height: number;
    length: number;
  };
  price: number;
  createdAt: Date;
  description: string;
  extraNotes: string;
}
