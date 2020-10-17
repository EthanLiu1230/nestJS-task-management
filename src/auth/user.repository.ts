import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { genSalt, hash } from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const salt = await genSalt();
    const user = new User();
    Object.assign(user, {
      salt,
      username,
      password: await UserRepository.hashPassword(password, salt),
    });

    try { await user.save();} catch (error) {
      if (error.code === '23505') { // @Unique(['username'] duplicated
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private static async hashPassword(
    password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}