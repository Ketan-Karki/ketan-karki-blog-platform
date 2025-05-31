import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TIL } from '../entities/til.entity';

@Injectable()
export class TILRepository {
  constructor(
    @InjectRepository(TIL)
    private readonly tilRepository: Repository<TIL>,
  ) {}

  async findAll(): Promise<TIL[]> {
    return this.tilRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<TIL> {
    return this.tilRepository.findOne({ where: { id } });
  }

  async create(tilData: Partial<TIL>): Promise<TIL> {
    const newTIL = this.tilRepository.create(tilData);
    return this.tilRepository.save(newTIL);
  }

  async update(id: string, tilData: Partial<TIL>): Promise<TIL> {
    await this.tilRepository.update(id, tilData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.tilRepository.delete(id);
  }

  async findByCategory(category: string): Promise<TIL[]> {
    return this.tilRepository.find({
      where: { category },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
