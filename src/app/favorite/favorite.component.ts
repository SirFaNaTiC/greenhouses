import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ApiService } from '../../services/api.service';
import { Plant } from '../../app/models';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  plants$: Observable<Plant[]> = of([]);

  constructor(
    private firebaseService: FirebaseService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  removePlantFromFavorites(id: number): void {
    this.firebaseService.removePlantFromFavorites(id);
  }

  loadFavorites(): void {
    this.firebaseService.getFavoris().pipe(
      switchMap(favoris => {
        if (favoris?.plants && favoris.plants.length > 0) {
          console.log('Favoris data:', favoris);
          const plantObservables = favoris.plants
            .map(plant => this.apiService.getPlantByID(plant.id));
          
          return forkJoin(plantObservables).pipe(
            map(plants => {
              console.log('Plants fetched:', plants);
              this.plants$ = of(plants.filter((plant): plant is Plant => plant != null));
              return plants;
            })
          );
        }
        return of([]);
      })
    ).subscribe(
      () => console.log('Completed loading favorites'),
      error => console.error('Error loading favorites:', error)
    );
  }
}
