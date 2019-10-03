import { CategoryRO } from '../categories/category.dto';
export class ProductDTO {
  name: string;
  header: string;
  metatitle: string;
  metadescription: string;
  description: string;
  slug: string;
}

export class ProductRO {
  id: string;
  created: Date;
  name: string;
  header: string;
  metatitle: string;
  metadescription: string;
  description: string;
  slug: string;
  category: CategoryRO;
}
