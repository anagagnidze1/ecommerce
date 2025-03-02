import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { furnitureService } from '../../shared/services/furniture.service';
import { Observable } from 'rxjs';
import { IFurniture } from '../../shared/interface/interfaces';

export const usersResolver: ResolveFn<Observable<IFurniture[]>> = (route, state) => {
  const furnitureServ = inject(furnitureService);
  const furnitures = furnitureServ.getFurniture();

  return furnitures;
};
