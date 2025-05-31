import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { TILService } from './til.service';
import { TIL } from './entities/til.entity';

interface TILResponse {
  success: boolean;
  tils: TIL[];
}

interface SingleTILResponse {
  success: boolean;
  til: TIL;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

@Controller('til')
export class TILController {
  constructor(private readonly tilService: TILService) {}

  @Get()
  async getAllTILs(): Promise<TILResponse> {
    return this.tilService.getAllTILs();
  }

  @Get('category/:category')
  async getTILsByCategory(@Param('category') category: string): Promise<TILResponse> {
    return this.tilService.getTILsByCategory(category);
  }

  @Get(':id')
  async getTILById(@Param('id') id: string): Promise<SingleTILResponse> {
    return this.tilService.getTILById(id);
  }

  @Post()
  async createTIL(@Body() tilData: Partial<TIL>): Promise<SingleTILResponse> {
    return this.tilService.createTIL(tilData);
  }

  @Put(':id')
  async updateTIL(
    @Param('id') id: string,
    @Body() tilData: Partial<TIL>,
  ): Promise<SingleTILResponse> {
    return this.tilService.updateTIL(id, tilData);
  }

  @Delete(':id')
  async deleteTIL(@Param('id') id: string): Promise<DeleteResponse> {
    return this.tilService.deleteTIL(id);
  }
}
