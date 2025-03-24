import { Component, Input, OnInit } from '@angular/core';
import { PlantsComponent } from '../plants/plants.component';
import { ApiService } from '../../services/api.service';
import { Plant } from '../models';

@Component({
  providers: [PlantsComponent],
  selector: 'app-infos-plantes',
  templateUrl: './infos-plantes.component.html',
  styleUrl: './infos-plantes.component.css'
})
export class InfosPlantesComponent implements OnInit {
  
  constructor( private services : ApiService ) {}

  @Input() id: number = 9511;

  plantInfo: Plant [] = [];
  
  ngOnInit() {
    
    this.services.getPlantByID(this.id).subscribe(
      (plant:any)=>
      {
        this.plantInfo= plant;
      }
    );
  }

}
