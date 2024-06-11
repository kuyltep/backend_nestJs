import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AudioEntity from './entities/audio.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AudioEntity, UserEntity])],
  providers: [AudioService],
  controllers: [AudioController],
})
export class AudioModule {}
