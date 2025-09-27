// /Users/thiagotavares/Projects/Services/apps/api/src/categories/categories.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: Record<string, unknown>) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query() query: Record<string, unknown>) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Record<string, unknown>,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.softDelete(id);
  }
}
