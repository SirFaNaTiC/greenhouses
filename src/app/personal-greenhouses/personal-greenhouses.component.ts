import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ApiService } from '../../services/api.service';
import { Plant, Greenhouse } from '../../app/models';
import { switchMap, map } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-personal-greenhouses',
  templateUrl: './personal-greenhouses.component.html',
  styleUrls: ['./personal-greenhouses.component.css']
})
export class PersonalGreenhousesComponent implements OnInit {
  greenhouseName: string | null = null;
  plants: Plant | undefined;
  currentPlant: Plant | undefined;
  plants$: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>([]);

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

  removePlantFromGreenhouses(name: string, plant: Plant) {
    this.firebaseService.removePlantFromGreenhouses(name, plant.main_species_id)
    this.ngOnInit()
  }

  loadGreenhouseData(greenhouseName: string) {
    this.firebaseService.getGreenhouse(greenhouseName).pipe(
      switchMap(greenhouse => {
        if (greenhouse?.plants?.length) {
          console.log('Greenhouse data:', greenhouse);
          const plantObservables: Observable<Plant>[] = greenhouse.plants.map(plant =>
            this.apiService.getPlantByID(plant.id)
          );
          return forkJoin(plantObservables).pipe(
            map((plants: Plant[]) => {
              console.log('Plants fetched:', plants);
              return plants;
            })
          );
        }
        return of<Plant[]>([]);
      })
    ).subscribe(plants => this.plants$.next(plants));
  }

}