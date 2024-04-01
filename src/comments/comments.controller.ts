import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() request) {
    const { id: userId, ...userData } = request.user;
    return this.commentsService.create(
      +userId,
      +createCommentDto.product,
      createCommentDto.content,
    );
  }

  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateCommentDto: UpdateCommentDto, @Req() request) {
    const { id: userId, ...userData } = request.user;
    return this.commentsService.update(updateCommentDto, userId);
  }

  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(
    @Query('id') commentId: number,
    @Body() deleteCommentDto: DeleteCommentDto,
    @Req() request,
  ) {
    const { id: userId, ...userData } = request.user;
    return this.commentsService.remove(+commentId, deleteCommentDto, +userId);
  }

  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserComments(@Req() request) {
    const { id: userId, ...userData } = request.user;
    return this.commentsService.getUserComments(+userId);
  }
}
