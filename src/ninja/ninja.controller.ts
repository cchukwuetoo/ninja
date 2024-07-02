import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjaService } from './ninja.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninja')
export class NinjaController {
    constructor(private readonly ninjaService: NinjaService) {}


    //Get /ninja ---> query helps to know streamline what kind of information we get[]
    @Get()
    getNinja(@Query('weapon') weapon: 'stars' | 'nunchucks') {
        //const service = new NinjaService();
        return this.ninjaService.getNinja(weapon);
    }
    //Get /ninja/:id ---> []
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.ninjaService.getOneNinja(id);
        } catch (error) {
            throw new NotFoundException();
        }
       
    }
    //Post /ninja ---> []
    @Post()
    //UseGuards are used for restrictions on who can create users
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjaService.createNinja(createNinjaDto);
    }
    //Put /ninja/:id ---> []
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjaService.updateNinja(+id, updateNinjaDto);
    }
    //Delete /ninja/:id ---> []
    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return this.ninjaService.removeNinja(+id);
    }

}