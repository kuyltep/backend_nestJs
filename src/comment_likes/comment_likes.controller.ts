import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCommentLikeDto } from './dto/create-comment_like.dto';
import { CommentLikesService } from './comment_likes.service';
import { DeleteUserCommentLikeDto } from './dto/delete-comment_like.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('comment-likes')
@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly CommentLikesService: CommentLikesService) {}
  @Post()
  create(@Body() commentLikeDto: CreateCommentLikeDto) {
    return this.CommentLikesService.create(
      +commentLikeDto.user,
      +commentLikeDto.comment,
    );
  }
  @Get('user/:userId')
  getUserCommentLikes(@Param('userId') userId: string) {
    return this.CommentLikesService.findUserCommentLikes(+userId);
  }
  @Delete('delete-like')
  deleteUserCommentLike(
    @Body() deleteUserCommentLike: DeleteUserCommentLikeDto,
  ) {
    return this.CommentLikesService.deleteUserCommentLike(
      +deleteUserCommentLike.user,
      +deleteUserCommentLike.comment,
    );
  }
}
