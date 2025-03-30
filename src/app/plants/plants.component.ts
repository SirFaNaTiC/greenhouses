import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Plant } from '../models';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit {
  constructor(private ApiService: ApiService, private firebasesService: FirebaseService) {}
  public End = true;
  public plants : Plant[]=[];

  ngOnInit (){
    this.ApiService.getPlantAll().subscribe(plant_temp=>{this.plants=plant_temp,console.log(this.plants);});
    this.End = false;
    
  }

  public addPlantToFavorite( id:number) {
    this.firebasesService.addPlantToFavorites(id);
  }

  public addPlantToGreenhouse(name: string , id:number) {
    this.firebasesService.addPlantToGreenhouse(name , id);
  }
}
