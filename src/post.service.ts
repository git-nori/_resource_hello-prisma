import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(where: Prisma.PostFindUniqueArgs['where']): Promise<Post | null> {
    return this.prisma.post.findUnique({ where });
  }

  async posts(
    params: Pick<
      Prisma.PostFindManyArgs,
      'skip' | 'take' | 'cursor' | 'where' | 'orderBy'
    >,
  ) {
    return this.prisma.post.findMany(params);
  }

  async create(data: Prisma.PostCreateArgs['data']) {
    return this.prisma.post.create({ data });
  }

  async update(params: Pick<Prisma.PostUpdateArgs, 'data' | 'where'>) {
    return this.prisma.post.update({ where: params.where, data: params.data });
  }

  async delete(where: Prisma.PostDeleteArgs['where']) {
    return this.prisma.post.delete({ where });
  }
}
