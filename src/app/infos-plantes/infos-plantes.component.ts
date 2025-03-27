import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Plant } from '../models';

@Component({
  selector: 'app-infos-plantes',
  templateUrl: './infos-plantes.component.html',
  styleUrl: './infos-plantes.component.css'
})
export class InfosPlantesComponent implements OnInit{
  constructor(private route : ActivatedRoute, private ApiService : ApiService){}
  public currentPlant : Plant | undefined;
  public id: number = 0;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      this.ApiService.getPlantByID(this.id).subscribe(plant=>this.currentPlant=plant);
      console.log(this.currentPlant);
   });
  }
}
