import { Pipe, PipeTransform } from '@angular/core';
import { IFurniture } from '../../shared/interface/interfaces';

@Pipe({
  name: 'furnitureId'
})
export class FurniturePipe implements PipeTransform {

  transform(furniture: IFurniture[] | null): IFurniture[] {
    if (furniture) {
      return furniture.map((furniture, index) => {
        furniture.id = index + 1;
        return furniture;
      });
    }
    return [];
  }

}
