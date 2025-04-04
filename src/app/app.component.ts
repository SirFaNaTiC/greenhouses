import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Plant } from './models';
import { Auth, authState, getAuth, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'greenhouses';

  public myPlant?: Plant[];
  private auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription?: Subscription ;

  constructor(private firebase:FirebaseService , private router : Router) {}
  
  public ngOnInit() {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      console.log(aUser);
    });
    this.firebase.checkAndCreateUser();
    this.firebase.CheckAndCreateFavoris();
    this.router.navigate(['/plants']);
  }

}
