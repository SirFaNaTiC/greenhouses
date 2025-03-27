import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Plant } from './models';
import { Auth, authState, getAuth, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

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

  constructor(private api: ApiService) {}
  
  public ngOnInit() {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      console.log(aUser);
    });
  }

}
