import { ProductRO } from 'src/products/product.dto';

export class DetailDTO {
  name: string;
  model: string;
  description: string;
  price: number;
  slug: string;
}

export class DetailRO {
  id: string;
  created: Date;
  name: string;
  model: string;
  description: string;
  price: number;
  slug: string;
  product: ProductRO;
}
