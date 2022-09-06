import { PrismaService } from '@app/prisma.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(
    email: string,
    password: string,
    options?: Partial<User>,
  ): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        select: { id: true, email: true, firstName: true, lastName: true },
        data: {
          ...options,
          email,
          password,
        },
      });
      return newUser;
    } catch (err) {
      throw new InternalServerErrorException('User already exists.');
    }
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true },
    });
    return allUsers;
  }

  async findOne(id: string): Promise<User> {
    const targetUser = await this.prisma.user.findUnique({
      select: { id: true, email: true, firstName: true, lastName: true },
      where: { id },
    });
    return targetUser;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const targetUser = await this.prisma.user.update({
      select: { id: true, email: true, firstName: true, lastName: true },
      where: { id },
      data: data,
    });
    if (!targetUser) throw new NotFoundException("User doesn't exist.");
    return targetUser;
  }

  async remove(id: string) {
    try {
      const targetUser = await this.prisma.user.delete({
        select: { id: true, email: true, firstName: true, lastName: true },
        where: { id },
      });
      return targetUser;
    } catch (err) {
      throw new NotFoundException("User doesn't exist.");
    }
  }
}
