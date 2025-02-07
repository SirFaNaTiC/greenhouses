import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Plant } from './models';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'greenhouses';

  public myPlant?: Plant[];
  public email:string="";
  public password:string="";
  private auth = inject(Auth);

  constructor(private api: ApiService) {}
  
  public ngOnInit() {
    
    this.api.getPlant("beach strawberry").subscribe((plt) => {
      this.myPlant = plt
      console.log(this.myPlant);
    });
  }

  public createUser(email:string, password:string) {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      console.log("afficher user");
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
  }

}
