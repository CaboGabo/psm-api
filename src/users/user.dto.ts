export class UserDTO {
  username: string;
  password: string;
  email: string;
}

export class UserRO {
  id: string;
  username: string;
  created: Date;
  email: string;
}
