import { Component, OnInit} from '@angular/core';
import { IFurniture } from '../shared/interface/interfaces';
import { furnitureService } from '../shared/services/furniture.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-current-item',
  imports: [],
  templateUrl: './current-item.component.html',
  styleUrl: './current-item.component.scss',
  standalone: true 
})
export class CurrentItemComponent implements OnInit{
  public furnitureList: IFurniture[] = [];
  public currentItem: IFurniture | null = null
  constructor(private furnitureService: furnitureService, private router: Router,  private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.furnitureService.getFurnitureById(id).subscribe(item => {
          this.furnitureService.currentItem.set(item);
          this.currentItem = this.furnitureService.currentItem();
          console.log("Selected item:", this.currentItem);
        });
      } else {
        console.error('Invalid furniture ID');
      }
    });
  }
  viewItem(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/current-item', id]);
    } else {
      console.error('Furniture ID is undefined!');
    }
  }

}