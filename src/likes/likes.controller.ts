import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/like.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@ApiTags('product-likes')
@Controller('product-likes')
export class LikesController {
  constructor(private readonly LikesService: LikesService) {}
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('user/likes')
  findUserLikes(@Param('userId') userId: string) {
    return this.LikesService.findUserLikes(+userId);
  }
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Post()
  createUserLike(@Body() likeDto: CreateLikeDto) {
    return this.LikesService.createUserLike(+likeDto.user, +likeDto.product);
  }
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Delete()
  removeUserLike(@Body() likeDto: CreateLikeDto) {
    return this.LikesService.removeUserLike(+likeDto.user, +likeDto.product);
  }
}
