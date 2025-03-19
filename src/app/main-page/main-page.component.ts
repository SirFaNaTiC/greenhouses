import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Auth, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  public auth = inject(Auth);
  user$ = user(this.auth);
  isLoggedIn : boolean = false;
  constructor(private AuthService: AuthService, private router : Router) {}
  ngOnInit (){
    this.user$.subscribe((aUser: User | null) => {
      if (aUser){
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.router.navigate(['/landingpages'])
      }
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
    console.log(aUser);
  })
  }
  public logOut(){
    this.AuthService.logOut();
  }
}