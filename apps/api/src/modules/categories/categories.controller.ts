// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/categories.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get('hierarchy')
  async getHierarchy(@Query('includeInactive') includeInactive?: string) {
    const includeInactiveBool = includeInactive === 'true';
    return this.categoriesService.getHierarchyTree(includeInactiveBool);
  }

  @Get('stats')
  async getStats() {
    return this.categoriesService.getStats();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query: CategoryQueryDto) {
    return this.categoriesService.findById(id, query);
  }

  @Get('slug/:slug')
  async findBySlug(
    @Param('slug') slug: string,
    @Query() query: CategoryQueryDto,
  ) {
    return this.categoriesService.findBySlug(slug, query);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.categoriesService.softDelete(id);
  }

  @Put(':id/restore')
  async restore(@Param('id') id: string) {
    return this.categoriesService.restore(id);
  }
}
