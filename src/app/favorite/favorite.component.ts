import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ApiService } from '../../services/api.service';
import { Plant } from '../../app/models';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  plants$ = new BehaviorSubject<Plant[]>([]);

  constructor(
    private firebaseService: FirebaseService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  removePlantFromFavorites(plant: Plant): void {
    this.firebaseService.removePlantFromFavorites(plant.main_species_id);
    this.ngOnInit();
    this.router.navigate(['/favorite']);
  }

  loadFavorites(): void {
    this.firebaseService.getFavoris().pipe(
      switchMap(favoris => {
        if (favoris?.plants?.length) {
          console.log('Favoris data:', favoris);
          const plantObservables: Observable<Plant>[] = favoris.plants.map(plant =>
            this.apiService.getPlantByID(plant.id)
          );
  
          return forkJoin(plantObservables).pipe(
            map((plants: (Plant | null)[]) => {
              const filteredPlants: Plant[] = plants.filter((plant): plant is Plant => plant !== null);
              console.log('Plants fetched:', filteredPlants);
              return filteredPlants;
            })
          );
        }
        return of<Plant[]>([]);
      })
    ).subscribe(
      plants => this.plants$.next(plants),
      error => console.error('Error loading favorites:', error)
    );
  }
  
}
