import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  public create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  public find(email: string): Promise<User[]> {
    return this.repo.find({ email });
  }

  public async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  public async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.repo.remove(user);
  }
}
