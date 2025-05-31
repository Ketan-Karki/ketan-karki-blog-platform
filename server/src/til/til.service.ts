import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { TILRepository } from './repositories/til.repository';
import { TIL } from './entities/til.entity';

@Injectable()
export class TILService {
  private readonly logger = new Logger(TILService.name);

  constructor(private readonly tilRepository: TILRepository) {}

  /**
   * Get all TIL entries
   */
  async getAllTILs(): Promise<{ success: boolean; tils: TIL[] }> {
    try {
      const tils = await this.tilRepository.findAll();
      return {
        success: true,
        tils,
      };
    } catch (error) {
      this.logger.error(`Error fetching TILs from database: ${error.message}`, error.stack);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get a single TIL entry by ID
   */
  async getTILById(id: string): Promise<{ success: boolean; til: TIL }> {
    try {
      const til = await this.tilRepository.findById(id);
      
      if (!til) {
        throw new HttpException('TIL entry not found', HttpStatus.NOT_FOUND);
      }
      
      return {
        success: true,
        til,
      };
    } catch (error) {
      this.logger.error(`Error fetching TIL by ID: ${error.message}`, error.stack);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Create a new TIL entry
   */
  async createTIL(tilData: Partial<TIL>): Promise<{ success: boolean; til: TIL }> {
    try {
      if (!tilData.title || !tilData.content) {
        throw new HttpException('Title and content are required', HttpStatus.BAD_REQUEST);
      }
      
      const newTIL = await this.tilRepository.create(tilData);
      
      return {
        success: true,
        til: newTIL,
      };
    } catch (error) {
      this.logger.error(`Error creating TIL: ${error.message}`, error.stack);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update an existing TIL entry
   */
  async updateTIL(id: string, tilData: Partial<TIL>): Promise<{ success: boolean; til: TIL }> {
    try {
      // Check if TIL exists
      const existingTIL = await this.tilRepository.findById(id);
      
      if (!existingTIL) {
        throw new HttpException('TIL entry not found', HttpStatus.NOT_FOUND);
      }
      
      const updatedTIL = await this.tilRepository.update(id, tilData);
      
      return {
        success: true,
        til: updatedTIL,
      };
    } catch (error) {
      this.logger.error(`Error updating TIL: ${error.message}`, error.stack);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Delete a TIL entry
   */
  async deleteTIL(id: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if TIL exists
      const existingTIL = await this.tilRepository.findById(id);
      
      if (!existingTIL) {
        throw new HttpException('TIL entry not found', HttpStatus.NOT_FOUND);
      }
      
      await this.tilRepository.delete(id);
      
      return {
        success: true,
        message: 'TIL entry deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Error deleting TIL: ${error.message}`, error.stack);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get TIL entries by category
   */
  async getTILsByCategory(category: string): Promise<{ success: boolean; tils: TIL[] }> {
    try {
      const tils = await this.tilRepository.findByCategory(category);
      
      return {
        success: true,
        tils,
      };
    } catch (error) {
      this.logger.error(`Error fetching TILs by category: ${error.message}`, error.stack);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
