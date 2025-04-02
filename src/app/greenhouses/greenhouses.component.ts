import { Component, inject, OnInit } from '@angular/core';
import { getAuth} from '@angular/fire/auth';
import {  collection, deleteDoc, doc, Firestore,onSnapshot } from '@angular/fire/firestore';
import { Greenhouse, } from '../models';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-greenhouses',
  templateUrl: './greenhouses.component.html',
  styleUrl: './greenhouses.component.css'
})
export class GreenhousesComponent implements OnInit{

  greenhouses: Greenhouse [] = [];
  private firestore = inject(Firestore);

  constructor(private firebaseService: FirebaseService) {}

  name: string = '';
  

  
  ngOnInit(): void {

    const auth = getAuth();
    if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const refCollection = collection(this.firestore, `Users/${uid}/Greenhouses/`);
        onSnapshot(refCollection, (greenhouses)=>{
          this.greenhouses = (greenhouses.docs.map(doc => doc.data() as Greenhouse))
        });
    }
  }

  public createGreenhouse(): void {
    this.firebaseService.createGreenhouse(this.name);
    this.name = '';
  }

  public deleteGreenhouse(name: string){
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      console.log(name);
      const refCollection = collection(this.firestore, `Users/${uid}/Greenhouses/`);
      deleteDoc(doc(refCollection, name));
    }
  }
}
