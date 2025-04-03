import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Auth, User, user } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
    public auth = inject(Auth);
    user$ = user(this.auth);
    isLoggedIn : boolean = false;
    constructor(private AuthService: AuthService){}
    ngOnInit (){
      this.user$.subscribe((aUser: User | null) => {
        if (aUser){
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      console.log(aUser);
    })
    }
    public logOut(){
      this.AuthService.logOut();
    }
}
