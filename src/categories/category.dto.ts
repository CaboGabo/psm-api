import { ProductRO } from '../products/product.dto';

export class CategoryDTO {
  name: string;
  header: string;
  metadescription: string;
  metatitle: string;
  slug: string;
}

export class CategoryRO {
  id: string;
  created: Date;
  name: string;
  header: string;
  metadescription: string;
  metatitle: string;
  slug: string;
  products?: ProductRO[];
}
