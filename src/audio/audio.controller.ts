import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Req,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { AudioService } from './audio.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import AudioDto from './dto/audio.dto';
import { createReadStream } from 'fs';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@ApiTags('Audio')
@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: AudioDto })
  createAudio(@Body() audioBody: AudioDto, @Req() request) {
    const user = request.user;
    return this.audioService.createAudio(audioBody, user);
  }

  @Get('/voices')
  getVoices() {
    return this.audioService.getVoices();
  }

  @Get('download-audio/:id')
  @Header('Content-Type', 'audio/wav')
  @Header('Content-Disposition', 'attachment; filename="audiofile.wav"')
  async getAudio(@Param('id') id: number) {
    const filePath = await this.audioService.getAudioPath(id);
    if (!filePath) {
      throw new BadRequestException(`Аудио с id=${id} не найдено`);
    }
    const readStream = createReadStream(filePath);
    return new StreamableFile(readStream);
  }

  @Delete(':id')
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteAudio(@Param('id') id: string, @Req() request) {
    const user = request.user;
    return this.audioService.deleteAudio(id, user);
  }
}
