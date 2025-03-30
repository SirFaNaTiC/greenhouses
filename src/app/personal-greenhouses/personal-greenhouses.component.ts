import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ApiService } from '../../services/api.service';
import { Plant, Greenhouse } from '../../app/models';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-personal-greenhouses',
  templateUrl: './personal-greenhouses.component.html',
  styleUrls: ['./personal-greenhouses.component.css']
})
export class PersonalGreenhousesComponent implements OnInit {
  greenhouseName: string | null = null;
  plants$: Observable<Plant[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.greenhouseName = params.get('name');
      if (this.greenhouseName) {
        this.loadGreenhouseData(this.greenhouseName);
      }
    });
  }

  loadGreenhouseData(greenhouseName: string): void {
    this.firebaseService.getGreenhouse(greenhouseName).pipe(
      switchMap(greenhouse => {
        if (greenhouse && greenhouse.plants && greenhouse.plants.length > 0) {
          console.log('Greenhouse data:', greenhouse);
          const plantObservables = greenhouse.plants.map(plant => 
            this.apiService.getPlantByID(plant.id)
          );
          return forkJoin(plantObservables).pipe(
            map(plants => {
              console.log('Plants fetched:', plants);
              this.plants$ = of(plants);
              return plants;
            })
          );
        }
        return of([]);
      })
    ).subscribe();
  }
}