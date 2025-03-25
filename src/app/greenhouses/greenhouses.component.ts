import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {  addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Greenhouse } from '../models';

@Component({
  selector: 'app-greenhouses',
  templateUrl: './greenhouses.component.html',
  styleUrl: './greenhouses.component.css'
})
export class GreenhousesComponent implements OnInit {

  private firestore = inject(Firestore);

  constructor(private auth:Auth) { }

  ngOnInit(): void {
    this.addUserGreenhouse();
  }

  public async addUserGreenhouse(){
    const authUser = this.auth.currentUser;
    console.log('auth user', authUser?.uid);
    if (!authUser) {
      console.error('User not authenticated');
      throw new Error("User not authenticated");
    }
    const userCollectionRef = collection(this.firestore, `Users/${authUser.uid}/Greenhouse`);
    
    await addDoc(userCollectionRef,{
      authUser: authUser.uid,
    });
  
  }

}
