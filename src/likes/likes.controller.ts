import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/like.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('product-likes')
@Controller('product-likes')
export class LikesController {
  constructor(private readonly LikesService: LikesService) {}
  @Get('user/:userId')
  findUserLikes(@Param('userId') userId: string) {
    return this.LikesService.findUserLikes(+userId);
  }
  @Get('post/:postId')
  findPostLikes(@Param('postId') postId: string) {
    return this.LikesService.findPostLikes(+postId);
  }
  @Post()
  createUserLike(@Body() likeDto: CreateLikeDto) {
    return this.LikesService.createUserLike(+likeDto.user, +likeDto.product);
  }
  @Delete()
  removeUserLike(@Body() likeDto: CreateLikeDto) {
    return this.LikesService.removeUserLike(+likeDto.user, +likeDto.product);
  }
}
