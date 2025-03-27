import { Component, inject, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {  addDoc, collection, doc, Firestore, getDoc, getDocs, onSnapshot, query, setDoc, where } from '@angular/fire/firestore';
import { Greenhouse } from '../models';
import { AuthService } from '../../services/auth.service';
import { catchError, from, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-greenhouses',
  templateUrl: './greenhouses.component.html',
  styleUrl: './greenhouses.component.css'
})
export class GreenhousesComponent implements OnInit{

  constructor(private auth: AuthService) {}

  name: string = '';
  
  ngOnInit(): void {
    this.auth.checkAndCreateUser(); 
    this.auth.createFavoris();
  }

  public createGreenhouse(): void {
    this.auth.createGreenhouse(this.name);
  }
  
}
  
