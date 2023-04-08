import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from './post.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: string) {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts() {
    return this.postService.posts({ where: { published: true } });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string) {
    return this.postService.posts({
      where: {
        OR: [{ title: searchString }, { content: searchString }],
      },
    });
  }

  @Post('post')
  async createDraft(
    @Body() data: { title: string; content?: string; authorEmail: string },
  ) {
    return this.postService.create({
      title: data.title,
      content: data.content,
      author: {
        connect: { email: data.authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(@Body() data: { name?: string; email: string }) {
    return this.userService.createUser(data);
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string) {
    return this.postService.update({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string) {
    return this.postService.delete({ id: Number(id) });
  }
}
