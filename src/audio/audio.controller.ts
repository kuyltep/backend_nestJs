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
import { AudioService } from './audio.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import AudioDto from './dto/audio.dto';

@ApiTags('Audio')
@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  createAudio(@Body() audioBody: AudioDto) {
    return this.audioService.createAudio(audioBody);
  }

  @Get('/voices')
  getVoices() {
    return this.audioService.getVoices();
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  deleteAudio(@Param('id') id: string, @Req() request) {
    const user = request.user;
    return this.audioService.deleteAudio(id, user);
  }
}
