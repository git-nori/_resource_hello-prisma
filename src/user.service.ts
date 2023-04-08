import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    // tutorialの記述
    // userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    userWhereUniqueInput: Prisma.UserFindUniqueArgs['where'],
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  // tutorialの記述
  //   async users(params: {
  //     skip?: number;
  //     take?: number;
  //     cursor?: Prisma.UserWhereUniqueInput;
  //     where?: Prisma.UserWhereInput;
  //     orderBy?: Prisma.UserOrderByWithRelationInput;
  //   }): Promise<User[]> {
  async users(
    params: Pick<
      Prisma.UserFindManyArgs,
      'skip' | 'take' | 'cursor' | 'where' | 'orderBy'
    >,
  ) {
    return this.prisma.user.findMany(params);
  }

  // tutorialの記述
  //   async createUser(data: Prisma.UserCreateInput) {
  async createUser(data: Prisma.UserCreateArgs['data']) {
    return this.prisma.user.create({ data });
  }

  // tutorialの記述
  //   async updateUser(params: {
  //     where: Prisma.UserWhereUniqueInput;
  //     data: Prisma.UserUpdateInput;
  //   }) {
  async updateUser(params: Pick<Prisma.UserUpdateArgs, 'data' | 'where'>) {
    return this.prisma.user.update({ where: params.where, data: params.data });
  }

  // tutorialの記述
  //   async deleteUser(where: Prisma.UserWhereUniqueInput) {
  async deleteUser(where: Prisma.UserDeleteArgs['where']) {
    return this.prisma.user.delete({ where });
  }
}
