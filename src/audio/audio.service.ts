import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AudioEntity from './entities/audio.entity';
import { Repository } from 'typeorm';
import AudioDto from './dto/audio.dto';
import { instance } from 'src/utils/axios';
import * as fs from 'fs';
import { Errors } from 'src/constants/errors';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
  ) {}
  async createAudio(audioBody: AudioDto, user) {
    try {
      const url = `audio/generate/?labeled_text=${encodeURIComponent(
        audioBody.markup,
      )}`;
      const audioGenerateResponse = await instance.post(url);
      const jobId = audioGenerateResponse.data['job_id'];
      let fileUrl;
      await this.getFileUrlFromJobStatusResponse(fileUrl, jobId);
      const audioFileResponse = await instance.get(`audio/get/${fileUrl}`, {
        responseType: 'arraybuffer',
      });
      const audioData: Buffer = Buffer.from(audioFileResponse.data);
      const filename = `./db_audiofiles/audio_${Date.now()}.wav`;
      await this.saveAudioToFile(audioData, filename);
      const audioEntity = {
        markup: audioBody.markup,
        path: filename,
        user,
      };
      return this.audioRepository.save(audioEntity);
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
  async getFileUrlFromJobStatusResponse(fileUrl, jobId) {
    let count = 0;
    while (!fileUrl) {
      try {
        const jobStatusResponse = await instance.get(`audio/job/${jobId}`);
        console.log(jobStatusResponse.data);
        if (jobStatusResponse.status === 200) {
          fileUrl = jobStatusResponse.data['file_url'];
        } else {
          console.log(
            `Try to get job status response ${++count}: Response status ${
              jobStatusResponse.status
            }`,
          );
        }
      } catch (error) {
        throw new BadRequestException(Errors.AUDIO_CREATE_ERROR);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  async saveAudioToFile(audioData: Buffer, filename: string): Promise<void> {
    try {
      fs.writeFileSync(filename, audioData);
    } catch (error) {
      throw new Error('Error saving audio to file');
    }
  }
  async getVoices() {
    return (await instance.get('audio/voices')).data;
  }
  async getAudioPath(id: number): Promise<string> {
    const audio = await this.audioRepository.findOneBy({ id });

    if (!audio) {
      throw new NotFoundException(Errors.AUDIO_NOT_FOUND);
    }

    const filePath = audio.path;
    return filePath;
  }
  async deleteAudio(id: string, user) {
    try {
      return await this.audioRepository.delete({
        id: +id,
        user: {
          id: user.id,
        },
      });
    } catch (error) {
      throw new BadRequestException(Errors.SERVER_ERROR);
    }
  }
}
