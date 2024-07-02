import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjaService {
    private ninja = [
        { id: 0, name: 'ninjaA', weapon: 'stars' },
        { id: 1, name: 'ninjaB', weapon: 'nunchucks' },
    ];

    getNinja(weapon?: 'stars' | 'nunchucks') {
        if (weapon) {
            return this.ninja.filter((ninja) => ninja.weapon === weapon);
        }

        return this.ninja;
    }

    getOneNinja(id: number) {
        const ninja = this.ninja.find((ninja) => ninja.id == id);
        if (!ninja) {
            throw new Error('ninja not found');
        }

        return ninja;
    }


    createNinja(createNinjaDto: CreateNinjaDto) {
        const newNinja = {
           ...createNinjaDto,
            id: Date.now(),
        }; 
        this.ninja.push(newNinja);

        return newNinja;
    }

    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
        this.ninja = this.ninja.map((ninja) => {
            if (ninja.id === id) {
                return { ...ninja, ...updateNinjaDto };
            }
            return ninja;
        });
        return this.getNinja();
    }

    removeNinja(id: number) {
        const toBeRemoved = this.getNinja();
        this.ninja = this.ninja.filter((ninja) => ninja.id !== id);

        return toBeRemoved;
    }





}
