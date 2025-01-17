import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { NonprofitService } from './nonprofit.service';
import { CreateNonprofitDto } from './dto/create-nonprofit.dto';
import { UpdateNonprofitDto } from './dto/update-nonprofit.dto';

@Controller('nonprofit')
export class NonprofitController {
  constructor(private readonly nonprofitService: NonprofitService) {}

  @Post()
  create(@Body() createNonprofitDto: CreateNonprofitDto) {
    return this.nonprofitService.create(createNonprofitDto);
  }

  @Get()
  findAll() {
    return this.nonprofitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nonprofitService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNonprofitDto: UpdateNonprofitDto,
  ) {
    return this.nonprofitService.update(+id, updateNonprofitDto);
  }
}
