export class GetAllQuotesDto {
  clientName: string;
  dimensions: {
    width: number;
    height: number;
    length: number;
  };
  price: number;
  createdAt: Date;
}
