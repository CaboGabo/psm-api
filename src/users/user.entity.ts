import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserRO } from './user.dto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(): UserRO {
    const { id, created, username, email } = this;

    return {
      id,
      created,
      username,
      email,
    };
  }
}
