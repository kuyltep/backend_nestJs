import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AudioEntity from './entities/audio.entity';
import { Repository } from 'typeorm';
import AudioDto from './dto/audio.dto';
import { instance } from 'src/utils/axios';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
  ) {}
  async createAudio(audioBody: AudioDto) {}
  async getVoices() {
    return await instance.get('audio/voices');
  }
  async deleteAudio(id: string, user) {
    return await this.audioRepository.delete({
      id: +id,
      user: {
        id: user.id,
      },
    });
  }
}
