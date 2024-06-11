import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserCoinsDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: DeleteUserDto })
  @Delete('user/delete')
  deleteUser(@Body() deleteUser: DeleteUserDto, @Req() request) {
    const user = request.user;
    return this.usersService.deleteUser(deleteUser, user);
  }

  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserCoinsDto })
  @Patch('user/tokens')
  updateUserTokens(
    @Body() updateUserCoins: UpdateUserCoinsDto,
    @Req() request,
  ) {
    const user = request.user;
    const coins = updateUserCoins.tokens;
    return this.usersService.udpateUserTokens(+user.id, coins);
  }
}
