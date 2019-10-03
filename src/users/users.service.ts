import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async showAll() {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject());
  }

  async register(data: UserDTO) {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }
}
