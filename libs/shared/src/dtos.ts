export class CreateProductDto {
  code: string;
  name: string;
  description?: string;
  rate: number;
  imageUrl?: string;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  rate?: number;
  imageUrl?: string;
}

export class CreateOrderDto {
  customer: { name: string; phone: string };
  products: { productCode: string; qty: number; rate?: number }[];
}
