import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/roles.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Roles('admin')
  @ApiBearerAuth('token')
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
  @Roles('admin')
  @ApiBearerAuth('token')
  @Post()
  create(@Body() roleDto: RoleDto) {
    return this.rolesService.create(roleDto);
  }
  @Roles('admin')
  @ApiBearerAuth('token')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }
  @Roles('admin')
  @ApiBearerAuth('token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
