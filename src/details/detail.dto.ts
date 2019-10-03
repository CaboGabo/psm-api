import { ProductRO } from '../products/product.dto';
import { ImageRO } from '../images/image.dto';

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
  images?: ImageRO[];
}
