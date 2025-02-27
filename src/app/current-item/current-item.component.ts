import { Component, OnInit} from '@angular/core';
import { IFurniture } from '../shared/interface/interfaces';
import { furnitureService } from '../shared/services/furniture.service';
import { BehaviorSubject } from 'rxjs';
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
      const id = params.get('id'); // Don't convert to number yet
      if (id) {
        this.furnitureService.getFurnitureById(id).subscribe(item => {
          this.furnitureService.currentItem.set(item); // Update the signal
          this.currentItem = this.furnitureService.currentItem(); // Read the signal value
          console.log("Selected item:", this.currentItem); // Debugging log
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