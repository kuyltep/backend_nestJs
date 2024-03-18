import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly LikesService: LikesService) {}
  @Get(':userId')
  findUserLikes(@Param('userId') userId: string) {
    return this.LikesService.findUserLikes(+userId);
  }
  @Get(':postId')
  findPostLikes(@Param('postId') postId: string) {
    return this.LikesService.findPostLikes(+postId);
  }
  @Post()
  createUserLike(@Body() likeDto: CreateLikeDto) {
    return this.LikesService.createUserLike(+likeDto.user, +likeDto.text);
  }
  @Delete()
  removeUserLike(@Body() likeDto: CreateLikeDto) {
    return this.LikesService.removeUserLike(+likeDto.user, +likeDto.text);
  }
}
