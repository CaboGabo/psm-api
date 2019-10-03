import { DetailRO } from '../details/detail.dto';

export class ImageDTO {
  url: string;
}

export class ImageRO {
  id: string;
  created: Date;
  url: string;
  detail: DetailRO;
}
