import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeleteCommentDto } from './dto/delete-comment.dto';
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(
      +createCommentDto.user,
      +createCommentDto.product,
      createCommentDto.content,
    );
  }

  @Put()
  update(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto);
  }

  @Delete(':commentId')
  remove(
    @Param('commentId') commentId: number,
    @Body() deleteCommentDto: DeleteCommentDto,
  ) {
    return this.commentsService.remove(+commentId, deleteCommentDto);
  }

  @Get('users/:userId')
  getUserComments(@Param('userId') userId: string) {
    return this.commentsService.getUserComments(+userId);
  }

  @Get('products/:productId')
  getProductComments(@Param('productId') productId: string) {
    return this.commentsService.getProductComments(+productId);
  }
}
