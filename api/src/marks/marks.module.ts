import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkEntity } from './entities/mark.entity';
import { MarksController } from './marks.controller';
import { MarksService } from './marks.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarkEntity])],
  controllers: [MarksController],
  providers: [MarksService],
})
export class MarksModule {}
