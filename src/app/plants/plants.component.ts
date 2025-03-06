import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Plant } from '../models';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit {
  constructor(private ApiService: ApiService) {}
  public End = true;
  public plants : Plant[]=[];
  ngOnInit (){
    this.ApiService.getPlantAll().subscribe(plant_temp=>this.plants=plant_temp);
    this.End = false;
  }
}
