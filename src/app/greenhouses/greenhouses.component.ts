import { Component, inject, OnInit } from '@angular/core';
import { Auth, getAuth, User, user } from '@angular/fire/auth';
import {  addDoc, collection, doc, Firestore, getDoc, getDocs, onSnapshot, query, setDoc, where } from '@angular/fire/firestore';
import { Greenhouse, Greenhouses } from '../models';
import { AuthService } from '../../services/auth.service';
import { catchError, from, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-greenhouses',
  templateUrl: './greenhouses.component.html',
  styleUrl: './greenhouses.component.css'
})
export class GreenhousesComponent implements OnInit{

  greenhouses: Greenhouse [] = [];
  private firestore = inject(Firestore);

  constructor(private auth: AuthService) {}

  name: string = '';
  
  authCurrentUser = getAuth()

  
  
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
    this.auth.createGreenhouse(this.name);
  }
  
}
  
