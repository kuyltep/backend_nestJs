import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentLikeDto } from './dto/create-comment_like.dto';
import { CommentLikesService } from './comment_likes.service';
import { DeleteUserCommentLikeDto } from './dto/delete-comment_like.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@ApiTags('comment-likes')
@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly CommentLikesService: CommentLikesService) {}
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() commentLikeDto: CreateCommentLikeDto, @Req() request) {
    const { id: userId, ...userData } = request.user;
    return this.CommentLikesService.create(+userId, +commentLikeDto.comment);
  }
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserCommentLikes(@Req() request) {
    const { id: userId, ...userData } = request.user;
    return this.CommentLikesService.findUserCommentLikes(+userId);
  }

  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Delete('delete-like')
  deleteUserCommentLike(
    @Body() deleteUserCommentLike: DeleteUserCommentLikeDto,
    @Req() request,
  ) {
    const { id: userId, ...userData } = request.user;
    return this.CommentLikesService.deleteUserCommentLike(
      +userId,
      +deleteUserCommentLike.comment,
    );
  }
}
