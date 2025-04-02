import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GreenhouseSelected, Plant } from '../models';
import { FirebaseService } from '../../services/firebase.service';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit {
  constructor(private ApiService: ApiService, private firebasesService: FirebaseService) {}
  public End = true;
  public plants: Plant[] = [];
  greenhouses: GreenhouseSelected[] = [];
  selectedValue: string = '';
  private firestore = inject(Firestore);

  showPopup = false;
popupText = '';

triggerAction(type: string, id: number) {
  if (type === 'greenhouse') {
      this.addPlantToGreenhouse(id);
      this.popupText = 'Plant added to greenhouse!';
  } else {
      this.addPlantToFavorite(id);
      this.popupText = 'Plant added to favorites!';
  }
  this.showPopup = true;
  setTimeout(() => this.showPopup = false, 3000);
}

  ngOnInit() {
    this.ApiService.getPlantAll().subscribe(plant_temp => {
      this.plants = plant_temp;
      console.log(this.plants);
    });
    this.End = false;

    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const refCollection = collection(this.firestore, `Users/${uid}/Greenhouses/`);
      onSnapshot(refCollection, (greenhouses) => {
        this.greenhouses = greenhouses.docs.map((doc) => ({
          name: doc.id,
          selectedName: doc.id
        }));
        console.log('Greenhouses loaded:', this.greenhouses);
      });
    }
  }

  public addPlantToFavorite(id: number) {
    this.firebasesService.addPlantToFavorites(id);
  }

  public addPlantToGreenhouse(id: number) {
    if (this.selectedValue) {
      this.firebasesService.addPlantToGreenhouse(this.selectedValue, id);
    } else {
      console.error('Please select a greenhouse first');
    }
  }
}