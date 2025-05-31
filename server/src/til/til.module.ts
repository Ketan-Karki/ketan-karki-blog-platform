import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TILController } from './til.controller';
import { TILService } from './til.service';
import { TILRepository } from './repositories/til.repository';
import { TIL } from './entities/til.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TIL])],
  controllers: [TILController],
  providers: [TILService, TILRepository],
  exports: [TILService],
})
export class TILModule {}
